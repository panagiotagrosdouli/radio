import Link from "next/link";
import { ArrowDown, ArrowUpRight, Headphones, RadioTower, Sparkles } from "lucide-react";
import { RadioPlayer } from "@/components/radio-player";
import { ShowSchedule } from "@/components/show-schedule";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const notes = [
  { index: "01", title: "Fresh finds", copy: "New voices, new releases, and songs that deserve another spin." },
  { index: "02", title: "Local roots", copy: "Athenian energy with an open ear to everywhere." },
  { index: "03", title: "Good company", copy: "Hosts, stories, and a soundtrack for the hours in between." },
];

export default function Home() {
  return (
    <main className="site-shell" id="top">
      <SiteHeader />

      <div className="home-content">
        <section className="broadcast-hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> Independent radio · Broadcasting from Athens</p>
            <h1 id="page-title">We’ve got<br /><em>rhythm.</em></h1>
            <div className="hero-bottomline">
              <p className="hero-lede">No ads. Just the songs, shows and stories that make you want to stay a little longer.</p>
              <a className="hero-schedule-link" href="#live"><span>Listen live</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-orbit orbit-one" />
            <div className="hero-art-orbit orbit-two" />
            <div className="hero-art-disc"><span className="disc-center"><RadioTower /></span></div>
            <span className="hero-art-label label-top">RL · 24/7</span>
            <span className="hero-art-label label-bottom">ON AIR<br />EVERYWHERE</span>
            <span className="hero-art-note">YOUR RADIO<br />ALL DAY, EVERY DAY</span>
          </div>
          <a className="scroll-cue" href="#live"><ArrowDown aria-hidden="true" /><span>Scroll into the sound</span></a>
          <div className="hero-index">01 <span>/</span> THE SOUND OF NOW</div>
        </section>

        <div className="station-ticker" aria-label="Station promise">
          <span>NO ADS</span><i /> <span>ONLY RHYTHM</span><i /> <span>LIVE FROM ATHENS</span><i /> <span>ALL DAY · EVERY DAY · EVERYWHERE</span><i /> <span>NO ADS</span>
        </div>

        <section className="live-section" id="live" aria-label="Listen to Radio Live">
          <div className="section-rail"><span>01</span><p>THE LIVE ROOM</p><span className="rail-line" /></div>
          <div className="live-content">
            <div className="live-intro">
              <div><p className="eyebrow">Your radio, right now</p><h2>Stay for<br /><em>the next song.</em></h2></div>
              <p>Press play. We’ll take it from here.</p>
            </div>
            <RadioPlayer />
          </div>
        </section>

        <section className="station-notes" aria-label="What makes Radio Live different">
          <div className="notes-heading"><p className="eyebrow">A station with a point of view</p><p>Good music. Good company.<br />No reason to leave.</p></div>
          <div className="notes-grid">
            {notes.map((note) => (
              <article className="note-card" key={note.index}>
                <span className="note-index">{note.index}</span><h3>{note.title}</h3><p>{note.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <ShowSchedule />

        <section className="stay-tuned">
          <div className="stay-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="stay-copy"><p className="eyebrow"><Sparkles aria-hidden="true" /> Take us with you</p><h2>Your radio.<br /><em>Everywhere.</em></h2><p>At home, on the way, or wherever the day takes you. Radio Live is always within reach.</p></div>
          <Link href="/about" className="stay-link">Meet the station <ArrowUpRight aria-hidden="true" /></Link>
          <span className="stay-footnote">ATHENS · 24 HOURS · 7 DAYS</span>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
