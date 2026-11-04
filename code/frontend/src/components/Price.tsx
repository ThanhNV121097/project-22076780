import { formatPrice } from "../lib/format";

/**
 * A price, set as the display figures this shop's board is built on: Archivo
 * 500, tabular, right-aligned so the digits line up down the column. `soft`
 * is the second weight on a row — the same figures, quieter ink.
 */
export default function Price({ amount, soft = false, board = false, testId, className = "" }: {
  amount: number | null | undefined;
  soft?: boolean;
  /** Three to a row on the board: the same figures, one step down. */
  board?: boolean;
  testId?: string;
  className?: string;
}) {
  const size = board ? "text-[length:var(--size-price-board)]" : "text-[length:var(--size-price)]";
  return (
    <span
      data-testid={testId}
      className={`block font-display ${size} leading-none tracking-[var(--tracking-display)] tabular-nums text-right ${soft ? "text-ink-soft" : "text-ink"} ${className}`}
    >
      {formatPrice(amount)}
    </span>
  );
}
