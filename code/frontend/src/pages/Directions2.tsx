import { Picture } from "../picture";
import "../directions.css";

/**
 * Direction 2 — "A pot at the table". Its own palette and its own serif, not
 * theme.css's: one of two the owner is choosing between, deleted after.
 * Sample prices — the owner has not supplied a price list.
 */
const TEAS = [
  { name: "Trà sen", src: "/images/tin-lotus.png", alt: "A tin of lotus tea", p100: "320.000 ₫", p250: "740.000 ₫" },
  { name: "Trà nhài", src: "/images/tin-jasmine.png", alt: "A tin of jasmine tea", p100: "180.000 ₫", p250: "420.000 ₫" },
  { name: "Oolong", src: "/images/tin-oolong-a.png", alt: "A jar of oolong tea", p100: "240.000 ₫", p250: "560.000 ₫" },
];

export default function Directions2() {
  return (
    <div className="d2">
      <div className="d2__stage">
        <Picture
          src="/images/table.jpg"
          alt="Tea poured from a clay pot at a table in the shop"
          className="d2__bg"
          width={1280}
          height={848}
          loading="eager"
        />
        <div className="d2__scrim" />
        <span className="d2__edge">{"58 Quán Thánh · 8:00–21:00"}</span>
        <div className="d2__words">
          <p className="d2__eyebrow">{"Trà Sen Hồ Tây · Ba Đình, Hà Nội"}</p>
          <h1 className="d2__h1">{"Sit down for a pot, leave with a tin"}</h1>
          <p className="d2__lede">
            {"Lotus, jasmine and oolong, blended here on Quán Thánh. Open from eight in the morning until nine at night, every day of the week."}
          </p>
          <div className="d2__actions">
            <a className="d2__call" href="tel:02438291188">{"Call 024 3829 1188"}</a>
            <a className="d2__zalo" href="https://zalo.me/02438291188">{"Message on Zalo"}</a>
          </div>
        </div>
        <span className="d2__tag">{"Direction 2 — A pot at the table"}</span>
      </div>

      <aside className="d2__rail">
        <p className="d2__rail-head">{"Tins to take home"}</p>
        {TEAS.map((t) => (
          <article className="d2__item" key={t.name}>
            <img className="d2__item-tin" src={t.src} alt={t.alt} width={400} height={400} />
            <div>
              <h3>{t.name}</h3>
              <p className="d2__item-prices">
                <span><b>{"100g"}</b>{t.p100}</span>
                <span><b>{"250g"}</b>{t.p250}</span>
              </p>
            </div>
          </article>
        ))}
        <p className="d2__pot">
          {"A pot at one of our tables"}
          <strong>{"45.000 ₫"}</strong>
        </p>
      </aside>
    </div>
  );
}
