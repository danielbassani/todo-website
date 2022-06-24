import { Component, OnInit} from '@angular/core';
import { ColourPickerComponent } from './components/colour-picker/colour-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  ngOnInit(): void {
    ColourPickerComponent.changeColourEvent.subscribe((palette) => {
      this.changeColourPalette(palette);
    })
  }

  changeColourPalette(palette: string) {
    $('body').removeClass((index, className) => {
      return (className.match (/palette-\S+/g) || []).join(' ')
    })

    $('body').addClass('palette-' + palette);
  }
}
