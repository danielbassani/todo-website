import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from 'src/app/models/todo.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  public todos: Todo[] = [];
  public confirmOnDelete: boolean = false;

  public todoToDeleteModal: string = '';

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    // subscribe for when we clear and re-reference the list
    TodosService.listChangedReference.subscribe(() => {
      this.todos = this.todosService.getAllTodos();
    });

    let confirmOnDeleteCookie = localStorage.getItem('confirmOnDelete');
    if (confirmOnDeleteCookie) {
      this.confirmOnDelete = JSON.parse(confirmOnDeleteCookie);
    }

    this.todos = this.todosService.getAllTodos();

    $('#confirmDeleteSwitch').on('change', () => {
      console.log('here')
      localStorage.setItem('confirmOnDelete', JSON.stringify(this.confirmOnDelete));
    })
  }

  ngAfterViewInit(): void {
    for(let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].isCompleted) {
        let id = '#tr-' + i;
        $(id).css('background-color', 'green');
      }
    }
  }

  addTodo(title: string): void {
    if (title && !this.todosService.checkIfExistsByTitle(title)) {
      let todo:Todo = new Todo(title, false);
      this.todosService.addTodo(todo);
    }
    $('#addTodoInput').val('');
  }

  deleteTodo(title: string): void {
    this.todosService.deleteTodo(title);
    this.setTodoToDeleteModal('');
  }

  toggleTodoComplete(i: number, todo: Todo): void {
    let id = '#tr-' + i;

    if (!todo.isCompleted) {
      todo.isCompleted = true;
      $(id).css('background-color', 'green');
    } else {
      todo.isCompleted = false;
      $(id).css('background-color', '');
    }

    this.todosService.updateTodo(todo);
  }

  setTodoToDeleteModal(title: string): void {
    this.todoToDeleteModal = title;
  }

  moveUp(index: number): void {
    this.todosService.moveUp(index);
  }

  moveDown(index: number): void {
    this.todosService.moveDown(index);
  }

  keyPressAlphaNumeric(event: any): boolean {
    let input = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9 ]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
