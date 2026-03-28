import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchHabits } from '../redux/habitsSlice';
import { loadUser } from '../redux/userSlice';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items: habits, loading, error } = useSelector((state) => state.habits);
  const { user, isAuthenticated, loading: authLoading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated && !authLoading) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, authLoading]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchHabits());
    }
  }, [dispatch, isAuthenticated]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Mis Hábitos Atómicos
        </h1>
        <p className="text-gray-600">
          Hola, {user?.name} 👋 ¡Sigue construyendo mejores hábitos!
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <HabitForm />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : habits.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            ¡Comienza tu primer hábito!
          </h3>
          <p className="text-gray-600">
            Haz clic en "Nuevo Hábito" para empezar tu viaje hacia 66 días.
          </p>
        </div>
      ) : (
        <>
          {/* Estadísticas */}
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

          {/* Lista de hábitos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}