import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink, 
  TrendingUp, 
  ShieldAlert, 
  Globe,
  Database,
  BarChart2,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';

export function ExpiredDomainFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockDomains = [
    { domain: 'seo-mastery.com', da: 42, pa: 38, spam: '1%', niche: 'Marketing', price: '$450' },
    { domain: 'tech-insights.net', da: 28, pa: 25, spam: '2%', niche: 'Tech', price: 'Auction' },
    { domain: 'health-hub.io', da: 35, pa: 32, spam: '1%', niche: 'Health', price: '$800' },
    { domain: 'travel-vibes.org', da: 22, pa: 19, spam: '5%', niche: 'Travel', price: '$200' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Domain Discovery Cabinet</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Expired Domain Scraping & Authority Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 rounded-xl bg-sidebar-bg border border-border-main space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
              <Filter className="w-3 h-3 text-cyan-500" /> Filter Parameters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-600 mb-2 block">Min DA</label>
                <input type="range" className="w-full accent-cyan-500" min="0" max="100" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-600 mb-2 block">Max Spam Score</label>
                <select className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-400 outline-none">
                  <option>Under 5%</option>
                  <option>Under 10%</option>
                  <option>Any</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-600 mb-2 block">TLD Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  {['.com', '.net', '.org', '.io'].map(tld => (
                    <button key={tld} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-500 hover:text-white transition-all">
                      {tld}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-cyan-500 text-black font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-all italic">
              Apply Global Filters
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-white/5 space-y-4">
             <ShieldAlert className="w-8 h-8 text-amber-500/50" />
             <h4 className="text-xs font-bold text-white uppercase italic tracking-tighter">Archive Guard active</h4>
             <p className="text-[10px] text-gray-500 leading-relaxed">Automatically checking Wayback Machine history to ensure clean domain history before purchase.</p>
          </div>
        </div>

        {/* Search & Results */}
        <div className="lg:col-span-9 space-y-6 text-white font-medium">
          <div className="flex gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search expired domains by keyword..." 
                className="w-full bg-sidebar-bg border border-border-main rounded-xl pl-12 pr-4 py-4 text-sm text-gray-300 outline-none focus:border-cyan-500/40 transition-all shadow-xl"
              />
            </div>
            <button className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Fetch Fresh Data
            </button>
          </div>

          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main relative overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-white/5">
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Domain Node</th>
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">DA/PA</th>
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Spam Score</th>
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Price/Type</th>
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500 text-right">Acquire</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 text-white font-medium">
                   {mockDomains.map((d, i) => (
                     <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                       <td className="py-5">
                         <div className="flex items-center gap-3">
                           <Globe className="w-4 h-4 text-gray-600" />
                           <span className="text-sm font-bold text-white uppercase italic tracking-tighter">{d.domain}</span>
                         </div>
                       </td>
                       <td className="py-5">
                         <div className="flex items-center gap-2 font-mono">
                           <span className="text-cyan-400">{d.da}</span>
                           <span className="text-gray-700">/</span>
                           <span className="text-gray-500">{d.pa}</span>
                         </div>
                       </td>
                       <td className="py-5">
                         <span className={cn(
                           "text-[10px] font-bold uppercase p-1 rounded",
                           parseInt(d.spam) < 3 ? "text-green-500 bg-green-500/5 border border-green-500/10" : "text-amber-500 bg-amber-500/5 border border-amber-500/10"
                         )}>{d.spam} SS</span>
                       </td>
                       <td className="py-5">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d.price}</span>
                       </td>
                       <td className="py-5 text-right">
                         <button className="p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-cyan-500 hover:text-black transition-all">
                           <ExternalLink className="w-4 h-4" />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <Database className="w-10 h-10 text-cyan-500/20" />
                 <div>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Database Size</p>
                   <p className="text-lg font-bold text-white uppercase italic tracking-tighter">4.2M Domains Cached</p>
                 </div>
               </div>
               <TrendingUp className="w-6 h-6 text-cyan-500" />
             </div>
             <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <BarChart2 className="w-10 h-10 text-cyan-500/20" />
                 <div>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Avg DA Found</p>
                   <p className="text-lg font-bold text-white uppercase italic tracking-tighter">35.4 Core authority</p>
                 </div>
               </div>
               <div className="w-12 h-6 bg-cyan-500/10 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full" />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
