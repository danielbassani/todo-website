import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from 'src/app/models/todo.model';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  public todos: Todo[] = [];
  public confirmOnDelete: boolean = false;

  public todoToDeleteModal: string = '';

  constructor(private todosService: TodosService, private cookieService: CookieService) { }

  ngOnInit(): void {
    let confirmOnDeleteCookie = this.cookieService.get('confirmOnDelete');
    if (confirmOnDeleteCookie) {
      this.confirmOnDelete = JSON.parse(confirmOnDeleteCookie);
    }

    this.todos = this.todosService.getAllTodos();

    $('#confirmDeleteSwitch').on('change', () => {
      console.log('here')
      this.cookieService.set('confirmOnDelete', JSON.stringify(this.confirmOnDelete));
    })
  }

  ngAfterViewInit(): void {
    this.todos.forEach(todo => {
      if (todo.isCompleted) {
        let id = '#tr-' + todo.title;
        $(id).css('background-color', 'green');
      }
    })
  }

  onClick(todo: Todo): void {
    let id = '#' + todo.title + 'Label';

    if (!todo.isCompleted) {
      $(id).css({'color': 'red', 'text-decoration': 'line-through'});
    } else {
      todo.isCompleted = true;
      $(id).css({'color': 'black', 'text-decoration': 'none'});
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

  toggleTodoComplete(todo: Todo): void {
    let id = '#tr-' + todo.title;

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
}
