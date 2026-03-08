export default function ProgressBar({ days = 33, total = 66 }) {
  // Por ahora es estático, siempre muestra 33 días de 66 (50%)
  const progress = 50; // Estático para la semana 3
  
  const getProgressColor = () => {
    if (progress < 33) return 'bg-progress-red';
    if (progress < 66) return 'bg-progress-yellow';
    return 'bg-progress-green';
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">Progreso: {days} días</span>
        <span className="text-gray-400">Meta: {total} días</span>
      </div>
      
      <div className="progress-bar">
        <div 
          className={`progress-fill ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>🔴 Inicio</span>
        <span>🟡 Progreso</span>
        <span>🟢 Meta (66 días)</span>
      </div>
    </div>
  );
}