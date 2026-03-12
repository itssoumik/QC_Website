import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);

    const eventsList = [
        //{ id: 1, name: "Wizarding World Auction", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSfn_1seeUd4iip-UwusDtI65GEhMNJPXFqjMy8dr8oNgzs7hQ/viewform?usp=publish-editor" },
        { id: 2, name: "Wizarding World Quiz", img: '/events/fandom.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLScOJsVsU7u6AXGZi69gaZPTxTSwKShYzuE-yfig9XQ1rOERaQ/viewform?usp=header" },
        //{ id: 3, name: "Geopolitical Quiz", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSfzQHTPqr8z3hczAIMTdGcGIph8HA3IDSEp5oOYdFFWFVQWoA/viewform?usp=header" },
        { id: 4, name: "Cipher Quest Quiz", img: '/events/nsfw.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSca4SEbxfD--WZtUvgoBz6g-8O6pI4XpQVrQkxBn58bIueuFA/viewform?usp=header" },
        //{ id: 5, name: "Qmanji", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/1IJBz-nW6bS1-gnlRCD-9DzTq1D0mWmU_N53mEFxNW-U/edit" },
        { id: 6, name: "India Quiz", img: '/events/india.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSdjT7cpT_ex5Wo7T9Akx1mw_yET6xFdDxUkHTxSENDH_lM8zg/viewform?usp=header" },
        { id: 7, name: "Sports Quiz", img: '/events/sports.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?usp=header" },
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let scrollWidth = sliderRef.current.scrollWidth - window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${scrollWidth + window.innerHeight}`,
                }
            });

            tl.to({}, { duration: 0.15 })
                .to(sliderRef.current, { x: -scrollWidth, ease: "none", duration: 0.7 })
                .to({}, { duration: 0.15 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="events" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center z-30">

            <div className="absolute top-[18vh] left-0 w-full z-10 pointer-events-none">
                <h2
                    className="text-[#D4AF37] text-[15vw] md:text-[8rem] uppercase tracking-widest leading-none text-center"
                    style={{ fontFamily: "'HarryP', serif", textShadow: "0px 10px 30px rgba(212, 175, 55, 0.4)" }}
                >
                    EVENTS
                </h2>
            </div>

            <div className="flex h-full items-center mt-[20vh]">
                <div ref={sliderRef} className="flex flex-nowrap h-full items-center px-[17.5vw] md:px-[37vw] gap-10 md:gap-24 w-max">

                    {eventsList.map((eventItem) => (
                        <div key={eventItem.id} className="relative w-[65vw] md:w-[26vw] shrink-0 flex flex-col items-center justify-center">

                            <a
                                href={eventItem.link.replace("?embedded=true", "")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative block group cursor-pointer transition-transform duration-500 hover:scale-105 outline-none"
                            >
                                <img
                                    src={eventItem.img}
                                    alt={eventItem.name}
                                    className="w-full aspect-square object-contain transition-shadow duration-500"
                                    style={{ boxShadow: "0 0 20px rgba(0,0,0,0.8)", filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))" }}
                                />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ boxShadow: "inset 0 0 50px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.5)" }}
                                ></div>
                            </a>

                            <p className="text-[#D4AF37] font-serif text-sm md:text-base tracking-widest uppercase mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                Click to Register
                            </p>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Events;