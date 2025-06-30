"use client";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import dynamic from "next/dynamic";
import EventCalendar, { Event } from "./event_calendar";

// Correct path to your FiltersClient file
const Filters = dynamic(() => import("./filters"), {
    ssr: false,
});

export default function Events() {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        async function fetchEvents() {
            try {
                const query = new URLSearchParams(filters).toString();
                const res = await fetch(`/api/events?${query}`);
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();
                if (mounted) setEvents(data);
            } catch (err: any) {
                if (mounted) setError(err.message);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchEvents();
        return () => {
            mounted = false;
        };
    }, [filters]);

    return (
        <main className="">
            <Navbar />
            <div className="px-4">
                <h1 className="text-3xl text-center font-bold mb-4 mt-4">Event Calendar</h1>
                {/* Pass onChange, matching FiltersClient’s prop definition */}
                <Filters onChange={setFilters} />
                {loading && <p>Loading events...</p>}
                {error && <p className="text-red-600">Error: {error}</p>}
                {!loading && !error && <EventCalendar events={events} />}
            </div>

        </main>
    );
}