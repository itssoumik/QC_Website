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
            // Parallax drift for each image
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

    // Image layout — responsive positions and widths
    const layoutConfig = [
        { top: "110vh", classes: "left-[5%] w-[60vw] md:w-[25vw]" },
        { top: "140vh", classes: "right-[5%] md:right-auto md:left-[65%] w-[55vw] md:w-[28vw]" },
        { top: "200vh", classes: "left-[5%] md:left-[20%] w-[65vw] md:w-[26vw]" },
        { top: "260vh", classes: "right-[5%] md:right-auto md:left-[60%] w-[60vw] md:w-[27vw]" },
        { top: "320vh", classes: "left-[5%] md:left-[10%] w-[55vw] md:w-[25vw]" },
        { top: "370vh", classes: "right-[5%] md:right-auto md:left-[55%] w-[60vw] md:w-[28vw]" },
    ];

    return (

        <section ref={sectionRef} id="about" className="relative w-full h-[400vh] bg-black z-30">

            {/* Sticky text */}
            <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 px-6 pointer-events-none transform-gpu will-change-transform">
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

            {/* Scattered images */}
            <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
                {layoutConfig.map((config, i) => (
                    <img
                        key={i}
                        ref={addToRefs}
                        src={`/memories/image${i + 1}.png`}
                        alt={`Memory ${i + 1}`}

                        className={`absolute object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] ${config.classes}`}
                        style={{
                            top: config.top,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default About;