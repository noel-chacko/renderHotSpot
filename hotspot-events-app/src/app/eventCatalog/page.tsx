// src/app/eventsCatalog/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from '@/app/firebase';
import { collection, getDocs } from "firebase/firestore";
import { format } from 'date-fns';

interface Event {
    id: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
}

export default function EventCatalog() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "events"));
                const eventsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Event[];
              
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching events: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

        //helper functions for better formatting using date-fns
    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        return format(date, 'MMMM d, yyyy');
    }

    function formatTime(timeStr: string) {
        const time = new Date(`1970-01-01T${timeStr}:00`);
        return format(time, 'h:mm a');
    }

    return (
        <div className="p-6 gradient-bg min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#FF7870]">
                Upcoming Events
            </h2>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">Loading events...</p>
                </div>
            ) : events.length === 0 ? (
                <p className="text-center text-lg font-medium text-gray-600">
                    No events available
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="event-card min-w-[200px] bg-white shadow-lg rounded-xl p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Header with Icon */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-[#FF7870]">
                                    {event.eventName}
                                </h3>
                                <span className="text-[#ee9a40] font-semibold">
                                    🎉
                                </span>
                            </div>

                            {/* Date & Time */}
                            <div className="text-gray-500 text-sm mb-2">
                                <p>
                                    <span className="font-bold">📅 Date:</span> {formatDate(event.eventDate)}
                                </p>
                                <p>
                                    <span className="font-bold">⏰ Time:</span> {formatTime(event.eventTime)}
                                </p>
                            </div>

                            {/* Location */}
                            <div className="text-gray-500 text-sm">
                                <p>
                                    <span className="font-bold">📍 Location:</span> {event.eventLocation}
                                </p>
                            </div>

                            {/* Button to View Details */}
                            <div className="mt-4">
                            <button className="w-full py-2 text-white rounded-full hover-gradient">
                                    View Details
                                </button>
                            </div>
                            <div className="flip-back flex items-center justify-center h-full p-4 bg-[#f6f3f2] rounded-lg shadow-lg text-gray-800">
                                    {/* Additional event details */}
                                    <p>More details about the event can go here...</p>
                                </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
