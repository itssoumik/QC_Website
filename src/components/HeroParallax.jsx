import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroParallax = () => {
    const containerRef = useRef(null);
    const skyRef = useRef(null);
    const textRef = useRef(null);
    const titleTextRef = useRef(null);
    const castleRef = useRef(null);
    const cloudRef = useRef(null);
    const boxRef = useRef(null);

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

            // 2. Text and Box fade out as user scrolls, perfectly synchronized
            tl.to([textRef.current, boxRef.current], { yPercent: -30, opacity: 0, ease: "power2.out", duration: 0.8 }, 0);

            // 3. Castle and Cloud rise, accelerating at the end
            tl.to([castleRef.current, cloudRef.current], { y: "-100vh", ease: "power2.in" }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Mouse Parallax Sensor for the Title Text
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate mouse offset from center of screen (-0.5 to 0.5)
            // Multiply by 40 to set the maximum pixel distance the text will travel
            const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
            gsap.to(titleTextRef.current, {
                x: xPos,
                y: yPos,
                duration: 0.8,
                ease: "power2.out",
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
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

            {/* LAYER 2: The Text - Resized, shifted up, and attached to mouse sensor */}
            <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-16 px-4 pointer-events-none pb-[10vh] md:pb-[15vh]">
                <h1
                    ref={titleTextRef}
                    className="text-[15vw] md:text-[12rem] leading-none text-white text-magic-glow uppercase text-center"
                >
                    Quizzitch Cup
                </h1>
            </div>

            {/* Layer: UI Box/Stone Slab (mobile: bottom-left, desktop: bottom-left) */}
            {/* Layer: UI Box/Stone Slab (fixed transparency) */}
            <img
                ref={boxRef}
                src="/box2.png"
                alt="Asset Box"
                className="absolute bottom-0 left-0 z-10 w-1/2 h-auto md:w-auto md:h-[28rem] pointer-events-none"
            />

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
