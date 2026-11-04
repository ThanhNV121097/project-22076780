import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import Label from "../components/Label";
import Reveal from "../components/Reveal";
import CallButtons from "../components/CallButtons";
import ContactForm from "../components/ContactForm";
import MapEmbed from "../components/MapEmbed";
import Icon from "../components/Icon";
import SocialIcon from "../components/SocialIcon";
import { digits } from "../components/ContactDock";

/**
 * Where the shop is, when it is open, and the three ways to reach it: the
 * phone, Zalo, and a message the owner reads in Agent Team.
 */
export default function Visit() {
  usePageMeta("pages.visit.title", "pages.visit.description");
  const phone = useContent("contact.phone");
  const zalo = useContent("contact.zalo");
  const address = useContent("contact.address");
  const hours = useContent("contact.hours");
  return (
    <>
      <section className="grid items-start gap-[var(--space-8)] px-[var(--gutter)] pt-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
        <div>
          <Label k="pages.visit.label" />
          <T k="pages.visit.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)]" />
          <T k="pages.visit.body" as="p" className="mt-[var(--space-4)] max-w-[32ch] text-ink-soft" />
          <CallButtons className="mt-[var(--space-6)]" />
        </div>
        <dl className="min-w-0 border-t border-ink">
          <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
            <dt className="flex items-center gap-2 text-sm text-ink-soft"><Icon name="address" size={16} /><T k="pages.visit.address" /></dt>
            <dd className="max-w-[30ch] text-right font-display text-lg" data-testid="visit-address">{address}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
            <dt className="flex items-center gap-2 text-sm text-ink-soft"><Icon name="hours" size={16} /><T k="pages.visit.hours" /></dt>
            <dd className="text-right font-display text-lg tabular-nums" data-testid="visit-hours">{hours}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
            <dt className="flex items-center gap-2 text-sm text-ink-soft"><Icon name="phone" size={16} /><T k="pages.visit.phone" /></dt>
            <dd className="text-right font-display text-lg tabular-nums">
              <a href={`tel:${digits(phone)}`} className="hover:text-accent">{phone}</a>
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line py-[var(--space-4)]">
            <dt className="flex items-center gap-2 text-sm text-ink-soft"><SocialIcon network="zalo" size={16} /><T k="pages.visit.zalo" /></dt>
            <dd className="text-right font-display text-lg tabular-nums">
              <a href={`https://zalo.me/${digits(zalo)}`} target="_blank" rel="noreferrer" className="hover:text-accent">{zalo}</a>
            </dd>
          </div>
        </dl>
      </section>

      <Reveal className="mt-[var(--space-8)] px-[var(--gutter)]">
        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-[var(--space-2)]">
            <div>
              <Label k="pages.visit.map.label" />
              <T k="pages.visit.map.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
            </div>
            <p className="text-sm text-ink-soft tabular-nums">{hours}</p>
          </div>
          <div className="mt-[var(--space-6)] grid gap-[var(--space-6)] lg:grid-cols-[1fr_340px]">
            <MapEmbed className="h-[30rem]" />
            <Picture
              src="/images/street.jpg"
              alt="The street outside, on Quán Thánh"
              width={1280}
              height={854}
              className="h-[30rem] w-full object-cover"
            />
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-[var(--space-16)] px-[var(--gutter)]">
        <section className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr] lg:gap-[var(--space-12)]">
          <div>
            <Label k="pages.visit.form.label" />
            <T k="pages.visit.form.heading" as="h2" className="mt-[var(--space-3)] text-[length:var(--size-h2)]" />
            <T k="pages.visit.form.body" as="p" className="mt-[var(--space-4)] max-w-[32ch] text-ink-soft" />
          </div>
          <ContactForm className="max-w-[34rem]" />
        </section>
      </Reveal>
    </>
  );
}
