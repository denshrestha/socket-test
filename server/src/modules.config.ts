/* eslint-disable prettier/prettier */
import { RedisModule } from './redis.module';
import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const redisModule = RedisModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configeService: ConfigService) => {
        const logger = new Logger('RedisModule')

        return {
            connectionOptions: {
                host: configeService.get('REDIS_HOST'),
                port: configeService.get('REDIS_PORT')
            },
            onClientReady: (client) => {
                logger.log('Redis client ready')

                client.on('error', (err) => {
                    logger.error('Redis client error', err)
                })

                client.on('connect', () => {
                    logger.log(`Connected to Redis on ${client.options.host}:${client.options.port}`)
                })
            }
        }
    },
    inject: [ConfigService]
})