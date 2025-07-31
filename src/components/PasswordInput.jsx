import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import InputField from './InputField';

const PasswordInput = ({ name, label, placeholder = "••••••••", className = "" }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const rightElement = (
        <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-gray-400 hover:text-gray-300 focus:outline-none"
        >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
    );

    return (
        <InputField
            label={label}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            icon={Lock}
            rightElement={rightElement}
            className={className}
        />
    );
};

export default PasswordInput;