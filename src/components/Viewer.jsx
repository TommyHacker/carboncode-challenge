import { useState } from 'react';
const Viewer = ({ title, questions }) => {
	return (
		<>
			<h4>Quiz Title: {title}</h4>
			{questions.map((question, index) => {
				return (
					<div key={index}>
						<h5>
							Question {index + 1}. {question.question}
						</h5>
						{question.answers.map((answer, index) => {
							return (
								<div key={index}>
									<h6>
										{index + 1}: {answer.answer}
									</h6>
								</div>
							);
						})}
					</div>
				);
			})}
		</>
	);
};

export default Viewer;
