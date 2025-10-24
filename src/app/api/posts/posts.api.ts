import axiosClient from "../../../lib/axiosClient";

export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  fileUrl?: string;
  user?: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
}

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const res = await axiosClient.get("/posts");
    return res.data.data;
  },

  getById: async (id: string): Promise<Post> => {
    const res = await axiosClient.get(`/posts/${id}`);
    return res.data.data;
  },

  delete: async (id: string) => {
    const res = await axiosClient.delete(`/posts/${id}`);
    return res.data;
  },
};
