import { Question, QueryQuiz } from '../types';
import { useState } from 'react';
const Choice = ({
	index,
	question,
	currentQuiz,
	setScore,
	setCompleted,
	setGuessCount,
}: {
	index: any;
	question: Question;
	// QueryQuiz is the interface representing the result of fetching the quiz through useQuery
	currentQuiz: QueryQuiz;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
	setGuessCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
	// to see whether the user guessed the answer
	const [choiceMade, setChoiceMade] = useState(false);
	const [correctGuess, setCorrectGuess] = useState(false);

	const choiceHandler = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: string,
		choice: Boolean
	) => {
		// filter out this specific question and answer from the array of questions
		setGuessCount((prevCount) => prevCount + 1);
		currentQuiz.data.questions.map((q: Question, i: any) => {
			if (i !== index) return;
			// check if the users answer is correct
			if (q.answer === choice) {
				setCorrectGuess(true);
				setScore((prevScore) => prevScore + 1);
			} else {
				setCorrectGuess(false);
			}
		});
		setChoiceMade(true);
	};
	return (
		<div
			className={`p-4 my-8 rounded-md shadow-sm shadow-slate-500 ${
				choiceMade && 'opacity-50 cursor-default'
			}`}>
			<p className='text-xl font-bold p-10'>
				{`Question ${index + 1}.`} {question.question}
			</p>

			<div className='answers  flex flex-row justify-evenly p-2'>
				{/* if guess was correct, colour button green , wrong colour red */}
				{/* if user makes a guess, disable buttons e.g. !choiceMade */}
				{!choiceMade && (
					<>
						<button
							className='true-btn ml-auto mr-auto w-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
							onClick={(e) => choiceHandler(e, index, true)}
							disabled={choiceMade}>
							True
						</button>
						<button
							className='false-btn ml-auto mr-auto w-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
							onClick={(e) => choiceHandler(e, index, false)}
							disabled={choiceMade}>
							False
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Choice;
