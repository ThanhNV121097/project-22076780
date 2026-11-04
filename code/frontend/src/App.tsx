import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { T, useContent, useList } from "./editable";
import Home from "./pages/Home";
import Teas from "./pages/Teas";
import Tea from "./pages/Tea";
import Gallery from "./pages/Gallery";
import Visit from "./pages/Visit";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Logo from "./components/Logo";
import MenuToggle from "./components/MenuToggle";
import MobileMenu from "./components/MobileMenu";
import ContactDock from "./components/ContactDock";
import PhotoCredits from "./components/PhotoCredits";
import Icon from "./components/Icon";
import SocialIcon from "./components/SocialIcon";
import { PageViews } from "./site";
import { digits } from "./components/ContactDock";

/**
 * The shop's site: a header of hairlines, the page, and a footer that repeats
 * the street, the hours and the number — the three things somebody came for.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-ground text-ink font-body">
      <PageViews />
      <TopOfPage />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teas" element={<Teas />} />
          <Route path="/teas/:id" element={<Tea />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ContactDock />
    </div>
  );
}

/** Each page opens at its top, as a page of a board should. */
function TopOfPage() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

interface NavLink { label: string; href: string; testid: string }

function Header() {
  const links = useList<NavLink>("nav.links");
  const name = useContent("site.name");
  const phone = useContent("contact.phone");
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground">
      <div className="flex h-[var(--header-h)] items-center justify-between px-[var(--gutter)]">
        <Link to="/" aria-label={name} className="text-accent"><Logo /></Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l, i) => (
            <Link
              key={l.href}
              to={l.href}
              data-testid={l.testid}
              className={`border-b py-1 text-sm transition-colors duration-[var(--duration-fast)] hover:text-accent ${pathname === l.href ? "border-ink" : "border-transparent"}`}
            >
              <T k={`nav.links.${i}.label`} />
            </Link>
          ))}
          <a href={`tel:${digits(phone)}`} className="flex items-center gap-2 bg-accent px-4 py-2 text-sm text-accent-ink">
            <Icon name="phone" size={16} />
            <span className="whitespace-nowrap tabular-nums">{phone}</span>
          </a>
        </nav>
        <div className="lg:hidden">
          <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        {links.map((l, i) => (
          <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="border-b border-line pb-4 font-display text-2xl">
            <T k={`nav.links.${i}.label`} />
          </Link>
        ))}
        <a href={`tel:${digits(phone)}`} className="flex items-center gap-3 self-start bg-accent px-5 py-3 text-accent-ink">
          <Icon name="phone" size={18} />
          <span className="tabular-nums">{phone}</span>
        </a>
      </MobileMenu>
    </header>
  );
}

function Footer() {
  const links = useList<NavLink>("nav.links");
  const name = useContent("site.name");
  const phone = useContent("contact.phone");
  const zalo = useContent("contact.zalo");
  const address = useContent("contact.address");
  const hours = useContent("contact.hours");
  return (
    <footer className="mt-[var(--space-16)] border-t border-line px-[var(--gutter)] pb-[var(--space-12)] pt-[var(--space-12)]">
      <div className="grid gap-[var(--space-8)] lg:grid-cols-[340px_1fr_auto]">
        <div>
          <span className="font-display text-xl text-ink">{name}</span>
          <ul className="mt-[var(--space-4)] space-y-2 text-sm text-ink-soft">
            <li className="flex items-start gap-3"><Icon name="address" size={16} /><span>{address}</span></li>
            <li className="flex items-start gap-3"><Icon name="hours" size={16} /><span>{hours}</span></li>
            <li className="flex items-start gap-3"><Icon name="phone" size={16} /><a href={`tel:${digits(phone)}`} className="tabular-nums hover:text-accent">{phone}</a></li>
            <li className="flex items-start gap-3">
              <SocialIcon network="zalo" size={16} />
              <a href={`https://zalo.me/${digits(zalo)}`} target="_blank" rel="noreferrer" className="tabular-nums hover:text-accent">{zalo}</a>
            </li>
          </ul>
        </div>
        <nav className="flex flex-col items-start gap-2 text-sm">
          {links.map((l, i) => (
            <Link key={l.href} to={l.href} className="hover:text-accent"><T k={`nav.links.${i}.label`} /></Link>
          ))}
        </nav>
        <div className="max-w-[34ch] text-sm text-ink-soft">
          <T k="footer.line" as="p" />
          <PhotoCredits className="mt-[var(--space-4)] text-xs" />
        </div>
      </div>
    </footer>
  );
}
