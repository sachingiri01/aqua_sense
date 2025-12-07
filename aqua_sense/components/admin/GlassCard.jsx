'use client';

export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-3xl
        shadow-lg shadow-shakespeare-500/10
        ${hover ? 'hover:shadow-2xl hover:shadow-shakespeare-400/20 hover:scale-[1.02] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {/* Caustic light effect */}
      <div className="caustic-overlay" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Water ripple on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-shakespeare-400/20 to-transparent animate-ripple-3d" />
        </div>
      )}
    </div>
  );
}
