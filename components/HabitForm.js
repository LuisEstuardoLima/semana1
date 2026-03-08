import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createHabit } from '../redux/habitsSlice'

export default function HabitForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      dispatch(createHabit({ name, description }))
      setName('')
      setDescription('')
      setIsOpen(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 mb-6"
      >
        + Nuevo Hábito
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Crear Nuevo Hábito</h3>
      
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del hábito"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          className="w-full px-3 py-2 border rounded-md"
          rows="3"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Crear
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}