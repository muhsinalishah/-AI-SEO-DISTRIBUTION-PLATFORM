import { doc, updateDoc, increment, addDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { toast } from 'sonner';

export enum FeatureCost {
  ARTICLE_GENERATION = 10,
  WEB20_PUBLISHING = 20,
  BACKLINK_GENERATION = 15,
  RSS_GENERATION = 5,
  INDEXING_REQUEST = 3,
  LINK_ANALYSIS = 8,
  DOMAIN_SCAN = 12,
  PARASITE_SEO = 25
}

export const CreditService = {
  /**
   * Deducts credits for a specific feature usage.
   * Throws error if balance is insufficient.
   */
  deductCredits: async (feature: keyof typeof FeatureCost, description: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Auth required");

    const cost = FeatureCost[feature];
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error("User profile missing");
    
    const currentCredits = userSnap.data().credits || 0;
    if (currentCredits < cost) {
      toast.error(`Insufficient credits. Required: ${cost}, Current: ${currentCredits}`);
      throw new Error("INSUFFICIENT_CREDITS");
    }

    // Atomic update
    await updateDoc(userRef, {
      credits: increment(-cost)
    });

    // Log transaction
    await addDoc(collection(db, `users/${user.uid}/credit_transactions`), {
      amount: -cost,
      type: 'usage',
      feature,
      description,
      timestamp: serverTimestamp()
    });

    toast.success(`-${cost} credits used for ${feature}`);
    return true;
  },

  /**
   * Triggers a recharge (mocked for Stripe integration).
   */
  rechargeCredits: async (amount: number, method: 'stripe' | 'crypto' | 'payout') => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      credits: increment(amount)
    });

    await addDoc(collection(db, `users/${user.uid}/credit_transactions`), {
      amount,
      type: 'recharge',
      description: `Recharge via ${method}`,
      timestamp: serverTimestamp()
    });

    toast.success(`Successfully recharged ${amount} credits`);
  }
};
