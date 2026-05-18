import { MongoClient } from "mongodb";
import dns from "dns";

// Configure Node.js to use Google's DNS to resolve MongoDB Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  console.log("[MongoDB Link] Configured DNS to Google Public DNS.");
} catch (e) {
  console.warn("[MongoDB Link] Failed to set DNS servers:", e);
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let uri = process.env.MONGODB_URI;

// If using the Atlas cluster that has DNS SRV lookup restrictions,
// automatically rewrite it to use direct replica-set shard hostnames.
if (uri.includes("ee7wxm5.mongodb.net") && uri.startsWith("mongodb+srv://")) {
  console.log("[MongoDB Link] Re-routing SRV to direct replica-set shards to bypass local DNS resolution barriers.");
  uri = "mongodb://hansraj9633_db_user:Ui5ANhCm61dAAS1v@ac-roev6gt-shard-00-00.ee7wxm5.mongodb.net:27017,ac-roev6gt-shard-00-01.ee7wxm5.mongodb.net:27017,ac-roev6gt-shard-00-02.ee7wxm5.mongodb.net:27017/studysphere?replicaSet=atlas-uk01gk-shard-0&ssl=true&authSource=admin";
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
