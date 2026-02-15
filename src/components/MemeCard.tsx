interface MemeCardProps {
  meme: {
    id: string;
    template: {
      id: string;
      name: string;
      url: string;
    };
    topText: string;
    bottomText: string;
  };
  index: number;
}

export function MemeCard({ meme, index }: MemeCardProps) {
  const colors = ['#ff00ff', '#00ffff', '#39ff14'];
  const accentColor = colors[index % colors.length];

  return (
    <div
      className="group relative animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group-hover:border-opacity-50 transition-all duration-300"
        style={{ borderColor: `${accentColor}33` }}>
        {/* Image with meme text */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={meme.template.url}
            alt={meme.template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {meme.topText && (
            <div className="absolute top-3 left-0 right-0 text-center">
              <span className="font-display text-lg font-bold text-white uppercase px-2"
                style={{
                  textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000',
                }}>
                {meme.topText}
              </span>
            </div>
          )}
          {meme.bottomText && (
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="font-display text-lg font-bold text-white uppercase px-2"
                style={{
                  textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000',
                }}>
                {meme.bottomText}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card footer */}
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-gray-500 truncate max-w-[60%]">
              {meme.template.name}
            </span>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
                style={{ color: accentColor }}
                onClick={() => {
                  // Copy meme link simulation
                  navigator.clipboard?.writeText(`meme://${meme.id}`);
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
                style={{ color: accentColor }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-transparent border-l-transparent"
          style={{ borderRightColor: accentColor, borderRightWidth: '20px' }}
        />
      </div>
    </div>
  );
}
