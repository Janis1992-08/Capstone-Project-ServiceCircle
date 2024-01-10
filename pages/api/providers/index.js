import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const providers = await Provider.find();
      return response.status(200).json(providers);
    } else {
      return response.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
