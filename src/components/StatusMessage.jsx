const StatusMessage = ({ status, className = "mb-6" }) => {
    if (!status) return null;

    const isSuccess = status.type === 'success';
    
    return (
        <div 
            className={`${className} p-4 rounded-lg text-sm ${
                isSuccess
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
            }`}
        >
            {status.message}
        </div>
    );
};

export default StatusMessage;