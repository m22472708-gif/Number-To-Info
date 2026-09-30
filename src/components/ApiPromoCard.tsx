import React, { useState } from 'react';
import { Code2, Send, Copy, Check, CheckCircle2 } from 'lucide-react';

interface ApiPromoCardProps {
  showToast: (msg: string) => void;
}

export const ApiPromoCard: React.FC<ApiPromoCardProps> = ({ showToast }) => {
  const [copied, setCopied] = useState(false);
  // Dummy example endpoint to protect real API credentials from being copied
  const exampleEndpoint = 'https://api.example.com/api/v1/query.php?key=YOUR_API_KEY&number=017XXXXXXXX';

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleEndpoint);
    setCopied(true);
    showToast('Copied example API endpoint!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 mt-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#091838] to-[#061026] border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.15)] relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-sky-400" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              API ENDPOINT
            </h3>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
            REST API
          </span>
        </div>

        {/* Telegram CTA Button with @H6679_0 */}
        <a
          href="https://t.me/H6679_0"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all text-center"
        >
          <Send className="w-4 h-4" />
          <span>Telegram-এ যোগাযোগ করুন (@H6679_0)</span>
        </a>

        {/* Bengali Pitch */}
        <p className="mt-3 text-xs text-slate-300 leading-relaxed text-center sm:text-left">
          আপনার ওয়েবসাইট বা অ্যাপের জন্য ডাটাবেজ API নিতে টেলিগ্রামে যোগাযোগ করুন।
        </p>

        {/* Example Code Snippet Box (matching Screenshot 3: https://api.uidfind...) */}
        <div className="mt-3 p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] rounded border border-emerald-500/30 shrink-0">
              GET
            </span>
            <span className="font-mono text-[11px] text-slate-300 truncate">
              https://api.example.com/api/v1/query.php?key=YOUR_API_KEY&number=017XXXXXXXX
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Feature Checks */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>JSON Output</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>High Speed (&lt;100ms)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Phone & UID Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};
