import React from 'react';

const SubmitButton = ({ 
    isSubmitting, 
    loadingText = "Chargement...", 
    defaultText = "Soumettre",
    className = ""
}) => {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {isSubmitting ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {loadingText}
                </div>
            ) : (
                defaultText
            )}
        </button>
    );
};

export default SubmitButton;