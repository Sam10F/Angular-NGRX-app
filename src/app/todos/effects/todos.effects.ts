import {catchError, map, mergeMap} from 'rxjs/internal/operators';
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { getAllTodos, getAllTodosError, getAllTodosSuccess } from "../actions";
import { TodosService } from "../services/todo.service";
import { of } from 'rxjs';

@Injectable()
export class TodosEffects {
  
  constructor(
    private actions$: Actions,
    private todosService: TodosService
  ) { }

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTodos),
      mergeMap(() => 
        this.todosService.getAllTodos().pipe(
          map((todos) => getAllTodosSuccess({ todos: todos })),
          catchError((err) => of(getAllTodosError({payload: err})))
        )
      )
    )

  )
}