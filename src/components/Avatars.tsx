const avatars: Record<string, () => JSX.Element> = {
  Carmelita: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="skin-loira" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fff3e0" />
          <stop offset="100%" stopColor="#f5cb99" />
        </radialGradient>
        <linearGradient id="hair-loira" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <rect x="20" y="25" width="60" height="70" rx="30" fill="url(#hair-loira)" />
      <circle cx="50" cy="50" r="34" fill="url(#skin-loira)" />
      <path d="M 16 55 Q 30 15 50 15 Q 70 15 84 55 Q 75 30 50 30 Q 25 30 16 55 Z" fill="url(#hair-loira)" />
      <circle cx="38" cy="48" r="4.5" fill="#374151" />
      <circle cx="62" cy="48" r="4.5" fill="#374151" />
      <circle cx="28" cy="58" r="5" fill="#fca5a5" opacity="0.5" />
      <circle cx="72" cy="58" r="5" fill="#fca5a5" opacity="0.5" />
      <path d="M 44 68 Q 50 74 56 68" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  "Cláudio": () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="skin-man" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f6b876" />
        </radialGradient>
        <linearGradient id="hair-man" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1c0b01" />
        </linearGradient>
        <linearGradient id="beard-man" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5c2606" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1c0b01" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="52" r="34" fill="url(#skin-man)" />
      <path d="M 19 55 Q 50 100 81 55 Q 75 75 50 82 Q 25 75 19 55 Z" fill="url(#beard-man)" />
      <path d="M 38 65 Q 50 61 62 65 Q 50 69 38 65 Z" fill="url(#beard-man)" />
      <path d="M 16 45 Q 30 5 50 10 Q 70 5 84 45 Q 75 20 50 22 Q 25 20 16 45 Z" fill="url(#hair-man)" />
      <path d="M 30 22 Q 50 -5 70 22 Z" fill="url(#hair-man)" />
      <circle cx="38" cy="46" r="4.5" fill="#1e293b" />
      <circle cx="62" cy="46" r="4.5" fill="#1e293b" />
      <path d="M 32 38 Q 38 35 44 38" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
      <path d="M 56 38 Q 62 35 68 38" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
      <path d="M 45 71 Q 50 75 55 71" fill="none" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "Cecília": () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="skin-morena" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fcdbb3" />
          <stop offset="100%" stopColor="#d28652" />
        </radialGradient>
        <linearGradient id="hair-morena" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d2616" />
          <stop offset="100%" stopColor="#1a0f08" />
        </linearGradient>
      </defs>
      <path d="M 12 40 Q -5 100 50 100 Q 105 100 88 40 Z" fill="url(#hair-morena)" />
      <circle cx="50" cy="50" r="34" fill="url(#skin-morena)" />
      <path d="M 16 50 Q 25 15 50 15 Q 75 15 84 50 Q 70 25 50 25 Q 30 25 16 50 Z" fill="url(#hair-morena)" />
      <circle cx="38" cy="48" r="4.5" fill="#1e293b" />
      <path d="M 32 46 Q 38 42 43 46" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="62" cy="48" r="4.5" fill="#1e293b" />
      <path d="M 57 46 Q 62 42 68 46" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="56" r="4" fill="#ef4444" opacity="0.3" />
      <circle cx="72" cy="56" r="4" fill="#ef4444" opacity="0.3" />
      <path d="M 44 66 Q 50 72 56 66" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  "Valmor": () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="skin-valmor" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fde8d0" />
          <stop offset="100%" stopColor="#d4a373" />
        </radialGradient>
        <linearGradient id="hair-valmor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="52" r="34" fill="url(#skin-valmor)" />
      <path d="M 16 45 Q 30 10 50 12 Q 70 10 84 45 Q 75 22 50 24 Q 25 22 16 45 Z" fill="url(#hair-valmor)" />
      <circle cx="38" cy="48" r="4.5" fill="#1e293b" />
      <circle cx="62" cy="48" r="4.5" fill="#1e293b" />
      <path d="M 32 40 Q 38 37 44 40" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 56 40 Q 62 37 68 40" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 35 68 Q 50 60 65 68" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M 44 66 Q 50 72 56 66" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

export const getAvatar = (name: string) => {
  return avatars[name] || avatars.Carmelita;
};

export default avatars;
