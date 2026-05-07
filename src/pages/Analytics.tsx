import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Map as MapIcon, 
  Globe, 
  Filter,
  Download,
  Calendar,
  Zap,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';

const data = [
  { name: 'W1', indexed: 40, traffic: 24, backlinks: 24 },
  { name: 'W2', indexed: 55, traffic: 13, backlinks: 13 },
  { name: 'W3', indexed: 85, traffic: 98, backlinks: 98 },
  { name: 'W4', indexed: 75, traffic: 65, backlinks: 39 },
  { name: 'W5', indexed: 95, traffic: 48, backlinks: 48 },
  { name: 'W6', indexed: 120, traffic: 38, backlinks: 38 },
];

const COLORS = ['#22d3ee', '#3b82f6', '#10b981', '#f59e0b'];

export function Analytics() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Deep Intelligence</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Comprehensive Performance Analytics & Signal Correlation</p>
        </div>
        <div className="flex gap-2">
           <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all flex items-center gap-2">
             <Download className="w-4 h-4" /> Export Report
           </button>
           <button className="px-6 py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all italic">
             Schedule Periodic Audit
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Stats Row */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-500" /> Rank Trajectory Correlation
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-[10px] uppercase font-bold text-gray-600">Backlink Growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] uppercase font-bold text-gray-600">Organic Visibility</span>
                </div>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="indexed" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic mb-8">Signal Attribution</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Backlinks', value: 400 },
                        { name: 'Web 2.0', value: 300 },
                        { name: 'Parasite', value: 300 },
                        { name: 'Social', value: 200 },
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {['Backlinks', 'Web 2.0', 'Parasite', 'Social'].map((name, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main flex flex-col justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic mb-8">Performance Score</h3>
              <div className="text-center py-6">
                 <div className="text-7xl font-bold text-white mb-2 italic tracking-tighter">94<span className="text-2xl text-cyan-500">/100</span></div>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-6">AI Calculated Authority Influence</p>
                 <div className="flex items-center justify-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full w-fit mx-auto">
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter italic">+14% vs Last Cycle</span>
                 </div>
              </div>
              <p className="text-[10px] text-gray-500 text-center leading-relaxed">System prediction: Your domain authority is expected to increase by <span className="text-white italic">+2.4 pts</span> in the next 15 days based on current distribution velocity.</p>
            </div>
          </div>
        </div>

        {/* Global Overview Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
             <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-500" /> Geographic Footprint
             </h3>
             <div className="h-48 border border-white/5 bg-black/40 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group">
                <MapIcon className="w-24 h-24 text-white/[0.03] group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="space-y-1 text-center">
                     <p className="text-[10px] uppercase tracking-widest font-bold text-cyan-500 italic">Satellite Mode Active</p>
                     <p className="text-[8px] text-gray-500 uppercase font-mono">Distributed across 42 Shards</p>
                   </div>
                </div>
             </div>
             <div className="space-y-4">
                {[
                  { label: 'North America', val: '45%' },
                  { label: 'Europe', val: '28%' },
                  { label: 'Asia Pacific', val: '18%' },
                  { label: 'Others', val: '9%' },
                ].map((reg, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{reg.label}</span>
                    <span className="text-[10px] font-bold text-white uppercase italic tracking-tighter">{reg.val}</span>
                  </div>
                ))}
             </div>
           </div>

           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic mb-2">Cluster Metrics</h3>
              {[
                { label: 'Crawler Frequency', val: 'Extreme', icon: Activity },
                { label: 'NLP Relevance', val: 'Optimum', icon: Target },
                { label: 'Index Velocity', val: 'High', icon: Zap },
              ].map((metric, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                    <metric.icon className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 leading-tight mb-1">{metric.label}</p>
                    <p className="text-sm font-bold text-white uppercase italic tracking-tighter">{metric.val}</p>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="p-8 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 mb-2">Next Scheduled Audit</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white uppercase italic tracking-tighter">May 15, 2026</span>
              </div>
              <button className="w-full py-2 bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all italic">
                Request On-Demand Sync
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
