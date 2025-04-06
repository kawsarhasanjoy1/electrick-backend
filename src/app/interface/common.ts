export type DisplayRefreshRate = 60 | 75 | 90 | 120 | 144 | 165 | 240 | 360;
export type DisplayResolution =
  | "240x320"
  | "320x480"
  | "480x800"
  | "480x854"
  | "540x960"
  | "720x1280"
  | "1080x1920"
  | "1440x2560"
  | "2160x3840"
  | "720x1520"
  | "1080x2160"
  | "1440x2880"
  | "2160x4320"
  | "2208x1768"
  | "1536x2152";

export type DisplayFeatureType =
  | "Gorilla Glass"
  | "Dragontrail Glass"
  | "Sapphire Glass"
  | "Dolby Vision"
  | "Infinite Display"
  | "Edge Display"
  | "Blue Light Filter"
  | "Eye Comfort Shield"
  | "Flicker-Free Technology"
  | "Multi-Touch Support"
  | "Stylus Support"
  | "Glove Touch Support"
  | "120Hz Refresh Rate"
  | "240Hz Touch Sampling Rate"
  | "Wide Color Gamut"
  | "True Tone Display"
  | "High Brightness Mode"
  | "Always-On Display"
  | "Under-Display Camera"
  | "In-Display Fingerprint Scanner"
  | "Water and Dust Resistance"
  | "Anti-Glare Coating"
  | "Dynamic AMOLED"
  | "Quantum Dot Technology";
export type DisplayFeatureItem = {
  name: DisplayFeatureType;
};