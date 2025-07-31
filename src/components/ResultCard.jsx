const ResultCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    className = '', 
    textColor = 'text-white' 
}) => {
    return (
        <div className={`rounded-2xl p-8 ${className}`}>
            <div className="flex items-center mb-4">
                <Icon className={`w-6 h-6 mr-3 ${textColor}`} />
                <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
            </div>
            <div className={`text-3xl font-bold ${textColor}`}>
                {value}
            </div>
            {subtitle && (
                <p className={`${textColor.replace('text-white', 'text-purple-100')} mt-2`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default ResultCard;