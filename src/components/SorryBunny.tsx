/** Simple cartoon bunny holding a heart with "sorry" — recipient open screen */
export default function SorryBunny({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* droopy ears */}
      <ellipse cx="62" cy="52" rx="18" ry="44" fill="#e8d5d0" stroke="#c9a8a0" strokeWidth="2" transform="rotate(-18 62 52)" />
      <ellipse cx="138" cy="52" rx="18" ry="44" fill="#e8d5d0" stroke="#c9a8a0" strokeWidth="2" transform="rotate(18 138 52)" />
      <ellipse cx="68" cy="58" rx="10" ry="28" fill="#f5e6e3" transform="rotate(-18 68 58)" />
      <ellipse cx="132" cy="58" rx="10" ry="28" fill="#f5e6e3" transform="rotate(18 132 58)" />

      {/* head */}
      <circle cx="100" cy="95" r="48" fill="#f5ebe8" stroke="#c9a8a0" strokeWidth="2" />

      {/* sad eyes */}
      <ellipse cx="82" cy="92" rx="5" ry="7" fill="#6b4f4a" />
      <ellipse cx="118" cy="92" rx="5" ry="7" fill="#6b4f4a" />
      <path d="M78 104 Q82 100 86 104" stroke="#6b4f4a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M114 104 Q118 100 122 104" stroke="#6b4f4a" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* nose & mouth */}
      <ellipse cx="100" cy="108" rx="4" ry="3" fill="#d4a5a0" />
      <path d="M100 111 Q94 118 88 115" stroke="#6b4f4a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M100 111 Q106 118 112 115" stroke="#6b4f4a" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* blush */}
      <ellipse cx="72" cy="108" rx="8" ry="5" fill="#f9c4c4" opacity="0.5" />
      <ellipse cx="128" cy="108" rx="8" ry="5" fill="#f9c4c4" opacity="0.5" />

      {/* body & paws holding heart */}
      <ellipse cx="100" cy="168" rx="38" ry="32" fill="#f5ebe8" stroke="#c9a8a0" strokeWidth="2" />
      <ellipse cx="58" cy="158" rx="12" ry="10" fill="#f5ebe8" stroke="#c9a8a0" strokeWidth="2" />
      <ellipse cx="142" cy="158" rx="12" ry="10" fill="#f5ebe8" stroke="#c9a8a0" strokeWidth="2" />

      {/* heart */}
      <path
        d="M100 145 C88 132 72 138 72 152 C72 168 100 182 100 182 C100 182 128 168 128 152 C128 138 112 132 100 145Z"
        fill="#f43f6a"
        stroke="#e11d48"
        strokeWidth="1.5"
      />
      <text
        x="100"
        y="162"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
      >
        sorry
      </text>

      {/* tiny tear */}
      <ellipse cx="74" cy="98" rx="2.5" ry="4" fill="#93c5fd" opacity="0.7" />
    </svg>
  );
}
