"use client";

import { useEffect, useState } from "react";
import { Coffee, Disc3, Headphones, Mic2, Moon, Music2, Sunrise, Waves } from "lucide-react";

const shows = [
  { time: "00:00", title: "Night Shift", detail: "Soft edges for the small hours", sound: "Chill · Electronica", icon: Moon },
  { time: "03:00", title: "No Alarm", detail: "An easy drift toward morning", sound: "Downtempo · Soul", icon: Waves },
  { time: "06:00", title: "First Coffee", detail: "A brighter start, one song at a time", sound: "Pop · Greek picks", icon: Coffee },
  { time: "09:00", title: "The Lift", detail: "New releases beside familiar voices", sound: "New music · Pop", icon: Sunrise },
  { time: "12:00", title: "Side B", detail: "Stories and sounds for your break", sound: "Soul · R&B", icon: Mic2 },
  { time: "15:00", title: "The Long Way Home", detail: "A little more rhythm for the road", sound: "Indie · Alternative", icon: Disc3 },
  { time: "18:00", title: "Greek Wave", detail: "Modern sounds and all-time favourites", sound: "Made in Greece", icon: Music2 },
  { time: "21:00", title: "Afterglow", detail: "Deeper selections after dark", sound: "Electronic · Late night", icon: Headphones },
];

function athensHour() {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Athens",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date()).find((part) => part.type === "hour")?.value;
  return Number(hour ?? 0);
}

export function ShowSchedule() {
  const [currentHour, setCurrentHour] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setCurrentHour(athensHour());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const activeIndex = currentHour === null
    ? -1
    : shows.reduce((current, show, index) => Number(show.time.slice(0, 2)) <= currentHour ? index : current, 0);

  return (
    <section className="program-section" id="schedule" aria-labelledby="schedule-heading">
      <div className="section-heading">
        <div><p className="eyebrow">Find your hour</p><h2 id="schedule-heading">The daily<br /><em>line-up.</em></h2></div>
        <div className="schedule-note"><span className="schedule-clock" /> <p>Eight moods from midnight to late. All times are shown in Athens time (EET/EEST).</p></div>
      </div>
      <div className="show-grid">
        {shows.map(({ time, title, detail, sound, icon: Icon }, index) => {
          const isOnAir = activeIndex === index;
          return (
            <article className={`show-card${isOnAir ? " is-on-air" : ""}`} key={title} aria-current={isOnAir ? "true" : undefined}>
              <div className="show-card-top">
                <span className="show-icon"><Icon aria-hidden="true" /></span>
                {isOnAir ? <span className="show-live"><i /> ON AIR NOW</span> : <span className="show-number">0{index + 1}</span>}
              </div>
              <p className="show-time">{time}</p>
              <h3>{title}</h3>
              <p className="show-detail">{detail}</p>
              <span className="show-sound">{sound}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
