import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { completeHabit } from '../redux/habitsSlice';

export default function DoneButton({ habitId, currentStreak }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      await dispatch(completeHabit(habitId)).unwrap();
      
      // Mostrar feedback
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
      
    } catch (error) {
      console.error('Error al completar hábito:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleComplete}
        disabled={loading}
        className={`
          w-full py-3 px-4 rounded-lg font-medium text-white
          transition-all duration-300 transform hover:scale-105
          flex items-center justify-center space-x-2
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 active:bg-green-700'}
          shadow-md hover:shadow-lg
        `}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Completando...</span>
          </>
        ) : (
          <>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span>¡Lo logré hoy!</span>
          </>
        )}
      </button>

      {/* Feedback de éxito */}
      {showFeedback && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>¡Bien hecho! Racha actual: {currentStreak + 1}</span>
          </div>
        </div>
      )}
    </div>
  );
}