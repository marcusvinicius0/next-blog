"use client";
import { useState, FormEventHandler } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

export default function Login({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
        router.push(callbackUrl);
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred. Try again.");
    }
  };

  return (
    <div className="max-w-[425px] mx-auto md:max-w-[475px] mt-10">
      <div className="p-3 space-y-10 shadow-md w-full">
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
            className="border-b-2 outline-none bg-transparent pl-1"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 outline-none bg-transparent pl-1"
          />

          <button
            type="submit"
            disabled={!email || !password}
            className={`bg-blue-500 text-white rounded-md p-1 max-w-lg h-[40px] ${
              !email || !password ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>

        <button
          className="p-1 border mx-auto flex items-center gap-2 h-[40px] w-48 font-medium"
          onClick={() => signIn("google", { callbackUrl })}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
