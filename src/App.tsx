import { useState, useEffect, useCallback } from 'react';
import { SlowClock } from './components/SlowClock';
import { MemeCard } from './components/MemeCard';
import { PromptSuggestions } from './components/PromptSuggestions';
import { GeneratorControls } from './components/GeneratorControls';

// Sample meme templates (simulated API data)
const MEME_TEMPLATES = [
  { id: '181913649', name: 'Drake Hotline Bling', url: 'https://i.imgflip.com/30b1gx.jpg' },
  { id: '87743020', name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
  { id: '112126428', name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
  { id: '131087935', name: 'Running Away Balloon', url: 'https://i.imgflip.com/261o3j.jpg' },
  { id: '124822590', name: 'Left Exit 12 Off Ramp', url: 'https://i.imgflip.com/22bdq6.jpg' },
  { id: '93895088', name: 'Expanding Brain', url: 'https://i.imgflip.com/1jwhww.jpg' },
  { id: '102156234', name: 'Mocking Spongebob', url: 'https://i.imgflip.com/1otk96.jpg' },
  { id: '91538330', name: 'X All The Y', url: 'https://i.imgflip.com/1ihzfe.jpg' },
];

const PROMPT_SUGGESTIONS = [
  "When you finally fix that bug at 3am",
  "Me explaining my code to the rubber duck",
  "Monday mornings be like",
  "When the pizza arrives",
  "My brain during meetings vs at 2am",
  "Expectations vs Reality",
  "How I see myself vs How others see me",
  "When someone says 'quick question'",
  "Debugging production on Friday",
  "When the tests finally pass",
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedMemes, setGeneratedMemes] = useState<Array<{ id: string; template: typeof MEME_TEMPLATES[0]; topText: string; bottomText: string }>>([]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    const parts = suggestion.split(' vs ');
    if (parts.length === 2) {
      setTopText(parts[0]);
      setBottomText(parts[1]);
    } else {
      setTopText(suggestion);
      setBottomText('');
    }
  }, []);

  const generateMeme = useCallback(() => {
    if (!topText && !bottomText) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate 50-second generation with progress
    const totalTime = 50000;
    const intervalTime = 500;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setGenerationProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsGenerating(false);
        setGeneratedMemes(prev => [{
          id: Date.now().toString(),
          template: selectedTemplate,
          topText,
          bottomText,
        }, ...prev].slice(0, 6));
      }
    }, intervalTime);
  }, [topText, bottomText, selectedTemplate]);

  const quickGenerate = useCallback(() => {
    const randomTemplate = MEME_TEMPLATES[Math.floor(Math.random() * MEME_TEMPLATES.length)];
    const randomSuggestion = PROMPT_SUGGESTIONS[Math.floor(Math.random() * PROMPT_SUGGESTIONS.length)];

    setSelectedTemplate(randomTemplate);
    const parts = randomSuggestion.split(' vs ');
    if (parts.length === 2) {
      setTopText(parts[0]);
      setBottomText(parts[1]);
    } else {
      setTopText(randomSuggestion);
      setBottomText('BOTTOM TEXT');
    }

    setGeneratedMemes(prev => [{
      id: Date.now().toString(),
      template: randomTemplate,
      topText: parts.length === 2 ? parts[0] : randomSuggestion,
      bottomText: parts.length === 2 ? parts[1] : 'BOTTOM TEXT',
    }, ...prev].slice(0, 6));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }} />

      {/* Noise texture */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Gradient blobs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#ff00ff] rounded-full blur-[200px] opacity-10 animate-pulse" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#00ffff] rounded-full blur-[200px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-[#39ff14] rounded-full blur-[200px] opacity-5 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Super Slow Clock */}
      <SlowClock />

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-8 pt-32 md:pt-40 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8 md:mb-12">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
              <span className="text-[#ff00ff] drop-shadow-[0_0_30px_rgba(255,0,255,0.5)]">MEME</span>
              <span className="text-[#00ffff] drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">.</span>
              <span className="text-[#39ff14] drop-shadow-[0_0_30px_rgba(57,255,20,0.5)]">GEN</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm text-gray-500 tracking-widest uppercase">
              // powered by chaos & nanobananapro api //
            </p>
          </header>

          {/* Template Selector */}
          <section className="mb-8">
            <h2 className="font-mono text-xs text-[#ff00ff] mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#ff00ff]" />
              Select Template
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {MEME_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedTemplate.id === template.id
                      ? 'border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.4)] scale-105'
                      : 'border-gray-800 hover:border-[#ff00ff] hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]'
                  }`}
                >
                  <img
                    src={template.url}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 font-mono text-[10px] sm:text-xs text-white truncate">
                    {template.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Prompt Suggestions */}
          <PromptSuggestions
            suggestions={PROMPT_SUGGESTIONS}
            onSelect={handleSuggestionClick}
          />

          {/* Generator Controls */}
          <GeneratorControls
            topText={topText}
            bottomText={bottomText}
            onTopTextChange={setTopText}
            onBottomTextChange={setBottomText}
            onGenerate={generateMeme}
            onQuickGenerate={quickGenerate}
            isGenerating={isGenerating}
            progress={generationProgress}
          />

          {/* Preview */}
          <section className="mb-12">
            <h2 className="font-mono text-xs text-[#00ffff] mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#00ffff]" />
              Live Preview
            </h2>
            <div className="flex justify-center">
              <div className="relative max-w-md w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#39ff14] rounded-xl blur opacity-30" />
                <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800">
                  <img
                    src={selectedTemplate.url}
                    alt={selectedTemplate.name}
                    className="w-full"
                  />
                  {topText && (
                    <div className="absolute top-4 left-0 right-0 text-center">
                      <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase px-2"
                        style={{
                          textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000',
                        }}>
                        {topText}
                      </span>
                    </div>
                  )}
                  {bottomText && (
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase px-2"
                        style={{
                          textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000',
                        }}>
                        {bottomText}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Generated Memes Gallery */}
          {generatedMemes.length > 0 && (
            <section>
              <h2 className="font-mono text-xs text-[#39ff14] mb-4 tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#39ff14]" />
                Your Memes ({generatedMemes.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {generatedMemes.map((meme, index) => (
                  <MemeCard key={meme.id} meme={meme} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-6 text-center">
        <p className="font-mono text-[10px] sm:text-xs text-gray-600 tracking-wider">
          Requested by <span className="text-gray-500">@stringer_kade</span> · Built by <span className="text-gray-500">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
