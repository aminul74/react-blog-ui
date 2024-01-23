import axios from "axios";

export const fetchBlogs = async (page, pageSize) => {
  try {
    const response = await axios.get(
      `http://localhost:4001/api/v1/blogs?page=${page}&size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBlogMutation = async (blog, token) => {
  try {
    const response = await axios.post(
      "http://localhost:4001/api/v1/blogs/create",
      blog,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchSingleBlog = async (uuId, token) => {
  try {
    const response = await axios.get(`http://localhost:4001/api/v1/blogs/${uuId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data ? response.data[0] : [];
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (uuId, updatedBlog, token) => {
  try {
    await axios.put(`http://localhost:4001/api/v1/blogs/${uuId}`, updatedBlog, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (uuId, token) => {
  try {
    await axios.delete(`http://localhost:4001/api/v1/blogs/${uuId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

