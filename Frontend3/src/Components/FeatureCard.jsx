import React from 'react'

function FeatureCard({icon: Icon, title, description}) {
    return (
        <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-105 card-shadow-hover animate-fade-in-up">
            <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full gradient-primary animate-float">
                    {Icon && <Icon className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
        </div>
    )
}

export default FeatureCard

