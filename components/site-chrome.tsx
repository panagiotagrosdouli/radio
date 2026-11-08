import Link from "next/link";
import { RadioLiveMark } from "@/components/radio-live-mark";
import { sitePath } from "@/lib/site-path";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href={sitePath("/")} aria-label="Radio Live home page">
        <span className="wordmark-icon"><RadioLiveMark /></span>
        <span className="wordmark-type"><span>RADIO</span><b>LIVE</b></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href={sitePath("/#live")}>Listen</Link>
        <Link href={sitePath("/#schedule")}>Shows</Link>
        <Link href={sitePath("/news/")}>The Sound Desk</Link>
        <Link href={sitePath("/about/")}>Our story</Link>
      </nav>
      <a className="header-status" href={sitePath("/#live")}><span className="live-dot" /> <span>ON AIR · 24/7</span></a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span className="footer-brand"><RadioLiveMark /> RADIO LIVE</span>
      <span>WE’VE GOT RHYTHM · ATHENS</span>
      <span>© {new Date().getFullYear()} RADIO LIVE</span>
    </footer>
  );
}
