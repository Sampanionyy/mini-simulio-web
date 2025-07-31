const ResultDetail = ({ label, value, separator = false }) => {
    return (
        <div className={`flex justify-between ${separator ? 'border-t border-gray-700 pt-4' : ''}`}>
            <span className="text-gray-300">{label}</span>
            <span className="text-white font-semibold">{value}</span>
        </div>
    );
};

export default ResultDetail;