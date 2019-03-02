import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme as themeStore, ReduxState } from '../../store';

import AllHeroes from './Heroes/AllHeroes';
import ShowHero from './Heroes/ShowHero';

type Props = themeStore.State & RouteComponentProps;

const Heroes: React.FunctionComponent<Props> = ({theme, match}) => {
	console.log('Heroes match', match);
	return <ThemeProvider theme={themeStore.themes[theme]}>
		<Switch>
			<Route exact path={match.path} component={AllHeroes} />
			<Route path={match.path + '/:hero'} component={ShowHero} />
		</Switch>
	</ThemeProvider>}

export default connect(({theme}: ReduxState) => ({theme: theme.theme}))(Heroes);