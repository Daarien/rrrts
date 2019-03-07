import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faCheckSquare, faSpinner, faCalculator, faHome, faCloud, faDownload, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faSpinner, faCalculator, faHome, faCloud, faDownload, faArrowCircleLeft);

export { LoadingCubes } from './LoadingCubes';
export { SimpleButton } from './Buttons';
export { Dropdown } from './Dropdown/Dropdown';
export { DatePickerX } from './datepicker-x';
export { NFSLoader } from './NFSLoader';

type FaIcon = {
	icon: IconProp;
	size?: SizeProp;
}

export function FaIcon({ icon, ...other }: FaIcon) {
	return <FontAwesomeIcon icon={icon} {...other} />
}

type Spinner = {
	size?: SizeProp;
}

export function Spinner(props: Spinner) {
	return <FontAwesomeIcon icon="spinner" spin {...props} />;
}

export function Pulser(props: Spinner) {
	return <FontAwesomeIcon icon="spinner" pulse {...props} />;
}

export function ImgIcon({ item }: { item: string }) {
	return <img src={item} style={{ width: 20, verticalAlign: -4 }} alt='Menu Icon' />;
}

type DataTable = {
	headers: string[];
	children: JSX.Element[];
	dark?: boolean;
}

export function DataTable({ children, headers, ...other }: DataTable) {
	headers = headers ? headers : [];
	return <Table {...other}>
		<thead>
			<tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
		</thead>
		<tbody>
			{children}
		</tbody>
	</Table>;
}

export const LoadingOverlay = styled('div')`
	height: 100%;
	display: flex;
	justify-content: center;
	padding: 15rem 0;
	color: ${props => transparentize(0.25, props.theme.colors.spinner)};
	/* background: ${props => transparentize(0.25, props.theme.colors.background)}; */
`;

export const LoadingOverlayInner = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 200px;
`;