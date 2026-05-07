import React, { useState } from 'react';
import { 
  Share2, 
  Plus, 
  ExternalLink, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Globe, 
  CreditCard,
  Zap,
  Calendar,
  CloudCog,
  ChevronRight,
  ShieldCheck,
  Power
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export function Web20Publisher() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'history'>('integrations');

  const platforms = [
    { id: 'medium', name: 'Medium', icon: 'M', status: 'connected', url: 'medium.com' },
    { id: 'hashnode', name: 'Hashnode', icon: 'H', status: 'connected', url: 'hashnode.dev' },
    { id: 'devto', name: 'Dev.to', icon: 'D', status: 'disconnected', url: 'dev.to' },
    { id: 'blogger', name: 'Blogger', icon: 'B', status: 'connected', url: 'blogger.com' },
    { id: 'tumblr', name: 'Tumblr', icon: 'T', status: 'disconnected', url: 'tumblr.com' },
    { id: 'wordpress', name: 'WordPress', icon: 'W', status: 'connected', url: 'wordpress.com' },
  ];

  const publications = [
    { id: 1, title: 'Mastering Technical SEO in 2026', platform: 'Medium', status: 'published', date: '2h ago', url: '#' },
    { id: 2, title: 'The Rise of AI-First Crawling', platform: 'Hashnode', status: 'published', date: '5h ago', url: '#' },
    { id: 3, title: 'Core Web Vitals: A Deep Dive', platform: 'Blogger', status: 'scheduled', date: 'Tomorrow, 9:00 AM', url: '#' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Syndication Hub</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Multi-Platform Distribution Cluster Management</p>
        </div>
        <div className="flex bg-sidebar-bg p-1.5 rounded-xl border border-border-main shadow-xl">
          <button 
            onClick={() => setActiveTab('integrations')}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter transition-all",
              activeTab === 'integrations' ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "text-gray-500 hover:text-white"
            )}
          >
            Connected Clusters
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter transition-all",
              activeTab === 'history' ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "text-gray-500 hover:text-white"
            )}
          >
            Transmission History
          </button>
        </div>
      </div>

      {activeTab === 'integrations' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={p.id}
              className="p-6 rounded-xl bg-sidebar-bg border border-border-main relative group hover:border-cyan-500/30 transition-all overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/10 transition-colors">
                    <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors italic">{p.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase italic tracking-tighter">{p.name}</h4>
                    <p className="text-[10px] text-gray-500 font-medium tracking-tighter uppercase">{p.url}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border",
                  p.status === 'connected' ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-red-500/10 border-red-500/20 text-red-500"
                )}>
                  {p.status}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-600">
                  <span>API Latency</span>
                  <span className="text-gray-400">124ms</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-600">
                  <span>Security Level</span>
                  <span className="text-green-500 italic">Military Grade</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex gap-2">
                {p.status === 'connected' ? (
                  <>
                    <button className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white transition-all">
                      Diagnostics
                    </button>
                    <button className="px-4 py-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl text-gray-500 transition-all">
                      <Power className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button className="w-full py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" /> Initialize Connection
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <button className="p-6 rounded-3xl bg-transparent border border-dashed border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all flex flex-col items-center justify-center gap-4 group">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Request Custom Endpoint</p>
          </button>
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Transmission Title</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Target Node</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Signal Status</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Timestamp</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-gray-500 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {publications.map((pub) => (
                  <tr key={pub.id} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="py-6 min-w-[300px]">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-sm font-bold text-white uppercase italic tracking-tighter truncate">{pub.title}</span>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className="text-xs text-gray-400 font-mono italic">@{pub.platform}</span>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-2">
                        {pub.status === 'published' ? (
                          <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-500" />
                        )}
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
                          pub.status === 'published' ? "bg-cyan-500/10 text-cyan-400" : "bg-amber-500/10 text-amber-500"
                        )}>
                          {pub.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{pub.date}</span>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white/5 rounded-lg hover:text-cyan-400 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/5 rounded-lg hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-cyan-400 transition-colors flex items-center gap-2">
              Sync Full Metadata History <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Distribution Strategy CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5 relative overflow-hidden group">
          <Share2 className="w-12 h-12 text-indigo-500/30 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold text-white mb-4 italic uppercase tracking-tighter">Cluster Scheduling</h3>
          <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">Advanced queuing system that distributes articles across platforms with randomized delays to maximize human-pattern simulation.</p>
          <button className="px-8 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-indigo-400 transition-all flex items-center gap-2">
             <Calendar className="w-4 h-4" /> Configure Scheduler
          </button>
          
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none" />
        </div>

        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-green-500/10 to-transparent border border-white/5 relative overflow-hidden group">
          <ShieldCheck className="w-12 h-12 text-green-500/30 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold text-white mb-4 italic uppercase tracking-tighter">Canonical Safety</h3>
          <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">Our engine automatically injects canonical tags and cross-domain headers to prevent duplicate content penalties and preserve authority.</p>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Protection Active</span>
          </div>
          
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-green-500/5 blur-[80px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
