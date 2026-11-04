import { Picture } from "../picture";
import "../directions.css";

/**
 * Direction 1 — "Prices on the board". Not a page of the site: it carries no
 * header, no footer and no theme token, because it is one of two palettes the
 * owner is choosing between. Deleted once they have chosen.
 *
 * Words are string expressions rather than JSX text on purpose: this file is
 * never edited in the Studio, so its copy does not belong in content.json.
 * Sample prices — the owner has not supplied a price list.
 */
const TEAS = [
  {
    name: "Trà sen",
    note: "Lotus. Green tea layered with flowers from the lake, seven nights.",
    src: "/images/tin-lotus.png",
    alt: "A tin of lotus tea",
    p100: "320.000 ₫",
    p250: "740.000 ₫",
  },
  {
    name: "Trà nhài",
    note: "Jasmine. Scented fresh each summer, the everyday pot in this shop.",
    src: "/images/tin-jasmine.png",
    alt: "A tin of jasmine tea",
    p100: "180.000 ₫",
    p250: "420.000 ₫",
  },
  {
    name: "Oolong",
    note: "Half-oxidised leaf, rolled tight. Stands up to five or six pours.",
    src: "/images/tin-oolong-a.png",
    alt: "A jar of oolong tea",
    p100: "240.000 ₫",
    p250: "560.000 ₫",
  },
];

export default function Directions1() {
  return (
    <div className="d1">
      <div className="d1__grid">
        <aside className="d1__side">
          <p className="d1__eyebrow">{"58 Quán Thánh · Ba Đình, Hà Nội"}</p>
          <h1 className="d1__name">{"Trà Sen Hồ Tây"}</h1>
          <p className="d1__lede">
            {"We blend lotus, jasmine and oolong on Quán Thánh and sell them by the tin. A few tables inside if you would rather drink a pot here."}
          </p>
          <div className="d1__facts">
            <div className="d1__fact">
              <span>{"Open every day"}</span>
              <span>{"8:00–21:00"}</span>
            </div>
            <div className="d1__fact">
              <span>{"Phone and Zalo"}</span>
              <span>{"024 3829 1188"}</span>
            </div>
            <div className="d1__fact">
              <span>{"A pot at the table"}</span>
              <span>{"45.000 ₫"}</span>
            </div>
          </div>
          <div className="d1__actions">
            <a className="d1__call" href="tel:02438291188">{"Call the shop"}</a>
            <a className="d1__zalo" href="https://zalo.me/02438291188">{"Message on Zalo"}</a>
          </div>
        </aside>

        <main>
          <div className="d1__leaf-wrap">
            <Picture
              src="/images/leaf.jpg"
              alt="Loose green tea leaves"
              className="d1__leaf"
              width={1280}
              height={960}
              loading="eager"
            />
          </div>
          <div className="d1__board-head">
            <h2>{"Today's board"}</h2>
            <div className="d1__weights">
              <span className="d1__w">{"100g tin"}</span>
              <span className="d1__w">{"250g tin"}</span>
            </div>
          </div>
          {TEAS.map((t) => (
            <article className="d1__row" key={t.name}>
              <img className="d1__tin" src={t.src} alt={t.alt} width={400} height={400} />
              <div>
                <h3 className="d1__tea">{t.name}</h3>
                <p className="d1__note">{t.note}</p>
              </div>
              <div className="d1__price">{t.p100}</div>
              <div className="d1__price d1__price--soft">{t.p250}</div>
            </article>
          ))}
        </main>
      </div>
      <span className="d1__tag">{"Direction 1 — Prices on the board"}</span>
    </div>
  );
}
