'use client';

import { useState } from "react";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) return setError(error.message);

    alert("Account created successfully 🎉");
    router.push("/login");
  };

  return (
    <div className="container mx-auto px-4 max-w-md py-20">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={onRegister} className="flex flex-col gap-4">
        <input className="p-2 border rounded" placeholder="Full Name"
          value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="p-2 border rounded" type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="p-2 border rounded" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2">Register</button>
      </form>
    </div>
  );
}
