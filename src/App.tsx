import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ContentGenerator } from './pages/ContentGenerator';
import { Web20Publisher } from './pages/Web20Publisher';
import { BacklinkAI } from './pages/BacklinkAI';
import { IndexingEngine } from './pages/IndexingEngine';
import { ExpiredDomainFinder } from './pages/ExpiredDomainFinder';
import { ParasiteSEO } from './pages/ParasiteSEO';
import { AutomationEngine } from './pages/AutomationEngine';
import { Analytics } from './pages/Analytics';
import { AffiliateDashboard } from './pages/AffiliateDashboard';
import { ConnectionsManager } from './pages/ConnectionsManager';
import { Auth } from './pages/Auth';
import { AffiliateService } from './services/affiliateService';
import { onSnapshot } from 'firebase/firestore';
import { Toaster } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab ] = useState('dashboard');

  useEffect(() => {
    // Check for referral code in URL
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      AffiliateService.trackClick(refCode);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Real-time profile sync for credits
        const unsubProfile = onSnapshot(doc(db, 'users', user.uid), async (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            // Upgrade check: ensure credits exist
            if (data.credits === undefined) {
              await setDoc(doc(db, 'users', user.uid), { credits: 100 }, { merge: true });
            }
            setProfile(data);
          } else {
            const referredBy = sessionStorage.getItem('referred_by');
            const newProfile = {
              userId: user.uid,
              email: user.email || '',
              displayName: user.displayName,
              photoURL: user.photoURL,
              subscriptionTier: 'free',
              credits: 100,
              referredBy: referredBy || null,
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', user.uid), newProfile);
            if (referredBy) {
              AffiliateService.initAffiliate(user.uid); // Optional: recursive affiliate
            }
          }
        });
        return () => unsubProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
     // No changes needed to login placeholder, handle via Auth component
  };

  const logout = async () => {
    await signOut(auth);
  };

  const renderContent = () => {
    if (!user) return <Auth onLogin={() => {}} />;
    
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'content': return <ContentGenerator />;
      case 'web20': return <Web20Publisher />;
      case 'backlinks': return <BacklinkAI />;
      case 'indexing': return <IndexingEngine />;
      case 'domains': return <ExpiredDomainFinder />;
      case 'parasite': return <ParasiteSEO />;
      case 'automation': return <AutomationEngine />;
      case 'analytics': return <Analytics />;
      case 'affiliate': return <AffiliateDashboard />;
      case 'connections': return <ConnectionsManager />;
      default: return <Dashboard />;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
        <Toaster position="top-right" theme="dark" />
        {user ? (
          <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
          </Layout>
        ) : (
          renderContent()
        )}
      </div>
    </AuthContext.Provider>
  );
}
