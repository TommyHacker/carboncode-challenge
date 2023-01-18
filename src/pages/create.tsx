import { useState } from 'react';
import QuestionInputs from '../components/QuestionInput';
import { useRouter } from 'next/router';

const Create = () => {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [questions, setQuestions] = useState([{}, {}, {}]);

	// using useQuery to make use of isLoading, error rather than useState on form submission

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/quiz/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title, questions }),
			});
			const data = await response;
			if (data.status !== 200) {
				throw new Error('error creating quiz');
			} else {
				router.push('/');
			}
		} catch (error) {
			throw new Error('error creating quiz');
		}
	};
	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<form onSubmit={handleSubmit} className='w-full max-w-sm'>
				<div className='md:flex md:items-center mb-6'>
					<div className='md:w-1/3'>
						<label
							className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0'
							htmlFor='title'>
							Quiz Title
						</label>
					</div>
					<div className='md:w-2/3'>
						<input
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
							type='text'
							placeholder='Quiz Title'
							name='title'
							id='title'
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				{questions.map((question, index) => (
					<QuestionInputs key={index} i={index} setQuestions={setQuestions} />
				))}
				<div className='flex justify-center'>
					<input
						type='submit'
						value='Submit'
						className='ml-auto mr-auto w-20 my-20 cursor-pointer bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
					/>
				</div>
			</form>
		</div>
	);
};

export default Create;
