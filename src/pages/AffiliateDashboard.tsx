import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  DollarSign, 
  BarChart3, 
  Link as LinkIcon, 
  Copy, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Download,
  Wallet
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockData = [
  { day: '01', clicks: 45, signups: 12 },
  { day: '02', clicks: 52, signups: 15 },
  { day: '03', clicks: 38, signups: 8 },
  { day: '04', clicks: 65, signups: 18 },
  { day: '05', clicks: 48, signups: 10 },
  { day: '06', clicks: 55, signups: 22 },
  { day: '07', clicks: 70, signups: 25 },
];

export function AffiliateDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, `users/${user.uid}/affiliate_stats/main`), (doc) => {
      setStats(doc.data());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const referralLink = stats?.referralCode 
    ? `${window.location.origin}/auth?ref=${stats.referralCode}`
    : 'Not generated';

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Affiliate link copied to memory");
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Affiliate Nexus</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-indigo-500 underline underline-offset-4">Performance-Based Growth & Multi-Level Commission Matrix</p>
        </div>
        <div className="flex bg-sidebar-bg p-1.5 rounded-xl border border-border-main shadow-xl">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg text-[10px] font-bold uppercase tracking-widest italic">
            <Download className="w-3 h-3" /> Export Statements
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Network Clicks', val: stats?.totalClicks || 0, icon: BarChart3, color: 'text-blue-500' },
          { label: 'Operative Signups', val: stats?.totalSignups || 0, icon: Users, color: 'text-indigo-500' },
          { label: 'Pending Commissions', val: `$${stats?.pendingCommissions?.toFixed(2) || '0.00'}`, icon: Wallet, color: 'text-amber-500' },
          { label: 'Total Output', val: `$${stats?.totalEarned?.toFixed(2) || '0.00'}`, icon: DollarSign, color: 'text-emerald-500' },
        ].map((s, i) => (
          <div key={i} className="p-6 rounded-xl bg-sidebar-bg border border-border-main relative group overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                <s.icon className={cn("w-5 h-5", s.color)} />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white uppercase italic tracking-tighter">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Referral Link Card */}
          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-2 italic">
              <LinkIcon className="w-4 h-4 text-indigo-500" /> Unique Referral Identifier
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-4 font-mono text-sm text-indigo-400/80 truncate">
                {referralLink}
              </div>
              <button 
                onClick={copyLink}
                className="px-8 py-4 bg-indigo-500 text-black font-bold rounded-xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-2 uppercase italic tracking-tighter shadow-xl shadow-indigo-500/20"
              >
                <Copy className="w-4 h-4" /> Copy Link
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-gray-600">
               <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> 20% Base Commission</span>
               <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Lifetime Cookie Attribution</span>
            </div>
          </div>

          {/* Traffic Chart */}
          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main relative">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2 italic">
              <BarChart3 className="w-4 h-4 text-indigo-500" /> Conversion Trajectory
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                   <defs>
                    <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis dataKey="day" stroke="#374151" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#374151" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1f2937', borderRadius: '12px' }}
                    itemStyle={{ color: '#6366f1', fontSize: '10px', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="clicks" stroke="#6366f1" fillOpacity={1} fill="url(#colorInd)" strokeWidth={2} />
                  <Area type="monotone" dataKey="signups" stroke="#10b981" fillOpacity={0} strokeWidth={2} dashed />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2 italic">
                <Wallet className="w-4 h-4 text-indigo-500" /> Payout Management
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Minimum Threshold</p>
                    <p className="text-sm font-bold text-white">$50.00</p>
                  </div>
                  <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-indigo-500" />
                  </div>
                </div>
                <button 
                  disabled={true}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] items-center justify-center font-bold uppercase tracking-widest text-gray-500 cursor-not-allowed italic"
                >
                  Request Payout Allocation
                </button>
              </div>
           </div>

           <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 group relative overflow-hidden">
              <TrendingUp className="w-12 h-12 text-indigo-500/20 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-bold text-white uppercase italic tracking-tighter mb-2">Alpha Accelerator Program</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-6">Scale to 50+ referrals to unlock 35% recurring commissions and agency white-label portals.</p>
              <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                View Requirements <ChevronRight className="w-3 h-3" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
