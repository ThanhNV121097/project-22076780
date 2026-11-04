import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import Price from "./Price";
import { T } from "../editable";
import type { Tea } from "../lib/teas";

/**
 * One blend as a column of the board: the tin cut out on its white tile, the
 * name, then both weights priced on one hairline rule each. No card, no
 * shadow — the hairlines are the whole structure.
 */
export default function TeaTile({ tea }: { tea: Tea }) {
  return (
    <article data-record={`teas:${tea.id}`} className="group flex min-w-0 flex-col">
      <Link to={`/teas/${tea.id}`} data-testid={`tea-link-${tea.id}`} className="block">
        <ProductImage
          src={tea.image}
          alt={tea.name}
          aspect="4/3"
          slot={`/images/teas/${tea.id}.png`}
          eager
          className="transition-transform duration-[var(--duration-fast)] group-hover:-translate-y-0.5"
        />
        <div className="mt-[var(--space-4)] flex items-baseline justify-between gap-3 border-b border-ink pb-[var(--space-2)]">
          <h3 className="text-[length:var(--size-h2)] group-hover:text-accent">{tea.name}</h3>
          <span className="font-body text-[length:var(--size-label)] uppercase tracking-[var(--tracking-label)] text-ink-soft">{tea.english}</span>
        </div>
      </Link>
      <div className="mt-auto">
        <div className="flex items-baseline justify-between gap-3 border-b border-line py-[var(--space-3)]">
          <T k="board.w100" className="min-w-0 truncate font-body text-[length:var(--size-label)] uppercase tracking-[var(--tracking-label)] text-ink-soft" />
          <Price amount={tea.price_100} board testId={`price-${tea.id}-100`} />
        </div>
        <div className="flex items-baseline justify-between gap-3 border-b border-line py-[var(--space-3)]">
          <T k="board.w250" className="min-w-0 truncate font-body text-[length:var(--size-label)] uppercase tracking-[var(--tracking-label)] text-ink-soft" />
          <Price amount={tea.price_250} soft board testId={`price-${tea.id}-250`} />
        </div>
      </div>
    </article>
  );
}
