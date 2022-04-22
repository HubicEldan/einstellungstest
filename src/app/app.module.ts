import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//components
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentModalComponent } from './calendar/appointment-modal/appointment-modal.component';

//primeng
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NextViewingComponent } from './calendar/next-viewing/next-viewing.component';
import { MainCalendarComponent } from './calendar/main-calendar/main-calendar.component';
import { ChangeToMonthNamePipe } from './shared/pipes/change-to-month-name.pipe';




//material 
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NextViewingComponent,
    MainCalendarComponent,
    ChangeToMonthNamePipe,
    AppointmentModalComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
