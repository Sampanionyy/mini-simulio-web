import { Home } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-gray-800 py-12 border-t border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center mb-4 md:mb-0">
						<Home className="w-6 h-6 text-purple-400 mr-2" />
						<span className="text-lg font-bold text-white">Simulio</span>
					</div>
					<div className="flex space-x-6 text-sm text-gray-400">
						<a href="#" className="hover:text-purple-400">Mentions légales</a>
						<a href="#" className="hover:text-purple-400">Politique de confidentialité</a>
						<a href="#" className="hover:text-purple-400">Support</a>
					</div>
				</div>
				<div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
					© 2025 Simulio. Tous droits réservés.
				</div>
			</div>
		</footer>
	);
};

export default Footer;