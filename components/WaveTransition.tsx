export default function WaveTransition() {
  return (
      <div className="relative w-full overflow-hidden">
          <svg
              viewBox="0 0 1440 320"
              className="absolute bottom-0 left-0 w-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
          >
              <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#4a5568", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#2d3748", stopOpacity: 1 }} />
                  </linearGradient>
              </defs>
              <path
                  fill="url(#gradient)"
                  d="M0,80 C200,160 400,0 600,80 C800,160 1000,80 1200,80 C1400,80 1600,160 1800,80 L1800,320 L0,320 Z"
              />
          </svg>
      </div>
  );
}
