interface PromptSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function PromptSuggestions({ suggestions, onSelect }: PromptSuggestionsProps) {
  return (
    <section className="mb-8">
      <h2 className="font-mono text-xs text-[#39ff14] mb-4 tracking-widest uppercase flex items-center gap-2">
        <span className="w-8 h-[1px] bg-[#39ff14]" />
        Prompt Suggestions
      </h2>

      <div className="flex flex-wrap gap-2 md:gap-3">
        {suggestions.map((suggestion, index) => {
          const colors = ['#ff00ff', '#00ffff', '#39ff14'];
          const color = colors[index % colors.length];

          return (
            <button
              key={suggestion}
              onClick={() => onSelect(suggestion)}
              className="group relative px-3 py-2 md:px-4 md:py-2.5 rounded-full bg-black/40 border border-gray-800 hover:border-transparent transition-all duration-300 animate-fadeIn"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                style={{ backgroundColor: color, opacity: 0 }}
              />
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundColor: color }}
              />

              {/* Border gradient on hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}, transparent 60%)`,
                  padding: '1px',
                }}
              >
                <div className="w-full h-full bg-black/90 rounded-full" />
              </div>

              <span
                className="relative font-mono text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {suggestion}
              </span>

              {/* Sparkle indicator */}
              <span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
