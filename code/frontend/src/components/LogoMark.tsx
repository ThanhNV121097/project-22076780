/**
 * The shop's mark: a lotus drawn with straight lines — one centre petal and
 * two side petals — in currentColor, so it takes the ink of wherever it
 * sits. public/favicon.svg is the same mark.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="miter">
      <path d="M16 6 L23 15 L16 24 L9 15 Z" />
      <path d="M9 15 L3 17 L10 21" />
      <path d="M23 15 L29 17 L22 21" />
    </svg>
  );
}
