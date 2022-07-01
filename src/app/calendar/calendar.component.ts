import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addDays, compareAsc, subDays } from 'date-fns';
import { INode } from '../shared/models/INode';
import { Subscription } from 'rxjs';
import * as nodeActions from './state/node.actions';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  constructor(private store: Store<any>) { }
  
  nodes: INode[] = [];
  nextViews: INode[] = [];
  uniqueNodes: INode[] = [];
  options: any[] = [];
  selectedDate: Date = new Date();
  today: Date = new Date();
  selectedDropdownItem: any;
  storeSubscription!: Subscription;

  ngOnInit(): void {
    //get data from store
    this.store.dispatch(new nodeActions.LoadNodes());
    this.storeSubscription = this.store.subscribe(state => state?.data?.data?.appointments && this.initNodes(state.data.data.appointments.nodes));
    this.options = [
      { name: 'Dropdown item 1', code: 'NY' },
      { name: 'Dropdown item 1', code: 'RM' },
      { name: 'Dropdown item 1', code: 'LDN' },
      { name: 'Dropdown item 1', code: 'IST' },
      { name: 'Dropdown item 1', code: 'PRS' }
    ];
  }

  initNodes(nodes: INode[]): void {
    this.nodes = nodes;
    let nodesForSort = [...this.nodes];
    //sort appointments
    this.nodes = nodesForSort.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i]?.date !== this.nodes[i + 1]?.date && this.nodes[i]?.property !== this.nodes[i + 1]?.property) {
        this.uniqueNodes.push(this.nodes[i]);
      }
    }
    this.onDayChange();
  }

  //depending on todays date and manual day change, next view changes
  onDayChange(): void {
    this.nextViews = [];
    for (let i = 0; i < this.uniqueNodes.length; i++) {
      if (compareAsc(this.selectedDate, new Date(this.uniqueNodes[i].date)) === -1) {
        this.nextViews.push(this.uniqueNodes[i]);
      }
    }
  }


  //month change
  onMonthChange() {
    this.nextViews.push(this.uniqueNodes[this.uniqueNodes.length-1]);
  }

  //next week change
  next(isNextClicked: boolean): void {
    if (isNextClicked) {
      this.selectedDate = addDays(this.selectedDate, 6);
    }
  }

  //previous week change
  previous(isPreviousClicked: boolean): void {
    if (isPreviousClicked) {
      this.selectedDate = subDays(this.selectedDate, 6);
    }
  }


  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }


}
