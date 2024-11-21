"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/app/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaArrowAltCircleLeft, FaClock } from 'react-icons/fa';
import { FaCalendar, FaMapLocationDot, FaPerson } from 'react-icons/fa6';
import { format } from 'date-fns';
import { useRouter } from "next/navigation";

interface Event {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

export default function EventDetailsPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventName = decodeURIComponent(params.eventName as string);

        const q = query(
          collection(db, "events"), 
          where("eventName", "==", eventName),
        );

        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data() as Event;
          setEvent(eventData);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [params]);

  const handleGoBack = () => {
    router.back();
  }

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMMM d, yyyy');
  };

  const formatTime = (timeStr: string) => {
    return format(new Date(`1970-01-01T${timeStr}:00`), 'h:mm a');
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-2xl relative">
      
        
        {/* Event Details */}
        <div className="p-6 space-y-6">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">{event.eventName}</h1>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <FaCalendar className="inline-block mr-4 text-[#7091E6] w-6 h-6" />
                <div>
                  <span className="font-semibold text-gray-700">Date:</span>
                  <p className="text-gray-600">{formatDate(event.eventDate)}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaClock className="inline-block mr-4 text-[#7091E6] w-6 h-6" />
                <div>
                  <span className="font-semibold text-gray-700">Time:</span>
                  <p className="text-gray-600">{formatTime(event.eventTime)}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaMapLocationDot className="inline-block mr-4 text-[#7091E6] w-6 h-6" />
                <div>
                  <span className="font-semibold text-gray-700">Location:</span>
                  <p className="text-gray-600">{event.eventLocation}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}