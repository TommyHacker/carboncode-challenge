import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet='utf-8' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};
export default MyDocument;