import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.css']
})
export class ColourPickerComponent implements OnInit {

  @Output()
  public static changeColourEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeColourPalette(palette: string) {
    ColourPickerComponent.changeColourEvent.emit(palette);
  }

}
