const FormInput = ({ 
    name, 
    label, 
    placeholder, 
    step, 
    value, 
    onChange, 
    onBlur, 
    error 
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label} *
            </label>
            <input
                type="number"
                name={name}
                step={step || 'any'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    error 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-600 focus:ring-purple-400'
                }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
};

export default FormInput;