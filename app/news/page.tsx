import Link from "next/link";
import { ArrowUpRight, Disc3, Mic2, RadioTower } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { sitePath } from "@/lib/site-path";

export const dynamic = "force-static";

const desks = [
  { source: "Billboard", title: "Charts, releases and the artists shaping music now", href: "https://www.billboard.com/c/music/music-news/", icon: Disc3 },
  { source: "Rolling Stone", title: "Interviews, culture and stories from across the industry", href: "https://www.rollingstone.com/music/music-news/", icon: Mic2 },
  { source: "NME", title: "Breaking music news, tours and new sounds worldwide", href: "https://www.nme.com/news/music", icon: RadioTower },
];

export default function NewsPage() {
  return (
    <main className="site-shell page-shell">
      <SiteHeader />
      <div className="content-page sound-desk-page">
        <section className="page-intro">
          <p className="eyebrow">The Sound Desk</p>
          <h1>Stories behind<br /><em>the sound.</em></h1>
          <p className="lede">A hand-picked route into the artists, releases and ideas moving music forward. Select a desk to explore its latest coverage.</p>
        </section>

        <section className="news-grid" aria-label="Music news sources">
          {desks.map(({ source, title, href, icon: Icon }, index) => (
            <a className="news-card" href={href} target="_blank" rel="noreferrer" key={source}>
              <div className="news-card-top"><span>0{index + 1} / FIELD NOTES</span><Icon /></div>
              <div><p>{source}</p><h2>{title}</h2></div>
              <span className="news-link">OPEN THE DESK <ArrowUpRight /></span>
            </a>
          ))}
        </section>

        <div className="page-cta">
          <p>Keep the music in the room.</p>
          <Link href={sitePath("/#live")}>Back to the live room <ArrowUpRight /></Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
