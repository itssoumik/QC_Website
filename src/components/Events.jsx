import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);

    const eventsList = [
        { id: 1, img: '/events/event1.png', link: '#register-1' },
        { id: 2, img: '/events/event1.png', link: '#register-2' },
        { id: 3, img: '/events/event1.png', link: '#register-3' },
        { id: 4, img: '/events/event1.png', link: '#register-4' },
        { id: 5, img: '/events/event1.png', link: '#register-5' },
        { id: 6, img: '/events/event1.png', link: '#register-6' },
        { id: 7, img: '/events/event1.png', link: '#register-7' },
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            let scrollWidth = sliderRef.current.scrollWidth - window.innerWidth;

            // THE FIX: We build a 3-part timeline to force pauses at the start and end
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    // We artificially extend the scroll distance by 100vh so we have extra "room" for the pauses
                    end: () => `+=${scrollWidth + window.innerHeight}`,
                }
            });

            // PHASE 1: The Entry Pause (15% of the timeline)
            tl.to({}, { duration: 0.15 })
                // PHASE 2: The Horizontal Slide (70% of the timeline)
                .to(sliderRef.current, { x: -scrollWidth, ease: "none", duration: 0.7 })
                // PHASE 3: The Exit Pause (15% of the timeline before unpinning)
                .to({}, { duration: 0.15 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="events" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center z-30">

            {/* THE FIX: Pushed the header down to top-[18vh] to clear the navbar entirely */}
            <div className="absolute top-[18vh] left-0 w-full z-10 pointer-events-none">
                <h2
                    className="text-[#D4AF37] text-[15vw] md:text-[8rem] uppercase tracking-widest leading-none text-center"
                    style={{
                        fontFamily: "'HarryP', serif",
                        textShadow: "0px 10px 30px rgba(212, 175, 55, 0.4)"
                    }}
                >
                    EVENTS
                </h2>
            </div>

            {/* THE FIX: Adjusted the padding-x to mathematically guarantee the first and last cards sit dead-center */}
            <div className="flex h-full items-center mt-[15vh]">
                <div ref={sliderRef} className="flex flex-nowrap h-full items-center px-[17.5vw] md:px-[37vw] gap-10 md:gap-24 w-max">

                    {eventsList.map((event) => (
                        // THE FIX: Shrunk the card widths down so they look like sleek UI elements instead of massive walls
                        <div key={event.id} className="relative w-[65vw] md:w-[26vw] shrink-0 flex flex-col items-center justify-center">

                            <a
                                href={event.link}
                                className="relative block group cursor-pointer transition-transform duration-500 hover:scale-105"
                            >
                                <img
                                    src={event.img}
                                    alt={`Event ${event.id}`}
                                    className="w-full aspect-square object-contain transition-shadow duration-500"
                                    style={{
                                        boxShadow: "0 0 20px rgba(0,0,0,0.8)",
                                        filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))"
                                    }}
                                />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ boxShadow: "inset 0 0 50px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.5)" }}
                                ></div>
                            </a>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Events;