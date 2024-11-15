// src/app/events/page.tsx

"use client";
import { useState } from "react"; 
import NavBar from "@/app/NavBar"; 
import { useRouter } from "next/navigation";
import Registration from '@/app/Reg';

//Firebase
import { db } from '@/app/firebase';
import { collection, addDoc } from "firebase/firestore";
import EventCreationForm from "@/formComponent/page";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Event Details:", formData);

    try {
      const docRef = await addDoc(collection(db, "events"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert("Event created successfully!");

      setFormData({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1 justify-center items-center">
        <EventCreationForm/>
      </div>
    </div>
  );
}
