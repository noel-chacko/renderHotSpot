// Catalog component
"use client";
import { useState, useEffect } from "react";
import { db } from '@/app/firebase';
import { collection, getDocs } from "firebase/firestore";

// Interface for catalog
interface Event {
    id: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
}
  
// Component code
export default function EventCatalog() {
    const [events, setEvents] = useState<Event[]>([]); // Use the Event[] type for the array
  
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "events"));
                const eventsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Event[]; // Cast data as Event[]
              
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
        };
  
        fetchEvents();
    }, []);
  
    return (
        <div className="flex gap-4 justify-start bg-transparent p-6 overflow-x-auto">
            {events.map((event) => (
                <div key={event.id} className="min-w-[200px] bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{event.eventName}</h3>
                    <p className="text-gray-600">
                        Date: {event.eventDate} <br />
                        Time: {event.eventTime} <br />
                        Location: {event.eventLocation}
                    </p>
                </div>
            ))}
        </div>
    );
}
