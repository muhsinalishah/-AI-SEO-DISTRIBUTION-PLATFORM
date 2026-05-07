export type SubscriptionTier = 'free' | 'pro' | 'agency' | 'enterprise';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  subscriptionTier: SubscriptionTier;
  credits: number;
  createdAt: string;
  lastLogin: string;
}

export interface Project {
  projectId: string;
  ownerId: string;
  name: string;
  description: string;
  targetUrls: string[];
  keywords: string[];
  createdAt: string;
  status: 'active' | 'archived';
}

export type ContentType = 'article' | 'parasite_seo' | 'web20' | 'reddit_post' | 'backlink_context';

export interface ContentArtifact {
  contentId: string;
  projectId: string;
  type: ContentType;
  title: string;
  body: string;
  metaDescription?: string;
  keywordsUsed: string[];
  createdAt: string;
  status: 'draft' | 'published';
}

export interface BacklinkRecord {
  linkId: string;
  projectId: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  type: 'contextual' | 'profile' | 'comment';
  qualityScore: number;
  indexed: boolean;
  createdAt: string;
}

export interface IndexingRequest {
  requestId: string;
  userId: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  methods: string[];
  createdAt: string;
  completedAt?: string;
}

export interface ExpiredDomain {
  domain: string;
  da: number;
  pa: number;
  spamScore: number;
  category: string;
  foundAt: string;
}

export interface AutomatedTask {
  taskId: string;
  userId: string;
  module: string;
  payload: any;
  status: 'queued' | 'running' | 'completed' | 'failed';
  attempts: number;
  createdAt: string;
}
