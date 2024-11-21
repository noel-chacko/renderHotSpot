// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function EventPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isLoading, setIsLoading] = useState(true);

//     // Get query parameters
//     const eventName = decodeURIComponent(searchParams.get("eventName") || "");
//     const date = searchParams.get("date") || "Not available";
//     const time = searchParams.get("time") || "Not available";
//     const location = searchParams.get("location") || "Not available";

//     useEffect(() => {
//         console.log("Event Name:", eventName);
//         console.log("Date:", date);
//         console.log("Time:", time);
//         console.log("Location:", location);
//     }, [eventName, date, time, location]);

//     useEffect(() => {
//         const timeout = setTimeout(() => setIsLoading(false), 1000); // Simulate a loading delay
//         return () => clearTimeout(timeout);
//     }, []);

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//             {isLoading ? (
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
//             ) : (
//                 <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//                     <h1 className="text-2xl font-bold text-indigo-600">{eventName}</h1>
//                     <p className="text-gray-600"><strong>Date:</strong> {date}</p>
//                     <p className="text-gray-600"><strong>Time:</strong> {time}</p>
//                     <p className="text-gray-600"><strong>Location:</strong> {location}</p>
//                     <button
//                         className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//                         onClick={() => {
//                             console.log("Navigating to home...");
//                             // router.push("/");  // Debugging router push
//                         }}
//                     >
//                         Back to Search
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
