import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { node: INode, appointmentsForDay: INode[], nextNode: INode }) { }
  nextAppointments: INode[] = [];
  hideArrows: boolean = false;
  ngOnInit(): void {
    console.log(this.data);
    for (var i = 0; i < this.data.appointmentsForDay.length - 1; ++i) {

      if (this.data.appointmentsForDay[i + 1]) {
        this.nextAppointments.push(this.data.appointmentsForDay[i])
      }
    }

    console.log(this.nextAppointments);

  }




}
