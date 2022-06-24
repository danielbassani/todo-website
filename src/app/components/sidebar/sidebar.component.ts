import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
  }

  clearMyTodos(): void {
    this.todosService.deleteAll()
  }

  clearAllCompleted(): void {
    this.todosService.deleteAllCompleted();
  }

}
