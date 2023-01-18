import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prismaClient';
const quizGet = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const quizzes = await prisma.quiz.findMany({
			include: { questions: true },
		});
		res
			.status(200)
			.json({ success: true, message: 'quizzes fetched.', data: quizzes });
	} catch (error) {
		res.json({ success: false, message: 'quizzes not fetched.', data: error });
	}
};

export default quizGet;
