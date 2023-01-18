import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prismaClient';
const quizGet = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('YOU ARE HITTING THE CORRECT ENDPOINT');

	try {
		const quizzes = await prisma.quiz.findMany({
			include: { questions: true },
		});
		console.log({ quizzes });
		res
			.status(200)
			.json({ success: true, message: 'quizzes fetched.', data: quizzes });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'quizzes not fetched.', data: error });
	}
};

export default quizGet;
