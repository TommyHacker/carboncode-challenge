import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
// this is the interface for the quiz object
import { Quiz } from '../types';
import Link from 'next/link';

const HomePage = ({ quizs }: { quizs: Quiz[] }) => {
	const router = useRouter();
	const [currentQuizs, setCurrentQuizs] = useState<Quiz[]>([]);

	// get latest quizs from database
	const getQuizs = useQuery<Quiz[]>(
		['quizs'],
		() =>
			fetch('/api/quiz', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => data.data),
		{
			onSuccess: (data) => {
				setCurrentQuizs(data);
			},
			// this is true by default, but i thought it would be useful to note what the intentions were
			refetchOnWindowFocus: true,
			refetchInterval: 60000,
			initialData: quizs,
		}
	);

	// redirect when the user clicks on a quiz title
	const handleRedirect = (id: number) => {
		router.push(`/quiz/${id}`);
	};

	// if useQuery is in error or loading, indicate this to the user
	if (getQuizs.isError)
		return <p>Error while populating quiz's. Please try again later.</p>;
	if (getQuizs.isLoading) return <p>Loading Quiz list...</p>;

	return (
		<>
			<div className='grid xl:grid-cols-2 sm:grid-cols-1 xl:p-20 sm:p-2 gap-20'>
				{/* userQuery fetch has completed, we have the data to map through */}
				{currentQuizs.length < 1 && (
					<span className='text-center p-20 border-slate-300 rounded-md shadow-md border-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
						There are currently no quiz's to display. Please do {'  '}
						<Link className='underline' href='/create'>
							{' '}
							Create One
						</Link>
					</span>
				)}
				{getQuizs.isSuccess &&
					currentQuizs.map((quiz, index) => {
						return (
							// using a div to wrap the quiz title and play button here to make it simpler to style
							<div
								className='quiz-card shadow-md border-slate-200 rounded-md border-2 flex justify-between flex-row gap-y-4 p-4'
								key={index}>
								<h4 className='text-xl'>{quiz.title}</h4>
								{/* redirect to chosen quiz */}
								<div className='start-btn-container '>
									<button
										className='ml-auto mr-auto w-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
										onClick={() => handleRedirect(quiz.id)}>
										Play
									</button>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
};

// fetch quizs from database on server side before rendering the page
export const getStaticProps = async () => {
	const url = process.env.NEXT_LOCAL_BASE_URL + '/api/quiz';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.json();
	// quizs is the name of the prop that is passed to the functional component
	const quizs = data.data;
	return {
		props: {
			quizs,
		},
	};
};

export default HomePage;
