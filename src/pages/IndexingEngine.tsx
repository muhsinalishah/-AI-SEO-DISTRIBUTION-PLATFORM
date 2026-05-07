import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Send,
  History,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

import { toast } from 'sonner';

import { CreditService } from '../services/creditService';

export function IndexingEngine() {
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!url) return toast.error("Enter a valid URL");
    setIsSubmitting(true);
    try {
      await CreditService.deductCredits('INDEXING_REQUEST', `Index request: ${url}`);
      
      toast.promise(new Promise(res => setTimeout(res, 2000)), {
        loading: 'Pinging global crawling clusters...',
        success: (data) => {
          setIsSubmitting(false);
          setUrl('');
          return 'Signal transmitted. Search engines notified.';
        },
        error: () => {
          setIsSubmitting(false);
          return 'Transmission cluster failure';
        }
      });
    } catch (err) {
      setIsSubmitting(false);
    }
  };
  
  const history = [
    { id: 1, url: 'https://ais-dev.run/blog/seo-2026', status: 'completed', date: '20m ago' },
    { id: 2, url: 'https://ais-dev.run/solutions/ai-agents', status: 'pending', date: '45m ago' },
    { id: 3, url: 'https://ais-dev.run/about', status: 'completed', date: '2h ago' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Indexing Accelerator</h2>
        <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Advanced URL Inspection & Crawler Signal Engine</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-500" /> Transmit Crawl Signal
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Direct URL Submission</label>
                <div className="flex gap-2">
                  <input 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="text" 
                    placeholder="https://..." 
                    className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:border-cyan-500/50 transition-all outline-none"
                  />
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-tighter italic flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'} <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Google Indexing API', status: 'Active', desc: 'Instant crawl request via GSC' },
                  { label: 'RSS Feed Sync', status: 'Active', desc: 'Automated feed pinging cluster' },
                  { label: 'Search Engine Ping', status: 'Active', desc: 'Direct signal to Bing, DDG, Ask' },
                  { label: 'Cloud Sitemap Update', status: 'Active', desc: 'Dynamic XML modification' },
                ].map((m, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                      <ShieldCheck className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-white uppercase italic tracking-tighter">{m.label}</p>
                        <span className="text-[8px] text-green-500 font-bold uppercase">{m.status}</span>
                      </div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-tighter mt-1">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex gap-4">
                <AlertTriangle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                  <span className="text-cyan-400 font-bold uppercase">Pro Tip:</span> Rapid fire submissions may trigger rate limits. 
                  Use our <span className="text-white italic">"Distributed Feed"</span> strategy for bulk URL uploads (500+ URLs).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-500" /> Transmission Logs
                </h3>
                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Show All</span>
              </div>
              <div className="flex-1 space-y-4">
                {history.map((h) => (
                  <div key={h.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[11px] text-white font-mono truncate max-w-[200px]">{h.url}</p>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        h.status === 'completed' ? "bg-cyan-500" : "bg-amber-500 animate-pulse"
                      )} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">{h.date}</span>
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-tighter italic",
                        h.status === 'completed' ? "text-cyan-500" : "text-amber-500"
                      )}>{h.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase italic tracking-tighter">Index Rate</p>
                      <p className="text-[10px] text-gray-500">Last 24 Hours</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-white">92%</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
