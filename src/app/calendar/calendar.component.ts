import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addDays, addMonths, getDay, getHours, getMonth, getWeek, getYear, lastDayOfWeek, subDays, subHours } from 'date-fns';
import { INode } from '../shared/models/INode';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private dataService: DataService) { }
  nodes: INode[] = [];
  cities: any[] = [];
  nextViewing: INode[] = [];
  
  // emptyNode: INode = {
  //   id: '',
  //   date: '',
  //   maxInviteeCount: 0,
  //   attendeeCount: 0,
  //   showContactInformation: false,
  //   contact: {
  //     firstName: '',
  //     name: '',
  //     email: '',
  //     mobile: '',
  //     phone: '',
  //     address: {},
  //     fullName: ''
  //   },
  //   property: {
  //     id: "",
  //     name: "",
  //     inviteeCount: 0,
  //     address: {
  //       street: "",
  //       houseNumber: "",
  //       city: "",
  //       country: "",
  //       zipCode: "",
  //       __typename: ""
  //     },
  //     attachements: [],
  //     user: {
  //       profile: {
  //         firstname: '',
  //         name: '',
  //         phone: '',
  //         gender: '',
  //         title: ''
  //       },
  //       usertype: '',
  //       __typename: ''
  //     },
  //     __typename: '',
  //   },
  //   __typename: ''
  // }
  //selected
  selectedDate: Date = new Date();


  selectedDropdownItem: any;

  ngOnInit(): void {
  
    

    this.dataService.getJsonData().subscribe({
      next: (response) => {
        this.nodes = response.data.appointments.nodes;
        this.nodes = this.nodes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


        for (let i = 0; i < this.nodes.length; i++) {
          if (getDay(subHours(new Date(this.nodes[i].date), 2)) > getDay(this.selectedDate)) {
            this.nextViewing.push(this.nodes[i]);
          } else if ((getHours(subHours(new Date(this.nodes[i].date), 2)) > getHours(this.selectedDate))) {
            this.nextViewing.push(this.nodes[i]);
          } else {

          }
        }

      },
      error: () => {
        console.error('Something went wrong!');
      },
      complete: () => {
        console.log('Data recieved successfully');
      }
    });





    this.cities = [
      { name: 'Dropdown item 1', code: 'NY' },
      { name: 'Dropdown item 1', code: 'RM' },
      { name: 'Dropdown item 1', code: 'LDN' },
      { name: 'Dropdown item 1', code: 'IST' },
      { name: 'Dropdown item 1', code: 'PRS' }
    ];




  }



  getNextViewing(newItem: INode[]) {
    this.nextViewing = newItem;
  }

  onMonthChange() {
    // this.selectedDate = addMonths(this.selectedDate, 1);
  }


  next(isNextClicked: boolean) {
    if (isNextClicked) {
      this.selectedDate = addDays(this.selectedDate, 6);

    }
  }

  previous(isPreviousClicked: boolean) {
    if (isPreviousClicked) {
      this.selectedDate = subDays(this.selectedDate, 6);
    }
  }


}
