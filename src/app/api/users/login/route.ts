import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Validate input
        if (!email || !password) {
            return NextResponse.json({ 
                error: "Email and password are required" 
            }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ 
                error: "Please provide a valid email address" 
            }, { status: 400 });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ 
                error: "Invalid email or password" 
            }, { status: 401 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ 
                error: "Invalid email or password" 
            }, { status: 401 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { 
            expiresIn: "7d" 
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        }, { status: 200 });

        // Set secure cookie
        response.cookies.set("token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: "/"
        });

        return response;
        
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ 
            error: "Internal server error. Please try again." 
        }, { status: 500 });
    }
}