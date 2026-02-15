import { useState, useEffect } from 'react';

export function SlowClock() {
  const [time, setTime] = useState(new Date());
  const [displayTime, setDisplayTime] = useState(new Date());

  useEffect(() => {
    // Real time updates every second
    const realInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(realInterval);
  }, []);

  useEffect(() => {
    // Super slow clock - updates every 10 seconds to create that "frozen" feel
    const slowInterval = setInterval(() => {
      setDisplayTime(new Date());
    }, 10000);

    return () => clearInterval(slowInterval);
  }, []);

  const hours = displayTime.getHours().toString().padStart(2, '0');
  const minutes = displayTime.getMinutes().toString().padStart(2, '0');
  const seconds = displayTime.getSeconds().toString().padStart(2, '0');

  // Calculate how "behind" the slow clock is
  const lag = Math.floor((time.getTime() - displayTime.getTime()) / 1000);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex justify-center pt-4 md:pt-6">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-xl bg-[#ff00ff] opacity-30 animate-pulse" />

        {/* Clock container */}
        <div className="relative bg-black/80 backdrop-blur-sm border border-[#ff00ff]/50 rounded-xl px-4 py-2 md:px-8 md:py-3">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ffff]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ffff]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ffff]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ffff]" />

          <div className="flex items-center gap-2 md:gap-4">
            {/* Label */}
            <span className="font-mono text-[8px] md:text-[10px] text-[#39ff14] tracking-widest uppercase hidden sm:block">
              SUPER<br />SLOW
            </span>

            {/* Time display */}
            <div className="flex items-center font-display">
              <TimeDigit value={hours[0]} />
              <TimeDigit value={hours[1]} />
              <span className="text-[#ff00ff] text-2xl md:text-4xl mx-1 animate-pulse">:</span>
              <TimeDigit value={minutes[0]} />
              <TimeDigit value={minutes[1]} />
              <span className="text-[#ff00ff] text-2xl md:text-4xl mx-1 animate-pulse">:</span>
              <TimeDigit value={seconds[0]} />
              <TimeDigit value={seconds[1]} />
            </div>

            {/* Lag indicator */}
            <div className="flex flex-col items-end">
              <span className="font-mono text-[8px] md:text-[10px] text-gray-500 tracking-wider">LAG</span>
              <span className="font-mono text-xs md:text-sm text-[#ff00ff]">-{lag}s</span>
            </div>
          </div>

          {/* Progress bar showing time until next update */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#39ff14] transition-all duration-1000"
              style={{ width: `${((lag % 10) / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeDigit({ value }: { value: string }) {
  return (
    <div className="relative w-6 h-10 md:w-10 md:h-16 bg-black/50 rounded border border-gray-800 flex items-center justify-center mx-[1px] md:mx-0.5 overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(transparent 50%, rgba(0,255,255,0.1) 50%)',
        backgroundSize: '100% 4px',
      }} />

      <span className="text-2xl md:text-4xl font-bold text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] relative z-10 transition-all duration-[10000ms]">
        {value}
      </span>
    </div>
  );
}
