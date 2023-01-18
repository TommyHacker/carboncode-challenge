import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prismaClient';
const createQuiz = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { title, questions } = req.body;
		const quiz = await prisma.quiz.create({
			data: {
				title: title,
				questions: {
					create: [questions[0], questions[1], questions[2]],
				},
			},
		});
		res
			.status(200)
			.json({ success: true, message: 'quiz created.', data: quiz });
	} catch (error) {
		res.json({ success: false, message: 'quiz not created.', data: error });
	}
};
export default createQuiz;
