import React from 'react';
import classnames from 'classnames';
import { IButton } from './index';

export function SimpleButton({ className, variant, ...other }: IButton) {
	return <button type='button' className={classnames('btn', `btn-${variant}`, { [className!]: className })} {...other} />;
}

SimpleButton.defaultProps = {
	variant: 'primary',
	active: false,
	disabled: false,
	type: 'button'
};