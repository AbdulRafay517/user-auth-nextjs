export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page
                <span className="p-2 rounded-md ml-2 bg-orange-500 text-black">
                    {params.id}
                </span>
            </p>
            <hr />
            <button className="bg-blue-500 text-white p-2 rounded-md">Logout</button>
        </div>
    )
}