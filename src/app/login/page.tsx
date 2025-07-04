"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
        
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successful", response.data);
            router.push("/profile");
        } catch(error: any) {
            console.log("Login failed", error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>

            <hr />

            <label htmlFor="email">Email</label>
            <input 
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="p-2 border border-gray-300 rounded-md"
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                className="p-2 border border-gray-300 rounded-md"
            />
            
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-md">{buttonDisabled ? "No Login" : "Login"}
            </button>

            <Link href="/signup">Visit Signup</Link>
        </div>
    )
}