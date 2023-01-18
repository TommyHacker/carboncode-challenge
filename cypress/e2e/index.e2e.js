const mockQuizs = {
	success: true,
	message: 'got fake quizzs',
	data: [
		{
			id: 1,
			title: 'Quiz 1',
			questions: [
				{
					id: 1,
					question: 'Question 1',
					answer: false,
				},
				{
					id: 2,

					question: 'Question 2',
					answer: false,
				},
				{
					id: 3,
					question: 'Question 3',
					answer: true,
				},
			],
		},
	],
};

describe('e2e', () => {
	beforeEach(() => {
		cy.intercept('GET', 'http://localhost:3000/api/quiz', mockQuizs);
		cy.intercept('GET', 'http://localhost:3000/api/quiz/1', {
			success: true,
			message: 'got fale quiz',
			data: mockQuizs.data[0],
		});
	});

	it('end to end user interactions', () => {
		cy.visit('http://localhost:3000');
		// Check if the title is correct
		cy.title().should('not.be.empty').should('contain', 'Quizzardry');

		// Check if the quiz list is present
		cy.get('.grid').should('be.visible');

		// Check if the quiz cards are present and have the correct text
		cy.get('.quiz-card').each(($el, index) => {
			expect($el).to.contain(`Quiz ${index + 1}`);
		});

		// "create button is in the nav
		cy.get('.create-quiz-link').should('have.attr', 'href', '/create');

		// clicking quiz navigates to the quiz page
		cy.get('.start-btn-container button').first().click();

		// url should be /quiz/:id
		cy.url().should('include', '/quiz/1');

		// question container should be visible meaning data is present
		cy.get('.questions-container').should('be.visible');

		// should have 3 containers for the 3 questions
		cy.get('.questions-container .answers').should('have.length', 3);

		// answers should have 6 true/false buttons total
		cy.get('.questions-container .answers button').should('have.length', 6);

		// buttons should not render after being clicked
		const firstButton = cy.get('.questions-container .answers button').first();
		firstButton.click();
		firstButton.should('not.exist');

		// all choices have been made
		cy.get('.questions-container .answers button').each(($el, index, $list) => {
			$el.click();
		});
		// back button should appear which navigates back to homepage
		cy.get('.back-btn').should('be.visible');
		cy.get('.back-btn').click();
	});
});
