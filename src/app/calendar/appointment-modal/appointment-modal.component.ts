import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addHours, format, subHours } from 'date-fns';

import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { node: INode, nodes: INode[], date: Date }) { }

  index!: number;
  isLeftArrowVisible = true;
  isRightArrowVisible = true;


  ngOnInit(): void {
    this.index = this.data.nodes.indexOf(this.data.node);
    if ((this.data.nodes.length - this.index) === 2) {
      this.index = this.data.nodes.length - 1;
    }
    const nodesForSort = [...this.data.nodes];
    this.data.nodes = nodesForSort.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (format(new Date(this.data.node?.date), "dd.MM.yyyy") === format(new Date(this.data.nodes[this.data.nodes.length - 1]?.date), "dd.MM.yyyy")) {
      this.isRightArrowVisible = false;
    } else {
      this.isRightArrowVisible = true;
    }
    if (this.data.node?.id === this.data.nodes[0]?.id) {
      this.isLeftArrowVisible = false;
    } else {
      this.isLeftArrowVisible = true;
    }
  }


  //switch to incoming appointment
  nextApp() {
    for (let i = 0; i < this.data.nodes.length; i++) {
      if ((format(new Date(this.data.node?.date), 'dd.MM.yyyy') === format(new Date(this.data.nodes[i]?.date), 'dd.MM.yyyy'))) {
        if (this.index === this.data.nodes.length - 2) {
          this.isRightArrowVisible = false;
          this.isLeftArrowVisible = true;
        } else {
          this.isRightArrowVisible = true;
          this.isLeftArrowVisible = true;
        }
      }
    }
    this.data.node = this.data.nodes[this.index + 1];
    this.index = this.index + 1;
  }


  //switch to previous appointment
  previousApp() {
    for (let i = 0; i < this.data.nodes.length; i++) {
      if (format(new Date(this.data.node?.date), 'dd.MM.yyyy') === format(new Date(this.data.nodes[i]?.date), 'dd.MM.yyyy')) {
        if (this.index === 1) {
          this.isRightArrowVisible = true;
          this.isLeftArrowVisible = false;
        } else {
          this.isRightArrowVisible = true;
          this.isLeftArrowVisible = true;
        }
      }
    }
    this.data.node = this.data.nodes[this.index - 1];
    this.index = this.index - 1;
  }

  subtractHours(date: string, numOfHours: number): Date {
    return subHours(new Date(date), numOfHours);
  }

  addHours(date: string, hours: number): string {
    return addHours(new Date(date), hours).toString();
  }
}
