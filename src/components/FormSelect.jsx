const FormSelect = ({ name, label, value, onChange, options }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;