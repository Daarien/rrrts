import { action } from 'typesafe-actions';
import { ActionType, Reducer } from './';

const types = {
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT',
	RESET: 'RESET'
}

type Action = {
	type: ActionType<typeof types>;
	n?: number;
};

export const dispatcher = {
	increment: (n?: number) => ({type: types.INCREMENT, n}),
	decrement: (n?: number) => action(types.DECREMENT, n),
	reset: () => action(types.RESET)
}

export type State = {
	readonly count: number;
}

const initialState: State = {
	count: 0
};

export const reducer: Reducer<State, Action> = (state = initialState, action): State => {
	const i = action.n ? action.n : 1;
	
	if (action.type === types.INCREMENT)
		return {count: state.count + i};

	if (action.type === types.DECREMENT)
		return {count: state.count - i};

	if (action.type === types.RESET)
		return initialState;
		
	return state;
}