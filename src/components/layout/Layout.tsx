import React from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  Share2, 
  Link as LinkIcon, 
  Search, 
  Globe, 
  Zap, 
  LogOut,
  BarChart3,
  Terminal,
  ShieldCheck,
  Package,
  Users,
  Database
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../App';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const { logout, profile } = useAuth();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'content', icon: PenTool, label: 'AI Content' },
    { id: 'web20', icon: Share2, label: 'Web 2.0 Auto' },
    { id: 'backlinks', icon: LinkIcon, label: 'Contextual AI' },
    { id: 'indexing', icon: Zap, label: 'Indexing API' },
    { id: 'domains', icon: Search, label: 'Expired Domains' },
    { id: 'parasite', icon: ShieldCheck, label: 'Parasite SEO' },
    { id: 'automation', icon: Terminal, label: 'Automation' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'affiliate', icon: Users, label: 'Affiliates' },
    { id: 'connections', icon: Database, label: 'Connections' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg text-[#e2e8f0] font-sans border border-border-main">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex flex-col border-r border-border-main bg-sidebar-bg">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <LinkIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-tighter text-lg bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase">
            IBRAHIM ANALYTICAL
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 px-2 mt-4">System Core</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium",
                activeTab === item.id 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border-main bg-sidebar-footer">
          <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
              {profile?.displayName?.[0] || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{profile?.displayName || 'Jordan Dev'}</div>
              <div className="text-[10px] text-slate-500 truncate italic uppercase tracking-tighter">
                {profile?.subscriptionTier || 'Enterprise'} Access
              </div>
            </div>
            <button onClick={logout} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-400">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border-main flex items-center justify-between px-8 bg-brand-bg/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
              {navItems.find(n => n.id === activeTab)?.label}
            </h2>
            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase">
              System Online
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">AI Credits</span>
              <span className="text-sm font-mono text-cyan-400">{profile?.credits?.toLocaleString() || '0'}</span>
            </div>
            <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs hover:bg-slate-700 text-slate-300 transition-colors hidden sm:block">New Campaign</button>
              <button className="px-3 py-1.5 bg-cyan-500 text-black font-bold rounded text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-transform active:scale-95">Action Point</button>
            </div>
          </div>
        </header>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Status Bar */}
        <footer className="h-8 border-t border-border-main bg-[#0a0a0e] px-6 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              SERVER: US-EAST-NODE-4
            </div>
            <div className="flex items-center gap-2 hidden sm:flex">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              API LATENCY: 42MS
            </div>
            <div className="hidden md:block">DB STATUS: OPTIMAL</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-500 hidden sm:inline">SECURE ENCRYPTED SESSION</span>
            <span className="text-slate-600 uppercase tracking-tighter font-bold">v4.8.2-PRO</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
