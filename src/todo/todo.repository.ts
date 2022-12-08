import { DataSource } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { DATA_SOURCE, TODO_REPOSITORY } from 'src/constants/entity';

export const todoRepository = [
  {
    provide: TODO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
    inject: [DATA_SOURCE],
  },
];
