import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Menu, X, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/UserContext';
import { useState } from 'react';

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user, logout } = useAuth();

	const [showUserMenu, setShowUserMenu] = useState(false);
	const isActive = (path) => location.pathname === path;

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false);
		navigate('/login');
	};

	return (
		<nav className="bg-gray-800 border-b border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="flex items-center">
						<Home className="w-8 h-8 text-purple-400 mr-2" />
						<span className="text-xl font-bold text-white">Simulio</span>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						{user && (
							<>
								<Link
									to="/simulation"
									className={`hover:text-blue-300 ${isActive('/simulation') ? 'text-blue-400' : 'text-white'}`}
								>
									Faire une simulation
								</Link>

								<Link
									to="/clients"
									className={`hover:text-blue-300 ${isActive('/clients') ? 'text-blue-400' : 'text-white'}`}
								>
									Clients
								</Link>
							</>
						)}

						{user ? (
							<div className="relative">
								<button
									onClick={() => setShowUserMenu(!showUserMenu)}
									className="flex items-center space-x-2 text-white hover:text-blue-300"
								>
									<UserCircle className="w-7 h-7" />
									<span>{user.name}</span>
								</button>

								{showUserMenu && (
									<div
										className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
										onMouseLeave={() => setShowUserMenu(false)}
									>
										<button
											onClick={handleLogout}
											className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
										>
											Se déconnecter
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									to="/login"
									className="text-gray-300 hover:text-white font-medium"
								>
									Se connecter
								</Link>

								<Link
									to="/register"
									className="px-6 py-2 rounded-2xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
								>
									S'inscrire
								</Link>
							</>
						)}
					</div>

					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-gray-300 hover:text-white"
						>
							{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>
				</div>

				{isMenuOpen && (
					<div className="md:hidden py-4 border-t border-gray-700">
						<div className="flex flex-col space-y-4">
							{user && (
								<>
									<Link
										to="/simulation"
										className="text-blue-400"
										onClick={() => setIsMenuOpen(false)}
									>
										Faire une simulation
									</Link>

									<Link
										to="/clients"
										className="text-blue-400"
										onClick={() => setIsMenuOpen(false)}
									>
										Clients
									</Link>
								</>
							)}

							{user ? (
								<>
									<span className="text-gray-300 font-medium">
										Bonjour, {user.name}
									</span>
									<button
										onClick={handleLogout}
										className="text-red-500 font-semibold text-left"
									>
										Se déconnecter
									</button>
								</>
							) : (
								<>
									<Link
										to="/login"
										className="text-gray-300 font-medium text-left"
										onClick={() => setIsMenuOpen(false)}
									>
										Se connecter
									</Link>
									<Link
										to="/register"
										className="text-green-500 font-semibold text-left"
										onClick={() => setIsMenuOpen(false)}
									>
										S'inscrire
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
