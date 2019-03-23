import React from 'react'
import styled, { ThemeProps } from 'styled-components';
import { darken } from 'polished'
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import { ReduxState, heroes, theme } from '../../../store';
import { Pulser, FaIcon } from '../../custom/Elements';

type PropsFromState = heroes.State;
	
type PropsFromDispatch = {
	fetchData: () => void;
}

type Props = {hero: string} & PropsFromState & PropsFromDispatch & RouteComponentProps<{hero: string}>;

class ShowHero extends React.Component<Props> {
	public componentDidMount() {
		const { data } = this.props
	
		if (!data || data.length === 0) {
		  this.props.fetchData();
		}
	}
	
	public render() {
		console.log('ShowHero props', this.props);
		const { data, loading, match } = this.props
		const selected = data.find(item => item.localized_name === match.params.hero);
		
		return <Container>
			<Link to='/heroes'>
				<Backward><FaIcon icon='arrow-circle-left' size='2x' /><span>Back to list</span></Backward>
			</Link>
			{selected && <HeroInfobox>
				<HeroInfoboxBlurBackground src={heroes.api + selected.img}/>
				<HeroInfoboxInner>
					<HeroInfoboxImage>
						{loading ? <Pulser size='3x' /> : <img src={heroes.api + selected.img} alt={selected.localized_name} />}
					</HeroInfoboxImage>
					<HeroInfoboxHeading>
                    	<HeroName>{selected.localized_name}</HeroName>
                    	<HeroDetails>
                      	{selected.attack_type} - <span>{selected.roles.join(', ')}</span>
                    	</HeroDetails>
                  	</HeroInfoboxHeading>
					<HeroStats>
						<HeroStatsInner>
							<StatAttribute attr="str" isPrimaryAttr={selected.primary_attr === 'str'}>
								<Bullet attr="str" /> {selected.base_str || 0} + {selected.str_gain || 0}
							</StatAttribute>
							<StatAttribute attr="agi" isPrimaryAttr={selected.primary_attr === 'agi'}>
								<Bullet attr="agi" /> {selected.base_agi || 0} + {selected.agi_gain || 0}
							</StatAttribute>
							<StatAttribute attr="int" isPrimaryAttr={selected.primary_attr === 'int'}>
								<Bullet attr="int" /> {selected.base_int || 0} + {selected.int_gain || 0}
							</StatAttribute>
						</HeroStatsInner>
                  	</HeroStats>
				</HeroInfoboxInner>
			</HeroInfobox>}
		</Container>;
	}
}

function mapStateToProps({heroes}: ReduxState) {
	return {
		loading: heroes.loading,
		data: heroes.data,
	}
}

export default connect(mapStateToProps, heroes.dispatcher)(ShowHero);

// ================== styled elements =====================

const Backward = styled('div')`
	display: flex;
	margin-bottom: 5px;
	svg {margin-right: 1rem;}
	span {font-size: 1.4rem;}
	&:hover {cursor: pointer;}
`;

const HeroInfobox = styled('div')`
	position: relative;
	background: rgba(0, 0, 0, 0.9);
	overflow: hidden;
	border-radius: 8px;
	color: ${props => darken(0.25, props.theme.colors.white)};
`;

const HeroInfoboxBlurBackground = styled('img')`
	position: absolute;
	top: -12.5%;
	left: -12.5%;
	width: 125%;
	height: 125%;
	filter: blur(25px);
	object-fit: cover;
	opacity: 0.35;
	background-repeat: no-repeat;
	z-index: 1;
`;

const HeroInfoboxInner = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	padding: 3rem;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 125px inset;
	z-index: 2;

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		flex-direction: row;
	}
`;

const HeroInfoboxImage = styled('div')`
	display: flex;
	justify-content: center;
	svg {
		margin: auto 0;
	}
	flex-shrink: 0;
	width: 256px;
	height: 144px;
	overflow: hidden;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 32px;
	object-fit: cover;
	border-radius: 16px;
	border: 1px solid rgba(0, 0, 0, 0.3);
`;

const HeroInfoboxHeading = styled('div')`
	flex: 1 1 100%;
	margin: 1.5rem 0 0;
	text-align: center;

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		margin: 0 1.5rem;
		text-align: left;
	}
`;

const HeroName = styled('h1')`
	margin: 0;
	color: ${props => props.theme.colors.white};
	font-weight: 500;
`;

const HeroDetails = styled('p')`
	margin: 0.5rem 0 0;
	color: ${props => props.theme.colors.white};
	font-size: 0.8rem;
	letter-spacing: 1px;
	text-transform: uppercase;

	& span {
		color: ${props => darken(0.25, props.theme.colors.white)};
	}
`;

const HeroStats = styled('div')`
	display: block;
	max-width: 340px;
	margin: 1.5rem 0 0;
	background: rgba(0, 0, 0, 0.45);
	border-radius: 8px;
	padding: 12px;

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		margin: 0;
		flex: 1 0 340px;
	}
`;

const HeroStatsInner = styled('div')`
  display: flex;
`

type StatAttributeProps = {
  attr: 'str' | 'agi' | 'int'
  isPrimaryAttr?: boolean
} & ThemeProps<theme.Theme>;

const StatAttribute = styled('div')`
  display: flex;
  align-items: center;
  flex: 1 1 0;
  padding: 0 1rem;
  font-size: 0.8rem;
  color: ${(props: StatAttributeProps) =>
    props.isPrimaryAttr && props.theme.colors.attrs[props.attr]};
`

type BulletProps = {
  attr: 'str' | 'agi' | 'int'
} & ThemeProps<theme.Theme>;

const Bullet = styled('div')`
  flex-shrink: 0;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${({attr, theme}: BulletProps) => theme.colors.attrs[attr]};
`;