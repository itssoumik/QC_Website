import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Sponsors = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const bannerLeftRef = useRef(null);
    const bannerRightRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // THE MASTER PIN: Locks the section and handles the sequence
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: "top top", // Locks exactly when it hits the top
                    end: "+=150%",    // Extends the scroll distance for a smooth, heavy feel
                    scrub: 1,         // Premium 1-second smoothing
                }
            });

            // PHASE 1: The Entrance Pause (15% of the timeline)
            tl.to({}, { duration: 0.15 })

            // PHASE 2: The Dueling Slide (70% of the timeline)
            // Left Banner slides in from the far left
            tl.from(bannerLeftRef.current, {
                xPercent: -150,
                opacity: 0,
                ease: "power3.out",
                duration: 0.7
            }, 0.15);

            // Right Banner slides in from the far right simultaneously
            tl.from(bannerRightRef.current, {
                xPercent: 150,
                opacity: 0,
                ease: "power3.out",
                duration: 0.7
            }, 0.15);

            // PHASE 3: The Exit Pause (15% of the timeline)
            tl.to({}, { duration: 0.15 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="sponsors" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center z-30">

            {/* THE HEADER: Matches the 'Events' section perfectly */}
            <div ref={textRef} className="absolute top-[18vh] left-0 w-full z-10 pointer-events-none">
                <h2
                    className="text-[#D4AF37] text-[15vw] md:text-[8rem] uppercase tracking-widest leading-none text-center"
                    style={{
                        fontFamily: "'HarryP', serif",
                        textShadow: "0px 10px 30px rgba(212, 175, 55, 0.4)"
                    }}
                >
                    SPONSORS
                </h2>
            </div>

            {/* THE BANNERS CONTAINER */}
            <div className="flex h-full items-center pt-[18vh] md:pt-[22vh]">
                <div className="flex flex-nowrap h-auto items-center px-[5vw] md:px-[15vw] gap-6 md:gap-20 w-full justify-center">

                    {/* Banner 1 (Left - Gryffindor Style) */}
                    <div ref={bannerLeftRef} className="relative w-[40vw] md:w-[26vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponsor1.png"
                            alt="Title Patron"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                    </div>

                    {/* Banner 2 (Right - Slytherin Style) */}
                    <div ref={bannerRightRef} className="relative w-[40vw] md:w-[26vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponsor2.png"
                            alt="Co-Patron"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Sponsors;