"use client";

import { useEffect, useState } from "react";

const shows = [
  { time: "00:00", title: "Night Shift", detail: "Soft edges for the small hours", sound: "Chill · Electronica" },
  { time: "03:00", title: "No Alarm", detail: "An easy drift toward morning", sound: "Downtempo · Soul" },
  { time: "06:00", title: "First Coffee", detail: "A brighter start, one song at a time", sound: "Pop · Greek picks" },
  { time: "09:00", title: "The Lift", detail: "New releases beside familiar voices", sound: "New music · Pop" },
  { time: "12:00", title: "Side B", detail: "Stories and sounds for your break", sound: "Soul · R&B" },
  { time: "15:00", title: "The Long Way Home", detail: "A little more rhythm for the road", sound: "Indie · Alternative" },
  { time: "18:00", title: "Greek Wave", detail: "Modern sounds and all-time favourites", sound: "Made in Greece" },
  { time: "21:00", title: "Afterglow", detail: "Deeper selections after dark", sound: "Electronic · Late night" },
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
  const activeShow = activeIndex >= 0 ? shows[activeIndex] : null;
  const nextShow = activeIndex >= 0 ? shows[(activeIndex + 1) % shows.length] : null;

  return (
    <section className="program-section" id="schedule" aria-labelledby="schedule-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">On air · Up next</p>
          <h2 id="schedule-heading">Today’s schedule</h2>
        </div>
        <p className="schedule-note">All times shown in Athens time (EET/EEST).</p>
      </div>

      <div className="now-next-grid">
        <article className="now-card" aria-label="On air now">
          <p className="summary-kicker"><span className="live-dot" /> On Air Now</p>
          <h3>{activeShow?.title ?? "Radio Live"}</h3>
          <p>{activeShow ? activeShow.sound : "Streaming online from Athens"}</p>
        </article>
        <article className="next-card" aria-label="Up next">
          <p className="summary-kicker">Up Next{nextShow ? ` · ${nextShow.time}` : ""}</p>
          <h3>{nextShow?.title ?? "Schedule loading"}</h3>
          <p>{nextShow ? nextShow.sound : "Today · Athens time"}</p>
        </article>
      </div>

      <div className="show-list" role="list" aria-label="Daily show schedule">
        {shows.map((show, index) => {
          const isOnAir = activeIndex === index;
          return (
            <article className={`show-row daypart-${index % 4}${isOnAir ? " is-on-air" : ""}`} key={show.title} role="listitem" aria-current={isOnAir ? "true" : undefined}>
              <time className="show-time" dateTime={show.time}>{show.time}</time>
              <div className="show-main">
                <h3>{show.title}</h3>
                <p>{show.detail}</p>
              </div>
              <span className="show-sound">{show.sound}</span>
              <span className="show-status">{isOnAir ? <><i /> ON AIR</> : ""}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
