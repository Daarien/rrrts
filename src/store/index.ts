import thunk from 'redux-thunk';
import { StateType } from 'typesafe-actions';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import * as counter from './counter';
import * as heroes from './heroes';
import * as theme from './theme';

export {
  counter,
  heroes,
  theme
}

const reducers = {
  counter: counter.reducer,
  heroes: heroes.reducer,
  theme: theme.reducer,
}

export function configureStore() {
  return createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
  );
}

export type ReduxState = StateType<typeof reducers>;

export type ActionType<T extends Record<string, string>> = keyof T;

export type Action = {
	type: string;
}

// Allows any extra properties to be defined in an action.
export type LoadedAction = Action & Record<string, any>;
	
export interface Dispatch<A extends Action = LoadedAction> {
	(action: A): void
}

export interface GetState {
  (): ReduxState;
}

/**
 * @template S The type of state consumed and produced by this reducer.
 * @template A The type of actions the reducer can potentially respond to.
 */
export type Reducer<S = TObj, A extends Action = LoadedAction> = (
	state: S | undefined,
	action: A
) => S;

export function action(type: string): Action;
export function action(type: string, payload: any): LoadedAction;
export function action(type: string, payload?: any) {
  if (!payload)
    return {type: type};
  else
    return {type: type, payload: payload};
}