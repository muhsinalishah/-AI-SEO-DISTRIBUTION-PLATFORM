import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Sparkles, 
  Layers, 
  Zap, 
  CheckCircle2, 
  RefreshCw,
  Plus,
  TrendingUp,
  Cpu,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export function BacklinkAI() {
  const [targetUrl, setTargetUrl] = useState('');
  
  const tiers = [
    { id: 'tier1', label: 'Tier 1 Contextual', count: 12, quality: 'Premium', status: 'ready' },
    { id: 'tier2', label: 'Tier 2 Niche Web 2.0', count: 85, quality: 'High', status: 'processing' },
    { id: 'tier3', label: 'Tier 3 Social Signals', count: 450, quality: 'Standard', status: 'queued' },
  ];

  const handleBuild = () => {
    if (!targetUrl) return toast.error("Enter target URL");
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Initializing link graph...',
      success: 'Clustering contextual nodes started',
      error: 'Cluster failure'
    });
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Contextual AI Engine</h2>
        <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Advanced Semantic Backlink Architecture & Mapping</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main relative overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-500" /> Start Backlink Campaign
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Target URL</label>
                  <input 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    type="text" 
                    placeholder="https://yourwebsite.com/post-url" 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:border-cyan-500/50 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Link Velocity (Per Day)</label>
                  <input type="range" className="w-full accent-cyan-500 mt-4" />
                  <div className="flex justify-between text-[8px] font-bold text-gray-600 uppercase mt-2">
                    <span>Safe (5-10)</span>
                    <span>Aggressive (50+)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6">
                 <button 
                  onClick={handleBuild}
                  className="px-10 py-4 bg-cyan-500 text-black font-bold rounded-2xl flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 uppercase italic tracking-tighter"
                 >
                   Deploy Link Cluster <Sparkles className="w-5 h-5" />
                 </button>
                 <div className="flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-green-500" />
                   <span className="text-[10px] font-bold text-green-500/70 uppercase tracking-widest">Natural Footprint Guard Active</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
            <Layers className="w-20 h-20 text-white/[0.02] absolute" />
            <div className="relative text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-cyan-500/30 mx-auto animate-spin" />
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest italic">Visualizing Link Graph...</h4>
              <p className="text-[10px] text-gray-600 max-w-xs mx-auto">Establish a target URL to visualize the semantic relationships and tiered structure of your campaign.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
             <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-500" /> Tier Architecture
             </h3>
             <div className="space-y-4">
               {tiers.map((tier) => (
                 <div key={tier.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                   <div className="flex justify-between items-start mb-2">
                     <p className="text-xs font-bold text-white uppercase italic tracking-tighter">{tier.label}</p>
                     <span className="text-[8px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-500 rounded border border-cyan-500/20 font-bold uppercase">{tier.quality}</span>
                   </div>
                   <div className="flex justify-between items-end">
                     <p className="text-[10px] text-gray-500 font-medium">Built: <span className="text-gray-300">{tier.count}</span></p>
                     {tier.status === 'processing' ? (
                       <RefreshCw className="w-3 h-3 text-amber-500 animate-spin" />
                     ) : tier.status === 'ready' ? (
                        <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                     ) : (
                        <Clock className="w-3 h-3 text-gray-700" />
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>

           <div className="p-8 rounded-xl bg-gradient-to-br from-blue-600/10 via-sidebar-bg to-sidebar-bg border border-border-main relative group overflow-hidden">
             <div className="relative z-10">
               <Cpu className="w-10 h-10 text-blue-500/40 mb-4" />
               <h4 className="text-sm font-bold text-white mb-2 uppercase italic tracking-tighter">Automatic Diversity</h4>
               <p className="text-[10px] text-gray-500 leading-relaxed font-medium">Our AI diversification algorithm ensures a mix of DOFOLLOW and NOFOLLOW links from distinct TLDs and IP blocks.</p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none group-hover:scale-150 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
}
