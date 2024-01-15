import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);

  if (request.method === "GET") {
    const providers = await Provider.find();
    return response.status(200).json(providers);
  } else if (request.method === "POST") {
    try {
      if (session) {
        const data = request.body;
        const newProvider = new Provider({
          ...data,
          author: session.user.email,
        });
        await newProvider.save();

        response.status(201).json({ status: "Provider created" });
      } else {
        response.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
