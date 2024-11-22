import React, {useState} from "react";
import { createUserWithEmailAndPassword } from "@/app/firebase";
import { auth } from "@/app/firebase"

// props interface
interface RegistrationProps {
  onRegister: () => void; // pass to component as prop
}

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            onRegister(); // Notify parent component that registration is complete
          } catch (err: any) {
            setError(err.message); // Display error message if registration fails
          }
        };
      
        return (
                <div className="flex items-center justify-center min-h-screen">
                  <form
                    className="space-y-4 max-w-sm mx-auto p-4"
                    onSubmit={handleSubmit}
                  >
                    <h2 className="text-2xl font-black text-white text-center">
                      Register
                    </h2>
                    {error && (
                      <p className="text-red-500 text-center">{error}</p>
                    )}
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border rounded-lg text-black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-2 border rounded-lg text-black"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-violet-600 focus:outline-none rounded-full py-2 text-white font-extrabold transition delay-25"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              );
            };
            

export default Registration;