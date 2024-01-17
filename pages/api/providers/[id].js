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
    }
  }

  if (request.method === "PUT") {
    try {
      const updatedProvider = request.body;
      const { rating, userId } = request.body;
      const provider = await Provider.findByIdAndUpdate(id, updatedProvider, {
        useFindAndModify: false,
        new: true,
      });

      if (rating && userId) {
        provider.ratings.push({ userId, rating });
        await provider.save();
      }

      response.status(200).json({ status: `Provider successfully updated.` });
    } catch (error) {
      console.error("Error updating card:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Provider.findByIdAndDelete(id, { useFindAndModify: false });
      response
        .status(200)
        .json({ status: `Provider ${id} successfully deleted.` });
    } catch (error) {
      console.error("Error deleting provider:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (request.method === "POST") {
    try {
      const { review } = request.body;
      const provider = await Provider.findById(id);

      provider.reviews.push(review);

      await provider.save();
      response.status(201).json({ status: "Review added successfully." });
    } catch (error) {
      console.error("Error adding review:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
