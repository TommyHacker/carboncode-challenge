import Link from 'next/link';
const Navigation = () => {
	return (
		<nav className='shadow-slate-400 shadow-md flex items-center justify-between fixed w-full h-20 py-6 px-10  bg-blue-500'>
			<ul className='flex flex-row justify-between'>
				<li className='mx-20'>
					<Link className='hover:text-white home-link' href='/'>
						Home
					</Link>
				</li>
				<li className='mx-20'>
					<Link className='hover:text-white create-quiz-link' href='/create'>
						Create
					</Link>
				</li>
			</ul>
			<p className='text-2xl'>Quizzadry</p>
		</nav>
	);
};
export default Navigation;
