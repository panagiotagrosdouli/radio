import Link from "next/link";
import { ArrowRight, Globe2, Headphones, Mic2 } from "lucide-react";
import { RadioLiveMark } from "@/components/radio-live-mark";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function AboutPage() {
  return (
    <main className="site-shell page-shell">
      <SiteHeader />
      <div className="content-page about-page">
        <section className="page-intro about-intro">
          <p className="eyebrow">A little about us</p>
          <h1>One station.<br /><em>A thousand moods.</em></h1>
          <p className="lede">Radio Live is independent in spirit, open to the world, and always looking for the song you didn’t know you needed.</p>
        </section>

        <section className="about-story">
          <div className="about-mark"><RadioLiveMark /></div>
          <div className="about-copy">
            <p className="about-lead">A good radio station makes the day feel like it has a soundtrack.</p>
            <p>From Athens to wherever you are, Radio Live brings together Greek voices, new discoveries and songs that have earned their place in your life. The mood moves with the hour, but the feeling stays: you’re in good company.</p>
            <p>We believe the best listening happens when there’s room for surprise. So settle in, keep us on, and let the next track find you.</p>
            <Link className="text-link" href="/#live">Tune in now <ArrowRight /></Link>
          </div>
        </section>

        <section className="about-values" aria-label="The Radio Live sound">
          <article><Globe2 /><span>01</span><h2>Open ears</h2><p>Greek sounds and global discoveries, side by side.</p></article>
          <article><Mic2 /><span>02</span><h2>Human voices</h2><p>Shows with character, made to keep you company.</p></article>
          <article><Headphones /><span>03</span><h2>Always within reach</h2><p>Take the live signal along, wherever the day goes.</p></article>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
