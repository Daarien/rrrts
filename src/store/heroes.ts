import { Action, LoadedAction, Dispatch, GetState, Reducer } from './';
import { getFetch } from '../utils/api';

const types = {
	FETCH_REQUEST: 'FETCH_REQUEST',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FETCH_ERROR: 'FETCH_ERROR',
	SELECT_HERO: 'SELECT_HERO',
	SELECTED: 'SELECTED',
	CLEAR_DATA: 'CLEAR_DATA'
}

type ApiResponse = Record<string, any>;

export interface Hero extends ApiResponse {
	id: number;
	name: string;
	localized_name: string;
	primary_attr: string;
	attack_type: string;
	roles: string[];
	img: string;
	icon: string;
	legs: number;
}

// action creators
const actions = {
	setLoading: (): Action => ({type: types.FETCH_REQUEST}),
	setHeroesData: (data: Hero[]): LoadedAction => ({
		type: types.FETCH_SUCCESS,
		data: data,
		time: Date.now()
	}),
	setError: (error: string): LoadedAction => ({type: types.FETCH_ERROR, error: error}),
	clearData: (): Action => ({type: types.CLEAR_DATA})
}

export const api = 'https://api.opendota.com';
const path = '/api/heroStats';

export const dispatcher = {
	fetchData: () => async (dispatch: Dispatch, getState: GetState) => {
		const { heroes } = getState();
		const timePassed = Date.now() - heroes.time;
		if (heroes.data.length && timePassed < 5*60*1000) {
			console.log('timePassed seconds', timePassed / 1000);
			return;
		}
		dispatch(actions.setLoading());
		const data = await getFetch(api + path);
		
		if (Array.isArray(data)) {
			dispatch(actions.setHeroesData(data));
		}
		else {
			dispatch(actions.setError('Invalid heroes.fetchData() response type!'));
		}
	},
	clearData: () => (actions.setLoading())
}

export type State = {
	readonly loading: boolean;
	readonly data: Hero[];
	readonly time: number;
	readonly error: string;
}

const initialState: State = {
	loading: false,
	data: [],
	time: 0,
	error: ''
}
  
export const reducer: Reducer<State, LoadedAction> = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_REQUEST:
			return { ...state, loading: true };

		case types.FETCH_SUCCESS:
			return { ...state, loading: false, data: action.data, time: action.time };

		case types.FETCH_ERROR:
			return { ...state, loading: false, error: action.error };

		case types.CLEAR_DATA:
			return initialState;

		default:
			return state;
	}
}