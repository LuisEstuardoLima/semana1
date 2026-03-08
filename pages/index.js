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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando hábitos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg">
          <p className="font-semibold">Error al cargar hábitos:</p>
          <p className="text-sm mt-2">{error}</p>
          <button
            onClick={() => dispatch(fetchHabits())}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis Hábitos Atómicos
          </h1>
          <p className="text-gray-600">
            Semana 3: Barra estática (50%) - Botón con alerta
          </p>
        </div>

        {/* Formulario para crear hábitos */}
        <div className="max-w-md mx-auto mb-8">
          <HabitForm />
        </div>

        {/* Lista dinámica de hábitos */}
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay hábitos. ¡Crea uno nuevo!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))}
          </div>
        )}

        {/* Footer informativo */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>✓ Barra de progreso estática al 50%</p>
          <p>✓ Botón Done muestra alerta (no funcional)</p>
          <p>✓ Lista dinámica desde Redux</p>
        </div>
      </div>
    </div>
  );
}