import { useState, useEffect, useMemo } from 'react';
import { RefreshCw, Video } from 'lucide-react';

// Add keyframes for cursor blink animation
const cursorBlinkKeyframes = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

// Add the keyframes to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(cursorBlinkKeyframes));
  document.head.appendChild(style);
}

/**
 * TextSummarizer – stable layout (no vertical shifts)
 * --------------------------------------------------
 * • Progress bar + status stay pinned at top‑left.
 * • Text block keeps a fixed height; final line aligns top‑left.
 * • Per‑char typing, pauses, highlights unchanged.
 */

export default function TextSummarizer() {
  /* ---------- static strings ---------- */
  const original =
    'I have a dream that one day this nation will rise up and live out the true meaning of its creed. ' +
    'I have a dream that my four little children will one day live in a nation where they will not be judged ' +
    'by the color of their skin but by the content of their character.';

  const phraseToCut = 'will rise up and live out the true meaning of its creed.';
  const insertion   = 'will truly embody its beliefs.';
  const phraseKids  = 'my four little children';
  const kidsShort   = 'my kids';
  const dreamOnly   = 'I have a dream.';

  /* ---------- helper: push typing frames ---------- */
  const pushTypingFrames = (frames, base, pos, str, status, from, to) => {
    const step = (to - from) / str.length;
    let txt = base;
    for (let i = 0; i < str.length; i += 1) {
      txt = txt.slice(0, pos + i) + str[i] + txt.slice(pos + i);
      frames.push({ text: txt, highlight: null, cursor: pos + i + 1, type: 'typing', status, progress: +(from + step * (i + 1)).toFixed(1) });
    }
    frames.push({ text: txt, highlight: null, cursor: pos + str.length, type: 'pause', status, progress: to });
    return txt;
  };

  /* ---------- build animation frames ---------- */
  const frames = useMemo(() => {
    const f = [];
    const hiClause = [original.indexOf(phraseToCut), original.indexOf(phraseToCut) + phraseToCut.length];
    const removed  = original.replace(phraseToCut, '');

    f.push({ text: original, highlight: null, cursor: null, type: 'normal',    status: 'Reading…', progress: 0 });
    f.push({ text: original, highlight: hiClause, cursor: null, type: 'highlight', status: 'Selecting clause…', progress: 6 });
    f.push({ text: removed,  highlight: null, cursor: hiClause[0], type: 'cursor', status: 'Deleting…', progress: 12 });

    let txt = pushTypingFrames(f, removed, hiClause[0], insertion, 'Re‑writing…', 15, 30);

    const kidsStart = txt.indexOf(phraseKids);
    const kidsEnd   = kidsStart + phraseKids.length;
    f.push({ text: txt, highlight: [kidsStart, kidsEnd], cursor: null, type: 'highlight', status: 'Shortening…', progress: 34 });

    const withoutKids = txt.replace(phraseKids, '');
    f.push({ text: withoutKids, highlight: null, cursor: kidsStart, type: 'cursor', status: 'Deleting words…', progress: 38 });

    txt = pushTypingFrames(f, withoutKids, kidsStart, kidsShort, 'Typing replacement…', 41, 50);

    const secondStart = txt.indexOf(' I have a dream', 1);
    f.push({ text: txt, highlight: [secondStart, txt.length], cursor: null, type: 'highlight', status: 'Removing redundancy…', progress: 56 });

    const firstSentence = txt.slice(0, secondStart) + '.';
    f.push({ text: firstSentence, highlight: null, cursor: firstSentence.length, type: 'cursor', status: 'Core idea remains', progress: 66 });
    f.push({ text: firstSentence, highlight: null, cursor: null, type: 'pause', status: 'Thinking…', progress: 68 });

    const afterDream = [firstSentence.indexOf('I have a dream') + 'I have a dream'.length, firstSentence.length];
    f.push({ text: firstSentence, highlight: afterDream, cursor: null, type: 'highlight', status: 'Trimming further…', progress: 74 });

    f.push({ text: dreamOnly, highlight: null, cursor: dreamOnly.length, type: 'cursor', status: 'Essence captured', progress: 82 });
    f.push({ text: dreamOnly, highlight: null, cursor: null, type: 'pause', status: 'Letting it sink in…', progress: 90 });
    f.push({ text: dreamOnly, highlight: null, cursor: null, type: 'final', status: 'Summary complete', progress: 100 });

    return f;
  }, []);

  /* ---------- frame stepping ---------- */
  const [frame, setFrame] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Use a constant fast speed (equivalent to the previous level 5)
  const SPEED_MULTIPLIER = 2.0; // Set to the fastest speed
  
  // Reset function to restart the animation
  const resetAnimation = () => {
    setFrame(0);
    setAutoPlay(true);
  };
  
  useEffect(() => {
    // Only advance frames if autoPlay is true
    if (!autoPlay) return;
    
    const cur = frames[frame];
    // Use constant fast speed
    const baseDelay =
      cur.type === 'typing'    ? 120  :
      cur.type === 'highlight' ? 1100 :
      cur.type === 'cursor'    ? 700  :
      cur.type === 'pause'     ? 1500 :
      cur.type === 'final'     ? 1000 : 1700;
      
    // Apply the fast speed multiplier
    const delay = Math.round(baseDelay / SPEED_MULTIPLIER);

    const id = setTimeout(() => {
      // If we reach the last frame, stop auto-playing instead of looping
      if (frame === frames.length - 1) {
        setAutoPlay(false);
      } else {
        setFrame(f => f + 1);
      }
    }, delay);
    
    return () => clearTimeout(id);
  }, [frame, frames, autoPlay]);

  /* ---------- render helpers ---------- */
  const renderText = f => {
    if (f.type === 'final') return <em className="italic">{f.text}</em>;
    if (f.highlight) {
      const [s, e] = f.highlight;
      // Use neutral tones for both modes
      return <>{f.text.slice(0, s)}<span className="bg-neutral-300/50 dark:bg-neutral-600/60 rounded px-0.5">{f.text.slice(s, e)}</span>{f.text.slice(e)}</>;
    }
    if (f.cursor !== null) {
      return <>{f.text.slice(0, f.cursor)}<span className="inline-block mx-0.5 w-[2px] h-[1.2em] align-middle bg-current animate-[blink_1s_ease-in-out_infinite]" />{f.text.slice(f.cursor)}</>;
    }
    return <>{f.text}<span className="inline-block ml-0.5 w-[2px] h-[1.2em] align-middle bg-current animate-[blink_1s_ease-in-out_infinite]" /></>;
  };

  const f = frames[frame];

  /* ---------- layout ---------- */
  // Count words in current text
  const wordCount = f.text.trim().split(/\s+/).length;
  // Count characters
  const charCount = f.text.length;
  // Estimate line count (rough approximation)
  const lineCount = Math.max(1, Math.ceil(charCount / 60));
  
  return (
    <div className="w-full h-[40vh] bg-neutral-100 dark:bg-black text-neutral-800 dark:text-neutral-100 overflow-hidden flex items-center border-b border-neutral-200 dark:border-neutral-800 relative">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Code editor frame */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-800">
          {/* Editor header/titlebar */}
          <div className="bg-neutral-100 dark:bg-zinc-900 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                synapsis.ai — ML Summary Engine
              </div>
            </div>
            
            {/* Status and progress */}
            <div className="flex items-center">
              {/* Status container with subtle emphasis */}
              <div className="py-1 px-2 rounded mr-6 bg-neutral-100 dark:bg-zinc-800">
                <span className="text-xs font-mono text-neutral-600 dark:text-neutral-300 font-medium tracking-wide">{f.status}</span>
              </div>
              
              {/* Progress container */}
              <div className="flex items-center">
                {/* Fixed-width progress bar */}
                <div className="w-24 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300 shadow-inner" 
                      style={{ width: `${f.progress}%` }} />
                </div>
                
                {/* Fixed-width percentage container */}
                <div className="w-10 ml-2">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{f.progress}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Editor content */}
          <div className="flex">
            {/* Line numbers */}
            <div className="hidden md:block bg-neutral-50 dark:bg-zinc-900 text-right p-4 border-r border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 font-mono text-xs select-none">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} className="py-0.5">{i + 1}</div>
              ))}
            </div>
            
            {/* Text content area */}
            <div className="flex-1 p-5 bg-white dark:bg-zinc-900">
              <div className="min-h-[7rem] md:min-h-[8rem] lg:min-h-[9rem] font-mono">
                <p className="text-lg md:text-xl lg:text-2xl leading-tight whitespace-pre-wrap">
                  {renderText(f)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Status bar */}
          <div className="bg-neutral-50 dark:bg-zinc-900 px-4 py-1.5 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center space-x-4">
              <span>Lines: {lineCount}</span>
              <span>Words: {wordCount}</span>
              <span>Chars: {charCount}</span>
            </div>
            <div className="flex items-center">
              <span>Synapsis ML Engine</span>
              <div className="ml-2 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse shadow-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Container for controls below terminal */}
        <div className="mt-4 px-1">
          {/* Action buttons - appear when animation completes */}
          <div 
            className={`flex justify-between transition-all duration-300 ${!autoPlay && frame === frames.length - 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}
          >
            {/* Restart button - bottom left */}
            <button 
              onClick={resetAnimation}
              className="flex items-center space-x-1.5 bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200 dark:hover:bg-zinc-800 border border-neutral-300 dark:border-neutral-700 rounded px-4 py-1.5 text-sm transition-colors font-mono group"
            >
              <RefreshCw className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-500 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-neutral-700 dark:text-neutral-300">$ run --restart-analysis</span>
            </button>
            
            {/* Generate Video button - bottom right */}
            <button 
              className="flex items-center space-x-1.5 bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200 dark:hover:bg-zinc-800 border-2 border-blue-400 dark:border-blue-500 rounded px-4 py-1.5 text-sm transition-colors font-mono group"
            >
              <span className="text-blue-600 dark:text-blue-400 font-medium">$ execute --generate-video</span>
              <div className="relative">
                <Video className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400 relative z-10" />
                <span className="absolute inset-0 bg-blue-400/20 dark:bg-blue-400/30 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
