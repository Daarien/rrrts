import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import './style.scss';

export function NFSLoader({ className, ...other }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={classnames('nfs-loader', { [className!]: className })} {...other}>
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
		</div>
	);
}