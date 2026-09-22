"use client";
import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if(email && password) {
            router.push("/stays");
        }}

        return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 px-6">
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-lg">
            <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#03045e] text-xl font-bold text-white">
                    V
                </div>
                <span className="text-2xl font-semibold tracking-tight text-[#03045e]">Vistara</span>
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-[#03045e]">Welcome to Vistara</h1>
            <p className="mt-2 text-sm text-gray-500">Sign in to continue</p>

            <form  onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#03045e] focus:ring focus:ring-[#03045e] focus:ring-opacity-50"
                    />
                </div>


                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#03045e] focus:ring focus:ring-[#03045e] focus:ring-opacity-50"
                    />
                </div>

                <button
                type="submit"
                className="w-full rounded-2xl bg-[#03045e] px-4 py-2 text-lg font-semibold text-white transition hover:bg-[#023e8a]"
                >
                    Sign In
                </button>
            </form>
              <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#03045e] hover:underline"
          >
            Create account
          </Link>
        </p>
        </div>
    </main>
        )}