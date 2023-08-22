"use client";
import { useState, FormEventHandler } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { LoginInputs } from "@/@types/user/input";

export default function Login({}: LoginInputs) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      if (result!.error) {
        toast.error(result!.error);
      } else {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred. Try again.");
    }
  };

  return (
    <div>
      <div className="bg-white p-2 space-y-10 shadow-md w-full">
        <h2 className="text-2xl">Login</h2>

        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col space-y-10"
        >
          <input
            type="email"
            value={email}
            placeholder="Email"
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

          <button
            type="submit"
            disabled={!email || !password}
            className={`bg-blue-500 text-white rounded-md p-1 max-w-lg ${
              !email || !password ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
