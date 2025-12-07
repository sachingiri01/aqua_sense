'use client';

export default function WaveDivider({ className = '' }) {
  return (
    <div className={`w-full h-12 ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,60 L1200,120 L0,120 Z"
          className="fill-shakespeare-100/20 animate-wave-flow-3d"
        />
        <path
          d="M0,20 C200,100 400,20 600,70 C800,120 1000,40 1200,80 L1200,120 L0,120 Z"
          className="fill-shakespeare-200/30"
          style={{ animationDelay: '2s' }}
        />
      </svg>
    </div>
  );
}
