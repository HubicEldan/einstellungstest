import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators'
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { DataService } from "src/app/shared/services/data.service";

import * as nodeActions from './node.actions'
import { INode } from "src/app/shared/models/INode";
@Injectable()

export class NodeEffect {
    constructor(private actions$: Actions, private dataService: DataService) {

    }


    @Effect()
    loadNodes$: Observable<Action> = this.actions$.pipe(ofType<nodeActions.LoadNodes>(
        nodeActions.INodeActionTypes.LOAD_NODES
    ),
        mergeMap((actions: nodeActions.LoadNodes) => this.dataService.getJsonData().pipe(
            map((nodes: INode[]) => new nodeActions.LoadNodesSuccess(nodes)),
            catchError(err => of(new nodeActions.LoadNodesFail(err)))
        )))
}