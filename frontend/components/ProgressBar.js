export default function ProgressBar({ currentStreak = 0, total = 66 }) {
  const progress = Math.min((currentStreak / total) * 100, 100);
  
  const getProgressColor = () => {
    if (progress < 33) return 'bg-red-500';
    if (progress < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Racha: {currentStreak} días</span>
        <span className="text-gray-600">{progress.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>🔴 0 días</span>
        <span>🟡 22 días</span>
        <span>🟢 44 días</span>
        <span>🎯 66 días</span>
      </div>
    </div>
  );
}