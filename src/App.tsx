import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { FeatureCards } from './components/FeatureCards';
import { ApiPromoCard } from './components/ApiPromoCard';
import { Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { LookupResult } from './types';
import { lookupNumberOrUid } from './services/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [rateLimitNotice, setRateLimitNotice] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSearch = async (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : query;
    const clean = q.trim();
    if (!clean) return;

    setIsLoading(true);
    setRateLimitNotice(null);

    // Auto-detect mode: if starts with '1000' and length >= 10, treat as uid, else phone
    const isUid = clean.startsWith('1000') && clean.length >= 10;
    const mode = isUid ? 'uid' : 'phone';

    try {
      const response = await lookupNumberOrUid(clean, mode);
      setResult(response.result);

      if (response.isRateLimited) {
        setRateLimitNotice(
          'API-এর রিকোয়েস্ট লিমিট শেষ হয়েছে। অনুগ্রহ করে একটু পর আবার চেষ্টা করুন।'
        );
        showToast('⚠️ লিমিট শেষ হয়েছে! একটু পর আবার চেষ্টা করুন।');
      } else {
        showToast('Public records retrieved successfully');
      }

      // On mobile, scroll smoothly down to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (e: any) {
      console.error('Lookup notice:', e);
      showToast('Error retrieving records. Please check the number.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSearch = () => {
    setResult(null);
    setRateLimitNotice(null);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between pb-12 relative selection:bg-blue-600/30 selection:text-sky-200">
      {/* Background ambient radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-600/8 rounded-full blur-[130px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full flex flex-col flex-1">
        {/* App Header (Clean brand + Live Database) */}
        <Header />

        <main className="flex-1 w-full pb-6">
          {/* Enhanced Mobile-Friendly Search Input Bar */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            onClear={() => {
              setResult(null);
              setRateLimitNotice(null);
            }}
            isLoading={isLoading}
          />

          {/* Rate Limit Notice Banner (Shows when API limit is exhausted) */}
          {rateLimitNotice && (
            <div className="w-full max-w-lg mx-auto px-4 mt-3 animate-in fade-in duration-300">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] text-amber-200 flex items-start gap-3 backdrop-blur-md">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-amber-300">
                    সার্ভার লিমিট শেষ হয়েছে!
                  </h4>
                  <p className="text-[11px] sm:text-xs text-amber-200/90 leading-relaxed">
                    {rateLimitNotice}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Anchor for auto-scroll on mobile */}
          <div ref={resultRef} className="scroll-mt-4">
            {/* Display Streamlined Result Card if found */}
            {result ? (
              <ResultCard
                result={result}
                onResetSearch={handleResetSearch}
                showToast={showToast}
              />
            ) : (
              /* Empty State Container (Matching Screenshot 2) */
              <div className="w-full max-w-lg mx-auto px-4 mt-6">
                <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-[#07132a]/95 to-[#040c1d]/95 border border-blue-900/40 text-center shadow-[0_0_30px_rgba(37,99,235,0.12)]">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/25 to-sky-500/10 border border-sky-400/30 flex items-center justify-center mx-auto mb-3.5 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                    <Search className="w-7 h-7 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    Search{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                      Public Information
                    </span>
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xs mx-auto">
                    Enter any mobile number or Facebook UID in the search bar above to view verified details.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 4 Feature Badges (Matching Screenshots 1, 2, 3) */}
          <FeatureCards />

          {/* API Endpoint Promo Card with @H6679_0 and example endpoint */}
          <ApiPromoCard showToast={showToast} />
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 w-auto max-w-[90vw]">
          <div className="px-4 py-2.5 rounded-xl bg-slate-900/95 border border-blue-500/40 text-white text-xs font-medium shadow-2xl flex items-center gap-2 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Subtle Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-500 mt-6 pt-4 border-t border-slate-900">
        <p>© 2026 Number to Info. All public records verified.</p>
      </footer>
    </div>
  );
}
