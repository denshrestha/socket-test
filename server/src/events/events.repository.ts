/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { IORedisKey } from 'src/redis.module';
import { Redis } from 'ioredis';

@Injectable()
export class EventsRepository {
    private readonly ttl: string
    private readonly logger = new Logger(EventsRepository.name)

    constructor(
        configService: ConfigService,
        @Inject(IORedisKey) private readonly redisClient: Redis
    ) {
        this.ttl = configService.get('CONNECTION_DURATION');
    }

    async addEvent(event: string): Promise<string> {
        this.logger.log(
          `Attempting to add a event with "event": ${event}`,
        );
    
        const key = `events:${event}`;
        const eventsPath = `.events.${event}`;
    
        try {
          await this.redisClient.set(key, event);
    
          return this.getPoll(event);
        } catch (e) {
          this.logger.error(
            `Failed to add event: ${event} to events}`,
            e,
          );
          throw new InternalServerErrorException(
            `Failed to add a event`,
          );
        }
    }
    async getPoll(event: string): Promise<string> {
        this.logger.log(`Attempting to get event with: ${event}`);
    
        const key = `events:${event}`;
    
        try {
          const currentPoll = await this.redisClient.get(key);
    
          this.logger.verbose(currentPoll);
    
          // if (currentPoll?.hasStarted) {
          //   throw new BadRequestException('The poll has already started');
          // }
    
          return JSON.parse(currentPoll as string);
        } catch (e) {
          this.logger.error(`Failed to get event: ${event}`);
          throw new InternalServerErrorException(`Failed to get event: ${event}`);
        }
      }
}
