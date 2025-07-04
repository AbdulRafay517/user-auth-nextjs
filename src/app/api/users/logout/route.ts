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
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}