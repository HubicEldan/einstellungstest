import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addDays, compareAsc, subDays } from 'date-fns';
import { INode } from '../shared/models/INode';
import { Subscription } from 'rxjs';
import * as nodeActions from './state/node.actions';


export interface dropdownItem {
  name: string,
  code: string
}

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
  options: dropdownItem[] = [];
  selectedDate: Date = new Date();
  today: Date = new Date();
  selectedDropdownItem!: dropdownItem;
  storeSubscription!: Subscription;

  ngOnInit(): void {
    //get data from store
    // state?.nodes && this.initNodes(state.data.nodes)
    this.store.dispatch(new nodeActions.LoadNodes());

    this.storeSubscription = this.store.subscribe(state => state?.data.nodes && this.initNodes(state.data.nodes));

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
    const nodesForSort = [...this.nodes];
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
    this.uniqueNodes.forEach(uniqueNode => {
      if (compareAsc(this.selectedDate, new Date(uniqueNode.date)) === -1) {
        this.nextViews.push(uniqueNode);
      }
    });
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
