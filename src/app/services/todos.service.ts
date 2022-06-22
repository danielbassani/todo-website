import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  dummyTodoList: Todo[] = [
    {'title': 'test'}
  ];
  
  /*
  [
    {'title': 'cooking', 'description': 'test description', 'isCompleted': false},
    {'title': 'cleaning', 'description': 'test description', 'isCompleted': false},
    {'title': 'homework', 'description': 'test description', 'isCompleted': false},
    {'title': 'coding', 'description': 'test description', 'isCompleted': false},
    {'title': 'pancakes', 'description': 'test description', 'isCompleted': false}
  ]
  */

  constructor() { }

  getAllTodos(): Todo[] {
    return this.dummyTodoList;
  }

  addTodo(todo:Todo): void {
    this.dummyTodoList.push(todo);
  }

  checkIfExistsByTitle(title: string): boolean {
    return this.dummyTodoList.some((el) => {
      return el.title === title;
    });
  }

  deleteTodo(title: string) :void {
    let i = this.dummyTodoList.findIndex((el) => {
      return el.title === title;
    })

    this.dummyTodoList.splice(i, 1);
  }
}
