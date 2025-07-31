import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const storedUser = sessionStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const [token, setToken] = useState(() => {
		return sessionStorage.getItem('token');
	});

	const login = (user, token) => {
		setUser(user);
		setToken(token);
		sessionStorage.setItem('user', JSON.stringify(user));
		sessionStorage.setItem('token', token);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
