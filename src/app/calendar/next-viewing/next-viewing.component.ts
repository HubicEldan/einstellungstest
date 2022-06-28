import { Component, Input, OnInit } from '@angular/core';
import { subHours } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-next-viewing',
  templateUrl: './next-viewing.component.html',
  styleUrls: ['./next-viewing.component.scss']
})
export class NextViewingComponent implements OnInit {

  constructor() { }
  @Input() nextViews: INode[] = [];
  ngOnInit(): void {

  }

  subtractHours(date: string | undefined, numOfHours: number) {
    return subHours(new Date(date!), numOfHours);
  }
}
