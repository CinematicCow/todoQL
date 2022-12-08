import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    console.log('here');
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.todoService.findOne(id);
    } catch (err) {
      return new ApolloError('Could not find the given entity');
    }
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(
    @Args('id') id: string,

    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => String }) id: string) {
    return this.todoService.remove(id);
  }
}
