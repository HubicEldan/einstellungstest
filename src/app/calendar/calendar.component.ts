import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addDays, addMonths, getDay, getHours, getMonth, getWeek, getYear, lastDayOfWeek, subDays, subHours } from 'date-fns';
import { tap } from 'rxjs';
import { IData, INode } from '../shared/models/INode';
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
    //get data from store
    this.store.dispatch(new nodeActions.LoadNodes())
    this.store.subscribe(state => state?.data?.data?.appointments && this.initNodes(state.data.data.appointments.nodes))
    this.options = [
  { name: 'Dropdown item 1', code: 'NY' },
  { name: 'Dropdown item 1', code: 'RM' },
  { name: 'Dropdown item 1', code: 'LDN' },
  { name: 'Dropdown item 1', code: 'IST' },
  { name: 'Dropdown item 1', code: 'PRS' }
];

}


initNodes(nodes: INode[]) {
  this.nodes = nodes;
  let nodesForSort = [...this.nodes];

  //sort appointments
  this.nodes = nodesForSort.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  //next appointment depending on current date
  for (let i = 0; i < this.nodes.length; i++) {
    if ((getHours(subHours(new Date(this.nodes[i].date), 2)) > getHours(this.selectedDate))) {
      this.nextViewing.push(this.nodes[i]);
    } else if (getDay(subHours(new Date(this.nodes[i].date), 2)) > getDay(this.selectedDate)) {
      this.nextViewing.push(this.nodes[i]);
    } else {

    }
  }
}

  onMonthChange() {
    // this.selectedDate = addMonths(this.selectedDate, 1);
  }

  //next week change
  next(isNextClicked: boolean) {
    if (isNextClicked) {
      this.selectedDate = addDays(this.selectedDate, 6);
    }
  }

  //previous week change
  previous(isPreviousClicked: boolean) {
    if (isPreviousClicked) {
      this.selectedDate = subDays(this.selectedDate, 6);
    }
  }


}
