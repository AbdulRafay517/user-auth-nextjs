import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        }, { status: 200 });
        
        // Clear the token cookie with the same configuration as when it was set
        response.cookies.set("token", "", { 
            httpOnly: true, 
            expires: new Date(0),
            path: "/"
        });
        
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}