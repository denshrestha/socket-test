/* eslint-disable prettier/prettier */
import { Injectable, Logger } from "@nestjs/common";
import { EventsRepository } from "./events.repository";

@Injectable()
export class  EventsService {
    private readonly logger = new Logger(EventsService.name);
    constructor(
      private readonly eventsRepository: EventsRepository,
    ) {}

    async addEvent(event: string): Promise<string> {
        this.logger.log('EVENT on SERVICE' + ' ' + event)
        return this.eventsRepository.addEvent(event);
      }
}