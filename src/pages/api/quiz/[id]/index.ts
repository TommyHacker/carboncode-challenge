import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../utils/prismaClient';
const getOne = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { id } = req.query;
		const quiz = await prisma.quiz.findUnique({
			where: { id: id as string },
			include: { questions: true },
		});
		res
			.status(200)
			.json({ success: true, message: 'quiz fetched.', data: quiz });
	} catch (error) {
		res.json({ success: false, message: 'quiz not fetched.', data: error });
	}
};

export default getOne;
