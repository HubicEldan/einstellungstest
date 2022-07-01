import { Component, Input } from '@angular/core';
import { subHours } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-next-viewing',
  templateUrl: './next-viewing.component.html',
  styleUrls: ['./next-viewing.component.scss']
})
export class NextViewingComponent{
  @Input() nextViews: INode[] = [];

  subtractHours(date: string, numOfHours: number) {
    return subHours(new Date(date), numOfHours);
  }
}
