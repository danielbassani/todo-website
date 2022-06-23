import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Todo } from 'src/app/models/todo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private cookieService: CookieService, private todosService: TodosService) { }

  ngOnInit(): void {
  }

  clearMyTodos(): void {
    this.todosService.deleteAll()
  }

  clearAllCompleted(): void {
    this.todosService.deleteAllCompleted();
  }

}
