import { Link } from "react-router-dom";
import { T } from "../editable";
import Label from "../components/Label";
import { usePageMeta } from "../seo";

export default function NotFound() {
  usePageMeta("pages.notfound.title", "pages.notfound.description");
  return (
    <section className="px-[var(--gutter)] py-[var(--space-16)]">
      <Label k="pages.notfound.label" />
      <T k="pages.notfound.heading" as="h1" className="mt-[var(--space-4)] text-[length:var(--size-h1)]" />
      <T k="pages.notfound.body" as="p" className="mt-[var(--space-4)] max-w-[46ch] text-ink-soft" />
      <Link to="/teas" className="mt-[var(--space-8)] inline-flex bg-accent px-5 py-3 text-sm text-accent-ink">
        <T k="pages.notfound.cta" />
      </Link>
    </section>
  );
}
