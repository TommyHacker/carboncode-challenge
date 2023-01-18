import '../styles/globals.css';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const MyApp = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</QueryClientProvider>
		</div>
	);
};

export default MyApp;
