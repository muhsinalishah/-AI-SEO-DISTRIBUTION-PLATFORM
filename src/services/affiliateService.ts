import { doc, getDoc, setDoc, updateDoc, increment, addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { toast } from 'sonner';

export const AffiliateService = {
  /**
   * Initializes affiliate stats for a new user.
   */
  initAffiliate: async (userId: string) => {
    const referralCode = `REF-${userId.substring(0, 6).toUpperCase()}`;
    const statsRef = doc(db, `users/${userId}/affiliate_stats/main`);
    
    await setDoc(statsRef, {
      userId,
      totalClicks: 0,
      totalSignups: 0,
      totalPaidUsers: 0,
      pendingCommissions: 0,
      totalEarned: 0,
      referralCode
    });

    // Update user profile with the code
    await updateDoc(doc(db, 'users', userId), { referralCode });
    return referralCode;
  },

  /**
   * Tracks a click on a referral link.
   * This would typically be called from the landing page if a 'ref' param is present.
   */
  trackClick: async (referralCode: string) => {
    const q = query(collection(db, 'users'), where('referralCode', '==', referralCode));
    const snap = await getDocs(q);
    
    if (!snap.empty) {
      const affiliateId = snap.docs[0].id;
      const statsRef = doc(db, `users/${affiliateId}/affiliate_stats/main`);
      await updateDoc(statsRef, {
        totalClicks: increment(1)
      });
      // Store in session storage for attribution on signup
      sessionStorage.setItem('referred_by', affiliateId);
    }
  },

  /**
   * Records a commission when a referred user makes a payment.
   */
  recordCommission: async (referredUserId: string, paymentAmount: number) => {
    const userRef = doc(db, 'users', referredUserId);
    const userSnap = await getDoc(userRef);
    const referredBy = userSnap.data()?.referredBy;

    if (referredBy) {
      const commissionAmount = paymentAmount * 0.20; // 20% commission
      
      const commissionRef = collection(db, 'commissions');
      await addDoc(commissionRef, {
        referrerId: referredBy,
        referredUserId,
        amount: commissionAmount,
        status: 'pending',
        timestamp: serverTimestamp()
      });

      const statsRef = doc(db, `users/${referredBy}/affiliate_stats/main`);
      await updateDoc(statsRef, {
        pendingCommissions: increment(commissionAmount)
      });

      toast.success(`Commission recorded for affiliate ${referredBy}`);
    }
  }
};
