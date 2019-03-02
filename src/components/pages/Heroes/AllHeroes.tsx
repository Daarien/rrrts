import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReduxState, heroes } from '../../../store';
import { LoadingOverlay, LoadingOverlayInner, DataTable, Pulser } from '../../custom/Elements';
import './style.css';

type PropsFromState = heroes.State;
	
type PropsFromDispatch = {
	fetchData: () => void;
	clearData: () => void;
}

type Props = PropsFromState & PropsFromDispatch;

class AllHeroes extends React.Component<Props> {
	componentDidMount = () => {
		this.props.fetchData();
	}

	componentWillUnmount = () => {
		const { time, clearData } = this.props;
		if ((Date.now() - time) > 5*60*1000)
			clearData();
	}
	
	render() {
		console.log('All Heroes props', this.props);
		const { data, loading } = this.props;
		return <Container>
			<h1>Dota 2 Heroes Stats</h1>
			{loading
			? <LoadingOverlay>
				<Pulser size='5x' />
			</LoadingOverlay>

			: <DataTable dark headers={['ID', 'Hero', 'Name', 'PrimeAttr', 'Attack', 'Roles']}>
				{data && data.map(hero => 
					<tr key={hero.id}>
						<td>{hero.id}</td>
						<td><HeroIcon src={heroes.api + hero.icon} alt={hero.localized_name} /></td>
						<td><HeroName>
								<Link to={`/heroes/${hero.localized_name}`}>{hero.localized_name}</Link>
							</HeroName>
						</td>
						<td>{hero.primary_attr}</td>
						<td>{hero.attack_type}</td>
						<td>
							<HeroRoles>
								{hero.roles.map(role => <span key={role}>{role}</span>)}
							</HeroRoles>
						</td>
					</tr>
				)}
			</DataTable>}				
		</Container>;
	}
}

function mapStateToProps({heroes}: ReduxState) {
	return {
		loading: heroes.loading,
		data: heroes.data,
		time: heroes.time
	}
}

export default connect(mapStateToProps, heroes.dispatcher)(AllHeroes);

// ========= styled elements =========

const HeroIcon = styled('img')`
	width: 32px;
	height: 32px;
`

const HeroName = styled('div')`
	a {
		color: inherit;
		text-decoration: none !important;
	}
`;

const HeroRoles = styled('div')`
	display: inline-block;
	span {
		margin-right: 5px;
	}
`;