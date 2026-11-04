import { useContent } from "../editable";
import Icon from "./Icon";
import SocialIcon from "./SocialIcon";
import { digits } from "./ContactDock";

/**
 * The two things a visitor is asked to do: ring the shop, or send a Zalo
 * message. The number itself is the label on the call button — on a board,
 * the number is the information.
 */
export default function CallButtons({ testId, className = "" }: { testId?: string; className?: string }) {
  const phone = useContent("contact.phone");
  const zalo = useContent("contact.zalo");
  const call = useContent("contact.dock.call");
  const message = useContent("contact.dock.zalo");
  return (
    <div className={`flex flex-wrap items-center gap-[var(--space-3)] ${className}`}>
      {phone && (
        <a
          href={`tel:${digits(phone)}`}
          data-testid={testId}
          aria-label={call}
          className="flex items-center gap-2 bg-accent px-5 py-3 text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-90"
        >
          <Icon name="phone" size={18} />
          <span className="whitespace-nowrap tabular-nums">{phone}</span>
        </a>
      )}
      {zalo && (
        <a
          href={`https://zalo.me/${digits(zalo)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={message}
          className="flex items-center gap-2 border border-ink px-5 py-3 transition-colors duration-[var(--duration-fast)] hover:bg-surface"
        >
          <SocialIcon network="zalo" size={18} />
          <span className="whitespace-nowrap">{message}</span>
        </a>
      )}
    </div>
  );
}
