import React, { useState } from 'react';
import {
  User,
  Phone,
  Radio,
  Copy,
  Check,
  RotateCcw,
  Globe,
  Sparkles,
  Lock,
} from 'lucide-react';
import { LookupResult } from '../types';

interface ResultCardProps {
  result: LookupResult;
  onResetSearch: () => void;
  showToast: (msg: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onResetSearch,
  showToast,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAllSummary = () => {
    const summary = `Lookup Details for ${result.phoneNumber}:
Full Name: ${result.fullName}
Operator: ${result.operator}
Gender: ${result.gender}`;
    navigator.clipboard.writeText(summary);
    showToast('Copied summary to clipboard!');
  };

  const isFemale = result.gender.toLowerCase().includes('female') || result.gender.toLowerCase().includes('নারী');
  const hasPublicProfile = result.isVerified && result.fullName !== 'পাবলিক নয় (Not Public)';

  return (
    <div className="w-full max-w-lg mx-auto px-4 mt-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Primary Identity Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#07132a] border border-blue-500/40 shadow-[0_0_40px_rgba(37,99,235,0.18)]">
        {/* Top dot grid decoration banner */}
        <div className="h-16 bg-gradient-to-r from-blue-900/40 via-blue-700/30 to-blue-950/40 relative border-b border-blue-500/20">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Badges on banner */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between">
            {hasPublicProfile ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-medium text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Verified Record
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-[11px] font-medium text-sky-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                Official Telecom
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 text-[11px] font-medium text-sky-300">
              <Globe className="w-3 h-3 text-sky-400" />
              Live Record
            </span>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="px-5 pt-0 pb-5 text-center -mt-9">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 p-1 border-2 border-sky-400/60 shadow-xl shadow-blue-500/30 mx-auto flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <User className="w-11 h-11 text-blue-300" />
              </div>
            </div>
            {/* Active dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-[0_0_8px_#10b981]" />
          </div>

          {/* Gender pill based on Name */}
          <div className="mt-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                isFemale
                  ? 'bg-rose-950/60 border-rose-500/40 text-rose-300 shadow-sm'
                  : 'bg-blue-950/60 border-blue-500/40 text-sky-300 shadow-sm'
              }`}
            >
              <span>{result.gender}</span>
            </span>
          </div>

          {/* Full Name & Operator */}
          <div className="mt-2.5">
            <p className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
              FULL NAME (পূর্ণ নাম)
            </p>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5 break-words">
              {result.fullName}
            </h2>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="font-mono text-base font-semibold text-slate-200">
                {result.phoneNumber}
              </span>
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${
                  result.operatorColor || 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                }`}
              >
                {result.operator}
              </span>
            </div>
          </div>

          {/* Unlisted notice */}
          {!hasPublicProfile && (
            <div className="mt-3 p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-left flex items-start gap-2 text-[11px] text-slate-300">
              <Lock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p>
                এই নাম্বারের নাম পাবলিক ডাটাবেজে উন্মুক্ত নয় (Private)। তবে BTRC বরাদ্দকৃত সিম অপারেটর সংক্রান্ত তথ্য নিচে দেখানো হয়েছে।
              </p>
            </div>
          )}

          {/* Action Buttons: Call Now & Copy */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${result.phoneNumber}`}
              className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <button
              type="button"
              onClick={copyAllSummary}
              className="py-2.5 px-3 bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Streamlined Profile Information Section (Only Name, Phone, Operator, Gender) */}
      <div className="rounded-2xl bg-[#07132a] border border-blue-500/20 shadow-lg p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-sky-400" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Profile Information
            </h3>
          </div>

          <button
            type="button"
            onClick={onResetSearch}
            className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Search Another</span>
          </button>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-800/60 text-xs">
          {/* Full Name */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-400 shrink-0">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Full Name</span>
            </div>
            <span className="font-semibold text-white text-right break-words max-w-[65%]">
              {result.fullName}
            </span>
          </div>

          {/* Phone Number */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phone Number</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-semibold text-slate-100">{result.phoneNumber}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(result.phoneNumber, 'Phone')}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Copy phone"
              >
                {copiedField === 'Phone' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Operator */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              <span>Telecom Operator</span>
            </div>
            <span className="font-semibold text-sky-400 text-right">{result.operator}</span>
          </div>

          {/* Gender (Determined by Name) */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-3.5 h-3.5 text-rose-400 font-bold flex items-center justify-center">
                {isFemale ? '♀' : '♂'}
              </span>
              <span>Gender (নাম অনুযায়ী)</span>
            </div>
            <span className="font-semibold text-slate-100 text-right">{result.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
