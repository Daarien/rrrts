import { action } from 'typesafe-actions';
import { ActionType, Reducer } from './';

export type ThemeColors = 'light' | 'dark';

const types = {
	SET_THEME: 'SET_THEME'
}

type Action = {
	type: ActionType<typeof types>,
	theme: ThemeColors;
}

export const dispatcher = {
	setTheme: (theme: ThemeColors) => action(types.SET_THEME, theme)
}

export type State = {
	readonly theme: ThemeColors;
}

const initialState: State = {
	theme: 'light'
}
  
export const reducer: Reducer<State, Action> = (state = initialState, action) => {
	switch (action.type) {
	  case types.SET_THEME:
		return { ...state, theme: action.theme };

	  default:
		return state;
	}
}

const breakpoints = {
	xs: '0px',
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px'
};

const colors = {
black: '#000000',
gray75: '#2e2e2c',
gray60: '#666666',
gray50: '#7f7f7f',
gray40: '#999999',
gray30: '#b2b2b2',
gray20: '#cccccc',
gray10: '#e5e5e5',
gray5: '#ebebea',
white: '#fefefe',
yellow: '#f3df49',
red: '#eb5558',
green: '#9ee79a'
};

export type Theme = {
	colors: {
		white: string,
		spinner: string,
		background: string,
		attrs: Record<string, string>
	},
	breakpoints: typeof breakpoints
}

export const themes: Record<ThemeColors, Theme> = {
	light: {
		colors: {
			white: colors.white,
			spinner: colors.gray60,
			background: colors.gray5,
			attrs: {
					str: '#f44336',
					agi: '#39d402',
					int: '#01a9f4'
			}
		},
		breakpoints
	},
	dark: {
		colors: {
			white: colors.white,
			spinner: colors.gray10,
			background: colors.gray75,
			attrs: {
					str: '#f44336',
					agi: '#39d402',
					int: '#01a9f4'
			}
		},
		breakpoints
	}
}