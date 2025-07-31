import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-900 text-white w-full">
			<Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			
			<main>
				<Outlet />
			</main>
			
			<Footer />
		</div>
	);
};

export default Layout;