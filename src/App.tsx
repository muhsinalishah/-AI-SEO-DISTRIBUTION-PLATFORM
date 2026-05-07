import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './lib/firebase';
import { UserProfile } from './types';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { ContentGenerator } from './pages/ContentGenerator';
import { Web20Publisher } from './pages/Web20Publisher';
import { BacklinkAI } from './pages/BacklinkAI';
import { IndexingEngine } from './pages/IndexingEngine';
import { ExpiredDomainFinder } from './pages/ExpiredDomainFinder';
import { ParasiteSEO } from './pages/ParasiteSEO';
import { AutomationEngine } from './pages/AutomationEngine';
import { Analytics } from './pages/Analytics';
import { Toaster } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab ] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Create new profile
          const newProfile: UserProfile = {
            userId: user.uid,
            email: user.email || '',
            displayName: user.displayName,
            photoURL: user.photoURL,
            subscriptionTier: 'free',
            credits: 100,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const renderContent = () => {
    if (!user) return <LandingPage onLogin={login} />;
    
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
