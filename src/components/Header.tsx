import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full pt-5 sm:pt-6 pb-2 px-3.5 sm:px-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between gap-2.5">
        {/* Brand Identity & Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Circular Glowing Icon with Emerald Live Pulse */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-blue-700 p-0.5 shadow-[0_0_22px_rgba(37,99,235,0.5)]">
              <div className="w-full h-full rounded-full bg-[#051126] flex items-center justify-center">
                <Phone className="w-5 h-5 text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]" />
              </div>
            </div>
            {/* Live Status Active Dot */}
            <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#030712] shadow-[0_0_8px_#10b981]"></span>
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-[21px] sm:text-[25px] font-black tracking-tight leading-tight font-['Outfit',sans-serif]">
                <span className="text-white drop-shadow-sm">Number</span>{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                  to Info
                </span>
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5 truncate tracking-normal">
              Get public information from phone number
            </p>
          </div>
        </div>

        {/* Live Database Status Pill (Responsive so it never squishes the title) */}
        <div className="shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#071635] border border-blue-500/40 text-[11px] sm:text-xs font-semibold text-sky-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="hidden xs:inline whitespace-nowrap">Live Database</span>
            <span className="xs:hidden">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
};
