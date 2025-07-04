import mongoose from "mongoose";

async function testDatabaseConnection() {
    console.log("Starting database connection test...");
    console.log("Environment check:");
    console.log("- NODE_ENV:", process.env.NODE_ENV);
    console.log("- MONGO_URI exists:", !!process.env.MONGO_URI);
    console.log("- MONGO_URI length:", process.env.MONGO_URI?.length || 0);
    
    if (!process.env.MONGO_URI) {
        console.error("❌ MONGO_URI environment variable is not set!");
        return;
    }

    try {
        console.log("\n🔄 Attempting to connect to MongoDB...");
        
        // Set connection options for better debugging
        const options = {
            serverSelectionTimeoutMS: 15000, // 15 seconds
            socketTimeoutMS: 45000, // 45 seconds
            bufferMaxEntries: 0,
            maxPoolSize: 10,
            minPoolSize: 5,
        };

        const startTime = Date.now();
        
        await mongoose.connect(process.env.MONGO_URI, options);
        
        const connectionTime = Date.now() - startTime;
        console.log(`✅ Connected to MongoDB successfully in ${connectionTime}ms`);
        
        // Test basic database operations
        console.log("\n🔄 Testing database operations...");
        
        // Check connection state
        console.log("- Connection state:", mongoose.connection.readyState);
        console.log("- Database name:", mongoose.connection.db?.databaseName);
        console.log("- Host:", mongoose.connection.host);
        console.log("- Port:", mongoose.connection.port);
        
        // Test a simple query
        console.log("\n🔄 Testing collection access...");
        const collections = await mongoose.connection.db?.listCollections().toArray();
        console.log("- Available collections:", collections?.map(c => c.name) || []);
        
        // Test users collection specifically
        if (collections?.some(c => c.name === 'users')) {
            console.log("\n🔄 Testing users collection...");
            const usersCollection = mongoose.connection.db?.collection('users');
            const userCount = await usersCollection?.countDocuments();
            console.log("- Users collection count:", userCount);
        }
        
        console.log("\n✅ Database test completed successfully!");
        
    } catch (error) {
        console.error("\n❌ Database connection failed:");
        console.error("Error type:", error.constructor.name);
        console.error("Error message:", error.message);
        
        if (error.name === 'MongooseServerSelectionError') {
            console.error("\n🔍 Server selection error details:");
            console.error("- This usually indicates network connectivity issues");
            console.error("- Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0 for Vercel");
            console.error("- Verify your MongoDB URI is correct");
        }
        
        if (error.name === 'MongooseTimeoutError') {
            console.error("\n🔍 Timeout error details:");
            console.error("- Connection is taking too long");
            console.error("- This might be due to network latency or server issues");
        }
        
        console.error("\nFull error object:", error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log("\n🔌 Disconnected from MongoDB");
        }
    }
}

// For Vercel API route usage
export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    let output = '';
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    
    // Capture console output
    console.log = (...args) => {
        output += args.join(' ') + '\n';
        originalConsoleLog(...args);
    };
    
    console.error = (...args) => {
        output += '[ERROR] ' + args.join(' ') + '\n';
        originalConsoleError(...args);
    };
    
    try {
        await testDatabaseConnection();
        res.status(200).json({ 
            success: true, 
            message: 'Database test completed',
            output: output 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Database test failed',
            error: error.message,
            output: output 
        });
    } finally {
        // Restore console methods
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    }
}

// For direct Node.js execution
if (require.main === module) {
    testDatabaseConnection().then(() => {
        process.exit(0);
    }).catch((error) => {
        console.error("Test failed:", error);
        process.exit(1);
    });
}
