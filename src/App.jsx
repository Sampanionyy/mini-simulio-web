import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';
import SimulationPage from './pages/SimulationPage';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/UserContext';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/simulation" element={<SimulationPage />} />
					</Route>
					
					{/* Routes sans layout (pages d'auth) */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;