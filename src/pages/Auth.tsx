import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  Phone, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  Chrome,
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { SecurityService } from '../services/securityService';
import { cn } from '../lib/utils';

export function Auth({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await syncUser(result.user);
      toast.success("Welcome to Alpha-SEO Core");
      onLogin();
    } catch (error) {
      toast.error("Auth cluster failure");
    }
  };

  const syncUser = async (user: any) => {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) {
      await setDoc(userRef, {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        credits: 100, // Welcome credits
        subscriptionTier: 'free',
        trustScore: 1.0,
        createdAt: serverTimestamp(),
        deviceFingerprint: SecurityService.getDeviceFingerprint()
      });
    } else {
      const data = snap.data();
      if (data.credits === undefined) {
        await setDoc(userRef, { credits: 100 }, { merge: true });
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (SecurityService.isDisposableEmail(email)) {
      toast.error("Disposable email providers are prohibited.");
      return;
    }

    try {
      if (mode === 'register') {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await syncUser(result.user);
        toast.success("Verification signal transmitted to inbox");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      toast.error("Invalid credentials or security rejection");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-sidebar-bg border border-border-main rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <ShieldCheck className="w-8 h-8 text-cyan-500" />
          </div>
          <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">Unified Access Port</h2>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Secure SaaS Orchestrator v1.0</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setMethod('email')}
              className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                method === 'email' ? "bg-cyan-500/10 border-cyan-500/30 text-white" : "bg-white/5 border-white/5 text-gray-500 hover:text-white"
              )}
            >
              <Mail className="w-3 h-3" /> Email Core
            </button>
            <button 
              onClick={() => setMethod('phone')}
              className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                method === 'phone' ? "bg-cyan-500/10 border-cyan-500/30 text-white" : "bg-white/5 border-white/5 text-gray-500 hover:text-white"
              )}
            >
              <Smartphone className="w-3 h-3" /> Mobile OTP
            </button>
          </div>

          <AnimatePresence mode="wait">
            {method === 'email' ? (
              <motion.form 
                key="email"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleEmailAuth}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-1">Network Identifier</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@cluster.com"
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-300 outline-none focus:border-cyan-500/40 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-1">Security Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-300 outline-none focus:border-cyan-500/40 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <button className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 uppercase italic tracking-tighter">
                  {mode === 'login' ? 'Establish Secure Link' : 'Initialize Node Identity'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="phone"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-1">Mobile Payload</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input 
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-300 outline-none focus:border-cyan-500/40 transition-all font-mono"
                    />
                  </div>
                </div>
                <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]">
                  Request Mobile OTP
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-sidebar-bg px-4 text-gray-600">3rd Party Cluster</span></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-3 text-white font-bold text-xs hover:bg-white/10 transition-all"
          >
            <Chrome className="w-4 h-4 text-cyan-500" />
            Continue with Google Engine
          </button>

          <div className="text-center mt-6">
             <button 
               onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
               className="text-[10px] text-gray-500 font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
             >
               {mode === 'login' ? "New operative? Create Identity Matrix" : "Existing Identity? Login to Cluster"}
             </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 justify-center text-[8px] text-gray-600 uppercase font-black tracking-[0.2em] animate-pulse">
           <AlertCircle className="w-3 h-3" /> Threat-Level Neutralized
        </div>
      </motion.div>
    </div>
  );
}
