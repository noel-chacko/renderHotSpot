import React, { useState } from "react";

export default function Registration(){
        return (
                <form className="space-y-4 max-w-sm mx-auto p-4">
                  <h2 className="text-2xl font-bold text-center">Register</h2>
                  <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                  <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                  <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded" />
                  <button className="w-full bg-green-600 hover:bg-violet-600 focus:outline-none rounded py-2 text-white 
                        transition delay-25">Register</button>
                </form>
              );
            
}
