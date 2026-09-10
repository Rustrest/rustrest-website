import "server-only";
import dns from "node:dns/promises";
import mongoose from "mongoose";

dns.setServers(["1.1.1.1"]);

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached =
  globalWithMongoose.mongooseCache ?? {
    conn: null,
    promise: null,
  };

globalWithMongoose.mongooseCache = cached;


async function connectWithRetry(
  uri: string,
  retries = 6,
  baseDelayMs = 1500,
  maxDelayMs = 6000
): Promise<typeof mongoose> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const instance = await mongoose.connect(uri, { bufferCommands: false });
      console.log("✅ DB is connected");
      return instance;
    } catch (error) {
      if (attempt === retries) throw error;
      const delayMs = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs);
      console.warn(
        `⚠️ DB connection attempt ${attempt}/${retries} failed, retrying in ${delayMs}ms…`
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("unreachable");
}

export default async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectWithRetry(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;

    console.error(
      "❌ DB connection failed:",
      error instanceof Error ? error.message : error
    );

    throw error;
  }

  return cached.conn;
}
