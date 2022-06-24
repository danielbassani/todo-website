import { EventEmitter, Injectable, Output } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  @Output() public static listChangedReference: EventEmitter<any> = new EventEmitter();
  private todoList: Todo[] = []; 

  constructor() {
    let titlesStr = localStorage.getItem('titles');
    let completedStr = localStorage.getItem('completed');

    if (titlesStr && completedStr) {
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
    this.saveInLocalStorage('titles', 'completed');
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
    this.saveInLocalStorage('titles', 'completed');
  }

  deleteAll(): void {
    this.saveInLocalStorage('titlesBackup', 'completedBackup')
    this.todoList = [];
    this.saveInLocalStorage('titles', 'completed');
    

    TodosService.listChangedReference.emit();
  }

  deleteAllCompleted(): void {
    this.saveInLocalStorage('titlesBackup', 'completedBackup')
    let tempList: Todo[] = []
    this.todoList.forEach(todo => {
      if (!todo.isCompleted) {
        tempList.push(todo);
      }
    })

    this.todoList = tempList;
    this.saveInLocalStorage('titles', 'completed');

    TodosService.listChangedReference.emit();
  }

  updateTodo(todo: Todo): void {
    let i = this.todoList.findIndex((el) => {
      return el.title === todo.title;
    })
    this.todoList.splice(i, 1, todo);
    this.saveInLocalStorage('titles', 'completed');
  }

  moveUp(index: number): void {
    let todo: Todo = this.todoList[index];
    this.todoList.splice(index, 1);
    this.todoList.splice(index - 1, 0, todo);

    this.saveInLocalStorage('titles', 'completed');
  }

  moveDown(index: number): void {
    let todo: Todo = this.todoList[index];
    this.todoList.splice(index, 1);
    this.todoList.splice(index + 1, 0, todo);

    this.saveInLocalStorage('titles', 'completed');
  }

  private saveInLocalStorage(nameForTitles: string, nameForCompleted: string) {
    let titlesStr = '';
    let completedStr = '';
    this.todoList.forEach((el) => {
      titlesStr += el.title + ','
      completedStr += el.isCompleted + ','
    })
    localStorage.setItem(nameForTitles, titlesStr)
    localStorage.setItem(nameForCompleted, completedStr);
  }
}
