"use client";

function hashColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 45%)`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

interface LogoProps {
  companyName: string;
  companyLogo?: string;
  size?: number;
}

export default function Logo({
  companyName,
  companyLogo,
  size = 48,
}: LogoProps) {
  if (companyLogo) {
    return (
      <img
        src={companyLogo}
        alt={companyName}
        width={size}
        height={size}
        className="rounded-xl object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const bg = hashColor(companyName);
  const initials = getInitials(companyName);

  return (
    <div
      className="rounded-xl flex items-center justify-center text-white font-bold shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}
