import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Settings2, 
  Zap, 
  Activity, 
  Server,
  CloudLightning,
  ChevronRight,
  Database,
  Search,
  CheckCircle,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

import { toast } from 'sonner';

export function AutomationEngine() {
  const [activeTask, setActiveTask] = useState<number | null>(null);

  const initialTasks = [
    { id: 1, name: 'Web 2.0 Mass Syndication', status: 'running', progress: 65, module: 'Cluster-A' },
    { id: 2, name: 'Tier 2 Link Juicing', status: 'paused', progress: 42, module: 'Link-Engine' },
    { id: 3, name: 'Domain Authority Scan', status: 'running', progress: 89, module: 'Scraper-B' },
    { id: 4, name: 'Google Indexing Queue', status: 'queued', progress: 0, module: 'Index-Main' },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'running' ? 'paused' : 'running';
        toast.info(`Workflow ${t.id} ${nextStatus}`);
        return { ...t, status: nextStatus as 'running' | 'paused' | 'queued' };
      }
      return t;
    }));
  };

  const handleKillswitch = () => {
    toast.promise(new Promise(res => setTimeout(res, 1000)), {
      loading: 'Sending emergency signal to global nodes...',
      success: () => {
        setTasks(prev => prev.map(t => ({ ...t, status: 'paused' as const })));
        return 'ALL CLUSTERS DEACTIVATED. SHUTDOWN SUCCESSFUL.';
      },
      error: 'Killswitch signal rejection'
    });
  };

  const handleToggleOption = (label: string) => {
    toast.success(`${label} status toggled`);
  };

  const handleNewWorkflow = () => {
    toast.info("Custom workflow injector ready. Upload JSON schema.");
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Automation Engine</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Core Orchestrator & Distributed Background Workers</p>
        </div>
        <div className="flex bg-sidebar-bg p-1.5 rounded-xl border border-border-main shadow-xl">
          <div className="flex items-center gap-3 px-4 py-2">
            <Server className="w-4 h-4 text-cyan-500" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest italic">Node Cluster: v3.4.1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Workflows */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task, i) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-6 rounded-xl bg-sidebar-bg border transition-all group overflow-hidden relative",
                  task.status === 'running' ? "border-cyan-500/20" : "border-border-main"
                )}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-2 italic">Module: {task.module}</span>
                    <h4 className="text-sm font-bold text-white uppercase italic tracking-tighter">{task.name}</h4>
                  </div>
                  <div className="flex gap-2">
                    {task.status === 'running' ? (
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className="p-2 bg-white/5 rounded-xl hover:text-amber-500 transition-colors"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className="p-2 bg-white/5 rounded-xl hover:text-cyan-400 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => toast.info("Advanced configuration cluster pending initialization")}
                      className="p-2 bg-white/5 rounded-xl hover:text-white transition-colors"
                    >
                      <Settings2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-cyan-400">{task.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        task.status === 'running' ? "bg-cyan-500" : "bg-gray-600"
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[9px] uppercase font-bold text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <Activity className={cn("w-3 h-3", task.status === 'running' ? "text-cyan-500 animate-pulse" : "text-gray-500")} />
                      {task.status === 'running' ? 'Broadcasting Signal' : 'Signal Suspended'}
                    </div>
                    <span>42 Threads</span>
                  </div>
                </div>
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.02] blur-[40px] pointer-events-none group-hover:bg-cyan-500/[0.05] transition-all" />
              </motion.div>
            ))}

            <button 
              onClick={handleNewWorkflow}
              className="p-6 rounded-3xl bg-transparent border border-dashed border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all flex flex-col items-center justify-center gap-4 group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">New Automation Protocol</p>
                <p className="text-[9px] text-gray-700 font-bold uppercase italic font-mono tracking-tighter decoration-cyan-500 underline underline-offset-2 italic">Inject Custom Workflow</p>
              </div>
            </button>
          </div>

          <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main overflow-hidden">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 italic flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-500" /> Worker Logs (Master Stream)
               </h3>
               <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-600">
                   <div className="w-2 h-2 rounded-full bg-green-500" /> API: Stable
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-600">
                   <div className="w-2 h-2 rounded-full bg-cyan-500" /> DB: Connected
                 </div>
               </div>
             </div>
             <div className="space-y-2 font-mono text-[11px] h-64 overflow-y-auto custom-scrollbar bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
               <p className="text-cyan-500/70">[SYTEM] Orchestrator Node v3.4 initialized on shard-01</p>
               <p className="text-gray-500">[WORKER-01] Executing Web 2.0 Syndication for Project: #X82J</p>
               <p className="text-gray-500">[WORKER-01] Signal established: medium.com HTTP/2 200 OK</p>
               <p className="text-amber-500/70">[GUARD] Proxy threshold reached on US-EAST cluster. Rotating IP block...</p>
               <p className="text-white/40 italic pl-4">Rotating IPs: 198.x.x.x → 192.x.x.x [Success]</p>
               <p className="text-gray-500">[WORKER-02] Background link building triggered for cluster: TIER_2_SOCIAL</p>
               <p className="text-green-500/70">[SUCCESS] Automated Task ID #992 achieved terminal status: COMPLETED</p>
               <p className="text-gray-500">[INDEXER] Pinging Google Search Console Cluster for 12 waiting URLs</p>
               <p className="animate-pulse text-cyan-500">_</p>
             </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 rounded-xl bg-sidebar-bg border border-border-main">
             <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-cyan-500" /> Global Runtime
             </h3>
             <div className="space-y-6">
                <div>
                   <label 
                     onClick={() => handleToggleOption('Parallel Processing')}
                     className="flex items-center justify-between cursor-pointer group"
                   >
                     <div className="flex items-center gap-4">
                       <CloudLightning className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                       <span className="text-[10px] font-bold text-white uppercase italic tracking-widest">Parallel Processing</span>
                     </div>
                     <div className="w-10 h-5 bg-cyan-500 rounded-full flex items-center px-1">
                        <div className="w-3.5 h-3.5 bg-black rounded-full ml-auto" />
                     </div>
                   </label>
                </div>
                <div>
                   <label 
                     onClick={() => handleToggleOption('Intelligent Delays')}
                     className="flex items-center justify-between cursor-pointer group"
                   >
                     <div className="flex items-center gap-4">
                       <Clock className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                       <span className="text-[10px] font-bold text-white uppercase italic tracking-widest">Intelligent Delays</span>
                     </div>
                     <div className="w-10 h-5 bg-white/10 rounded-full flex items-center px-1">
                        <div className="w-3.5 h-3.5 bg-gray-500 rounded-full" />
                     </div>
                   </label>
                </div>
                <div>
                   <label 
                     onClick={() => handleToggleOption('Adversarial Evasion')}
                     className="flex items-center justify-between cursor-pointer group"
                   >
                     <div className="flex items-center gap-4">
                       <ShieldCheck className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                       <span className="text-[10px] font-bold text-white uppercase italic tracking-widest">Adversarial Evasion</span>
                     </div>
                     <div className="w-10 h-5 bg-cyan-500 rounded-full flex items-center px-1">
                        <div className="w-3.5 h-3.5 bg-black rounded-full ml-auto" />
                     </div>
                   </label>
                </div>
             </div>
             
             <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-1">Worker Efficiency</p>
                    <p className="text-lg font-bold text-white uppercase italic tracking-tighter">99.4% Uptime</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-cyan-500" />
                </div>
                <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-1">Queue Depth</p>
                    <p className="text-lg font-bold text-white uppercase italic tracking-tighter">Low (12 Tasks)</p>
                  </div>
                  <Zap className="w-6 h-6 text-cyan-500" />
                </div>
             </div>
           </div>

           <div className="p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent border border-white/5 group relative overflow-hidden">
              <AlertTriangle className="w-12 h-12 text-red-500/20 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-white uppercase italic tracking-tighter mb-4">Emergency Killswitch</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-8">Instantly suspend all active network transmissions and clear worker cache across all clusters.</p>
              <button 
                onClick={handleKillswitch}
                className="w-full py-4 bg-red-500 text-black font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-400 transition-all italic"
              >
                Deactivate Global Cluster
              </button>
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-red-500/5 blur-[80px] pointer-events-none" />
           </div>
        </div>
      </div>
    </div>
  );
}
