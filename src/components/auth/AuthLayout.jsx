import React from 'react';

const AuthLayout = ({ 
    children, 
    title, 
    subtitle, 
    icon: Icon,
    footerLinks = null 
}) => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">{title}</h2>
                    {subtitle && (
                        <p className="text-gray-400 mt-2">{subtitle}</p>
                    )}
                </div>

                {children}

                {footerLinks && (
                    <div className="mt-6 text-center">
                        {footerLinks}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthLayout;