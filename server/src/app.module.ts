import { redisModule } from './modules.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [EventsModule, redisModule],
})
export class AppModule {}
