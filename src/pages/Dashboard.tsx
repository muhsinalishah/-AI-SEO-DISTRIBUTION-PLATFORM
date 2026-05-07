import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Zap, 
  Link as LinkIcon, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  Terminal,
  Package
} from 'lucide-react';
import { useAuth } from '../App';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', indexing: 400, backlinks: 240 },
  { name: 'Tue', indexing: 300, backlinks: 139 },
  { name: 'Wed', indexing: 200, backlinks: 980 },
  { name: 'Thu', indexing: 278, backlinks: 390 },
  { name: 'Fri', indexing: 189, backlinks: 480 },
  { name: 'Sat', indexing: 239, backlinks: 380 },
  { name: 'Sun', indexing: 349, backlinks: 430 },
];

export function Dashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Submissions', value: '1,284', trend: '+12.5%', trendType: 'up', icon: Search },
    { label: 'Indexed URLs', value: '842', trend: '+18.2%', trendType: 'up', icon: CheckCircle2 },
    { label: 'Backlinks', value: '4,102', trend: '+5.4%', trendType: 'up', icon: LinkIcon },
    { label: 'Success Rate', value: '98.5%', trend: '+0.2%', trendType: 'up', icon: Zap },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Analytical Overview</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Real-time distribution metrics & performance logs</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2 pr-4 py-1.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
            <Clock className="w-3 h-3 text-cyan-400" /> Auto-Refresh Active
          </span>
          <button className="px-4 py-2 bg-cyan-500 text-black text-xs font-bold rounded-lg hover:bg-cyan-400 transition-all uppercase tracking-tighter italic">
            Execute Global Ping
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-sidebar-bg border border-border-main relative group hover:border-cyan-500/30 transition-all overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <stat.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter",
                stat.trendType === 'up' ? "text-green-500" : "text-red-500"
              )}>
                {stat.trend} {stat.trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{stat.label}</p>
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-[40px] -z-10 group-hover:bg-cyan-500/10 transition-all" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-8 rounded-xl bg-sidebar-bg border border-border-main">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-500" /> Distribution Velocity
            </h3>
            <div className="flex gap-2">
              {['7D', '30D', '90D'].map(period => (
                <button key={period} className={cn(
                  "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter transition-all",
                  period === '7D' ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-400 hover:text-white"
                )}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIndexing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBacklinks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff40" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#ffffff40" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="indexing" stroke="#22d3ee" fillOpacity={1} fill="url(#colorIndexing)" strokeWidth={2} />
                <Area type="monotone" dataKey="backlinks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBacklinks)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic mb-8 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-500" /> Activity Logs
          </h3>
          <div className="flex-1 space-y-6 overflow-hidden">
            {[
              { type: 'backlink', label: 'Backlink Created', detail: 'medium.com/p/823x...', time: '2m ago', status: 'success' },
              { type: 'index', label: 'Index Request Sent', detail: 'google-indexing-api', time: '12m ago', status: 'success' },
              { type: 'error', label: 'Connection Failed', detail: 'hashnode.com timeout', time: '45m ago', status: 'error' },
              { type: 'web20', label: 'Web 2.0 Published', detail: 'blogger.com/post-99', time: '1h ago', status: 'success' },
              { type: 'ai', label: 'AI Content Generated', detail: 'Parasite SEO Bundle', time: '3h ago', status: 'success' },
              { type: 'domain', label: 'Domain Discovered', detail: 'techflow.io (DA 42)', time: '5h ago', status: 'success' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse",
                  log.status === 'success' ? "bg-cyan-500" : "bg-red-500"
                )} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] font-bold text-white uppercase tracking-tighter italic">{log.label}</p>
                    <span className="text-[9px] text-gray-600 font-mono">{log.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate font-mono">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-2.5 rounded-xl border border-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-white transition-all bg-white/[0.02]">
            View Full System Logs
          </button>
        </div>
      </div>

      {/* Quick Action Dashboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-600/5 border border-cyan-500/20 group relative overflow-hidden">
          <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-tighter italic">Instant Syndication</h4>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">Submit a URL to trigger our 24-platform distribution cluster immediately.</p>
          <div className="flex gap-2">
            <input type="text" placeholder="https://..." className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 text-xs outline-none focus:border-cyan-500/50" />
            <button className="p-3 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400 transition-all">
              <Zap className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none group-hover:scale-150 transition-transform" />
        </div>

        <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main relative group overflow-hidden">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
               <AlertCircle className="w-5 h-5 text-amber-500" />
             </div>
             <div>
               <h4 className="text-xs font-bold text-white uppercase tracking-widest italic leading-none">Security Status</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Proxy rotation active</p>
             </div>
           </div>
           <div className="space-y-3">
             <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
               <span className="text-gray-500">Node Load</span>
               <span className="text-cyan-400">Low</span>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full">
               <div className="w-[15%] h-full bg-cyan-500" />
             </div>
             <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
               <span className="text-gray-500">API Latency</span>
               <span className="text-green-500">42ms</span>
             </div>
           </div>
        </div>

        <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main flex flex-col justify-center items-center text-center">
           <Package className="w-10 h-10 text-cyan-500/30 mb-4" />
           <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">Automated Workers</p>
           <p className="text-2xl font-bold text-white mb-2">12 Active</p>
           <div className="flex -space-x-2">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border-2 border-[#0a0a0a] flex items-center justify-center text-[8px] font-bold text-gray-500">
                 W{i}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
