import '../styles/globals.css';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Quizzardry</title>
					<meta
						name='viewport'
						content='initial-scale=1.0, width=device-width'
					/>
					<link rel='icon' type='image/x-icon' href='/favicon.ico' />
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</QueryClientProvider>
		</div>
	);
};

export default MyApp;
