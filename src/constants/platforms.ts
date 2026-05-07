export interface Web2Platform {
  id: string;
  name: string;
  da: number;
  type: string;
  url: string;
}

export const WEB2_PLATFORMS: Web2Platform[] = [
  { id: 'wp', name: 'Wordpress.com', da: 92, type: 'DoFollow', url: 'wordpress.com' },
  { id: 'tumblr', name: 'Tumblr.com', da: 86, type: 'DoFollow', url: 'tumblr.com' },
  { id: 'blogger', name: 'Blogger.com', da: 99, type: 'DoFollow', url: 'blogger.com' },
  { id: 'jimdo', name: 'Jimdo.com', da: 75, type: 'DoFollow', url: 'jimdo.com' },
  { id: 'livejournal', name: 'Livejournal.com', da: 93, type: 'DoFollow', url: 'livejournal.com' },
  { id: 'wix', name: 'Wix.com', da: 94, type: 'DoFollow', url: 'wix.com' },
  { id: 'weebly', name: 'Weebly.com', da: 93, type: 'DoFollow', url: 'weebly.com' },
  { id: 'deviantart', name: 'Deviantart.com', da: 84, type: 'DoFollow', url: 'deviantart.com' },
  { id: 'medium', name: 'Medium.com', da: 96, type: 'DoFollow', url: 'medium.com' },
  { id: 'sitesgoogle', name: 'Sites.google.com', da: 97, type: 'DoFollow', url: 'sites.google.com' },
  { id: 'evernote', name: 'Evernote.com', da: 91, type: 'DoFollow', url: 'evernote.com' },
  { id: 'quora', name: 'Quora.com', da: 93, type: 'DoFollow', url: 'quora.com' },
  { id: 'linkedin', name: 'LinkedIn', da: 98, type: 'DoFollow', url: 'linkedin.com' },
  { id: 'squarespace', name: 'Squarespace', da: 75, type: 'DoFollow', url: 'squarespace.com' },
  { id: 'snappages', name: 'SnapPages', da: 62, type: 'DoFollow', url: 'snappages.com' },
  { id: 'mozello', name: 'Mozello', da: 59, type: 'DoFollow', url: 'mozello.com' },
  { id: 'webnode', name: 'Webnode', da: 49, type: 'DoFollow', url: 'webnode.com' },
  { id: 'webstarts', name: 'Webstarts', da: 48, type: 'DoFollow', url: 'webstarts.com' },
  { id: 'weblium', name: 'Weblium', da: 43, type: 'DoFollow', url: 'weblium.com' }
];
