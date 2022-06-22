import { Component, OnInit } from '@angular/core';
import {interval, Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public date: Date = new Date();
  public subscription:Subscription = interval(1000).subscribe(val => this.setDate());
  
  constructor() { }

  ngOnInit(): void {
    $('#toggle-button').on('click', () => {
      let arrowIconElement = $('#toggle-arrow');
      if (arrowIconElement.hasClass('fa-angle-down')) {
        arrowIconElement.removeClass('fa-angle-down');
        arrowIconElement.addClass('fa-angle-left');
      } else {
        arrowIconElement.removeClass('fa-angle-left');
        arrowIconElement.addClass('fa-angle-down');
      }
    })
  }

  setDate(): void {
    this.date = new Date();
  }

}
