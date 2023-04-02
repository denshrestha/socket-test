/* eslint-disable prettier/prettier */
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsService } from './events.service';

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}
  

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async findAll(@MessageBody() data: any): Promise<void> {
    const evetns = await this.eventsService.addEvent(data);
    
    this.server.emit('events', evetns)
  }
}
