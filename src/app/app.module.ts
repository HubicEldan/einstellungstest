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
import { NextViewingComponent } from './calendar/next-viewing/next-viewing.component';
import { MainCalendarComponent } from './calendar/main-calendar/main-calendar.component';

//primeng
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

//material
import { MatDialogModule } from '@angular/material/dialog';

//ngrx
import { StoreModule } from '@ngrx/store'
import { nodeReducer } from './calendar/state/node.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NodeEffect } from './calendar/state/node.effects';


//pipes
import { NodesToArrayPipe } from './shared/pipes/nodes-to-array.pipe';
import { ChangeToMonthNamePipe } from './shared/pipes/change-to-month-name.pipe';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NextViewingComponent,
    MainCalendarComponent,
    ChangeToMonthNamePipe,
    AppointmentModalComponent,
    NodesToArrayPipe,

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
    MatDialogModule,
    ImageModule,
    AvatarModule,
    AvatarGroupModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature("data", nodeReducer),
    EffectsModule.forFeature([NodeEffect]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
