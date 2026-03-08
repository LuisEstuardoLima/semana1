export default function ProgressBar({ progress, color }) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Progreso: {clampedProgress.toFixed(1)}%</span>
        <span>Meta: 66 días</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}