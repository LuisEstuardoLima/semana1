export default function DoneButton() {
  // Semana 3: Botón no funcional (solo alerta)
  const handleClick = () => {
    alert('✅ Funcionalidad en desarrollo - Semana 4\n\nPor ahora solo es un botón de muestra.');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 13l4 4L19 7" 
        />
      </svg>
      <span>Done</span>
    </button>
  );
}