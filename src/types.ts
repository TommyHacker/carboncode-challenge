export interface Question {
	question: string;
	answers: Array<string>;
	answer: Boolean;
}
export interface Quiz {
	title: string;
	id: number;
	questions: Array<Question>;
}

export interface QueryQuiz {
	data: Quiz;
}
