"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState(null);

    const onLogout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            console.log(res.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error.response.data);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <button 
                className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600 active:bg-green-700 transition-all duration-300 ease-in-out mb-4 mt-4 w-full max-w-md text-center">
                {data === null ? "Loading..." : <Link href={`/profile/${data}`}>Go to Profile</Link>} 
            </button>
            <hr />
            <button
                onClick={getUserDetails}
                className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600 active:bg-green-700 transition-all duration-300 ease-in-out mb-4 mt-4 w-full max-w-md text-center">
                Get User Details
            </button>
            <button 
                onClick={onLogout}
                className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 active:bg-blue-700 transition-all duration-300 ease-in-out mb-4 mt-4 w-full max-w-md text-center">
                Logout
            </button>
        </div>
    )
}