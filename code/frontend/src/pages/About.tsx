import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import Label from "../components/Label";
import Reveal from "../components/Reveal";
import CallButtons from "../components/CallButtons";
import type { Chapter, Person, Said } from "../lib/teas";

/**
 * Who is behind the shop: the story, the people who blend the tea, and what
 * customers say. The story is the shop's own facts from the brief. The names
 * of the people and the words of customers are the owner's to give: those two
 * sections are drawn from their tables and are not drawn at all while the
 * tables are empty — a visitor never reads a note meant for the team, and
 * nothing is put in anybody's mouth.
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
          src="/images/shop-hands.jpg"
          alt="Loose leaf weighed out at the counter"
          width={1280}
          height={853}
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
            {written.map((chapter) => (
              <article key={chapter.id} data-record={`story:${chapter.id}`} className="border-b border-line py-[var(--space-4)]">
                <h3 className="font-display text-lg">{chapter.heading}</h3>
                <p className="mt-[var(--space-2)] max-w-[64ch] text-ink-soft">{chapter.body}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {named.length > 0 && (
        <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
          <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
            <div>
              <Label k="pages.about.team.label" />
              <T k="pages.about.team.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
            </div>
            <ul className="min-w-0 border-t border-ink">
              {named.map((person) => (
                <li key={person.id} data-record={`team:${person.id}`} className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
                  <span className="font-display text-lg">{person.name}</span>
                  <span className="text-right text-sm text-ink-soft">{person.role}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}

      {quoted.length > 0 && (
        <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
          <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
            <div>
              <Label k="pages.about.said.label" />
              <T k="pages.about.said.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
            </div>
            <div className="min-w-0 border-t border-ink">
              {quoted.map((one) => (
                <blockquote key={one.id} data-record={`testimonials:${one.id}`} className="border-b border-line py-[var(--space-4)]">
                  <p className="max-w-[56ch] font-display text-lg">{one.quote}</p>
                  <cite className="mt-[var(--space-2)] block text-sm not-italic text-ink-soft">{one.who}</cite>
                </blockquote>
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </>
  );
}
