import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHabits } from '../redux/habitsSlice'
import HabitCard from '../components/HabitCard'
import HabitForm from '../components/HabitForm'

export default function Home() {
  const dispatch = useDispatch()
  const { items: habits, loading } = useSelector((state) => state.habits)

  useEffect(() => {
    dispatch(fetchHabits())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Cargando hábitos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Hábitos</h1>
      
      <HabitForm />

      {habits.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No tienes hábitos creados. ¡Comienza uno ahora!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  )
}