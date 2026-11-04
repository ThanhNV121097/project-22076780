import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import Label from "../components/Label";
import Reveal from "../components/Reveal";
import type { Photograph } from "../lib/teas";

/**
 * The photographs, one at a time and large: a single column of full-width
 * landscape pictures, each with its caption on a hairline beneath. Never a
 * row of three — a small picture in a box says the idea was not built.
 */
export default function Gallery() {
  usePageMeta("pages.gallery.title", "pages.gallery.description");
  const { items, total, hasMore, loading, loadMore } = useCollection<Photograph>("gallery", { pageSize: 4 });
  return (
    <>
      <section className="grid items-start gap-[var(--space-6)] px-[var(--gutter)] pt-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
        <div>
          <Label k="pages.gallery.label" />
          <T k="pages.gallery.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)]" />
          <T k="pages.gallery.body" as="p" className="mt-[var(--space-4)] max-w-[34ch] text-ink-soft" />
          <p className="mt-[var(--space-4)] text-sm text-ink-soft tabular-nums">
            {total}
            <T k="pages.gallery.count" />
          </p>
        </div>
        <div className="min-w-0">
          {items.map((shot, i) => (
            <Reveal key={shot.id} className={i === 0 ? "" : "mt-[var(--space-12)]"}>
              <figure data-record={`gallery:${shot.id}`} data-testid={`gallery-${shot.id}`}>
                <Picture
                  src={shot.image}
                  alt={shot.caption}
                  width={1280}
                  height={853}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="mt-[var(--space-3)] border-t border-line pt-[var(--space-2)] text-sm text-ink-soft">{shot.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
          {loading && <T k="pages.gallery.loading" as="p" className="mt-[var(--space-6)] text-sm text-ink-soft" />}
          {hasMore && (
            <button type="button" onClick={loadMore} data-testid="gallery-more" className="mt-[var(--space-8)] border border-ink px-5 py-3 text-sm hover:bg-surface">
              <T k="pages.gallery.showmore" />
            </button>
          )}
        </div>
      </section>
    </>
  );
}
