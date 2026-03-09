import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState(null);


    const eventsList = [
        { id: 1, name: "Wizarding World Auction", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?embedded=true" },
        { id: 2, name: "Wizarding World Quiz", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?embedded=true" },
        { id: 3, name: "Geopolitical Quiz", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?embedded=true" },
        { id: 4, name: "Cipher Quest Quiz", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?embedded=true" },
        { id: 5, name: "Qmanji", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?embedded=true" },
        { id: 6, name: "India Quiz", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?embedded=true" },
        { id: 7, name: "Sports Quiz", img: '/events/event1.webp', link: "https://docs.google.com/forms/d/e/1FAIpQLSd-Ty3zfKoGDH2wphPAlE6XyaTnFtAW9bKEDJVmkAamzsofCg/viewform?embedded=true" },
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

    const openModal = (eventItem) => {
        setSelectedEvent(eventItem);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedEvent(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <section ref={sectionRef} id="events" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center z-30">

                <div className="absolute top-[18vh] left-0 w-full z-10 pointer-events-none">
                    <h2
                        className="text-[#D4AF37] text-[15vw] md:text-[8rem] uppercase tracking-widest leading-none text-center"
                        style={{ fontFamily: "'HarryP', serif", textShadow: "0px 10px 30px rgba(212, 175, 55, 0.4)" }}
                    >
                        EVENTS
                    </h2>
                </div>

                <div className="flex h-full items-center mt-[15vh]">
                    <div ref={sliderRef} className="flex flex-nowrap h-full items-center px-[17.5vw] md:px-[37vw] gap-10 md:gap-24 w-max">


                        {eventsList.map((eventItem) => (
                            <div key={eventItem.id} className="relative w-[65vw] md:w-[26vw] shrink-0 flex flex-col items-center justify-center">


                                <button
                                    type="button"
                                    disabled
                                    className="relative block group cursor-default transition-transform duration-500 border-none bg-transparent p-0 outline-none"
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
                                </button>

                                <p className="text-[#D4AF37] font-serif text-sm md:text-base tracking-widest uppercase mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    Click to Register
                                </p>

                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Registration modal */}
            {selectedEvent && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 p-4 md:p-10">

                    <div className="relative w-full max-w-3xl h-[85vh] md:h-[90vh] bg-[#0a0a0a] border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-md overflow-hidden flex flex-col">

                        <div className="w-full h-16 bg-[#111] border-b border-[#D4AF37]/30 flex justify-between items-center px-6 shrink-0">
                            <h3 className="text-[#D4AF37] text-2xl md:text-4xl uppercase tracking-widest mt-2" style={{ fontFamily: "'HarryP', serif" }}>
                                {selectedEvent.name} REGISTRATION
                            </h3>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 hover:text-[#D4AF37] text-4xl font-light transition-colors duration-200 leading-none pb-1"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="w-full flex-grow overflow-hidden bg-white/5 relative">
                            <iframe
                                src={selectedEvent.link}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                className="absolute inset-0 w-full h-full"
                                title={`${selectedEvent.name} Form`}
                            >
                                Loading Form...
                            </iframe>
                        </div>

                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default Events;