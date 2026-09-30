import React from 'react';
import { Phone, Search, X, CheckCircle2, Loader2 } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (customQuery?: string) => void;
  onClear?: () => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSearch,
  onClear,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSearch();
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim() && onClear) {
      onClear();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-3.5 sm:px-4 mt-3 sm:mt-4">
      <form onSubmit={handleSubmit} className="relative">
        {/* Glow container wrapper */}
        <div className="relative group">
          {/* Neon blue ambient glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl opacity-50 group-hover:opacity-75 blur-md transition duration-300 pointer-events-none" />

          {/* Main search bar box */}
          <div className="relative p-1.5 sm:p-2 bg-[#061126] border border-blue-500/60 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.28)] backdrop-blur-2xl">
            <div className="flex items-center gap-2">
              {/* Phone Icon Circle */}
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center shrink-0 shadow-inner">
                <Phone className="w-5 h-5 text-sky-400" />
              </div>

              {/* Input */}
              <input
                type="text"
                inputMode="text"
                enterKeyHint="search"
                value={query}
                onChange={handleChange}
                placeholder="Enter number or Facebook UID..."
                className="flex-1 min-w-0 bg-transparent py-2.5 px-1 text-white placeholder-slate-400 font-mono text-[15px] sm:text-base focus:outline-none tracking-wide"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />

              {/* Clear (X) Button */}
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 active:scale-90 transition-all shrink-0 cursor-pointer"
                  title="Clear input and result"
                  aria-label="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Search Button */}
              <button
                type="submit"
                onClick={() => {
                  if (query.trim() && !isLoading) onSearch();
                }}
                disabled={isLoading || !query.trim()}
                className="px-3.5 sm:px-5 py-2.5 sm:py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none rounded-xl text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all shrink-0 cursor-pointer min-h-[42px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="hidden xs:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-2.5 flex items-center gap-2 px-1 text-[11px] sm:text-xs text-slate-400 leading-tight">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Only public information is shown. We do not collect or store any data.</span>
        </div>
      </form>
    </div>
  );
};
