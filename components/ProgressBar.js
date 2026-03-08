export default function ProgressBar() {
  // Semana 3: Barra estática al 50%
  const progress = 50;
  
  // Determinar color basado en progreso
  const getProgressColor = () => {
    if (progress < 33) return 'bg-red-500';
    if (progress < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progreso: Día 33 de 66</span>
        <span>50%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className={`h-4 rounded-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>🔴 Inicio</span>
        <span>🟡 Tú estás aquí</span>
        <span>🟢 Meta (66 días)</span>
      </div>
    </div>
  );
}