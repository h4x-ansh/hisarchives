"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame } from "@/components/archive-frame";

type CuratedCategory =
  | "Songs"
  | "Anime"
  | "Marvel"
  | "RCB"
  | "FC Barcelona"
  | "Virat Kohli"
  | "Chess"
  | "Badminton";

type Filter = "All" | CuratedCategory;

type CuratedItem = {
  id: string;
  category: CuratedCategory;
  title: string;
  image: string;
  fallbackImage: string;
  accent: string;
  imagePosition?: string;
};

const curatedCollections: Record<CuratedCategory, CuratedItem[]> = {
  Songs: [
    {
      id: "songs-experience",
      category: "Songs",
      title: "Experience",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
      accent: "#8A79FF",
      imagePosition: "center",
    },
    {
      id: "songs-open-eye",
      category: "Songs",
      title: "Open Eye Signal",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
      accent: "#7E93FF",
      imagePosition: "center 20%",
    },
    {
      id: "songs-night-drive",
      category: "Songs",
      title: "Night Drive",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
      accent: "#A675FF",
      imagePosition: "center 30%",
    },
    {
      id: "songs-dawn-chorus",
      category: "Songs",
      title: "Dawn Chorus",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
      accent: "#6D86FF",
      imagePosition: "center 40%",
    },
  ],
  Anime: [
    {
      id: "anime-blue-period",
      category: "Anime",
      title: "Blue Period",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      accent: "#67B7FF",
      imagePosition: "center",
    },
    {
      id: "anime-your-name",
      category: "Anime",
      title: "Your Name",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      accent: "#7CC6FF",
      imagePosition: "center 18%",
    },
    {
      id: "anime-ping-pong",
      category: "Anime",
      title: "Ping Pong",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      accent: "#58D0A6",
      imagePosition: "center 32%",
    },
    {
      id: "anime-haikyuu",
      category: "Anime",
      title: "Haikyuu!!",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png",
      accent: "#8D7BFF",
      imagePosition: "center 46%",
    },
  ],
  Marvel: [
    {
      id: "marvel-universe",
      category: "Marvel",
      title: "Marvel Universe",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel_logo_%282000%E2%80%932012%29.svg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel_logo_%282000%E2%80%932012%29.svg",
      accent: "#E2383F",
      imagePosition: "center",
    },
    {
      id: "marvel-spiderman",
      category: "Marvel",
      title: "Spider-Verse",
      image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Spider-Man_Into_the_Spider-Verse_poster.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel_logo_%282000%E2%80%932012%29.svg",
      accent: "#D53B53",
      imagePosition: "center 24%",
    },
    {
      id: "marvel-avengers",
      category: "Marvel",
      title: "Avengers Endgame",
      image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel_logo_%282000%E2%80%932012%29.svg",
      accent: "#FF5A63",
      imagePosition: "center 18%",
    },
    {
      id: "marvel-black-panther",
      category: "Marvel",
      title: "Black Panther",
      image: "https://upload.wikimedia.org/wikipedia/en/9/96/Black_Panther_film_poster.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel_logo_%282000%E2%80%932012%29.svg",
      accent: "#B84B5E",
      imagePosition: "center 30%",
    },
  ],
  RCB: [
    {
      id: "rcb-emotion",
      category: "RCB",
      title: "Royal Challengers Bangalore",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      accent: "#E11437",
      imagePosition: "center 20%",
    },
    {
      id: "rcb-chinnaswamy",
      category: "RCB",
      title: "Chinnaswamy Nights",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      accent: "#FF375F",
      imagePosition: "center 34%",
    },
    {
      id: "rcb-red-and-gold",
      category: "RCB",
      title: "Red and Gold",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      accent: "#FF5D42",
      imagePosition: "center 48%",
    },
    {
      id: "rcb-blueprint",
      category: "RCB",
      title: "A Different Blueprint",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg",
      accent: "#F04A64",
      imagePosition: "center 12%",
    },
  ],
  "FC Barcelona": [
    {
      id: "barcelona-emblem",
      category: "FC Barcelona",
      title: "FC Barcelona",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      accent: "#4FA3FF",
      imagePosition: "center",
    },
    {
      id: "barcelona-camp-nou",
      category: "FC Barcelona",
      title: "Camp Nou",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      accent: "#58A6FF",
      imagePosition: "center 24%",
    },
    {
      id: "barcelona-tiki-taka",
      category: "FC Barcelona",
      title: "Tiki-Taka",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      accent: "#74C7FF",
      imagePosition: "center 40%",
    },
    {
      id: "barcelona-la-masia",
      category: "FC Barcelona",
      title: "La Masia",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png",
      accent: "#3C88FF",
      imagePosition: "center 8%",
    },
  ],
  "Virat Kohli": [
    {
      id: "kohli-discipline",
      category: "Virat Kohli",
      title: "Virat Kohli",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      accent: "#D44D3D",
      imagePosition: "center 20%",
    },
    {
      id: "kohli-chase-mode",
      category: "Virat Kohli",
      title: "Chase Mode",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      accent: "#FF6B57",
      imagePosition: "center 34%",
    },
    {
      id: "kohli-test-match",
      category: "Virat Kohli",
      title: "Test Match Mindset",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      accent: "#F04A48",
      imagePosition: "center 48%",
    },
    {
      id: "kohli-fitness",
      category: "Virat Kohli",
      title: "Peak Fitness",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg",
      accent: "#FF8A6B",
      imagePosition: "center 12%",
    },
  ],
  Chess: [
    {
      id: "chess-patience",
      category: "Chess",
      title: "Chess",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      accent: "#F0B85B",
      imagePosition: "center 25%",
    },
    {
      id: "chess-endgame",
      category: "Chess",
      title: "Endgame",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      accent: "#E2A84C",
      imagePosition: "center 40%",
    },
    {
      id: "chess-opening",
      category: "Chess",
      title: "Opening Theory",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      accent: "#D8A03A",
      imagePosition: "center 10%",
    },
    {
      id: "chess-quiet",
      category: "Chess",
      title: "Quiet Calculation",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg",
      accent: "#F2C45F",
      imagePosition: "center 55%",
    },
  ],
  Badminton: [
    {
      id: "badminton-focus",
      category: "Badminton",
      title: "Badminton",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      accent: "#74D6A2",
      imagePosition: "center 25%",
    },
    {
      id: "badminton-rhythm",
      category: "Badminton",
      title: "Rhythm",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      accent: "#7FE7B5",
      imagePosition: "center 40%",
    },
    {
      id: "badminton-footwork",
      category: "Badminton",
      title: "Footwork",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      accent: "#61C98F",
      imagePosition: "center 10%",
    },
    {
      id: "badminton-pace",
      category: "Badminton",
      title: "Pace",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg",
      accent: "#8BE0B8",
      imagePosition: "center 55%",
    },
  ],
};

const categories = Object.keys(curatedCollections) as CuratedCategory[];
const filterOptions: Filter[] = ["All", ...categories];
const allItems = categories.flatMap((category) => curatedCollections[category]);
const totalItems = allItems.length;

function GalleryCard({ item, index }: { item: CuratedItem; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [source, setSource] = useState(item.image);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [source]);

  return (
    <motion.article
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: index * 0.02 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,15,22,0.96),rgba(8,9,12,0.96))] shadow-[0_14px_40px_rgba(0,0,0,0.26)] transition"
    >
      <div className="relative aspect-[0.78] overflow-hidden">
        {!loaded ? <div className="absolute inset-0 animate-pulse bg-white/5" /> : null}
        <img
          ref={imageRef}
          src={source}
          alt={item.title}
          loading={index < 12 ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (source !== item.fallbackImage) {
              setLoaded(false);
              setSource(item.fallbackImage);
            }
          }}
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: item.imagePosition ?? "center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.88)_0%,rgba(0,0,0,.45)_40%,rgba(0,0,0,.06)_100%)]" />
        <div
          className="absolute inset-x-4 top-4 h-12 rounded-full blur-3xl opacity-0 transition duration-700 group-hover:opacity-70"
          style={{ background: item.accent }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.84))]" />
        <div className="absolute inset-x-3 bottom-3 space-y-1 text-white sm:inset-x-4 sm:bottom-4 sm:space-y-1.5">
          <p className="text-[0.56rem] uppercase tracking-[0.52em] text-white/62">{item.category}</p>
          <h3 className="text-[1.05rem] font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-[1.3rem]">
            {item.title}
          </h3>
          <div className="space-y-1 overflow-hidden">
            <p className="max-h-0 max-w-[82%] overflow-hidden text-[0.8rem] leading-5 text-white/76 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 sm:text-[0.9rem] sm:leading-6">
              {item.category === "Songs"
                ? "A quiet reminder to build slowly and keep moving."
                : item.category === "Anime"
                  ? "A story that stays long after the screen goes dark."
                  : item.category === "Marvel"
                    ? "Stories of heroes, sacrifice and imagination."
                    : item.category === "RCB"
                      ? "More than a team. More like an emotion."
                      : item.category === "FC Barcelona"
                        ? "The beautiful game played with identity and rhythm."
                        : item.category === "Virat Kohli"
                          ? "Discipline, hunger and a never-give-up mindset."
                          : item.category === "Chess"
                            ? "A game of patience, strategy and mindset."
                            : "Speed, focus and a great stress buster."}
            </p>
            <p className="max-h-0 text-[0.7rem] uppercase tracking-[0.38em] text-white/52 opacity-0 transition-all duration-300 group-hover:max-h-8 group-hover:opacity-100">
              2026
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FilterPill({ label, active, onClick }: { label: Filter; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[0.72rem] uppercase tracking-[0.34em] transition duration-300 ${
        active
          ? "border-[rgba(182,147,255,0.55)] bg-[rgba(139,92,246,0.12)] text-white shadow-[0_0_22px_rgba(139,92,246,0.16)]"
          : "border-white/12 bg-white/[0.03] text-white/58 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function GalleryPage() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return allItems;
    }
    return curatedCollections[activeFilter];
  }, [activeFilter]);

  return (
    <ArchiveFrame activePath="/gallery" timestamp="curated">
      <section className="space-y-5 pt-2 sm:space-y-8">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-3">
            <p className="text-[0.62rem] uppercase tracking-[0.56em] text-white/42">Curated</p>
            <h1 className="text-[clamp(2.3rem,12vw,5rem)] font-light tracking-[-0.08em] text-white">
              Favorite Things
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/64 sm:text-[0.98rem]">
              A collection of things that inspire, excite and stay with me.
            </p>
          </div>
          <div className="justify-self-start text-[0.62rem] uppercase tracking-[0.52em] text-white/42 lg:justify-self-end">
            {String(totalItems).padStart(2, "0")} items
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
          >
            {filteredItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center pt-4">
          <div className="max-w-3xl rounded-full border border-white/10 bg-black/18 px-6 py-4 text-center text-sm leading-7 text-white/72 shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
            <p>These are not just favourites.</p>
            <p>They are a part of who I am.</p>
          </div>
        </div>
      </section>
    </ArchiveFrame>
  );
}
