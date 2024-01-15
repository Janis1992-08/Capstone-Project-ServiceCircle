import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  const { id } = request.query;

  await dbConnect();

  if (request.method === "GET") {
    try {
      const providers = await Provider.findById(id).populate("reviews");
      console.log("providers", providers);
      response.status(200).json(providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "PUT") {
    try {
      const updatedProvider = request.body;
      await Provider.findByIdAndUpdate(id, updatedProvider);
      console.log("updatedProvider", updatedProvider);
      response.status(200).json({ status: `Provider successfully updated.` });
    } catch (error) {
      console.error("Error updating provider:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
