import { Field, ErrorMessage } from 'formik';

const InputField = ({ 
    label, 
    name, 
    type = "text", 
    placeholder, 
    icon: Icon, 
    rightElement = null,
    className = ""
}) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                )}
                <Field
                    type={type}
                    id={name}
                    name={name}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-12' : 'pr-4'} py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-transparent`}
                    placeholder={placeholder}
                />
                {rightElement && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {rightElement}
                    </div>
                )}
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
};

export default InputField;