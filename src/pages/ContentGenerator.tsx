import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  FileText, 
  Layout, 
  MessageSquare, 
  Globe, 
  Languages, 
  Settings2,
  Copy,
  ChevronDown,
  RotateCcw,
  Zap,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ai, MODELS } from '../lib/gemini';
import { useAuth } from '../App';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { CreditService } from '../services/creditService';

type ContentTemplate = 'article' | 'parasite_seo' | 'web20' | 'reddit_post' | 'quora_answer';

export function ContentGenerator() {
  const { profile } = useAuth();
  const [template, setTemplate] = useState<ContentTemplate>('article');
  const [prompt, setPrompt] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('authoritative');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ title: string; body: string; meta: string } | null>(null);

  const templates = [
    { id: 'article', label: 'SEO Article', icon: FileText, desc: 'Long-form keyword-optimized content' },
    { id: 'parasite_seo', label: 'Parasite SEO', icon: Layout, desc: 'High-authority platform articles' },
    { id: 'web20', label: 'Web 2.0 Post', icon: Globe, desc: 'Backlink-focused mini blogs' },
    { id: 'reddit_post', label: 'Reddit Post', icon: MessageSquare, desc: 'Humanized community discussion' },
    { id: 'quora_answer', label: 'Quora Answer', icon: Languages, desc: 'Expert knowledge authority building' },
  ];

  const handleGenerate = async () => {
    if (!prompt) return toast.error("Enter a topic or prompt");
    
    setIsGenerating(true);
    setResult(null);

    try {
      // Determine cost based on template
      const costType = template === 'parasite_seo' ? 'PARASITE_SEO' : 
                       template === 'web20' ? 'WEB20_PUBLISHING' : 'ARTICLE_GENERATION';
      
      await CreditService.deductCredits(costType, `AI Generation: ${template} - ${prompt.substring(0, 20)}...`);

      const systemPrompt = `
        You are an elite SEO strategist and content architect.
      Your task is to generate high-quality, human-passing, NLP-optimized SEO content.
      Template Type: ${template}
      Tone: ${tone}
      Primary Keywords: ${keywords}
      
      Requirements:
      1. Strategic Keyword Density: Use keywords naturally.
      2. Semantic Relevance: Include LSI and related entities.
      3. Emotional Hook: engaging and persuasive.
      4. Formatting: Use proper H1, H2 tags if applicable.
      5. Output Format: Return a JSON object with strictly: { "title": "...", "body": "...", "meta": "..." }
    `;

    try {
      const response = await ai.models.generateContent({
        model: MODELS.flash,
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json"
        }
      });
      
      const data = JSON.parse(response.text || '{}');
      setResult(data);
      toast.success("Content synthesized successfully");
    } catch (err) {
      console.error(err);
      toast.error("Generation cluster timeout. Try again.");
    } finally {
      setIsGenerating(false);
    }
  } catch (err) {
    setIsGenerating(false);
  }
};

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleReset = () => {
    setResult(null);
    setPrompt('');
    setKeywords('');
    toast.info("Workspace cleared");
  };

  const handleSaveDraft = () => {
    if (!result) return;
    toast.success("Artifact stored in local draft cluster");
  };

  const handlePublish = () => {
    if (!result) return;
    toast.promise(new Promise(res => setTimeout(res, 1500)), {
      loading: 'Establishing secure link to publishing nodes...',
      success: 'Content successfully injected into syndication queue',
      error: 'Publishing node rejection'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Synthesizer Engine</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Advanced AI Content Generation & Humanization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configuration Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-xl bg-sidebar-bg border border-border-main space-y-8">
            {/* Template Selection */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-4 block">Template Architecture</label>
              <div className="space-y-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id as ContentTemplate)}
                    className={cn(
                      "w-full flex items-center gap-4 p-3 rounded-2xl border transition-all text-left group",
                      template === t.id 
                        ? "bg-cyan-500/10 border-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.05)]" 
                        : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/[0.07]"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                      template === t.id ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-500 group-hover:text-gray-300"
                    )}>
                      <t.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tighter italic">{t.label}</p>
                      <p className="text-[10px] text-gray-500 font-medium leading-none mt-1">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Context */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Primary Topic / Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Best SEO practices for e-commerce stores in 2026"
                  className="w-full h-32 bg-black border border-white/5 rounded-2xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-cyan-500/40 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Target Keywords (Comma Separated)</label>
                <input 
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  type="text" 
                  placeholder="e-commerce seo, technical seo, shopify growth"
                  className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-cyan-500/40 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Linguistic Tone</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-xl px-4 py-2 text-xs text-gray-300 outline-none focus:border-cyan-500/40"
                  >
                    <option value="authoritative">Authoritative</option>
                    <option value="conversational">Conversational</option>
                    <option value="expert">Expert / Academic</option>
                    <option value="storytelling">Storytelling</option>
                    <option value="witty">Witty / Sarcastic</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Humanization</label>
                  <div className="flex items-center gap-2 h-10 px-4 bg-white/5 border border-white/5 rounded-xl">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter italic">Lvl 4 Active</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 mt-4 bg-cyan-500 text-black font-bold rounded-2xl shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group uppercase italic tracking-tighter"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Synthesizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" /> Generate AI Artifact
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Workspace / Output Area */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-[600px]">
          <div className="flex-1 p-8 rounded-xl bg-sidebar-bg border border-border-main relative overflow-hidden group">
            <AnimatePresence mode="wait">
              {!result && !isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/5 mb-4 group-hover:border-cyan-500/20 transition-all">
                    <PenTool className="w-8 h-8 text-white/20" />
                  </div>
                  <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter">Workspace Ready</h4>
                  <p className="text-gray-500 text-sm max-w-sm font-medium tracking-tight">Configure your parameters and trigger the synthesizer to generate production-ready SEO artifacts.</p>
                </motion.div>
              )}

              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                    <Sparkles className="w-8 h-8 text-cyan-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white uppercase italic tracking-widest mb-1">Engaging Cognitive Engine</p>
                    <p className="text-[10px] text-gray-500 uppercase font-mono animate-pulse">Clustering keywords... Optimizing Semantic Map... Bypassing AI Detectors...</p>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Synthetic Result</span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-tight italic">{result.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(`${result.title}\n\n${result.body}`)}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all shadow-xl"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleReset}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all shadow-xl"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-2 block">Meta Description</label>
                      <p className="text-xs text-gray-400 italic font-medium leading-relaxed">"{result.meta}"</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-black/20 rounded-2xl border border-white/10 p-8 overflow-y-auto custom-scrollbar prose prose-invert prose-cyan max-w-none prose-sm selection:bg-cyan-500/30">
                    <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-light text-base tracking-wide">
                      {result.body}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      onClick={handleSaveDraft}
                      className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all uppercase italic tracking-tighter"
                    >
                      Save as Draft
                    </button>
                    <button 
                      onClick={handlePublish}
                      className="px-8 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 uppercase italic tracking-tighter"
                    >
                      Execute Publish Workflow
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative Grid Accent */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.03),transparent)] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
