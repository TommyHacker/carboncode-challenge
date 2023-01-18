import { useState, useEffect } from 'react';

const QuestionInput: React.FC<{
	setQuestions: React.Dispatch<React.SetStateAction<any>>;
	i: number;
}> = ({ setQuestions, i }) => {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState(false);
	// update the questions state for [{ question : "string", answer : Boolean }]

	const handleTrue = (e: any) => {
		setAnswer(true);
	};

	const handleFalse = (e: any) => {
		setAnswer(false);
	};

	// update the questions state for [{ question : "string", answer : Boolean }]
	useEffect(() => {
		setQuestions((questions: any) => {
			const newQuestions = [...questions];
			newQuestions[i] = { question, answer };
			return newQuestions;
		});
	}, [question, answer]);

	return (
		<div className='p-2'>
			<label
				className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 p-4 pl-0'
				htmlFor={`question-${i}`}>
				Question {i + 1}.
			</label>
			<input
				className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
				type='text'
				placeholder='Question'
				name='question'
				id={`question-${i}`}
				onChange={(e) => setQuestion(e.target.value)}
			/>
			<label
				htmlFor={`answers-${i}`}
				className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 p-4 pl-0'>
				Answer
			</label>
			<div className={`p-4 border-2 rounded-sm flex flex-row justify-evenly`}>
				<div className='checkbox-container m-4 w-14 flex flex-row justify-between'>
					<label htmlFor={`true-${i}`}>Yes</label>
					<input
						type='checkbox'
						name='true'
						id={`true-${i}`}
						onChange={handleTrue}
						checked={answer}
					/>
				</div>
				<div className='checkbox-container m-4 w-14 flex flex-row justify-between'>
					<label htmlFor={`false-${i}`}>No</label>
					<input
						type='checkbox'
						name='false'
						id={`false-${i}`}
						onChange={handleFalse}
						checked={!answer}
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionInput;
