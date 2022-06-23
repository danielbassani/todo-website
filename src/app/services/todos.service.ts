import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todoList: Todo[] = []; 
  
  /*
  [
    {'title': 'cooking'},
    {'title': 'cleaning'},
    {'title': 'homework'},
    {'title': 'coding'},
    {'title': 'pancakes'}
  ];
  */
  
  /*
  [
    {'title': 'test'}
  ];
  */

  constructor(private cookieService: CookieService) {
    let titlesStr = this.cookieService.get('titles');
    let completedStr = this.cookieService.get('completed');

    if (titlesStr) {
      let titles: string[] = titlesStr.split(',');
      let completed: string[] = completedStr.split(',');

      for (let i = 0; i < titles.length - 1; i++) {
        this.todoList.push(new Todo(titles[i], JSON.parse(completed[i])));
      }
    }

    console.log(this.todoList);
  }

  getAllTodos(): Todo[] {
    return this.todoList;
  }

  addTodo(todo:Todo): void {
    this.todoList.push(todo);
    console.log(this.todoList)
    this.saveInCookie();
  }

  checkIfExistsByTitle(title: string): boolean {
    return this.todoList.some((el) => {
      return el.title === title;
    });
  }

  deleteTodo(title: string) :void {
    let i = this.todoList.findIndex((el) => {
      return el.title === title;
    })

    this.todoList.splice(i, 1);
    this.saveInCookie();
  }

  updateTodo(todo: Todo): void {
    console.log('hello');
    let i = this.todoList.findIndex((el) => {
      return el.title === todo.title;
    })
    this.todoList.splice(i, 1, todo);
    this.saveInCookie();
  }

  private saveInCookie() {
    let titlesStr = '';
    let completedStr = '';
    this.todoList.forEach((el) => {
      titlesStr += el.title + ','
      completedStr += el.isCompleted + ','
    })
    this.cookieService.set('titles', titlesStr)
    this.cookieService.set('completed', completedStr);
  }
}
