


import React, { useMemo, useRef, useState } from "react";
import "./PetGallery.css";

export type Pet = {
    id: string;
    name: string;
    age: number;
    distance: string;
    photo: string;
    bio: string
};

const pets: Pet[] = [
    {
        id: '1',
        name: 'Buddy',
        age: 2,
        distance: '3 miles away',
        photo: 'https://placedog.net/500/400?id=1',
        bio: 'Loves belly rubs, car rides, and barking at squirrels. Not a fan of the vacuum.',
    },
    {
        id: '2',
        name: 'Luna',
        age: 1,
        distance: '1 mile away',
        photo: 'https://placedog.net/500/400?id=2',
        bio: 'Queen of naps. Enjoys sunbathing, head scratches, and judging your life choices.',
    },
    {
        id: '3',
        name: 'Max',
        age: 4,
        distance: '5 miles away',
        photo: 'https://placedog.net/500/400?id=3',
        bio: 'Fetch addict. Has two modes: zoomies or snoozing. Loyal AF.',
    },
]

type Props = { pets: Pet[] };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
//{ pets }: Props
export default function PetGallery() {
    const [index, setIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const count = pets.length;
    const go = (i: number) => setIndex((curr) => (i + count) % count);
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    const positions = useMemo(
        () =>
            pets.map((_, i) => {
                
                const d = Math.min((i - index + count) % count, (index - i + count) % count);
                
                const scale = d === 0 ? 1 : d === 1 ? 0.92 : 0.86;
                const opacity = d > 2 ? 0 : 1;
                return { scale, opacity };
            }),
        [index, pets, count]
    );

    return (
        <>
            <h1>Find Your Next Best Friend</h1>
            <div className="pc-root">

                <button aria-label="Previous" className="pc-nav pc-nav-left" onClick={prev}>
                    ‹
                </button>

                <div className="pc-viewport">

                    <div
                        className="pc-track"
                        ref={trackRef}
                        style={{ transform: `translateX(calc(${-(index)} * (var(--card-w) + var(--gap))))` }}
                    >
                        {pets.map((p, i) => {
                            const active = i === index;
                            const { scale, opacity } = positions[i] ?? { scale: 1, opacity: 1 };
                            return (
                                <article
                                    key={p.id}
                                    className={`pc-card ${active ? "pc-card--active" : ""}`}
                                    style={{ transform: `scale(${scale})`, opacity }}
                                    onClick={() => setIndex(i)}
                                >
                                    <img className="pc-img" src={p.photo} alt={`${p.name}`} />
                                    <div className="pc-body">
                                        <header className="pc-header">
                                            <h3 className="pc-title">{p.name}</h3>
                                            <div className="pc-meta">
                                                <span>{p.age} yr{p.age !== 1 ? "s" : ""}</span>
                                                <span className="pc-dot">•</span>
                                                <span>{p.distance}</span>
                                            </div>
                                        </header>

                                        <p className="pc-bio">{p.bio}</p>

                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <button aria-label="Next" className="pc-nav pc-nav-right" onClick={next}>
                    ›
                </button>

                <div className="pc-dots">
                    {pets.map((_, i) => (
                        <button
                            key={i}
                            className={`pc-dotbtn ${i === index ? "is-active" : ""}`}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}


