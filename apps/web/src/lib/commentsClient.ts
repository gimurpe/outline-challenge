import { IComment } from "outline-challenge-shared/models";
import { toast } from "react-toastify";

class CommentsClient {
  private apiUrl = "https://jsonplaceholder.typicode.com/comments";

  async list(pageNumber = 1, pageSize = 10): Promise<IComment[]> {
    try {
      const res = await fetch(
        `${this.apiUrl}?_limit=${pageSize}&_start=${pageNumber}`
      );

      if (!res.ok) {
        toast.error("Failed to fetch comments.");
        throw new Error("Failed to fetch comments");
      }

      return await res.json();
    } catch (error) {
      toast.error("Failed to fetch comments.");
      throw error;
    }
  }
}

export const commentsClient = new CommentsClient();
