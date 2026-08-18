type PonyAvatarProps = {
  tone: "primary-1" | "primary-2" | "accent-1";
};

const toneClass = {
  "primary-1": "bg-primary-1",
  "primary-2": "bg-primary-2",
  "accent-1": "bg-accent-1",
};

export function PonyAvatar({ tone }: PonyAvatarProps) {
  return (
    <div className="relative h-28 w-28 overflow-hidden rounded-full border border-accent-2 bg-paper-2">
      <div className={`absolute bottom-5 left-7 h-12 w-16 rounded-full ${toneClass[tone]}`} />
      <div className={`absolute bottom-11 left-10 h-12 w-12 rounded-full ${toneClass[tone]}`} />
      <div className={`absolute left-12 top-5 h-8 w-5 -rotate-12 rounded-t-full ${toneClass[tone]}`} />
      <div className={`absolute left-7 top-7 h-7 w-4 rotate-12 rounded-t-full ${toneClass[tone]}`} />
      <div className="absolute left-7 top-8 h-14 w-6 rotate-12 rounded-full bg-primary-3" />
      <div className="absolute left-14 top-14 h-2 w-2 rounded-full bg-paper-1" />
      <div className="absolute bottom-8 right-5 h-4 w-9 -rotate-12 rounded-full bg-primary-3" />
    </div>
  );
}
