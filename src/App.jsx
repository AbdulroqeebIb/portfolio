import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "./context/SettingsContext";
import {
  build,
  projects,
  EMAIL,
  LINKEDIN,
  GITHUB,
  CV_DEV,
  CV_IT,
} from "./data/projects";

const NODES = [
  [80, 190],
  [300, 100],
  [520, 160],
  [760, 70],
  [980, 140],
  [1200, 60],
];

function Banner() {
  const { t } = useTranslation();
  const { theme, toggleTheme, toggleLang } = useSettings();
  return (
    <div className="banner">
      <div className="banner-grid" />
      <svg
        viewBox="0 0 1280 240"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeOpacity=".4" fill="none">
          <path d="M80 190L300 100L520 160L760 70L980 140L1200 60" />
          <path d="M300 100L420 220L520 160" />
          <path d="M760 70L860 210L980 140" />
        </g>
        <g fill="currentColor">
          {NODES.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
          ))}
        </g>
      </svg>
      <nav className="nav">
        <a className="brand" href="#top">
          {t("nav.brand")}
        </a>
        <div className="nav-actions">
          <button className="btn" type="button" onClick={toggleLang}>
            {t("common.switchLang")}
          </button>
          <button
            className="btn"
            type="button"
            onClick={toggleTheme}
            aria-label={t("common.toggleTheme")}
          >
            {theme === "dark" ? t("common.light") : t("common.dark")}
          </button>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <header className="hero" id="top">
      <div className="badge" aria-hidden="true">
        AI
      </div>
      <h1 className="name">{t("hero.name")}</h1>
      <p className="role">
        {t("hero.role")}{" "}
        <span className="chip chip-live">{t("hero.open")}</span>
      </p>
      <p className="intro">{t("hero.intro")}</p>
      <div className="actions">
        <a className="btn btn-primary" href="#projects">
          {t("hero.viewProjects")}
        </a>
        <a className="btn" href={CV_DEV} download>
          {t("hero.downloadCv")}
        </a>
      </div>
    </header>
  );
}

function Stack() {
  const { t } = useTranslation();
  const support = t("stack.supportItems", { returnObjects: true });
  return (
    <section id="stack" className="sec">
      <h2>{t("stack.title")}</h2>
      <p className="label">{t("stack.build")}</p>
      <div className="chips">
        {build.map((item) => (
          <span className="chip" key={item}>
            {item}
          </span>
        ))}
      </div>
      <p className="label">{t("stack.support")}</p>
      <div className="chips">
        {support.map((item) => (
          <span className="chip chip-support" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function Shot({ id, name }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="shot shot-empty">{name}</div>;
  return (
    <img
      className="shot"
      src={`/images/${id}.png`}
      alt={`${name} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Links({ project }) {
  const { t } = useTranslation();
  return (
    <p className="links">
      {project.live && (
        <a
          className="link"
          href={project.live}
          target="_blank"
          rel="noreferrer"
        >
          {t("projects.live")} ↗
        </a>
      )}
      {project.code && (
        <a
          className="link"
          href={project.code}
          target="_blank"
          rel="noreferrer"
        >
          {t("projects.code")} ↗
        </a>
      )}
    </p>
  );
}

function Projects() {
  const { t } = useTranslation();
  const [first, ...rest] = projects;
  return (
    <section id="projects" className="sec">
      <h2>{t("projects.title")}</h2>
      <article className="card featured">
        <Shot id={first.id} name={first.name} />
        <div>
          <p className="label">{t("projects.featured")} · 2026</p>
          <h3>{first.name}</h3>
          <p className="desc">{t(`projects.items.${first.id}`)}</p>
          <p className="tags">{first.tags.join(" · ")}</p>
          <Links project={first} />
        </div>
      </article>
      <div className="cards">
        {rest.map((p) => (
          <article className="card" key={p.id}>
            <Shot id={p.id} name={p.name} />
            <h3>{p.name}</h3>
            <p className="desc">{t(`projects.items.${p.id}`)}</p>
            <p className="tags">{p.tags.join(" · ")}</p>
            <Links project={p} />
          </article>
        ))}
      </div>
      <p className="also">{t("projects.also")}</p>
    </section>
  );
}

function Journey() {
  const { t } = useTranslation();
  const items = t("journey.items", { returnObjects: true });
  return (
    <section id="journey" className="sec">
      <h2>{t("journey.title")}</h2>
      {items.map((item) => (
        <div className="step" key={item.year}>
          <span className="year">{item.year}</span>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
}

function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="sec contact">
      <h2>{t("contact.title")}</h2>
      <p className="links">
        <a className="link" dir="ltr" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <a className="link" href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a className="link" href={GITHUB} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </p>
      <p className="links">
        <a className="link" href={CV_DEV} download>
          {t("contact.cvDev")}
        </a>
        <a className="link" href={CV_IT} download>
          {t("contact.cvIt")}
        </a>
      </p>
      <p className="foot">
        {t("footer.rights", { year: new Date().getFullYear() })}
      </p>
    </section>
  );
}

function Outline() {
  const { t } = useTranslation();
  return (
    <aside className="outline">
      <p className="label">{t("outline.title")}</p>
      <a href="#stack">{t("outline.stack")}</a>
      <a href="#projects">{t("outline.projects")}</a>
      <a href="#journey">{t("outline.journey")}</a>
      <a href="#contact">{t("outline.contact")}</a>
    </aside>
  );
}

export default function App() {
  return (
    <>
      <Banner />
      <div className="layout">
        <main>
          <Hero />
          <Stack />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <Outline />
      </div>
    </>
  );
}
