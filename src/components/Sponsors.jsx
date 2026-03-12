import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Sponsors = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const sponsor1Ref = useRef(null);
    const sponsor2Ref = useRef(null);
    const sponsor3Ref = useRef(null);
    const sponsor4Ref = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // Desktop: all 4 in one row — 1&2 from left, 3&4 from right
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        start: "top top",
                        end: "+=150%",
                        scrub: 1,
                    }
                });

                tl.to({}, { duration: 0.15 });

                // Sponsors 1 & 2 slide in from left
                tl.from([sponsor1Ref.current, sponsor2Ref.current], {
                    xPercent: -150,
                    opacity: 0,
                    ease: "power3.out",
                    duration: 0.7,
                    stagger: 0.1,
                }, 0.15);

                // Sponsors 3 & 4 slide in from right
                tl.from([sponsor3Ref.current, sponsor4Ref.current], {
                    xPercent: 150,
                    opacity: 0,
                    ease: "power3.out",
                    duration: 0.7,
                    stagger: 0.1,
                }, 0.15);

                tl.to({}, { duration: 0.15 });
            });

            // Mobile: 2x2 grid — 1&3 from left, 2&4 from right
            mm.add("(max-width: 767px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        start: "top top",
                        end: "+=150%",
                        scrub: 1,
                    }
                });

                tl.to({}, { duration: 0.15 });

                // Sponsors 1 & 3 slide in from left
                tl.from([sponsor1Ref.current, sponsor3Ref.current], {
                    xPercent: -150,
                    opacity: 0,
                    ease: "power3.out",
                    duration: 0.7,
                    stagger: 0.1,
                }, 0.15);

                // Sponsors 2 & 4 slide in from right
                tl.from([sponsor2Ref.current, sponsor4Ref.current], {
                    xPercent: 150,
                    opacity: 0,
                    ease: "power3.out",
                    duration: 0.7,
                    stagger: 0.1,
                }, 0.15);

                tl.to({}, { duration: 0.15 });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="sponsors" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center z-30">

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

            <div className="flex h-full items-center pt-[22vh] pb-[5vh] md:pt-[22vh] md:pb-0">
                {/* Desktop: single row | Mobile: 2x2 grid */}
                <div className="grid grid-cols-2 md:flex md:flex-row h-auto items-center px-[5vw] md:px-[8vw] gap-4 md:gap-10 w-full justify-center">

                    {/* Sponsor 1 */}
                    <div ref={sponsor1Ref} className="relative w-full md:w-[15vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponcer1.webp"
                            alt="Sponsor 1"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                    </div>

                    {/* Sponsor 2 */}
                    <div ref={sponsor2Ref} className="relative w-full md:w-[15vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponcer2.webp"
                            alt="Sponsor 2"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                    </div>

                    {/* Sponsor 3 */}
                    <div ref={sponsor3Ref} className="relative w-full md:w-[15vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponcer3.webp"
                            alt="Sponsor 3"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                    </div>

                    {/* Sponsor 4 */}
                    <div ref={sponsor4Ref} className="relative w-full md:w-[15vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponcer4.webp"
                            alt="Sponsor 4"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Sponsors;