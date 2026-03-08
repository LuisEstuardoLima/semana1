import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../redux/habitsSlice';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';

export default function Home() {
  const dispatch = useDispatch();
  const { items: habits, loading, error } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando tus hábitos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchHabits())}
            className="mt-4 btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mis Hábitos Atómicos
          </h1>
          <p className="text-gray-600">
            Pequeños cambios, grandes resultados
          </p>
        </div>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto mb-8">
          <HabitForm />
        </div>

        {/* Lista dinámica de hábitos */}
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No tienes hábitos aún
              </h3>
              <p className="text-gray-600 mb-4">
                Comienza creando tu primer hábito con el botón "Nuevo Hábito"
              </p>
              <div className="text-sm text-gray-400">
                Recuerda: los pequeños pasos diarios construyen grandes cambios
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Estadísticas generales */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{habits.length}</p>
                  <p className="text-xs text-gray-500">Total Hábitos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {habits.reduce((acc, h) => acc + (h.completedDates?.length || 0), 0)}
                  </p>
                  <p className="text-xs text-gray-500">Total Completados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {Math.max(...habits.map(h => h.currentStreak || 0), 0)}
                  </p>
                  <p className="text-xs text-gray-500">Mejor Racha</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {habits.filter(h => h.currentStreak >= 21).length}
                  </p>
                  <p className="text-xs text-gray-500">+21 días</p>
                </div>
              </div>
            </div>

            {/* Lista dinámica de hábitos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <HabitCard key={habit._id} habit={habit} />
              ))}
            </div>

            {/* Nota sobre funcionalidades estáticas */}
            <div className="mt-8 text-center text-sm text-gray-400 border-t pt-4">
              <p>⚡ Modo demostración - Semana 3</p>
              <p>Barra de progreso estática (50%) • Botón Done en desarrollo</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}