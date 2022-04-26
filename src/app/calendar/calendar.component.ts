import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addDays, addMonths, getDay, getHours, getMonth, getWeek, getYear, lastDayOfWeek, subDays, subHours } from 'date-fns';
import { INode } from '../shared/models/INode';
import { DataService } from '../shared/services/data.service';
import * as nodeActions from './state/node.actions'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private store: Store<any>) { }
  nodes: INode[] = [];
  options: any[] = [];
  nextViewing: INode[] = [];


  selectedDate: Date = new Date();


  selectedDropdownItem: any;

  ngOnInit(): void {
    this.store.dispatch(new nodeActions.LoadNodes())
    this.store.subscribe(state => { this.nodes = state.nodes.nodes })
    let nodesForSort = [...this.nodes];
    this.nodes = nodesForSort.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    for (let i = 0; i < this.nodes.length; i++) {
      if ((getHours(subHours(new Date(this.nodes[i].date), 2)) > getHours(this.selectedDate))) {
        this.nextViewing.push(this.nodes[i]);
        
        
        
      } else if (getDay(subHours(new Date(this.nodes[i].date), 2)) > getDay(this.selectedDate)) {
        this.nextViewing.push(this.nodes[i]);
      } else {

      }
    }



    this.options = [
      { name: 'Dropdown item 1', code: 'NY' },
      { name: 'Dropdown item 1', code: 'RM' },
      { name: 'Dropdown item 1', code: 'LDN' },
      { name: 'Dropdown item 1', code: 'IST' },
      { name: 'Dropdown item 1', code: 'PRS' }
    ];



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
