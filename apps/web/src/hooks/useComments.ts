import { toast } from "react-toastify";
import { commentsClient } from "../lib/commentsClient";

export const useComments = () => {
  const fetchNextComments = async (limit: number, offset: number = 0) => {
    try {
      const rows = await commentsClient.list(offset, limit);

      return { rows, nextOffset: offset + 1, hasMore: offset <= 49 };
    } catch (error) {
      toast.error("Error fetching the comments");
      return {
        rows: [],
        nextOffset: null,
        hasMore: false,
      };
    }
  };

  return {
    fetchNextComments,
  };
};
