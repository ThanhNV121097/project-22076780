import { T } from "../editable";

/**
 * The small-caps label that leads every section on every page: 11px,
 * 0.16em letterspaced, ink-soft. It carries information — a street, a
 * weight, a count — never a decorative word.
 */
export default function Label({ k, className = "" }: { k: string; className?: string }) {
  return (
    <T
      k={k}
      as="p"
      className={`font-body text-[length:var(--size-label)] uppercase tracking-[var(--tracking-label)] text-ink-soft ${className}`}
    />
  );
}
