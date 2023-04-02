/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { EventsGateway } from './events.gateway'
import { EventsService } from './events.service'
import { EventsRepository } from './events.repository'
import { ConfigModule } from '@nestjs/config'
import { redisModule } from 'src/modules.config'
@Module({
  imports: [ConfigModule, redisModule],
  providers: [EventsGateway, EventsService, EventsRepository],
})
export class EventsModule {}
