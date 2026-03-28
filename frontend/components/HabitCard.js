import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { completeHabit, deleteHabit } from '../redux/habitsSlice';
import ProgressBar from './ProgressBar';

export default function HabitCard({ habit }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    await dispatch(completeHabit(habit._id));
    setLoading(false);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      dispatch(deleteHabit(habit._id));
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const getStreakColor = () => {
    if (habit.currentStreak < 22) return 'text-red-600';
    if (habit.currentStreak < 44) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{habit.name}</h3>
          {habit.description && (
            <p className="text-gray-600 text-sm mt-1">{habit.description}</p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className={`p-2 rounded-full transition-colors ${
            showDeleteConfirm 
              ? 'bg-red-500 text-white' 
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
          title={showDeleteConfirm ? 'Confirmar eliminación' : 'Eliminar'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Racha</p>
          <p className={`text-lg font-bold ${getStreakColor()}`}>{habit.currentStreak}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Mejor</p>
          <p className="text-lg font-bold text-blue-600">{habit.bestStreak}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold text-purple-600">{habit.completedDates?.length || 0}</p>
        </div>
      </div>

      <div className="mb-4">
        <ProgressBar currentStreak={habit.currentStreak} />
      </div>

      <button
        onClick={handleComplete}
        disabled={loading}
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {loading ? 'Completando...' : '✓ Done'}
      </button>
    </div>
  );
}