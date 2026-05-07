import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  ExternalLink, 
  ArrowUpRight, 
  BarChart, 
  MapPin,
  Globe,
  Settings,
  Plus,
  MessageCircle,
  Linkedin,
  Github
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function ParasiteSEO() {
  const platforms = [
    { name: 'Medium', authority: 95, difficulty: 'Moderate', speed: 'Fast' },
    { name: 'LinkedIn', authority: 98, difficulty: 'Low', speed: 'Medium' },
    { name: 'Reddit', authority: 91, difficulty: 'High', speed: 'Instant' },
    { name: 'Dev.to', authority: 89, difficulty: 'Low', speed: 'Fast' },
    { name: 'Quora', authority: 92, difficulty: 'Medium', speed: 'Medium' },
    { name: 'Hashnode', authority: 88, difficulty: 'Low', speed: 'Fast' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Parasite SEO Engine</h2>
        <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">High-Authority Host Simulation & Rank Stealing Architecture</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main relative overflow-hidden group">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-500" /> Target Deployment
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Campaign Name</label>
                  <input type="text" placeholder="e.g. Best E-com SEO Cluster" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-cyan-500/50" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Link Insertion Slot</label>
                  <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 outline-none focus:border-cyan-500/50">
                    <option>Top of Article (Aggressive)</option>
                    <option>Inline Contextual (Natural)</option>
                    <option>Bottom CTA (Safe)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-4 block">Select Hosting Cluster</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {platforms.map(p => (
                    <button key={p.name} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all text-left group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white uppercase italic tracking-tighter">{p.name}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">DR {p.authority}</span>
                        <ArrowUpRight className="w-3 h-3 text-gray-700 group-hover:text-cyan-500 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col md:flex-row gap-4 items-center">
                <button className="w-full md:w-auto px-10 py-4 bg-cyan-500 text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 uppercase italic tracking-tighter">
                  Execute Global Hijack <Zap className="w-5 h-5 fill-black" />
                </button>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                   <ShieldCheck className="w-4 h-4 text-green-500" />
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Detection Evasion Level: MAXIMUM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
              <BarChart className="w-4 h-4 text-cyan-500" /> Rank Trajectory
            </h3>
            <div className="h-64 border border-white/5 bg-black/40 rounded-2xl flex items-center justify-center relative overflow-hidden">
               <motion.div 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                className="absolute inset-0 flex items-center justify-center opacity-10"
               >
                 <BarChart className="w-48 h-48" />
               </motion.div>
               <div className="text-center space-y-2 z-10">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600 italic">Establishing Base Authority Metrics...</p>
                 <p className="text-xs text-gray-500 max-w-xs px-8 italic">Choose a platform cluster and start a campaign to track search performance and ranking velocity.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
             <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-500" /> Platform Insights
             </h3>
             <div className="space-y-6 text-white font-medium">
                {[
                  { label: 'Medium', val: 'Indexing: 4m', color: 'text-cyan-400' },
                  { label: 'LinkedIn', val: 'Human Score: 98%', color: 'text-blue-500' },
                  { label: 'Reddit', val: 'Ban Risk: Low', color: 'text-green-500' },
                  { label: 'Quora', val: 'Traffic: Moderate', color: 'text-amber-500' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{item.label}</span>
                    <span className={cn("text-[10px] font-bold uppercase tracking-tighter italic", item.color)}>{item.val}</span>
                  </div>
                ))}
             </div>
             <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
               <p className="text-[9px] uppercase tracking-widest font-bold text-gray-600 mb-2">Automated Engagement Cluster</p>
               <div className="flex gap-2">
                 {[MessageCircle, Linkedin, Github, Globe].map((Icon, i) => (
                   <div key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 hover:border-cyan-500/20 transition-all cursor-not-allowed grayscale group">
                     <Icon className="w-4 h-4 text-gray-600 group-hover:text-cyan-500" />
                   </div>
                 ))}
               </div>
             </div>
           </div>

           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main group relative overflow-hidden">
             <div className="relative z-10 flex flex-col items-center text-center">
               <MapPin className="w-10 h-10 text-cyan-500/30 mb-4" />
               <h4 className="text-xs font-bold text-white mb-2 uppercase italic tracking-widest">Niche-Relevant Clustering</h4>
               <p className="text-[10px] text-gray-500 leading-relaxed max-w-xs">We automatically select platforms and publication times based on your target niche for maximum impact.</p>
               <button className="mt-6 w-full py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all italic">
                 Configure Niche Matrix
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
