"use client";
import { useEffect, useRef, useState } from "react";

const counterDisplay = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const count1Ref = useRef<HTMLSpanElement>(null);
    const count2Ref = useRef<HTMLSpanElement>(null);
    const count3Ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    // const [userNumber, setUserNumber] = useState();

    const [userNumber, setUserNumber] = useState<number | null>(null); // nullable to check if data is fetched
    const [eventNumber, setEventNumber] = useState<number | null>(null); // nullable to check if data is fetched
    const [partnerNumber, setPartnerNumber] = useState<number | null>(null); // nullable to check if data is fetched

    // ✅ Fetch user count once
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/userCounter');
                const data = await response.json();
                console.log("Fetched data:", data); // should show { number: ... }
                setUserNumber(data.users ?? 0);
                setEventNumber(data.events ?? 0);
                setPartnerNumber(data.partners ?? 0);
            } catch (error) {
                console.error("Failed to fetch user count:", error);
            }
        };
        fetchData();
    }, []);

    // ✅ Start counter when section is visible and userNumber is fetched
    useEffect(() => {
        if (userNumber === null) return; // don't observe until data is ready
        if (eventNumber === null) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.5 &&
                        !hasAnimated
                    ) {
                        runCounters();
                        setHasAnimated(true);
                    }
                });
            },
            {
                threshold: [0, 0.5, 1],
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated, userNumber]);

    const runCounters = () => {
        const counter = (
            element: HTMLSpanElement | null,
            start: number,
            end: number,
            duration: number
        ) => {
            if (!element) return;

            if (start === end) {
                element.textContent = end.toString();
                return;
            }

            const range = end - start;
            const increment = end > start ? 1 : -1;
            const step = Math.abs(Math.floor(duration / range));

            let current = start;

            const timer = setInterval(() => {
                current += increment;
                element.textContent = current.toString();
                if (current === end) {
                    clearInterval(timer);
                }
            }, step);
        };

        // 👇 Use fetched userNumber for this counter
        counter(count1Ref.current, 0, userNumber || 0, 3000);
        counter(count2Ref.current, 0, eventNumber || 0, 2500);
        counter(count3Ref.current, 0, partnerNumber || 0, 3000);
    };

    return (
        <div>
            <section ref={sectionRef} className="text-white py-20 h-1''">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center text-center">
                        <div className="w-full mb-10">
                            <h1 className="text-4xl font-bold pb-3">
                                Pridonesi i rastimo skupa!
                            </h1>
                        </div>
                        <div className="w-full md:w-1/3 mb-6">
                            <span ref={count1Ref} className="text-5xl font-semibold" />
                            <br />
                            <h1 className="pt-5 font-semibold text-2xl">Aktivni korisnici</h1>
                        </div>
                        <div className="w-full md:w-1/3 mb-6">
                            <span ref={count2Ref} className="text-5xl font-semibold" />
                            <br />
                            <h1 className="pt-5 font-semibold text-2xl">Broj prijavljenih događaja</h1>
                        </div>
                        <div className="w-full md:w-1/3 mb-6">
                            <span ref={count3Ref} className="text-5xl font-semibold" />
                            <br />
                            <h1 className="pt-5 font-semibold text-2xl">Broj partnera</h1>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default counterDisplay;