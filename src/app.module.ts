import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions?.exception?.code || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    TodoModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
