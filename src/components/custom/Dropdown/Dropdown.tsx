import React, { EventHandler, MouseEvent } from 'react';
import classnames from 'classnames';
import { SimpleButton } from '../Buttons';
import './style.scss';

interface IDropdown extends React.Attributes {
	as?: string | React.FunctionComponent<any>;
}

interface IDropdownControl extends IDropdown {
	toggle: () => void;
	menu: React.MutableRefObject<Element>;
}

export function Dropdown(props: IDropdown) {
	const { children, as: tag, className, ...other } = props;
	const Wrapper = tag ? tag : 'div';
	const menu = React.useRef<Element>();

	const toggle: EventHandler<MouseEvent> = (event) => {
		event.stopPropagation();
		event.preventDefault();
		const isOpen = menu.current!.classList.contains('show');
		if (isOpen) hide();
		else show();
	}

	const show = () => {
		document.dispatchEvent(new Event('click', { "bubbles": true, "cancelable": false }));
		menu.current!.style!.display = 'block';
		setTimeout(() => {
			menu.current!.classList.add('show');
		}, 0);
		window.addEventListener('click', outsideClickListener);
	}

	const hide = () => {
		window.removeEventListener('click', outsideClickListener);
		if (menu.current) {
			menu.current.classList.remove('show');
			setTimeout(() => {
				menu.current!.style!.display = 'none';
			}, 300);
		}
	}

	const outsideClickListener = () => hide();

	return <Wrapper className={classnames('r-dropdown', { [className!]: className })} {...other} >
		{React.Children.map(children, (child: any) => React.cloneElement(child, { toggle, menu }))}
	</Wrapper>;
}

Dropdown.Toggle = (props: IDropdownControl) => {
	const { className, as: tag, toggle, menu, ...other } = props;
	const Toggler = tag ? tag : (attrs: any) => <SimpleButton {...attrs} />;

	return <Toggler
		className={classnames('r-dropdown-toggle', { [className!]: className })}
		onClick={toggle}
		{...other}
	/>;
}

Dropdown.Menu = (props: IDropdownControl) => {
	const { children, className, as: tag, toggle, menu, ...other } = props;
	const Menu = tag ? tag : 'div';

	return <Menu className={classnames('r-dropdown-menu', { [className!]: className })} ref={menu} {...other}>{children}</Menu>;
}

Dropdown.Item = (props: IDropdown) => {
	const { as: tag, className, ...other } = props;
	const Tag = tag ? tag : 'div';
	return <Tag className={classnames('r-dropdown-item', { [className!]: className })} {...other} />;
}