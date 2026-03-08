import ProgressBar from './ProgressBar';
import DoneButton from './DoneButton';

export default function HabitCard({ habit }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{habit.name}</h3>
          {habit.description && (
            <p className="text-gray-600 text-sm mt-1">{habit.description}</p>
          )}
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          #{habit.currentStreak || 0} días
        </span>
      </div>

      {/* Barra de progreso estática (Semana 3) */}
      <div className="mb-4">
        <ProgressBar />
      </div>

      {/* Botón Done no funcional (Semana 3) */}
      <DoneButton />

      {/* Mensaje informativo */}
      <p className="text-xs text-center text-gray-400 mt-2">
        * Modo demostración - Semana 3
      </p>
    </div>
  );
}