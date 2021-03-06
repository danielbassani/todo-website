import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ColourPickerComponent } from './components/colour-picker/colour-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    WelcomeComponent,
    SidebarComponent,
    ColourPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
