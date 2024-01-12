import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const providers = await Provider.find();
      response.status(200).json(providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  } else if (request.method === "POST") {
    try {
      // Parse the incoming JSON data from the request body
      const data = request.body;

      // Create a new provider document
      const newProvider = new Provider(data);

      // Save the provider to the database
      const savedProvider = await newProvider.save();

      response.status(201).json(savedProvider);
    } catch (error) {
      console.error("Error parsing or saving provider:", error);
      response
        .status(500)
        .json({ error: "Error saving provider to the database" });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
