"use client";

import { useState } from "react";
import { signUp } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log("Error signing up", error);
    }

    console.log("Successfully signed up", result);
    return router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <label htmlFor="email">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder="Email..."
          autoComplete="email"
        />
      </label>
      <label htmlFor="password">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="Password..."
          autoComplete="new-password"
        />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}
