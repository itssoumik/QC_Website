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

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1,
                }
            });

            tl.to({}, { duration: 0.15 })

            // Left banner
            tl.from(bannerLeftRef.current, {
                xPercent: -150,
                opacity: 0,
                ease: "power3.out",
                duration: 0.7
            }, 0.15);

            // Right banner
            tl.from(bannerRightRef.current, {
                xPercent: 150,
                opacity: 0,
                ease: "power3.out",
                duration: 0.7
            }, 0.15);

            tl.to({}, { duration: 0.15 });

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
                <div className="flex flex-col md:flex-row h-auto items-center px-[5vw] md:px-[15vw] gap-6 md:gap-20 w-full justify-center">

                    {/* Left banner */}
                    <div ref={bannerLeftRef} className="relative w-[55vw] md:w-[26vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponsor1.webp"
                            alt="Title Patron"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                    </div>

                    {/* Right banner */}
                    <div ref={bannerRightRef} className="relative w-[55vw] md:w-[26vw] shrink-0 transform-gpu will-change-transform">
                        <img
                            src="/sponsors/sponsor2.webp"
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