import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import Label from "../components/Label";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import CallButtons from "../components/CallButtons";
import type { Chapter, Person, Said } from "../lib/teas";

/**
 * Who is behind the shop: the story, the people who blend the tea, and what
 * customers say. The owner has given none of those three yet, so each
 * section stands with its rows empty and says what it is waiting for —
 * nothing here is invented, and no empty picture frames are shipped: the
 * team is names and roles, laid out as a list on purpose.
 */
export default function About() {
  usePageMeta("pages.about.title", "pages.about.description");
  const { items: chapters } = useCollection<Chapter>("story", { pageSize: 4 });
  const { items: people } = useCollection<Person>("team", { pageSize: 6 });
  const { items: said } = useCollection<Said>("testimonials", { pageSize: 6 });
  const written = chapters.filter((c) => c.body.trim() !== "");
  const named = people.filter((p) => p.name.trim() !== "");
  const quoted = said.filter((s) => s.quote.trim() !== "");
  return (
    <>
      <section className="grid items-start gap-[var(--space-8)] px-[var(--gutter)] pt-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
        <div>
          <Label k="pages.about.label" />
          <T k="pages.about.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)]" />
          <CallButtons className="mt-[var(--space-6)]" />
        </div>
        <Picture
          src="/images/gallery-cups.jpg"
          alt="Cups on the table by the window at 58 Quán Thánh"
          width={1280}
          height={691}
          loading="eager"
          className="aspect-[16/9] w-full object-cover"
        />
      </section>

      <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
        <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
          <div>
            <Label k="pages.about.story.label" />
            <T k="pages.about.story.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
          </div>
          <div className="min-w-0 border-t border-ink">
            {written.length > 0 ? (
              written.map((chapter) => (
                <article key={chapter.id} data-record={`story:${chapter.id}`} className="border-b border-line py-[var(--space-4)]">
                  <h3 className="font-display text-lg">{chapter.heading}</h3>
                  <p className="mt-[var(--space-2)] max-w-[64ch] text-ink-soft">{chapter.body}</p>
                </article>
              ))
            ) : (
              <p className="flex max-w-[56ch] items-start gap-3 border-b border-line py-[var(--space-4)] text-ink-soft">
                <Icon name="info" size={16} />
                <T k="pages.about.story.empty" />
              </p>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
        <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
          <div>
            <Label k="pages.about.team.label" />
            <T k="pages.about.team.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
          </div>
          <ul className="min-w-0 border-t border-ink">
            {named.length > 0 ? (
              named.map((person) => (
                <li key={person.id} data-record={`team:${person.id}`} className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
                  <span className="font-display text-lg">{person.name}</span>
                  <span className="text-right text-sm text-ink-soft">{person.role}</span>
                </li>
              ))
            ) : (
              <li className="flex max-w-[56ch] items-start gap-3 border-b border-line py-[var(--space-4)] text-ink-soft">
                <Icon name="info" size={16} />
                <T k="pages.about.team.empty" />
              </li>
            )}
          </ul>
        </section>
      </Reveal>

      <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
        <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
          <div>
            <Label k="pages.about.said.label" />
            <T k="pages.about.said.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
          </div>
          <div className="min-w-0 border-t border-ink">
            {quoted.length > 0 ? (
              quoted.map((one) => (
                <blockquote key={one.id} data-record={`testimonials:${one.id}`} className="border-b border-line py-[var(--space-4)]">
                  <p className="max-w-[56ch] font-display text-lg">{one.quote}</p>
                  <cite className="mt-[var(--space-2)] block text-sm not-italic text-ink-soft">{one.who}</cite>
                </blockquote>
              ))
            ) : (
              <p className="flex max-w-[56ch] items-start gap-3 border-b border-line py-[var(--space-4)] text-ink-soft">
                <Icon name="quote" size={16} />
                <T k="pages.about.said.empty" />
              </p>
            )}
          </div>
        </section>
      </Reveal>
    </>
  );
}
