export { SimpleButton } from './SimpleButton';

export interface IButton {
	className: string;
	type: string;
	variant?:
	| "primary"
	| "secondary"
	| "info"
	| "search"
	| "outline-primary"
	| "outline-secondary";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
}