interface GeneratorControlsProps {
  topText: string;
  bottomText: string;
  onTopTextChange: (text: string) => void;
  onBottomTextChange: (text: string) => void;
  onGenerate: () => void;
  onQuickGenerate: () => void;
  isGenerating: boolean;
  progress: number;
}

export function GeneratorControls({
  topText,
  bottomText,
  onTopTextChange,
  onBottomTextChange,
  onGenerate,
  onQuickGenerate,
  isGenerating,
  progress,
}: GeneratorControlsProps) {
  return (
    <section className="mb-8">
      <h2 className="font-mono text-xs text-[#ff00ff] mb-4 tracking-widest uppercase flex items-center gap-2">
        <span className="w-8 h-[1px] bg-[#ff00ff]" />
        Create Your Meme
      </h2>

      <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/5 via-transparent to-[#00ffff]/5 rounded-2xl" />

        <div className="relative bg-black/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6">
          {/* Grid decoration */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,0,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,0,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }} />
          </div>

          <div className="relative space-y-4 md:space-y-6">
            {/* Text inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-[#00ffff] tracking-widest uppercase">
                  Top Text
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff00ff] to-[#00ffff] rounded-lg opacity-0 group-focus-within:opacity-50 blur transition-opacity duration-300" />
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => onTopTextChange(e.target.value)}
                    placeholder="WHEN YOU..."
                    className="relative w-full px-4 py-3 bg-black/80 border border-gray-700 rounded-lg font-display text-white placeholder-gray-600 focus:outline-none focus:border-[#ff00ff] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] text-[#00ffff] tracking-widest uppercase">
                  Bottom Text
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffff] to-[#39ff14] rounded-lg opacity-0 group-focus-within:opacity-50 blur transition-opacity duration-300" />
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => onBottomTextChange(e.target.value)}
                    placeholder="BOTTOM TEXT"
                    className="relative w-full px-4 py-3 bg-black/80 border border-gray-700 rounded-lg font-display text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffff] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Generate button */}
              <button
                onClick={onGenerate}
                disabled={isGenerating || (!topText && !bottomText)}
                className="relative flex-1 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#39ff14] rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#39ff14] rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative m-[2px] bg-black/90 rounded-[10px] px-6 py-3 md:py-4 group-hover:bg-black/70 transition-colors flex items-center justify-center gap-3">
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#39ff14] border-t-transparent rounded-full animate-spin" />
                      <span className="font-mono text-sm text-white">
                        GENERATING... {Math.round(progress)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="font-mono text-sm text-white">
                        FIRE UP GROK (50s)
                      </span>
                    </>
                  )}
                </div>

                {/* Progress bar */}
                {isGenerating && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 rounded-b-xl overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#39ff14] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>

              {/* Quick generate button */}
              <button
                onClick={onQuickGenerate}
                disabled={isGenerating}
                className="relative group px-6 py-3 md:py-4 bg-black/60 border-2 border-[#39ff14] rounded-xl hover:bg-[#39ff14]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-mono text-sm text-[#39ff14] flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  RANDOM
                </span>
              </button>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 text-center">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-[#ff00ff] animate-pulse' : 'bg-[#39ff14]'}`} />
              <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                {isGenerating ? 'PROCESSING WITH NANOBANANAPRO API...' : 'READY TO GENERATE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
