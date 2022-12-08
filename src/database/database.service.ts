import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database_host'),
      port: this.configService.get<number>('database_port'),
      username: this.configService.get<string>('database_username'),
      password: this.configService.get<string>('database_password'),
      database: this.configService.get<string>('database_name'),
      synchronize: true,
      logging: this.configService.get<string>('NODE_ENV') != 'production',
      entities: ['dist/**/*.entity{.ts,.js}'],
      //   namingStrategy: new SnakeNamingStrategy(),
      // dropSchema: true,
    };
  }
}
