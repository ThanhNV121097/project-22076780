import { Link, useParams } from "react-router-dom";
import { T } from "../editable";
import { useRecord } from "../data";
import { Picture } from "../picture";
import Label from "../components/Label";
import Price from "../components/Price";
import ProductImage from "../components/ProductImage";
import CallButtons from "../components/CallButtons";
import Icon from "../components/Icon";
import type { Tea as Blend } from "../lib/teas";

/**
 * One blend: the tin, both weights priced large, what the leaf is and how we
 * brew it. There is no basket — the shop does not sell online, so the action
 * is the phone.
 */
export default function Tea() {
  const { id } = useParams();
  const { item } = useRecord<Blend>("teas", id);
  if (!item) {
    return (
      <section className="px-[var(--gutter)] py-[var(--space-16)]">
        <Label k="pages.tea.label" />
        <T k="pages.tea.missing.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)]" />
        <T k="pages.tea.missing.body" as="p" className="mt-[var(--space-4)] text-ink-soft" />
        <Link to="/teas" className="mt-[var(--space-8)] inline-flex bg-accent px-5 py-3 text-sm text-accent-ink">
          <T k="pages.tea.back" />
        </Link>
      </section>
    );
  }
  return (
    <>
      <section data-record={`teas:${item.id}`} className="grid items-start gap-[var(--space-8)] px-[var(--gutter)] pt-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
        <div>
          <Label k="pages.tea.label" />
          <h1 className="mt-[var(--space-3)] text-[length:var(--size-h1)]">{item.name}</h1>
          <p className="mt-[var(--space-2)] font-body text-[length:var(--size-label)] uppercase tracking-[var(--tracking-label)] text-ink-soft">{item.english}</p>
          <p className="mt-[var(--space-4)] max-w-[34ch] text-ink-soft">{item.note}</p>
          <dl className="mt-[var(--space-6)] border-t border-line text-sm">
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-3)]">
              <dt className="flex items-center gap-2 text-ink-soft"><Icon name="fresh" size={15} /><T k="pages.tea.leaf" /></dt>
              <dd className="max-w-[20ch] text-right">{item.leaf}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-3)]">
              <dt className="flex items-center gap-2 text-ink-soft"><Icon name="hours" size={15} /><T k="pages.tea.brewing" /></dt>
              <dd className="max-w-[20ch] text-right">{item.brewing}</dd>
            </div>
          </dl>
          <T k="pages.tea.order" as="p" className="mt-[var(--space-6)] max-w-[34ch] text-sm text-ink-soft" />
          <CallButtons className="mt-[var(--space-4)]" />
          <Link to="/teas" className="mt-[var(--space-6)] inline-flex items-center gap-2 text-sm text-accent hover:underline">
            <Icon name="back" size={16} />
            <T k="pages.tea.back" />
          </Link>
        </div>

        <div className="min-w-0">
          <div className="grid gap-[var(--space-6)] sm:grid-cols-2">
            <ProductImage src={item.image} alt={item.name} aspect="4/3" slot={`/images/teas/${item.id}.png`} eager />
            <Picture src={item.scene} alt={`${item.name} — the leaf`} width={1280} height={853} loading="eager" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="mt-[var(--space-8)] flex items-baseline justify-between gap-4 border-b border-ink pb-[var(--space-2)]">
            <T k="pages.tea.weights" as="h2" className="text-[length:var(--size-h2)]" />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
            <T k="board.w100" className="font-body text-[length:var(--size-label)] uppercase tracking-[var(--tracking-label)] text-ink-soft" />
            <Price amount={item.price_100} testId="tea-price-100" />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
            <T k="board.w250" className="font-body text-[length:var(--size-label)] uppercase tracking-[var(--tracking-label)] text-ink-soft" />
            <Price amount={item.price_250} testId="tea-price-250" />
          </div>
        </div>
      </section>
    </>
  );
}
