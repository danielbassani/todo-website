import { EventEmitter, Injectable, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  @Output() public static listChangedReference: EventEmitter<any> = new EventEmitter();
  private todoList: Todo[] = []; 

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
  }

  getAllTodos(): Todo[] {
    return this.todoList;
  }

  addTodo(todo:Todo): void {
    this.todoList.push(todo);
    this.saveInCookie('titles', 'completed');
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
    this.saveInCookie('titles', 'completed');
  }

  deleteAll(): void {
    this.saveInCookie('titlesBackup', 'completedBackup')
    this.todoList = [];
    this.saveInCookie('titles', 'completed');
    

    TodosService.listChangedReference.emit();
  }

  deleteAllCompleted(): void {
    this.saveInCookie('titlesBackup', 'completedBackup')
    let tempList: Todo[] = []
    this.todoList.forEach(todo => {
      if (!todo.isCompleted) {
        console.log('hello')
        tempList.push(todo);
      }
    })
    console.log(tempList);

    this.todoList = tempList;
    this.saveInCookie('titles', 'completed');

    TodosService.listChangedReference.emit();
  }

  updateTodo(todo: Todo): void {
    let i = this.todoList.findIndex((el) => {
      return el.title === todo.title;
    })
    this.todoList.splice(i, 1, todo);
    this.saveInCookie('titles', 'completed');
  }

  moveUp(index: number): void {
    let todo: Todo = this.todoList[index];
    this.todoList.splice(index, 1);
    this.todoList.splice(index - 1, 0, todo);

    this.saveInCookie('titles', 'completed');
  }

  moveDown(index: number): void {
    let todo: Todo = this.todoList[index];
    this.todoList.splice(index, 1);
    this.todoList.splice(index + 1, 0, todo);

    this.saveInCookie('titles', 'completed');
  }

  private saveInCookie(cookieNameForTitles: string, cookieNameForCompleted: string) {
    let titlesStr = '';
    let completedStr = '';
    this.todoList.forEach((el) => {
      titlesStr += el.title + ','
      completedStr += el.isCompleted + ','
    })
    this.cookieService.set(cookieNameForTitles, titlesStr)
    this.cookieService.set(cookieNameForCompleted, completedStr);
  }
}
