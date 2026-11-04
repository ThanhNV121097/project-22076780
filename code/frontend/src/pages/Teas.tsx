import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import Label from "../components/Label";
import Price from "../components/Price";
import Reveal from "../components/Reveal";
import TeaTile from "../components/TeaTile";
import CallButtons from "../components/CallButtons";
import type { Pot, Tea } from "../lib/teas";

/**
 * Every blend, both weights, and the pots at the table — the page somebody
 * opens to check a price before they ring.
 */
export default function Teas() {
  usePageMeta("pages.teas.title", "pages.teas.description");
  const { items, total, hasMore, loading, loadMore } = useCollection<Tea>("teas", { pageSize: 6 });
  const { items: pots } = useCollection<Pot>("pots", { pageSize: 6 });
  return (
    <>
      <section className="grid items-start gap-[var(--space-8)] px-[var(--gutter)] pt-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
        <div>
          <Label k="pages.teas.label" />
          <T k="pages.teas.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)]" />
          <T k="pages.teas.body" as="p" className="mt-[var(--space-4)] max-w-[34ch] text-ink-soft" />
          <p className="mt-[var(--space-4)] text-sm text-ink-soft tabular-nums">
            {total}
            <T k="pages.teas.count" />
          </p>
          <CallButtons className="mt-[var(--space-6)]" />
        </div>
        <div className="min-w-0">
          <div className="grid gap-[var(--space-6)] sm:grid-cols-3">
            {items.map((tea) => <TeaTile key={tea.id} tea={tea} />)}
          </div>
          {loading && <T k="pages.teas.loading" as="p" className="mt-[var(--space-6)] text-sm text-ink-soft" />}
          {hasMore && (
            <button type="button" onClick={loadMore} className="mt-[var(--space-6)] border border-ink px-5 py-3 text-sm hover:bg-surface">
              <T k="pages.teas.showmore" />
            </button>
          )}
        </div>
      </section>

      <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
        <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
          <div>
            <Label k="pages.teas.pots.label" />
            <T k="pages.teas.pots.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
            <T k="pages.teas.pots.note" as="p" className="mt-[var(--space-4)] max-w-[32ch] text-ink-soft" />
          </div>
          <ul className="border-t border-ink">
            {pots.map((pot) => (
              <li key={pot.id} data-record={`pots:${pot.id}`} className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
                <span>
                  <span className="font-display text-lg">{pot.name}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{pot.note}</span>
                </span>
                <Price amount={pot.price} testId={`pot-price-${pot.id}`} />
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </>
  );
}
