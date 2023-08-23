"use client";
import { useState, FormEventHandler } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { RegisterInputs } from "@/@types/user/input";

export default function Register({}: RegisterInputs) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
      })

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.err);
        setLoading(false);
        return;
      }

      const data = await response.json();
      toast.success(data.success);
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("An error occurred. Try again.");
    }
  };

  return (
    <div className="">
      <div className="bg-white p-2 space-y-10 shadow-md w-full">
        <h2 className="text-2xl">Register</h2>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col space-y-10"
        >
          <input
            type="text"
            value={name}
            placeholder="Type your name"
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 outline-none"
          />
          <input
            type="email"
            value={email}
            placeholder="Your best email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 outline-none"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 outline-none"
          />

          <button type="submit" disabled={!name || !email || !password} className={`bg-blue-500 text-white rounded-md p-1 h-[40px] max-w-lg ${!name || !email || !password ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
