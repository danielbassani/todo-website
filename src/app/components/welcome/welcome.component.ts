import { Component, OnInit } from '@angular/core';
import {interval, Subscription } from 'rxjs';
import * as $ from 'jquery';
import { ColourPickerComponent } from '../colour-picker/colour-picker.component';

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
    ColourPickerComponent.changeColourEvent.subscribe((palette) => {
      this.changeColourPalette(palette);
    })

    $('#toggle-button').on('click', () => {
      let arrowIconElement = $('#toggle-arrow');
      if (arrowIconElement.hasClass('fa-angle-down')) {
        arrowIconElement.removeClass('fa-angle-down');
        arrowIconElement.addClass('fa-angle-left');
        $('#only-date').css('visibility', 'visible')
      } else {
        arrowIconElement.removeClass('fa-angle-left');
        arrowIconElement.addClass('fa-angle-down');

        $('#only-date').css('visibility', 'hidden')
      }
    })
  }

  setDate(): void {
    this.date = new Date();
  }

  changeColourPalette(palette: string) {
    $('#welcome-collapse').removeClass((index, className) => {
      return (className.match (/gradient-\S+/g) || []).join(' ')
    })

    $('#welcome-collapse').addClass('gradient-' + palette);
  }
}
