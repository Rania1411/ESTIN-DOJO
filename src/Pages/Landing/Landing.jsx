import { useEffect, useRef } from "react";
import styles from "./Landing.module.css";
import logo from '../../assets/dojo.png';
import Footer from '../../Components/Footer/Footer.jsx';
import { useNavigate } from "react-router-dom";
import { LuTimer } from "react-icons/lu";
import { FaTrophy, FaBookOpen, FaComments } from "react-icons/fa";

const TICKER_ITEMS = [
  "Focus Timer", "Study Streaks", "Leaderboard", "Peer Chat",
  "Resources", "Rank Up", "Stay Consistent", "Estin Community",
];


const FEATURES = [
  {
    icon: <LuTimer />,
    title: "Focus Timer",
    desc: "Pomodoro-style sessions with live progress. Stay locked in, block distractions.",
  },
  {
    icon: <FaTrophy />,
    title: "Leaderboard",
    desc: "Compete with peers on total focus hours. Filter by promo — 1CP through 3CS.",
  },
  {
    icon: <FaBookOpen />,
    title: "Resources",
    desc: "Curated notes, past exams, and study guides, organized by module and year.",
  },
  {
    icon: <FaComments />,
    title: "Study Chat",
    desc: "Real-time messaging with classmates. Ask questions, share breakthroughs.",
  },
];

function Landing() {
  const navigate = useNavigate();
  const canvasRef  = useRef(null);
  const cursorRef  = useRef(null);
  const ringRef    = useRef(null);
  const rafCursor  = useRef(null);
  const mousePos   = useRef({ x: -200, y: -200 });
  const ringPos    = useRef({ x: -200, y: -200 });

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 160;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,//opacity
      speed: Math.random() * 0.012 + 0.004,//twinkles
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      stars.forEach(s => {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,203,194,${a})`;
        ctx.fill();//apear on secreen
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top  = e.clientY + "px";
      }
    };

    const animRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.11;
      ringPos.current.y += dy * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top  = ringPos.current.y + "px";
      }
      rafCursor.current = requestAnimationFrame(animRing);
    };
    rafCursor.current = requestAnimationFrame(animRing);

    const grow = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "22px"; cursorRef.current.style.height = "22px"; }
      if (ringRef.current)   { ringRef.current.style.width  = "60px"; ringRef.current.style.height  = "60px"; }
    };
    const shrink = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "10px"; cursorRef.current.style.height = "10px"; }
      if (ringRef.current)   { ringRef.current.style.width  = "38px"; ringRef.current.style.height  = "38px"; }
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("button, a, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafCursor.current);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add(styles.visible); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll("[data-count]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        let start = 0;
        const step = Math.ceil(target / 60);
        const tick = () => {
          start = Math.min(start + step, target);
          el.textContent = start + suffix;
          if (start < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS]; // double for loop

  return (
    <>
      <div className={styles.landing}>
        <div className={styles.cursor} ref={cursorRef} />
        <div className={styles.cursorRing} ref={ringRef} />

      
        <div className={styles.grain} aria-hidden="true" />
        <canvas className={styles.bgCanvas} ref={canvasRef} aria-hidden="true" />

        <nav className={styles.navbar}>
          <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="Estin Dojo logo" />
            <span>Estin Dojo</span>
          </div>
          <button className={styles.signIn} onClick={() => navigate("/login")}>
            <span>Sign In</span>
          </button>
        </nav>

    
        <section className={styles.hero}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            Exclusively for Estin Students
          </div>

          <h1>
            Master Your{" "}
            <em>Studies.</em>
          </h1>

          <p className={styles.sub}>
            The minimal, focused study environment built exclusively for Estin
            students. Join the dojo, track your progress, and rise through the ranks.
          </p>

          <div className={styles.ctaGroup}>
            <button className={styles.cta} onClick={() => navigate("/login")}>
              <span>Enter the Dojo →</span>
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong data-count="500" data-suffix="+">0+</strong>
              <span>Students</span>
            </div>
            <div className={styles.stat}>
              <strong data-count="12" data-suffix="k+">0k+</strong>
              <span>Hours Logged</span>
            </div>
            <div className={styles.stat}>
              <strong data-count="6" data-suffix="">0</strong>
              <span>Year Groups</span>
            </div>
            <div className={styles.stat}>
              <strong data-count="98" data-suffix="%">0%</strong>
              <span>Satisfaction</span>
            </div>
          </div>
        </section>

    
        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerTrack}>
            {tickerContent.map((item, i) => (
              <div key={i} className={styles.tickerItem}>
                <span className={styles.tickerDot} />
                {item}
              </div>
            ))}
          </div>
        </div>

     
        <section className={styles.features}>
          <div className={`${styles.sectionHead} ${styles.reveal}`}>
            <h2>Everything You Need</h2>
            <p>Four tools, one mission — help you focus and improve.</p>
          </div>

          <div className={styles.featureGrid}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`${styles.featureCard} ${styles.reveal}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-hover
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <div className={`${styles.banner} ${styles.reveal}`}>
          <div className={styles.bannerGlow} aria-hidden="true" />
          <h2>Ready to Rise Through the Ranks?</h2>
          <p>Your peers are already studying. Don't fall behind.</p>
          <div className={styles.ctaGroup} style={{ animation: "none", opacity: 1 }}>
            <button className={styles.cta} onClick={() => navigate("/login")}>
              <span>Start Now →</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Landing;