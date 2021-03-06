/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((data: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return new nodeActions.LoadNodesSuccess(data.data);
        }),
        catchError((err: string) => of(new nodeActions.LoadNodesFail(err)))
      )))
}
