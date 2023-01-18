import Navigation from './Navigation';
import Head from 'next/head';
const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<>
			<Navigation />
			<div className='page-container pt-40'>{children}</div>
		</>
	);
};

export default Layout;
