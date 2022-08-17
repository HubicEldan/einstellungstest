import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators'
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { DataService } from "src/app/shared/services/data.service";

import * as nodeActions from './node.actions'

@Injectable()

export class NodeEffect {
  constructor(private actions$: Actions, private dataService: DataService) {

  }

  @Effect()
  loadNodes$: Observable<Action> = this.actions$.pipe(ofType<nodeActions.LoadNodes>(
    nodeActions.INodeActionTypes.LOAD_NODES
  ),
    mergeMap(() =>
      this.dataService.getJsonData().pipe(
        map((data: any) => {
          return new nodeActions.LoadNodesSuccess(data.data.appointments.nodes);
        }),
        catchError((err: string) => of(new nodeActions.LoadNodesFail(err)))
      )))
}
