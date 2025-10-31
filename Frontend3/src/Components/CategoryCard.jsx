import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'

function CategoryCard({title, description, image, link}) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (link) {
            navigate(link)
        }
    }

    return (
        <div className="group overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-[1.02] card-shadow-hover animate-fade-in">
            <div className="relative overflow-hidden h-64">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400?text=Category+Image'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-gray-900/90 to-transparent" />
            </div>
            <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{description}</p>
                <button 
                    className="gradient-primary text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity group/btn"
                    onClick={handleClick}
                >
                    View Vehicles
                    <HiArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
            </div>
        </div>
    )
}

export default CategoryCard

