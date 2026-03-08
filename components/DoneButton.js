export default function DoneButton() {
  // Por ahora no es funcional (semana 3)
  const handleClick = () => {
    alert('Funcionalidad en desarrollo - Semana 4');
  };

  return (
    <button
      onClick={handleClick}
      className="btn-success flex items-center justify-center space-x-2 group relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center">
        <svg 
          className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" 
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
        Done
      </span>
      <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </button>
  );
}