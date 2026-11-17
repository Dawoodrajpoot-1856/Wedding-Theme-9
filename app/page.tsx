"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
  Heart,
  CheckCircle,
  CalendarPlus,
  Send,
} from "lucide-react";

/* =========================================================================
   ✅ SIRF YAHAN SE SAB KUCH CHANGE KARO
   ========================================================================= */
const CARD = {
  groomName: "Ali",
  groomParents: "Son of Mr. & Mrs. Ahmed",
  brideName: "Ayesha",
  brideParents: "Daughter of Mr. & Mrs. Hassan",

  eventTitle: "Walima",
  start: "2026-12-29T19:00:00+05:00",
  venue: "Royal Palm Golf & Country Club",
  address: "Bab-e-Azam Grand Marquee, Canal Bank Road, Lahore",
  mapsLink: "https://maps.google.com",

  whatsapp: "923001234567",
  musicSrc: "/sajna.mp3",

  message: [
    "Zindagi ke safar mein jab dil ko sacha humsafar mil jaye, toh har din ek jashan ban jata hai. Aaj hum apni is nayi shuruwat ki pehli khubsurat shaam sajane ja rahe hain.",
    "Aap ki shirkat aur aap ki pyari dua hamari is nayi zindagi ke safar ko aur bhi haseen bana degi. Aaiye, mil kar is khushi ka jashan manayein.",
  ],

  program: [
    { time: "06:30 PM", label: "Mehmanon ka istiqbal", icon: "🌸" },
    { time: "07:00 PM", label: "Dulha dulhan ki aamad", icon: "✨" },
    { time: "07:30 PM", label: "Dua aur dawat", icon: "🤲" },
    { time: "09:30 PM", label: "Rukhsati", icon: "🏡" },
  ],

  colors: [
    { name: "Rose Quartz", hex: "#E8A2A6" },
    { name: "Champagne Gold", hex: "#D4AF37" },
    { name: "Soft Peach", hex: "#FADADD" },
    { name: "Eucalyptus", hex: "#8FBC8F" },
  ],
};

/* ============================ HELPERS ============================ */
const PK = "Asia/Karachi";
const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PK,
  }).format(new Date(iso));
const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: PK,
  }).format(new Date(iso));
const dateParts = (iso: string) => {
  const f = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PK,
  }).formatToParts(new Date(iso));
  const g = (t: string) => f.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: g("weekday"),
    day: g("day"),
    month: g("month"),
    year: g("year"),
  };
};

const gcalLink = () => {
  const s = new Date(CARD.start);
  const e = new Date(s.getTime() + 4 * 3600 * 1000);
  const f = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${CARD.eventTitle} - ${CARD.groomName} & ${CARD.brideName}`,
  )}&dates=${f(s)}/${f(e)}&location=${encodeURIComponent(`${CARD.venue}, ${CARD.address}`)}`;
};

/* ============================ LUXURY FLORAL PALACE GATE ============================ */
function LuxuryPalaceGate({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={"luxury-gate-wrap" + (open ? " opened" : "")}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 400 450"
        className="gate-svg"
        role="img"
        aria-label="Luxury Palace Gate"
      >
        <defs>
          <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3D5D7" />
            <stop offset="50%" stopColor="#D48373" />
            <stop offset="100%" stopColor="#A85A4C" />
          </linearGradient>
          <linearGradient id="gateInterior" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F8" />
            <stop offset="100%" stopColor="#F5ECE8" />
          </linearGradient>
          <radialGradient id="chandelierGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFF3D6" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Palace Frame */}
        <path
          d="M70 420 V170 C70 90 130 40 200 40 C270 40 330 90 330 170 V420 Z"
          fill="url(#gateInterior)"
          stroke="url(#roseGold)"
          strokeWidth="5"
        />

        {/* Interior Chandelier Glow Effect */}
        <circle
          cx="200"
          cy="150"
          r="80"
          fill="url(#chandelierGlow)"
          className="chandelier-pulse"
        />

        {/* Hanging Crystal Chandelier */}
        <g className="hanging-chandelier" transform="translate(200, 60)">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="40"
            stroke="url(#roseGold)"
            strokeWidth="2"
          />
          <path
            d="M-20 40 H20 L10 65 H-10 Z"
            fill="url(#roseGold)"
            opacity="0.8"
          />
          <circle cx="0" cy="65" r="6" fill="#D4AF37" />
        </g>

        {/* Center Floral Crest */}
        <g className="gate-crest">
          <circle
            cx="200"
            cy="230"
            r="50"
            fill="#FFF"
            stroke="url(#roseGold)"
            strokeWidth="2"
            opacity="0.9"
          />
          <text
            x="200"
            y="240"
            textAnchor="middle"
            fill="#A85A4C"
            fontFamily="'Dancing Script', cursive"
            fontSize="42"
            fontWeight="bold"
          >
            {CARD.groomName[0]} & {CARD.brideName[0]}
          </text>
        </g>

        {/* Opening Double Doors */}
        <g className={"door-l" + (open ? " open-l" : "")}>
          <rect
            x="72"
            y="170"
            width="128"
            height="250"
            fill="#FCF5F3"
            stroke="url(#roseGold)"
            strokeWidth="2.5"
          />
          <circle cx="185" cy="295" r="5" fill="#D4AF37" />
        </g>
        <g className={"door-r" + (open ? " open-r" : "")}>
          <rect
            x="200"
            y="170"
            width="128"
            height="250"
            fill="#FCF5F3"
            stroke="url(#roseGold)"
            strokeWidth="2.5"
          />
          <circle cx="215" cy="295" r="5" fill="#D4AF37" />
        </g>
      </svg>
    </div>
  );
}

/* ============================ CONFETTI ============================ */
type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  s: number;
  c: string;
  heart: boolean;
};

function Confetti({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const pieces = useRef<Piece[]>([]);

  const pop = useCallback(() => {
    const cv = ref.current;
    if (!cv) return;
    const colors = [
      "#E8A2A6",
      "#D4AF37",
      "#FADADD",
      "#8FBC8F",
      "#D48373",
      "#FFF0F2",
    ];
    for (let i = 0; i < 110; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const sp = 7 + Math.random() * 9;
      pieces.current.push({
        x: cv.width / 2 + (Math.random() - 0.5) * 120,
        y: cv.height * 0.8,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.4,
        s: 6 + Math.random() * 8,
        c: colors[Math.floor(Math.random() * colors.length)],
        heart: Math.random() < 0.25,
      });
    }
  }, []);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const resize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pieces.current = pieces.current.filter((p) => p.y < cv.height + 30);
      for (const p of pieces.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28;
        p.vx *= 0.985;
        p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.heart) {
          ctx.font = `${p.s * 2}px serif`;
          ctx.textAlign = "center";
          ctx.fillText("♥", 0, 0);
        } else {
          ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (trigger > 0) {
      pop();
      setTimeout(pop, 280);
    }
  }, [trigger, pop]);

  return <canvas ref={ref} className="confetti" />;
}

/* ============================ SMALL PIECES ============================ */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="rv"
      initial={{ opacity: 0, y: 46, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Digit({ v }: { v: string }) {
  return (
    <span className="dg">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={v}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: "inline-block" }}
        >
          {v}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const NOTE_COLORS = ["#FFF5F5", "#F2F9F5", "#FAF4F0", "#FFFBEB"];

/* ============================ MAIN COMPONENT ============================ */
export default function LuxuryCard() {
  const [stage, setStage] = useState<"intro" | "opening" | "content">("intro");
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [guest, setGuest] = useState("");
  const [popKey, setPopKey] = useState(0);
  const [ameen, setAmeen] = useState(0);
  const [flip, setFlip] = useState(false);

  // RSVP
  const [name, setName] = useState("");
  const [count, setCount] = useState("1");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  // Wishes wall
  const [wishes, setWishes] = useState<{ n: string; t: string }[]>([]);
  const [wName, setWName] = useState("");
  const [wText, setWText] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -50]);

  useEffect(() => {
    setMounted(true);
    const to = new URLSearchParams(window.location.search).get("to");
    if (to) {
      setGuest(to);
      setName(to);
      setWName(to);
    }
    try {
      const saved = localStorage.getItem("lux_wishes_v1");
      if (saved) setWishes(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = Date.parse(CARD.start);
  const done = now !== null && now >= target;
  const diff = now === null ? 0 : Math.max(0, target - now);
  const units: [string, number][] = [
    ["Din", Math.floor(diff / 86400000)],
    ["Ghante", Math.floor(diff / 3600000) % 24],
    ["Minute", Math.floor(diff / 60000) % 60],
    ["Second", Math.floor(diff / 1000) % 60],
  ];
  const dp = dateParts(CARD.start);

  const enter = () => {
    if (stage !== "intro") return;
    setStage("opening");
    setTimeout(() => setPopKey((k) => k + 1), 600);
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {});
    setTimeout(() => {
      setStage("content");
      setPopKey((k) => k + 1);
    }, 2400);
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  const addWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wText.trim()) return;
    const next = [
      { n: wName.trim() || "Mehman", t: wText.trim() },
      ...wishes,
    ].slice(0, 30);
    setWishes(next);
    setWText("");
    setPopKey((k) => k + 1);
    try {
      localStorage.setItem("lux_wishes_v1", JSON.stringify(next));
    } catch {}
  };

  const submitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const msg =
      `Assalam o Alaikum! ${name.trim()} ` +
      (attending === "yes"
        ? `inshaAllah ${CARD.eventTitle} mein shamil hoon ga/gi (${count} mehman).`
        : "afsos, shamil nahi ho sakoon ga/gi.") +
      (note.trim() ? ` ${note.trim()}` : "");
    setSent(true);
    setPopKey((k) => k + 1);
    window.open(
      `https://wa.me/${CARD.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div className="root">
      <audio ref={audioRef} src={CARD.musicSrc} loop preload="auto" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Dancing+Script:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Amiri:wght@700&display=swap"
      />
      <style>{CSS}</style>

      {/* Luxury Background Theme */}
      <div className="lux-bg" />

      {mounted && (
        <div className="layer">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="petal-dot"
              style={{
                top: `${(i * 27) % 95}%`,
                left: `${(i * 41) % 95}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      <Confetti trigger={popKey} />
      {stage === "content" && (
        <motion.div className="bar" style={{ scaleX: scrollYProgress }} />
      )}
      {stage === "content" && (
        <button className="music" onClick={toggleMusic} aria-label="Music">
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}

      {/* ================= INTRO GATEWAY ================= */}
      <AnimatePresence>
        {stage !== "content" && (
          <motion.div
            className="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              className="intro-top"
              animate={
                stage === "opening"
                  ? { opacity: 0, y: -20 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6 }}
            >
              <span className="mini-lux">A Special Invitation</span>
              <span className="script names lux-gold">
                {CARD.groomName} & {CARD.brideName}
              </span>
            </motion.div>

            <motion.div
              className="scene"
              animate={
                stage === "opening"
                  ? { scale: 2.2, opacity: 0.9 }
                  : { scale: 1 }
              }
              style={{ transformOrigin: "50% 60%" }}
              transition={{
                duration: 1.8,
                ease: [0.65, 0, 0.35, 1],
                delay: stage === "opening" ? 0.3 : 0,
              }}
            >
              <LuxuryPalaceGate open={stage === "opening"} onClick={enter} />
            </motion.div>

            <motion.p
              className="hint-lux"
              animate={
                stage === "opening"
                  ? { opacity: 0 }
                  : { opacity: [0.6, 1, 0.6], y: [0, -4, 0] }
              }
              transition={
                stage === "opening"
                  ? { duration: 0.3 }
                  : { duration: 2, repeat: Infinity }
              }
              onClick={enter}
            >
              ✨ Darwaza kholne ke liye tap karein ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CONTENT ================= */}
      {stage === "content" && (
        <main className="page">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-scene"
          >
            <LuxuryPalaceGate open onClick={() => {}} />
          </motion.div>

          <motion.div
            className="bismillah"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {guest && (
            <motion.p
              className="dear"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Pyare {guest} ✨
            </motion.p>
          )}

          <motion.h1
            className="script names big"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {CARD.groomName}
          </motion.h1>
          <motion.p
            className="par"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {CARD.groomParents}
          </motion.p>

          <motion.div
            className="amp"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 160 }}
          >
            <Heart size={26} fill="#D48373" stroke="none" className="beat" />
          </motion.div>

          <motion.h1
            className="script names big"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {CARD.brideName}
          </motion.h1>
          <motion.p
            className="par"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            {CARD.brideParents}
          </motion.p>

          {/* DIL KI BAAT */}
          <Reveal>
            <section className="card msg">
              <h2 className="title script">Dil ki baat 💌</h2>
              {CARD.message.map((m, i) => (
                <p key={i}>{m}</p>
              ))}
            </section>
          </Reveal>

          {/* SAVE THE DATE */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">Save the Date</h2>
              <div
                className="flip"
                onClick={() => setFlip((f) => !f)}
                role="button"
                aria-label="Card palatein"
              >
                <div className={"flip-in" + (flip ? " on" : "")}>
                  <div className="face front">
                    <span className="mini">{dp.month}</span>
                    <strong>{dp.day}</strong>
                    <span className="mini">{dp.year}</span>
                    <small>Palatne ke liye tap karein</small>
                  </div>
                  <div className="face back">
                    <span className="script">{dp.weekday}</span>
                    <b>{fmtTime(CARD.start)}</b>
                    <small>{CARD.eventTitle} ki shaam</small>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* COUNTDOWN */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">
                {done
                  ? "Jashan shuru ho chuka 🎉"
                  : `${CARD.eventTitle} mein baqi`}
              </h2>
              {!done && (
                <div className="count">
                  {units.map(([l, v]) => (
                    <div key={l} className="cbox">
                      <strong>
                        {now === null
                          ? "--"
                          : String(v)
                              .padStart(2, "0")
                              .split("")
                              .map((ch, i) => <Digit key={i} v={ch} />)}
                      </strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </Reveal>

          {/* VENUE */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">Royal Venue</h2>
              <div className="card venue">
                <div className="row">
                  <Calendar size={19} className="lux-icon" />{" "}
                  <span>{fmtDate(CARD.start)}</span>
                </div>
                <div className="row">
                  <Clock size={19} className="lux-icon" />{" "}
                  <span>{fmtTime(CARD.start)}</span>
                </div>
                <div className="dash" />
                <div className="row top">
                  <MapPin size={19} className="lux-icon" />
                  <span>
                    <b>{CARD.venue}</b>
                    <br />
                    <small>{CARD.address}</small>
                  </span>
                </div>
                <div className="btns">
                  <a
                    className="btn"
                    href={CARD.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation size={15} /> Raasta dekhein
                  </a>
                  <a
                    className="btn ghost"
                    href={gcalLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarPlus size={15} /> Calendar mein add
                  </a>
                </div>
              </div>
            </section>
          </Reveal>

          {/* PROGRAM */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">Shaam ki Manzilein</h2>
              <div className="tower">
                {CARD.program.map((p, i) => (
                  <motion.div
                    key={p.time}
                    className="floor lux-floor"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    <span className="fl-ic">{p.icon}</span>
                    <div className="fl-info">
                      <b>{p.time}</b>
                      <span>{p.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* COLORS PALETTE */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">Mehfil ke Rang 🎨</h2>
              <p className="par">
                Aap ka libaas in pyare rangon mein ho to mehfil aur bhi
                khubsurat lagegi.
              </p>
              <div className="colors">
                {CARD.colors.map((c) => (
                  <div
                    key={c.name}
                    className="c-item"
                    style={{ background: c.hex }}
                  >
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* DUA WALL */}
          <Reveal>
            <section className="card wishes">
              <h2 className="title script">Duaon ki Deewar 🤲</h2>
              <form onSubmit={addWish} className="form">
                <input
                  type="text"
                  placeholder="Aap ka naam"
                  value={wName}
                  onChange={(e) => setWName(e.target.value)}
                  className="input"
                />
                <textarea
                  placeholder="Dulha dulhan ke liye pyara sa paigham..."
                  value={wText}
                  onChange={(e) => setWText(e.target.value)}
                  className="input textarea"
                  rows={3}
                />
                <button type="submit" className="btn primary">
                  Paigham bhejein <Send size={15} />
                </button>
              </form>

              <div className="notes">
                {wishes.map((w, idx) => (
                  <motion.div
                    key={idx}
                    className="note"
                    style={{
                      background: NOTE_COLORS[idx % NOTE_COLORS.length],
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p>{w.t}</p>
                    <small>— {w.n}</small>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* RSVP */}
          <Reveal>
            <section className="card rsvp">
              <h2 className="title script">Aamad ki Ittela (RSVP) 📝</h2>
              {sent ? (
                <div className="sent-box">
                  <CheckCircle size={40} color="#8FBC8F" />
                  <p>
                    Shukriya! Aap ka paigham WhatsApp par bhej diya gaya hai.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitRSVP} className="form">
                  <input
                    type="text"
                    placeholder="Aap ka naam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                  />
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="attending"
                        checked={attending === "yes"}
                        onChange={() => setAttending("yes")}
                      />{" "}
                      Zaroor aaunga/aaungi
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="attending"
                        checked={attending === "no"}
                        onChange={() => setAttending("no")}
                      />{" "}
                      Mazrat khwah hoon
                    </label>
                  </div>
                  {attending === "yes" && (
                    <select
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      className="input"
                    >
                      <option value="1">1 Mehman</option>
                      <option value="2">2 Mehman</option>
                      <option value="3">3 Mehman</option>
                      <option value="4">4 Mehman</option>
                    </select>
                  )}
                  <input
                    type="text"
                    placeholder="Koi khaas baat ya dua (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="input"
                  />
                  <button type="submit" className="btn primary">
                    WhatsApp par RSVP bhejein <Send size={15} />
                  </button>
                </form>
              )}
            </section>
          </Reveal>

          {/* AMEEN BUTTON */}
          <Reveal>
            <section className="sec center">
              <h2 className="title script">Bismillah aur Dua 🤲</h2>
              <button
                className="btn amin-btn"
                onClick={() => {
                  setAmeen((a) => a + 1);
                  setPopKey((k) => k + 1);
                }}
              >
                <Heart size={18} fill="#D48373" stroke="none" /> Ameen kahein (
                {ameen})
              </button>
            </section>
          </Reveal>

          <footer className="footer">
            <p className="script">
              {CARD.groomName} & {CARD.brideName} ki taraf se intezaar rahega ✨
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}

/* ============================ STYLES ============================ */
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #FAF6F5; color: #4A3B44; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
.root { min-height: 100vh; position: relative; display: flex; flex-direction: column; align-items: center; }

/* Luxury Light Background & Glow */
.lux-bg { position: fixed; inset: 0; background: radial-gradient(circle at 50% 15%, #FFF0EE 0%, #FAF6F5 60%, #F3ECE8 100%); z-index: -2; }
.layer { position: fixed; inset: 0; pointer-events: none; z-index: -1; overflow: hidden; }

/* Petal Dots */
.petal-dot { position: absolute; width: 6px; height: 6px; background: #E8A2A6; border-radius: 50%; opacity: 0.5; animation: floatPetalLux 5s ease-in-out infinite alternate; }
@keyframes floatPetalLux { from { transform: translateY(0) scale(0.8); opacity: 0.3; } to { transform: translateY(-15px) scale(1.2); opacity: 0.8; } }

/* Confetti */
.confetti { position: fixed; inset: 0; pointer-events: none; z-index: 999; }

/* Bar & Music */
.bar { position: fixed; top: 0; left: 0; right: 0; height: 4px; background: #D48373; transform-origin: 0%; z-index: 100; }
.music { position: fixed; top: 16px; right: 16px; width: 42px; height: 42px; border-radius: 50%; background: #FFF; border: 1px solid #D48373; color: #D48373; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 90; box-shadow: 0 4px 15px rgba(212,131,115,0.2); transition: transform 0.2s; }
.music:hover { transform: scale(1.08); }

/* Intro / Gateway */
.intro { position: fixed; inset: 0; background: radial-gradient(circle at 50% 30%, #FFF4F2 0%, #F5ECE8 80%); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 200; padding: 20px; text-align: center; }
.intro-top { margin-bottom: 24px; }
.mini-lux { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 3px; color: #A85A4C; display: block; margin-bottom: 6px; font-weight: 600; }
.script { font-family: 'Dancing Script', cursive; font-weight: 700; }
.lux-gold { color: #A85A4C; text-shadow: 0 2px 10px rgba(168,90,76,0.15); }
.names { font-size: 3.2rem; line-height: 1.1; }
.luxury-gate-wrap { width: 100%; max-width: 340px; cursor: pointer; filter: drop-shadow(0 10px 30px rgba(168,90,76,0.15)); }
.gate-svg { width: 100%; height: auto; }
.hint-lux { margin-top: 28px; font-size: 1rem; color: #A85A4C; background: rgba(255,255,255,0.9); padding: 10px 24px; border-radius: 30px; border: 1px solid rgba(212,131,115,0.3); box-shadow: 0 4px 15px rgba(0,0,0,0.05); cursor: pointer; }

/* Gateway animations */
.chandelier-pulse { animation: pulseChandelier 2s ease-in-out infinite alternate; transform-origin: center; }
@keyframes pulseChandelier { from { opacity: 0.5; transform: scale(0.9); } to { opacity: 1; transform: scale(1.1); } }
.hanging-chandelier { animation: swingChandelier 3s ease-in-out infinite alternate; transform-origin: top center; }
@keyframes swingChandelier { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }

.door-l, .door-r { transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
.luxury-gate-wrap.opened .door-l { transform: translateX(-110px) rotateY(-20deg); }
.luxury-gate-wrap.opened .door-r { transform: translateX(110px) rotateY(20deg); }

/* Page Content layout */
.page { width: 100%; max-width: 600px; padding: 30px 20px 80px 20px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.hero-scene { width: 100%; max-width: 240px; margin-bottom: 20px; }
.bismillah { font-family: 'Amiri', serif; font-size: 1.5rem; color: #A85A4C; margin-bottom: 12px; }
.dear { font-size: 1.1rem; color: #8C6A64; margin-bottom: 10px; font-weight: 600; }
.big { font-size: 3.8rem; color: #7A3E35; margin: 4px 0; }
.par { font-size: 0.95rem; color: #7A6865; letter-spacing: 0.5px; }
.amp { margin: 10px 0; display: inline-flex; }
.beat { animation: heartbeat 1.5s ease-in-out infinite; }
@keyframes heartbeat { 0%, 100% { transform: scale(1); } 15% { transform: scale(1.25); } 30% { transform: scale(1); } 45% { transform: scale(1.15); } }

/* Cards & Sections */
.sec { width: 100%; margin-top: 40px; }
.card { width: 100%; background: #FFF; border: 1px solid rgba(212,131,115,0.2); border-radius: 20px; padding: 24px; box-shadow: 0 10px 30px rgba(168,90,76,0.06); margin-top: 40px; }
.title { font-size: 2.4rem; color: #A85A4C; margin-bottom: 16px; }
.msg p { font-size: 1.05rem; line-height: 1.7; color: #5C4A52; margin-bottom: 12px; }

/* Flip Save The Date Card */
.flip { width: 100%; max-width: 280px; height: 160px; margin: 0 auto; perspective: 1000px; cursor: pointer; }
.flip-in { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.flip-in.on { transform: rotateY(180deg); }
.face { position: absolute; inset: 0; background: #FFF; border: 1.5px solid rgba(212,131,115,0.3); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; backface-visibility: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.04); padding: 16px; }
.face.back { transform: rotateY(180deg); background: #FFF4F2; }
.face .mini { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #A85A4C; }
.face strong { font-size: 2.2rem; color: #4A3B44; line-height: 1; margin: 4px 0; }
.face small { font-size: 0.75rem; color: #8C7875; margin-top: 6px; }
.face b { font-size: 1.3rem; color: #7A3E35; }

/* Countdown */
.count { display: flex; gap: 10px; justify-content: center; margin-top: 16px; }
.cbox { background: #FFF; border: 1px solid rgba(212,131,115,0.25); border-radius: 14px; padding: 12px 14px; min-width: 65px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); display: flex; flex-direction: column; align-items: center; }
.cbox strong { font-size: 1.5rem; color: #7A3E35; font-family: monospace; }
.cbox span { font-size: 0.75rem; color: #8C7875; text-transform: uppercase; margin-top: 2px; }
.dg { display: inline-flex; overflow: hidden; }

/* Venue Card */
.venue .row { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: #5C4A52; text-align: left; margin-bottom: 12px; }
.venue .top { align-items: flex-start; }
.venue .lux-icon { color: #D48373; flex-shrink: 0; margin-top: 2px; }
.venue .dash { width: 100%; height: 1px; background: rgba(212,131,115,0.2); margin: 14px 0; }
.btns { display: flex; gap: 10px; margin-top: 18px; }
.btn { flex: 1; background: #D48373; color: #FFF; padding: 12px 16px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 0.9rem; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; box-shadow: 0 4px 15px rgba(212,131,115,0.3); }
.btn:hover { background: #C27262; transform: translateY(-2px); }
.btn.ghost { background: transparent; border: 1.5px solid #D48373; color: #D48373; box-shadow: none; }
.btn.ghost:hover { background: rgba(212,131,115,0.08); }

/* Program Tower */
.tower { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
.floor { background: #FFF; border: 1px solid rgba(212,131,115,0.2); border-radius: 14px; padding: 14px 18px; display: flex; align-items: center; gap: 16px; text-align: left; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.fl-ic { font-size: 1.6rem; }
.fl-info b { display: block; font-size: 0.95rem; color: #7A3E35; }
.fl-info span { font-size: 0.9rem; color: #6C5A62; }

/* Colors Palette */
.colors { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 16px; }
.c-item { height: 75px; border-radius: 14px; display: flex; align-items: flex-end; padding: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.6); }
.c-item span { background: rgba(255,255,255,0.85); backdrop-filter: blur(4px); padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: #4A3B44; }

/* Wishes & RSVP Forms */
.form { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; text-align: left; }
.input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1.5px solid rgba(212,131,115,0.3); background: #FCF9F8; font-family: inherit; font-size: 0.95rem; color: #4A3B44; outline: none; transition: border-color 0.2s; }
.input:focus { border-color: #D48373; background: #FFF; }
.textarea { resize: vertical; }
.radio-group { display: flex; gap: 20px; font-size: 0.9rem; color: #5C4A52; margin: 4px 0; cursor: pointer; }
.radio-group label { display: flex; align-items: center; gap: 6px; cursor: pointer; }

/* Wish Notes Grid */
.notes { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; max-height: 250px; overflow-y: auto; text-align: left; }
.note { padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(212,131,115,0.2); }
.note p { font-size: 0.9rem; color: #5C4A52; }
.note small { display: block; font-size: 0.75rem; color: #A85A4C; margin-top: 4px; font-weight: 600; text-align: right; }

.sent-box { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 20px; text-align: center; }
.sent-box p { font-size: 0.95rem; color: #5C4A52; }

/* Center Button & Footer */
.center { display: flex; flex-direction: column; align-items: center; }
.amin-btn { max-width: 220px; margin-top: 12px; }
.footer { margin-top: 50px; padding: 20px 0; color: #A85A4C; font-size: 1.4rem; }
`;
