import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { Picture } from "../picture";
import Label from "../components/Label";
import Price from "../components/Price";
import Reveal from "../components/Reveal";
import TeaTile from "../components/TeaTile";
import CallButtons from "../components/CallButtons";
import Icon from "../components/Icon";
import type { Pot, Photograph, Tea } from "../lib/teas";

/**
 * The board behind the counter. The left rail is the shop — name, street,
 * hours, the number to ring — and the rest of the screen is the three blends
 * with both weights priced, under a photograph of the leaf that runs off the
 * right edge of the viewport.
 */
export default function Home() {
  return (
    <>
      <Board />
      <Pots />
      <Room />
      <Where />
    </>
  );
}

function Board() {
  const { items: teas } = useCollection<Tea>("teas", { pageSize: 3 });
  const address = useContent("contact.address");
  const hours = useContent("contact.hours");
  const name = useContent("site.name");
  return (
    <section className="grid items-start gap-[var(--space-8)] pl-[var(--gutter)] pr-[var(--gutter)] pt-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)] lg:pr-0">
      <div className="lg:pt-[var(--space-4)]">
        <Label k="home.label" />
        <h1 className="mt-[var(--space-3)] text-[length:var(--size-h1)]">{name}</h1>
        <T k="home.lede" as="p" className="mt-[var(--space-4)] max-w-[32ch] text-ink-soft" />
        <dl className="mt-[var(--space-6)] border-t border-line text-sm">
          <div className="flex items-baseline justify-between gap-3 border-b border-line py-[var(--space-3)]">
            <dt className="flex items-center gap-2 text-ink-soft"><Icon name="address" size={15} /><T k="home.facts.where" /></dt>
            <dd className="text-right">{address}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-b border-line py-[var(--space-3)]">
            <dt className="flex items-center gap-2 text-ink-soft"><Icon name="hours" size={15} /><T k="home.facts.when" /></dt>
            <dd className="text-right tabular-nums" data-testid="home-hours">{hours}</dd>
          </div>
        </dl>
        <CallButtons testId="hero-call" className="mt-[var(--space-6)]" />
      </div>

      <div className="min-w-0">
        <div className="overflow-hidden">
          <Picture
            src="/images/leaf.jpg"
            alt="Loose green tea leaves, scooped from the tin"
            width={1280}
            height={960}
            loading="eager"
            className="h-[14rem] w-[112%] object-cover object-[50%_38%] lg:h-[19rem]"
          />
        </div>
        <div className="mt-[var(--space-6)] flex items-baseline justify-between gap-4 border-b border-ink pb-[var(--space-2)] pr-[var(--gutter)] lg:pr-[var(--gutter)]">
          <T k="home.board.heading" as="h2" className="text-[length:var(--size-h2)]" />
          <Label k="home.board.note" />
        </div>
        <div className="mt-[var(--space-6)] grid gap-[var(--space-6)] pr-[var(--gutter)] sm:grid-cols-3">
          {teas.map((tea) => <TeaTile key={tea.id} tea={tea} />)}
        </div>
        <Link to="/teas" data-testid="board-all" className="mt-[var(--space-6)] inline-flex items-center gap-2 text-sm text-accent hover:underline">
          <T k="home.board.all" />
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </section>
  );
}

function Pots() {
  const { items: pots, total } = useCollection<Pot>("pots", { pageSize: 6 });
  return (
    <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
      <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
        <div>
          <Label k="home.pots.label" />
          <T k="home.pots.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
          <T k="home.pots.body" as="p" className="mt-[var(--space-4)] max-w-[34ch] text-ink-soft" />
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
          <li className="py-[var(--space-3)] text-sm text-ink-soft tabular-nums">
            {total}
            <T k="home.pots.count" />
          </li>
        </ul>
      </section>
    </Reveal>
  );
}

function Room() {
  const { items: shots } = useCollection<Photograph>("gallery", { pageSize: 3 });
  return (
    <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-[var(--space-2)]">
          <div>
            <Label k="home.room.label" />
            <T k="home.room.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
          </div>
          <Link to="/gallery" data-testid="room-all" className="flex items-center gap-2 text-sm text-accent hover:underline">
            <T k="home.room.all" />
            <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="mt-[var(--space-6)] grid gap-[var(--space-6)] sm:grid-cols-3">
          {shots.map((shot) => (
            <figure key={shot.id} data-record={`gallery:${shot.id}`}>
              <Picture src={shot.image} alt={shot.caption} width={1280} height={853} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="mt-[var(--space-3)] border-t border-line pt-[var(--space-2)] text-sm text-ink-soft">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function Where() {
  const address = useContent("contact.address");
  const hours = useContent("contact.hours");
  return (
    <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
      <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
        <div>
          <Label k="home.where.label" />
          <T k="home.where.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
          <p className="mt-[var(--space-4)] max-w-[32ch] text-ink-soft">{address}</p>
          <p className="mt-[var(--space-2)] tabular-nums">{hours}</p>
          <Link to="/visit" data-testid="where-visit" className="mt-[var(--space-6)] inline-flex items-center gap-2 border border-ink px-5 py-3 text-sm hover:bg-surface">
            <T k="home.where.cta" />
            <Icon name="arrow" size={16} />
          </Link>
        </div>
        <Picture
          src="/images/corner.jpg"
          alt="The street corner outside the shop"
          width={1280}
          height={964}
          className="aspect-[16/9] w-full object-cover"
        />
      </section>
    </Reveal>
  );
}
