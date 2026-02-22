import React from "react";

export function CalendarIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <rect x="30" y="40" width="140" height="130" rx="16" fill="#EDF5F3" stroke="#4A8B7F" strokeWidth="2" />
      <rect x="30" y="40" width="140" height="35" rx="16" fill="#4A8B7F" />
      <rect x="30" y="60" width="140" height="15" fill="#4A8B7F" />
      <circle cx="60" cy="57" r="4" fill="#ffffff" />
      <circle cx="100" cy="57" r="4" fill="#ffffff" />
      <circle cx="140" cy="57" r="4" fill="#ffffff" />
      <rect x="55" y="30" width="4" height="20" rx="2" fill="#2D5F5D" />
      <rect x="95" y="30" width="4" height="20" rx="2" fill="#2D5F5D" />
      <rect x="135" y="30" width="4" height="20" rx="2" fill="#2D5F5D" />
      {/* Grid */}
      <rect x="48" y="90" width="22" height="18" rx="4" fill="#B8D4D0" />
      <rect x="78" y="90" width="22" height="18" rx="4" fill="#ffffff" />
      <rect x="108" y="90" width="22" height="18" rx="4" fill="#ffffff" />
      <rect x="138" y="90" width="22" height="18" rx="4" fill="#ffffff" />
      <rect x="48" y="116" width="22" height="18" rx="4" fill="#ffffff" />
      <rect x="78" y="116" width="22" height="18" rx="4" fill="#D4A69A" />
      <rect x="108" y="116" width="22" height="18" rx="4" fill="#ffffff" />
      <rect x="138" y="116" width="22" height="18" rx="4" fill="#B8D4D0" />
      <rect x="48" y="142" width="22" height="18" rx="4" fill="#ffffff" />
      <rect x="78" y="142" width="22" height="18" rx="4" fill="#ffffff" />
      <rect x="108" y="142" width="22" height="18" rx="4" fill="#4A8B7F" />
      <rect x="138" y="142" width="22" height="18" rx="4" fill="#ffffff" />
      <text x="115" y="155" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="Public Sans">15</text>
      {/* Check mark */}
      <circle cx="170" cy="40" r="15" fill="#D4A69A" />
      <path d="M162 40L167 45L178 34" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <circle cx="100" cy="100" r="70" fill="#EDF5F3" stroke="#4A8B7F" strokeWidth="2" />
      <circle cx="100" cy="100" r="60" fill="#ffffff" stroke="#B8D4D0" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="4" fill="#4A8B7F" />
      <line x1="100" y1="100" x2="100" y2="60" stroke="#2D5F5D" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="100" x2="130" y2="100" stroke="#4A8B7F" strokeWidth="2.5" strokeLinecap="round" />
      {/* Hour marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1={100 + 50 * Math.cos((angle * Math.PI) / 180)}
          y1={100 + 50 * Math.sin((angle * Math.PI) / 180)}
          x2={100 + 55 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 55 * Math.sin((angle * Math.PI) / 180)}
          stroke="#4A8B7F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      {/* Bell */}
      <circle cx="155" cy="55" r="18" fill="#D4A69A" />
      <path d="M148 52V56C148 59.866 151.134 63 155 63C158.866 63 162 59.866 162 56V52" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <path d="M145 56H165" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="155" cy="66" r="2" fill="#ffffff" />
    </svg>
  );
}

export function BookingIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Phone */}
      <rect x="55" y="20" width="90" height="160" rx="18" fill="#ffffff" stroke="#4A8B7F" strokeWidth="2" />
      <rect x="62" y="45" width="76" height="110" rx="4" fill="#EDF5F3" />
      {/* Profile card */}
      <rect x="70" y="52" width="60" height="35" rx="8" fill="#ffffff" />
      <circle cx="88" cy="65" r="8" fill="#B8D4D0" />
      <rect x="100" y="60" width="24" height="4" rx="2" fill="#4A8B7F" />
      <rect x="100" y="68" width="18" height="3" rx="1.5" fill="#D4A69A" />
      {/* Time slots */}
      <rect x="70" y="94" width="60" height="12" rx="6" fill="#4A8B7F" />
      <text x="100" y="103" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="Public Sans">09:00</text>
      <rect x="70" y="110" width="60" height="12" rx="6" fill="#B8D4D0" />
      <text x="100" y="119" textAnchor="middle" fill="#2D5F5D" fontSize="7" fontFamily="Public Sans">09:30</text>
      <rect x="70" y="126" width="60" height="12" rx="6" fill="#B8D4D0" />
      <text x="100" y="135" textAnchor="middle" fill="#2D5F5D" fontSize="7" fontFamily="Public Sans">10:00</text>
      {/* Checkmark badge */}
      <circle cx="145" cy="30" r="16" fill="#D4A69A" />
      <path d="M137 30L142 35L153 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Status bar */}
      <rect x="82" y="28" width="36" height="6" rx="3" fill="#EDE8E2" />
    </svg>
  );
}

export function WhatsAppIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <circle cx="100" cy="100" r="65" fill="#EDF5F3" />
      {/* Message bubbles */}
      <rect x="55" y="60" width="70" height="28" rx="14" fill="#4A8B7F" />
      <rect x="59" y="70" width="40" height="4" rx="2" fill="#ffffff" opacity="0.7" />
      <rect x="59" y="77" width="28" height="4" rx="2" fill="#ffffff" opacity="0.5" />
      <rect x="80" y="95" width="65" height="28" rx="14" fill="#D4A69A" />
      <rect x="88" y="105" width="35" height="4" rx="2" fill="#ffffff" opacity="0.7" />
      <rect x="88" y="112" width="22" height="4" rx="2" fill="#ffffff" opacity="0.5" />
      {/* Notification bell */}
      <circle cx="145" cy="55" r="14" fill="#2D5F5D" />
      <path d="M140 52V55.5C140 58.538 142.462 61 145.5 61C148.538 61 151 58.538 151 55.5V52" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M138 55.5H153" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      {/* Arrow down (sent) */}
      <path d="M100 140L100 160" stroke="#4A8B7F" strokeWidth="2" strokeLinecap="round" />
      <path d="M94 155L100 161L106 155" stroke="#4A8B7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EmptyStateIllustration({ className = "w-64 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 200" fill="none" className={className}>
      <rect x="60" y="30" width="160" height="140" rx="20" fill="#EDF5F3" />
      <rect x="80" y="60" width="120" height="8" rx="4" fill="#B8D4D0" />
      <rect x="80" y="78" width="90" height="8" rx="4" fill="#D4A69A" opacity="0.5" />
      <rect x="80" y="96" width="100" height="8" rx="4" fill="#B8D4D0" opacity="0.4" />
      <rect x="80" y="114" width="70" height="8" rx="4" fill="#D4A69A" opacity="0.3" />
      <circle cx="140" cy="145" r="5" fill="#4A8B7F" />
      <circle cx="155" cy="145" r="5" fill="#B8D4D0" />
      <circle cx="170" cy="145" r="5" fill="#D4A69A" />
    </svg>
  );
}

export function SuccessIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <circle cx="100" cy="100" r="70" fill="#EDF5F3" />
      <circle cx="100" cy="100" r="50" fill="#4A8B7F" opacity="0.15" />
      <circle cx="100" cy="100" r="35" fill="#4A8B7F" />
      <path d="M82 100L94 112L120 86" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkles */}
      <circle cx="155" cy="55" r="5" fill="#D4A69A" />
      <circle cx="50" cy="75" r="3" fill="#B8D4D0" />
      <circle cx="160" cy="140" r="4" fill="#D4A69A" opacity="0.6" />
      <circle cx="45" cy="130" r="3" fill="#4A8B7F" opacity="0.4" />
    </svg>
  );
}

export function NotificationIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Phone */}
      <rect x="60" y="30" width="80" height="140" rx="16" fill="#ffffff" stroke="#4A8B7F" strokeWidth="2" />
      <rect x="67" y="50" width="66" height="100" rx="4" fill="#EDF5F3" />
      {/* Status bar */}
      <rect x="85" y="38" width="30" height="5" rx="2.5" fill="#EDE8E2" />
      {/* WhatsApp message bubbles */}
      <rect x="72" y="58" width="50" height="22" rx="11" fill="#4A8B7F" />
      <rect x="76" y="65" width="30" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />
      <rect x="76" y="71" width="20" height="3" rx="1.5" fill="#ffffff" opacity="0.5" />
      <rect x="82" y="86" width="46" height="22" rx="11" fill="#D4A69A" />
      <rect x="88" y="93" width="28" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />
      <rect x="88" y="99" width="18" height="3" rx="1.5" fill="#ffffff" opacity="0.5" />
      {/* Email envelope */}
      <rect x="72" y="115" width="56" height="30" rx="6" fill="#ffffff" stroke="#B8D4D0" strokeWidth="1.5" />
      <path d="M72 121L100 133L128 121" stroke="#4A8B7F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Notification badge */}
      <circle cx="140" cy="35" r="14" fill="#D4A69A" />
      <text x="140" y="39" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="Public Sans" fontWeight="700">3</text>
      {/* Sparkles */}
      <circle cx="155" cy="70" r="4" fill="#B8D4D0" />
      <circle cx="45" cy="90" r="3" fill="#D4A69A" opacity="0.6" />
    </svg>
  );
}

export function MagicLinkIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Envelope */}
      <rect x="35" y="60" width="130" height="90" rx="14" fill="#ffffff" stroke="#4A8B7F" strokeWidth="2" />
      <path d="M35 74L100 115L165 74" stroke="#4A8B7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Magic sparkle trail */}
      <circle cx="100" cy="50" r="8" fill="#D4A69A" />
      <path d="M100 42V38M100 62V58M92 50H88M112 50H108M94 44L91 41M106 44L109 41M94 56L91 59M106 56L109 59" stroke="#D4A69A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Link icon inside */}
      <rect x="80" y="95" width="40" height="18" rx="9" fill="#EDF5F3" stroke="#4A8B7F" strokeWidth="1.5" />
      <path d="M95 104H105" stroke="#4A8B7F" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="90" cy="104" r="3" fill="#4A8B7F" />
      <circle cx="110" cy="104" r="3" fill="#4A8B7F" />
      {/* Small sparkles */}
      <circle cx="155" cy="50" r="4" fill="#B8D4D0" />
      <circle cx="45" cy="80" r="3" fill="#D4A69A" opacity="0.5" />
      <circle cx="160" cy="130" r="3" fill="#4A8B7F" opacity="0.4" />
    </svg>
  );
}

export function GoogleCalendarIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Calendar base */}
      <rect x="40" y="45" width="120" height="115" rx="14" fill="#ffffff" stroke="#4A8B7F" strokeWidth="2" />
      <rect x="40" y="45" width="120" height="30" rx="14" fill="#4A8B7F" />
      <rect x="40" y="60" width="120" height="15" fill="#4A8B7F" />
      {/* Calendar pins */}
      <rect x="65" y="36" width="4" height="18" rx="2" fill="#2D5F5D" />
      <rect x="95" y="36" width="4" height="18" rx="2" fill="#2D5F5D" />
      <rect x="125" y="36" width="4" height="18" rx="2" fill="#2D5F5D" />
      {/* Calendar dots */}
      <circle cx="70" cy="55" r="3" fill="#ffffff" />
      <circle cx="100" cy="55" r="3" fill="#ffffff" />
      <circle cx="130" cy="55" r="3" fill="#ffffff" />
      {/* Grid cells */}
      <rect x="55" y="85" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="80" y="85" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="105" y="85" width="18" height="16" rx="4" fill="#D4A69A" opacity="0.3" />
      <rect x="130" y="85" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="55" y="108" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="80" y="108" width="18" height="16" rx="4" fill="#4A8B7F" opacity="0.2" />
      <rect x="105" y="108" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="130" y="108" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="55" y="131" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="80" y="131" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="105" y="131" width="18" height="16" rx="4" fill="#EDF5F3" />
      <rect x="130" y="131" width="18" height="16" rx="4" fill="#4A8B7F" />
      <text x="139" y="143" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="Public Sans">28</text>
      {/* Google colors sync arrow */}
      <circle cx="160" cy="45" r="16" fill="#EDF5F3" stroke="#4A8B7F" strokeWidth="1.5" />
      <path d="M153 45C153 41.134 156.134 38 160 38C162.5 38 164.7 39.3 166 41.3" stroke="#4A8B7F" strokeWidth="2" strokeLinecap="round" />
      <path d="M165 38L166 41.3L163 42" stroke="#4A8B7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M167 45C167 48.866 163.866 52 160 52C157.5 52 155.3 50.7 154 48.7" stroke="#D4A69A" strokeWidth="2" strokeLinecap="round" />
      <path d="M155 52L154 48.7L157 48" stroke="#D4A69A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IntegrationIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Center hub */}
      <circle cx="100" cy="100" r="25" fill="#4A8B7F" />
      <path d="M90 100L97 107L112 92" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Connected nodes */}
      <circle cx="55" cy="55" r="18" fill="#EDF5F3" stroke="#B8D4D0" strokeWidth="1.5" />
      <rect x="46" y="49" width="18" height="12" rx="3" fill="#4A8B7F" />
      <path d="M46 53L55 58L64 53" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <circle cx="145" cy="55" r="18" fill="#EDF5F3" stroke="#B8D4D0" strokeWidth="1.5" />
      <rect x="136" y="48" width="18" height="14" rx="4" fill="#25D366" opacity="0.8" />
      <path d="M142 53V56C142 57.6 143.4 59 145 59C146.6 59 148 57.6 148 56V53" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <circle cx="145" cy="145" r="18" fill="#EDF5F3" stroke="#B8D4D0" strokeWidth="1.5" />
      <rect x="136" y="138" width="18" height="14" rx="3" fill="#4285F4" opacity="0.8" />
      <text x="145" y="149" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="Public Sans">G</text>
      {/* Connection lines */}
      <line x1="80" y1="82" x2="68" y2="68" stroke="#B8D4D0" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="120" y1="82" x2="132" y2="68" stroke="#B8D4D0" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="120" y1="118" x2="132" y2="132" stroke="#B8D4D0" strokeWidth="2" strokeDasharray="4 3" />
      {/* Sparkles */}
      <circle cx="55" cy="145" r="4" fill="#D4A69A" opacity="0.5" />
      <circle cx="160" cy="100" r="3" fill="#D4A69A" opacity="0.4" />
    </svg>
  );
}