import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full pt-5 sm:pt-6 pb-2.5 px-4 max-w-lg mx-auto">
      {/* Top Utility Row: Emblem & Live Database Status */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          {/* Glowing 3D Glass Emblem with Emerald Live Pulse */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 p-[1.5px] shadow-[0_0_20px_rgba(56,189,248,0.45)]">
              <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#0a1c3d] to-[#040e24] flex items-center justify-center">
                <Phone className="w-4 h-4 text-sky-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              </div>
            </div>
            {/* Live Indicator Pulse */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-[#030712] shadow-[0_0_8px_#10b981]"></span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-950/60 border border-blue-500/30 text-[10px] font-semibold tracking-wider text-sky-300 uppercase">
            <ShieldCheck className="w-3 h-3 text-sky-400" />
            <span>Public Database</span>
          </div>
        </div>

        {/* Live Database Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08193d]/90 border border-sky-500/35 text-xs font-semibold text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.18)] backdrop-blur-md shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span>Live Database</span>
        </div>
      </div>

      {/* Main Title & Full Subtitle — NOT squeezed into 1 single line, 100% visible! */}
      <div className="mt-1">
        <h1 className="text-2xl sm:text-[28px] font-black tracking-tight leading-tight">
          <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
            Number to
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-300 drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]">
            Info
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300/90 font-medium mt-1 leading-normal">
          Get public information from phone number
        </p>
      </div>
    </header>
  );
};
