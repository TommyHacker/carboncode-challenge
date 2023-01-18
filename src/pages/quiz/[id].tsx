import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Quiz, Question } from '../../types';
import Choice from '../../components/Choice';
import { useState, useEffect } from 'react';
const QuizPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [score, setScore] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [guessCount, setGuessCount] = useState(0);

	useEffect(() => {
		if (guessCount === 3) setCompleted(true);
	}, [guessCount]);

	const currentQuiz = useQuery<Quiz>(
		['quiz', id],
		() =>
			fetch(`/api/quiz/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data.data);
					return data.data;
				}),
		{
			refetchOnWindowFocus: false,
		}
	);

	if (currentQuiz.isLoading) return <p>Loading...</p>;
	if (currentQuiz.isError) return <p>Error</p>;

	return (
		<div>
			{currentQuiz && (
				<>
					<h2 className='text-4xl text-center p-10'>
						Quiz {currentQuiz.data.title}
					</h2>
					<p className='text-2xl text-center p-10 fixed top-20 left-20'>
						{/* 3 out of 3 choices have been made, show final score */}
						{completed ? 'Final Score ' : 'Current Score: '} {score} / 3
					</p>

					{completed && (
						<div className='flex justify-center'>
							<button
								className='ml-auto mr-auto w-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
								onClick={() => router.replace('/')}>
								Back
							</button>
						</div>
					)}

					<div className='questions-container flex flex-col justify-between align-center ml-auto mr-auto sm:w-4/5  2xl:w-4/12'>
						{!completed &&
							currentQuiz.data.questions.map(
								(question: Question, index: any) => {
									return (
										<Choice
											index={index}
											question={question}
											currentQuiz={currentQuiz}
											setScore={setScore}
											setCompleted={setCompleted}
											setGuessCount={setGuessCount}
										/>
									);
								}
							)}
					</div>
				</>
			)}
		</div>
	);
};

export default QuizPage;
