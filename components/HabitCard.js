import { useDispatch } from 'react-redux'
import { completeHabit } from '../redux/habitsSlice'

export default function HabitCard({ habit }) {
  const dispatch = useDispatch()
  
  const progress = Math.min((habit.currentStreak / 66) * 100, 100)
  const progressColor = progress < 33 ? 'bg-red-500' : progress < 66 ? 'bg-yellow-500' : 'bg-green-500'

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{habit.name}</h3>
      {habit.description && (
        <p className="text-gray-600 mb-4">{habit.description}</p>
      )}
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Racha: {habit.currentStreak} días</span>
          <span>Meta: 66 días</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => dispatch(completeHabit(habit._id))}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Completar Hoy
      </button>
    </div>
  )
}