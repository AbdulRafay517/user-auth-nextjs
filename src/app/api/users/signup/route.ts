import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json({ 
                error: "Username, email, and password are required" 
            }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ 
                error: "Please provide a valid email address" 
            }, { status: 400 });
        }

        // Validate password strength
        if (password.length < 6) {
            return NextResponse.json({ 
                error: "Password must be at least 6 characters long" 
            }, { status: 400 });
        }

        // Validate username
        if (username.length < 3) {
            return NextResponse.json({ 
                error: "Username must be at least 3 characters long" 
            }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ 
                    error: "Email already registered" 
                }, { status: 409 });
            } else {
                return NextResponse.json({ 
                    error: "Username already taken" 
                }, { status: 409 });
            }
        }

        // Hash password
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "Account created successfully",
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
        }, { status: 201 });

    } catch (error: any) {
        console.error("Signup error:", error);
        
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return NextResponse.json({ 
                error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
            }, { status: 409 });
        }
        
        return NextResponse.json({ 
            error: "Internal server error. Please try again." 
        }, { status: 500 });
    }
}