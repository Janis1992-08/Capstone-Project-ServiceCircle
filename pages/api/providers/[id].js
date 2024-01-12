import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  const { id } = request.query;
  // goal is to connect to the db
  await dbConnect();

  // check if the request method is GET

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

  if (request.method === "DELETE") {
    try {
      await Provider.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `Provider ${id} successfully deleted.` });
    } catch (error) {
      console.error("Error deleting provider:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
