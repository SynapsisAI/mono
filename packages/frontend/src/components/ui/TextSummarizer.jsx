import { useState, useEffect, useMemo } from 'react';

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
  useEffect(() => {
    const cur = frames[frame];
    const delay =
      cur.type === 'typing'    ? 120  :
      cur.type === 'highlight' ? 1100 :
      cur.type === 'cursor'    ? 700  :
      cur.type === 'pause'     ? 1500 :
      cur.type === 'final'     ? 3000 : 1700;

    const id = setTimeout(() => setFrame(i => (i === frames.length - 1 ? 0 : i + 1)), delay);
    return () => clearTimeout(id);
  }, [frame, frames]);

  /* ---------- render helpers ---------- */
  const renderText = f => {
    if (f.type === 'final') return <em className="italic">{f.text}</em>;
    if (f.highlight) {
      const [s, e] = f.highlight;
      // Use a blue that works well in both light and dark modes
      return <>{f.text.slice(0, s)}<span className="bg-blue-500/30 dark:bg-blue-600/40 rounded px-0.5">{f.text.slice(s, e)}</span>{f.text.slice(e)}</>;
    }
    if (f.cursor !== null) {
      return <>{f.text.slice(0, f.cursor)}<span className="animate-pulse border-r-2 border-current mx-0.5 inline-block h-[1.2em] align-middle" />{f.text.slice(f.cursor)}</>;
    }
    return <>{f.text}<span className="animate-pulse ml-0.5">|</span></>;
  };

  const f = frames[frame];

  /* ---------- layout ---------- */
  return (
    <div className="w-full h-[40vh] bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-100 overflow-hidden flex items-center border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* status + progress (combined inline with fixed widths) */}
        <div className="flex items-center mb-6">
          {/* Fixed-width status container */}
          <div className="w-36 mr-4">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{f.status}</span>
          </div>
          
          {/* Fixed-width progress bar */}
          <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gray-400 dark:bg-gray-600 rounded-full transition-all duration-300" 
                 style={{ width: `${f.progress}%` }} />
          </div>
          
          {/* Fixed-width percentage container */}
          <div className="w-10 ml-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{f.progress}%</span>
          </div>
        </div>

        {/* fixed‑height text area to avoid jumps */}
        <div className="min-h-[7rem] md:min-h-[8rem] lg:min-h-[9rem]">
          <p className="text-xl md:text-2xl lg:text-3xl leading-tight font-sans whitespace-pre-wrap">
            {renderText(f)}
          </p>
        </div>
      </div>
    </div>
  );
}
