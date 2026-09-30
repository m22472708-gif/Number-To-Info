import React from 'react';
import { ShieldCheck, Lock, Smartphone, Shield, Info } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      iconColor: 'text-white',
      iconBg: 'bg-emerald-500',
      title: 'Fast & Easy',
      subtitle: 'Get info in seconds',
    },
    {
      icon: Lock,
      iconColor: 'text-white',
      iconBg: 'bg-blue-500',
      title: '100% Public Data',
      subtitle: 'No login required',
    },
    {
      icon: Smartphone,
      iconColor: 'text-white',
      iconBg: 'bg-purple-500',
      title: 'Mobile Friendly',
      subtitle: 'Works on all devices',
    },
    {
      icon: Shield,
      iconColor: 'text-white',
      iconBg: 'bg-amber-500',
      title: 'Safe & Secure',
      subtitle: 'Your privacy matters',
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-4 mt-6 space-y-3.5">
      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="p-3.5 rounded-2xl bg-[#07132a]/90 border border-blue-900/40 text-center flex flex-col items-center justify-center hover:border-blue-500/40 transition-all duration-200"
            >
              <div
                className={`w-10 h-10 rounded-full ${feat.iconBg} flex items-center justify-center shadow-md mb-2`}
              >
                <Icon className={`w-5 h-5 ${feat.iconColor}`} />
              </div>
              <h4 className="text-xs font-bold text-white tracking-wide">
                {feat.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {feat.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Note Callout Box matching screenshots */}
      <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5 text-sky-400" />
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <span className="font-semibold text-white">Note:</span> This tool only
          works with public information. We do not store any data or access
          private information.
        </p>
      </div>
    </div>
  );
};
