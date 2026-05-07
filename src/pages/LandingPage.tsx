import React from 'react';
import { motion } from 'motion/react';
import { Link as LinkIcon, Zap, ShieldCheck, Share2, Search, ArrowRight, BarChart3, Globe } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-brand-bg overflow-x-hidden selection:bg-cyan-500/30">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Hero Section */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            IBRAHIM ANALYTICAL
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-white transition-colors">API Docs</a>
        </div>
        <button 
          onClick={onLogin}
          className="relative px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform active:scale-95"
        >
          Get Started
        </button>
      </nav>

      <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-cyan-400">AI Distribution Engine v2.0 Released</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9] text-white max-w-5xl mx-auto">
            THE FUTURE OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SEO DISTRIBUTION</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Automate content syndication, generate contextual backlinks, and accelerate Google indexing with our advanced AI-powered SEO infrastructure.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={onLogin}
              className="w-full md:w-auto px-10 py-4 bg-cyan-500 text-black font-bold rounded-2xl flex items-center justify-center gap-2 group hover:bg-cyan-400 transition-all hover:scale-105"
            >
              Start Building Backlinks <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="w-full md:w-auto px-10 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              View AI Demo
            </button>
          </div>
        </motion.div>

        {/* Dashboard Preview Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-24 relative p-4 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl overflow-hidden"
        >
           <div className="w-full aspect-video bg-brand-bg rounded-[1.5rem] relative overflow-hidden border border-border-main group">
             {/* Mock Dashboard UI */}
             <div className="absolute inset-0 p-8 flex flex-col gap-6">
               <div className="flex justify-between items-center">
                 <div className="flex gap-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="w-40 h-24 bg-white/5 rounded-2xl border border-white/5" />
                   ))}
                 </div>
               </div>
               <div className="flex-1 flex gap-6">
                 <div className="flex-1 bg-white/[0.02] rounded-3xl border border-white/5" />
                 <div className="w-64 bg-white/[0.02] rounded-3xl border border-white/5" />
               </div>
             </div>
             {/* Overlay Gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
           </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'URLs Indexed', value: '1.2M+' },
            { label: 'Backlinks Built', value: '450K+' },
            { label: 'Active Projects', value: '15,000+' },
            { label: 'Uptime', value: '99.98%' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-white mb-6">INTELLIGENT SEO INFRASTRUCTURE</h2>
          <p className="text-gray-500 max-w-2xl mx-auto uppercase tracking-tighter decoration-cyan-500 underline underline-offset-4 font-bold text-xs italic">A complete ecosystem for modern search domination</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Indexing API', desc: 'Accelerate Google indexing with official API integrations and RSS pinging.' },
            { icon: ShieldCheck, title: 'Parasite SEO', desc: 'Secure high-authority positions on Medium, Reddit, and LinkedIn automatically.' },
            { icon: Share2, title: 'Web 2.0 Syndication', desc: 'Multi-platform publishing to WordPress, Blogger, and Tumbler with one click.' },
            { icon: Search, title: 'Expired Domains', desc: 'Discover powerful expired domains with high DA/PA and clean backlink history.' },
            { icon: BarChart3, title: 'AI Analytics', desc: 'Real-time tracking of keyword rankings and backlink distribution velocity.' },
            { icon: Globe, title: 'Semantic Backend', desc: 'AI-generated content optimized for NLP and LSI semantic relevance.' },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-xl bg-sidebar-bg border border-border-main hover:border-cyan-500/30 transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-cyan-500/10 transition-colors">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter italic">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-8 border-t border-white/5 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <LinkIcon className="w-5 h-5 text-cyan-500" />
            <span className="font-bold text-sm tracking-tight text-white uppercase italic">IBRAHIM ANALYTICAL</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-tighter">© 2026 IBRAHIM ANALYTICAL. All rights reserved.</p>
        </div>
      </footer>

      {/* Background Glows */}
      <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}
