"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default async function UserProfile({params}: {params: Promise<{id: string}>}) {
    const router = useRouter();
    const {id} = await params;

    const onLogout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            console.log(res.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error.response.data);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page
                <span className="p-2 rounded-md ml-2 bg-orange-500 text-black">
                    {id}
                </span>
            </p>
            <hr />
            <button
                onClick={onLogout}
                className="bg-blue-500 text-white p-2 rounded-md">Logout</button>
        </div>
    )
}
