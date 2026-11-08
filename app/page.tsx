import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RadioPlayer } from "@/components/radio-player";
import { ShowSchedule } from "@/components/show-schedule";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { sitePath } from "@/lib/site-path";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="site-shell radio-station-site" id="top">
      <SiteHeader />

      <div className="home-content">
        <section className="broadcast-hero broadcast-hero-radio" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> Online radio · Broadcasting from Athens</p>
            <h1 id="page-title">Radio Live.<br /><em>From Athens.</em></h1>
            <div className="hero-bottomline">
              <p className="hero-lede">No ads. Just music, voices and stories worth staying for.</p>
              <a className="hero-schedule-link" href="#schedule"><span>Today’s schedule</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>

          <div className="hero-player" id="live">
            <RadioPlayer />
          </div>

          <div className="hero-index">ONLINE <span>·</span> STREAMING 24/7</div>
        </section>

        <div className="station-ticker" aria-label="Radio Live details">
          <span>ONLINE RADIO</span><i /> <span>FROM ATHENS</span><i /> <span>NO ADS</span><i /> <span>LISTEN ANYWHERE</span>
        </div>

        <ShowSchedule />

        <section className="station-info" aria-labelledby="station-info-heading">
          <div>
            <p className="eyebrow">Radio Live · Athens</p>
            <h2 id="station-info-heading">A good station for wherever you are.</h2>
          </div>
          <Link href={sitePath("/about/")} className="station-info-link">About the station <ArrowUpRight aria-hidden="true" /></Link>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
