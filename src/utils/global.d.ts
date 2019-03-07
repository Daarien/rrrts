import { ReactNode, RefObject, CSSProperties } from 'react';
// export { }

declare global {
	type TObj = Record<string, any>;

	namespace React {
		interface Attributes {
			className?: string;
			children?: ReactNode;
			ref?: RefObject<Element>;
		}
	}

	interface Element {
		style?: CSSProperties;
	}
}