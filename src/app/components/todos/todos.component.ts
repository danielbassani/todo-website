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

  todos: Todo[] = [];

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.todos = this.todosService.getAllTodos();
  }

  ngAfterViewInit(): void {
    this.todos.forEach(todo => {
      if (todo.isCompleted) {
        console.log('hello')
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

}
