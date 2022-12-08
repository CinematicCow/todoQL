import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoInput: CreateTodoInput) {
    const newTodo = this.todoRepository.create(createTodoInput);
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async findAll() {
    const todos: Todo[] = await this.todoRepository.find();
    console.log('TODOS', todos);
    return todos;
  }

  async findOne(id: string) {
    const todo: Todo = await this.todoRepository.findOneByOrFail({ id });
    return todo;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoRepository.preload({
      id,
      ...updateTodoInput,
    });
    if (!todo) return new NotFoundException();
    await this.todoRepository.save(todo);
    return todo;
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    if (!todo) return new UserInputError('Todo not found');
    return await this.todoRepository.remove(todo);
  }
}
