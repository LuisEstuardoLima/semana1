import { useDispatch } from 'react-redux';
import ProgressBar from './ProgressBar';
import DoneButton from './DoneButton';

export default function HabitCard({ habit }) {
  const dispatch = useDispatch();
  
  // Calcular color basado en la racha actual
  const getStreakColor = () => {
    if (habit.currentStreak < 22) return 'text-red-600';
    if (habit.currentStreak < 44) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="habit-card group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {habit.description}
            </p>
          )}
        </div>
        
        {/* Streak Badge */}
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full font-semibold ${getStreakColor()} bg-opacity-10`}>
          <span className="text-sm">🔥</span>
          <span className="text-sm">{habit.currentStreak}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Racha Actual</p>
          <p className={`text-xl font-bold ${getStreakColor()}`}>
            {habit.currentStreak}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Mejor Racha</p>
          <p className="text-xl font-bold text-blue-600">
            {habit.bestStreak}
          </p>
        </div>
      </div>

      {/* Progress Bar (estática) */}
      <div className="mb-4">
        <ProgressBar days={habit.currentStreak} />
      </div>

      {/* Done Button (no funcional) */}
      <div className="flex justify-end">
        <DoneButton />
      </div>

      {/* Tooltip indicando que es estático */}
      <div className="mt-2 text-xs text-center text-gray-400 italic">
        * Barra de progreso estática (50%) - Botón Done en desarrollo
      </div>
    </div>
  );
}