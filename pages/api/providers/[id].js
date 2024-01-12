import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  const { id } = request.query;

  await dbConnect();

  if (request.method === "GET") {
    try {
      const providers = await Provider.findById(id).populate("reviews");
      response.status(200).json(providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      response.status(500).json({ error: "Internal Server Error" });
      return;
    }
  } else if (request.method === "DELETE") {
    try {
      await Provider.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `Provider ${id} successfully deleted.` });
    } catch (error) {
      console.error("Error deleting provider:", error);
      response.status(500).json({ error: "Internal Server Error" });
      return;
    }
  } else {
    response.status(405).json({ error: "Method Not Allowed" });
  }
}
