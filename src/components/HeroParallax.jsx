import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
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
    const timerRef = useRef(null);

    const calculateTimeLeft = () => {
        const difference = +new Date('2026-03-13T00:00:00') - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
                mins: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0')
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

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

            tl.to(skyRef.current, { yPercent: -10, ease: "none", duration: 1 }, 0);
            tl.to([textRef.current, boxRef.current, timerRef.current], { yPercent: -30, opacity: 0, ease: "power2.out", duration: 0.6 }, 0);
            tl.to([castleRef.current, cloudRef.current], { y: "-100vh", ease: "power2.in", duration: 1 }, 0);

            gsap.fromTo(skyRef.current,
                { opacity: 1 },
                {
                    opacity: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: () => tl.scrollTrigger.end,
                        end: () => tl.scrollTrigger.end + window.innerHeight,
                        scrub: 0.5,
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
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
        <div ref={containerRef} id="home" className="relative w-full h-screen z-20 bg-black">

            {/* Sky */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    ref={skyRef}
                    src="/infinite-sky.webp"
                    alt="Sky Background"
                    className="absolute top-0 left-0 w-full h-[120vh] object-cover"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                    }}
                />
            </div>

            {/* Text */}
            <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-16 px-4 pointer-events-none pb-[35vh] md:pb-[15vh]">

                <h1
                    ref={titleTextRef}
                    className="text-[22vw] md:text-[12rem] leading-none text-white text-magic-glow uppercase text-center"
                >
                    Quizzitch Cup
                </h1>
            </div>
            {/* Box */}
            <img
                ref={boxRef}
                src="/box2.webp"
                alt="Asset Box"
                fetchpriority="high"
                className="absolute bottom-0 left-0 z-10 w-1/2 h-auto md:w-auto md:h-[28rem] pointer-events-none"
            />

            {/* Timer */}
            <div
                ref={timerRef}
                className="absolute z-[60] w-[90vw] max-w-[26rem] left-1/2 -translate-x-1/2 top-[55vh] 
                           md:top-auto md:left-auto md:bottom-16 md:right-12 md:translate-x-0 md:w-[50rem] pointer-events-none"
            >
                <img src="/gears-timer.webp" alt="Gear Timer Frame" fetchpriority="high" className="w-full h-auto drop-shadow-2xl" />

                <div className="absolute top-[5%] left-0 w-full h-[85%] flex items-center justify-between px-[3%]">
                    <div className="w-1/3 flex justify-center items-center">
                        <span className="text-[#1A1A1A] font-serif text-5xl md:text-7xl font-extrabold tracking-tighter">{timeLeft.days || '00'}</span>
                    </div>
                    <div className="w-1/3 flex justify-center items-center">
                        <span className="text-[#1A1A1A] font-serif text-5xl md:text-7xl font-extrabold tracking-tighter">{timeLeft.hours || '00'}</span>
                    </div>
                    <div className="w-1/3 flex justify-center items-center">
                        <span className="text-[#1A1A1A] font-serif text-5xl md:text-7xl font-extrabold tracking-tighter">{timeLeft.mins || '00'}</span>
                    </div>
                </div>

                <div className="absolute -bottom-6 md:-bottom-10 left-0 w-full flex justify-between px-[2%] text-[#D4AF37] font-serif tracking-widest text-sm md:text-lg drop-shadow-md">
                    <div className="w-1/3 text-center uppercase">Days</div>
                    <div className="w-1/3 text-center uppercase">Hours</div>
                    <div className="w-1/3 text-center uppercase">Minutes</div>
                </div>
            </div>

            {/* Castle */}
            <img
                ref={castleRef}
                src="/castle.webp"
                fetchpriority="high"
                className="absolute top-[100vh] left-0 w-full h-[100vh] object-contain object-bottom z-20 pointer-events-none"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                alt="Quizzitch Castle"
            />

            {/* Cloud */}
            <img
                ref={cloudRef}
                src="/meow3.jpg"
                fetchpriority="high"
                className="absolute top-[180vh] left-0 w-full h-[40vh] object-cover mix-blend-screen z-40 pointer-events-none opacity-90 contrast-150 brightness-100"
                style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }}
                alt="Prominent Cloud"
            />
        </div>
    );
};

export default HeroParallax;