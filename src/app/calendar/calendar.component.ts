import { Component, OnInit } from '@angular/core';
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
  arr: INode[] = []
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


  selectedCity: any;

  ngOnInit(): void {
    console.log(this.selectedDate);

    this.dataService.getJsonData().subscribe({
      next: (response) => {
        this.nodes = response.data.appointments.nodes;
        this.nodes = this.nodes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


        for (let i = 0; i < this.nodes.length; i++) {
          console.log(getHours(subHours(new Date(this.nodes[i].date), 2)));

          if (getHours(subHours(new Date(this.nodes[i].date), 2)) > getHours(this.selectedDate) || getDay(subHours(new Date(this.nodes[i].date), 2)) > getDay(this.selectedDate)) {
            this.nextViewing.push(this.nodes[i]);
          } else {
            
          }
        }





        // for (let i = 0; i < this.nodes.length; i++) {
        //   for (let k = i + 1; k < this.nodes.length; k++) {
        //     if ((format(new Date(this.nodes[i].date), 'dd.MM.yyyy') === format(new Date(this.nodes[k].date), 'dd.MM.yyyy'))) {
        //       this.sameDayAppointments.push(this.nodes[k])
        //     }
        //     if ((format(new Date(this.nodes[i].date), 'dd.MM.yyyy') === format(new Date(this.nodes[k].date), 'dd.MM.yyyy')) && (format(new Date(this.nodes[i].date), 'HH:mm') === format(new Date(this.nodes[k].date), 'HH:mm'))) {
        //       this.sameDaySameHourAppointments.push(this.nodes[k])
        //     }
        //   }
        // }




        // for (let i = 0; i < this.nodes.length; i++) {
        //   this.arr.push(this.nodes.slice(i));
        //   console.log(this.arr);

        // }

      },
      error: () => {
        console.error('Something went wrong!');
      },
      complete: () => {
        console.log('Data recieved successfully');
      }
    });





    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
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
