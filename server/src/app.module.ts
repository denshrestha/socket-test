import { redisModule } from './modules.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [EventsModule, redisModule, ConfigModule.forRoot()],
})
export class AppModule {}
