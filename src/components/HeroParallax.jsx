import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroParallax = () => {
    const containerRef = useRef(null);
    const skyRef = useRef(null);
    const textRef = useRef(null);
    const castleRef = useRef(null);
    const cloudRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=100%',
                    scrub: 0.5,
                    pin: true,
                },
            });

            // 1. Sky moves very slightly
            tl.to(skyRef.current, { yPercent: -10, ease: "none" }, 0);

            // 2. Text fades out as user scrolls
            tl.to(textRef.current, { yPercent: -30, opacity: 0, ease: "power2.out", duration: 0.8 }, 0);

            // 3. Castle and Cloud rise, accelerating at the end
            tl.to([castleRef.current, cloudRef.current], { y: "-100vh", ease: "power2.in" }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen z-20">
            {/* Layer 1: Sky - Height increased to 250vh so it extends fully behind the resting cloud */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    ref={skyRef}
                    src="/infinite-sky.png"
                    alt="Sky Background"
                    className="absolute top-0 left-0 w-full h-[250vh] object-cover"
                />
            </div>

            {/* LAYER 2: The Text */}
            <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-10 px-4 pointer-events-none">
                <h1 className="text-[15vw] md:text-[14rem] leading-none text-white text-magic-glow uppercase text-center">
                    Quizzitch Cup
                </h1>
            </div>

            {/* LAYER 3: The Castle - Alpha Mask blurs the bottom into transparency */}
            <img
                ref={castleRef}
                src="/castle.png"
                className="absolute top-[100vh] left-0 w-full h-[100vh] object-contain object-bottom z-20 pointer-events-none"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                alt="Quizzitch Castle"
            />

            {/* LAYER 4: The Cloud - Centered over where the castle fades out */}
            <img
                ref={cloudRef}
                src="/meow3.jpg"
                className="absolute top-[180vh] left-0 w-full h-[40vh] object-cover mix-blend-screen z-30 pointer-events-none opacity-90 contrast-150 brightness-100"
                style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }}
                alt="Prominent Cloud"
            />
        </div>
    );
};

export default HeroParallax;
