import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imagesRef = useRef([]);
    imagesRef.current = [];

    const addToRefs = (el) => {
        if (el && !imagesRef.current.includes(el)) {
            imagesRef.current.push(el);
        }
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // PARALLAX SCATTER: Moves each image up over the pinned text
            imagesRef.current.forEach((img, i) => {
                const speedMultiplier = 1 + (i % 3) * 0.3;

                gsap.to(img, {
                    yPercent: -200 * speedMultiplier,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const layoutConfig = [
        { left: "5%", top: "110vh", width: "w-[60vw] md:w-[25vw]" },
        { left: "65%", top: "140vh", width: "w-[55vw] md:w-[28vw]" },
        { left: "20%", top: "200vh", width: "w-[65vw] md:w-[26vw]" },
        { left: "60%", top: "260vh", width: "w-[60vw] md:w-[27vw]" },
        { left: "10%", top: "320vh", width: "w-[55vw] md:w-[25vw]" },
        { left: "55%", top: "370vh", width: "w-[65vw] md:w-[28vw]" },
    ];

    return (
        <section ref={sectionRef} id="about" className="relative w-full h-[400vh] bg-black z-30">

            {/* PART 1: The Text Block */}
            <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 px-6 pointer-events-none transform-gpu will-change-transform">

                {/* FIX: Forced the HarryP font directly via inline style */}
                <h2
                    className="text-[#D4AF37] text-[15vw] md:text-[10rem] uppercase tracking-widest leading-none"
                    style={{
                        fontFamily: "'HarryP', serif",
                        textShadow: "0px 10px 20px rgba(0,0,0,0.8)"
                    }}
                >
                    ABOUT
                </h2>

                <p
                    className="text-gray-200 text-base md:text-2xl font-serif max-w-3xl text-center mt-6 md:mt-10"
                    style={{ textShadow: "0px 5px 10px rgba(0,0,0,0.8)" }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                </p>
            </div>

            {/* PART 2: The Scattered Image Gallery */}
            <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
                {layoutConfig.map((config, i) => (
                    <img
                        key={i}
                        ref={addToRefs}
                        src={`/memories/image${i + 1}.png`}
                        alt={`Memory ${i + 1}`}
                        className={`absolute object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] ${config.width}`}
                        style={{
                            left: config.left,
                            top: config.top,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default About;