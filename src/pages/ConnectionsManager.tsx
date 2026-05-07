import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Key, 
  User as UserIcon,
  Zap,
  Power,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { WEB2_PLATFORMS } from '../constants/platforms';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, where } from 'firebase/firestore';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export function ConnectionsManager() {
  const [connections, setConnections] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [platform, setPlatform] = useState(WEB2_PLATFORMS[0].id);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, `users/${user.uid}/platform_credentials`));
    const unsubscribe = onSnapshot(q, (snap) => {
      setConnections(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, `users/${user.uid}/platform_credentials`), {
        platform,
        identifier: username,
        passwordEncrypted: btoa(password), // Basic obfuscation for demo, real backend would encrypt
        status: 'active',
        createdAt: serverTimestamp(),
        lastUsed: serverTimestamp()
      });
      toast.success(`${platform} node authorized`);
      setIsAdding(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      toast.error("Cluster authorization rejected");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, `users/${user.uid}/platform_credentials`, id));
    toast.info("Connection purged");
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic uppercase">Platform Hub</h2>
          <p className="text-gray-500 font-medium tracking-tighter uppercase text-xs italic decoration-cyan-500 underline underline-offset-4">Web 2.0 Credential Vault & Distributed Login Nodes</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl flex items-center gap-2 hover:bg-cyan-400 transition-all uppercase tracking-tighter italic shadow-xl shadow-cyan-500/20"
        >
          {isAdding ? <Plus className="w-4 h-4 rotate-45" /> : <Plus className="w-4 h-4" />}
          Authorize New Node
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAdd} className="p-8 rounded-xl bg-sidebar-bg border border-cyan-500/20 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Target Platform</label>
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-cyan-500/40"
                >
                  {WEB2_PLATFORMS.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (DA {p.da})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Identifier (Email/User)</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="operative_user"
                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-300 outline-none focus:border-cyan-500/40"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Security Token (Password)</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm text-gray-300 outline-none focus:border-cyan-500/40"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-cyan-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 uppercase tracking-tighter italic flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                Sync Credential
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((c) => {
          const platformInfo = WEB2_PLATFORMS.find(p => p.id === c.platform);
          return (
            <motion.div 
              layout
              key={c.id}
              className="p-6 rounded-xl bg-sidebar-bg border border-border-main relative group hover:border-cyan-500/30 transition-all overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-xl font-bold text-white italic">
                    {platformInfo?.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase italic tracking-tighter">{platformInfo?.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase font-medium">DA {platformInfo?.da}</p>
                  </div>
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  c.status === 'active' ? "bg-green-500" : "bg-red-500"
                )} />
              </div>

              <div className="space-y-3 mb-6">
                 <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                   <UserIcon className="w-3 h-3" /> {c.identifier}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                   <Zap className="w-3 h-3" /> Ready for Autoposting
                 </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-2">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2">
                  <RefreshCw className="w-3 h-3" /> Diagnostics
                </button>
                <button 
                  onClick={() => handleDelete(c.id)}
                  className="px-3 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-gray-500 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
        {connections.length === 0 && !isAdding && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-white/10 rounded-3xl">
            <Globe className="w-12 h-12 text-gray-800" />
            <div>
              <p className="text-sm font-bold text-white uppercase italic tracking-tighter">No Active Nodes</p>
              <p className="text-xs text-gray-600 uppercase tracking-widest">Authorize a platform to start distributed syndication.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
