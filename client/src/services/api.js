const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}/api/products${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

export const getProducts = () => request("");

export const createProduct = (product) =>
  request("", {
    method: "POST",
    body: JSON.stringify(product)
  });

export const updateProduct = (id, product) =>
  request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(product)
  });

export const deleteProduct = (id) =>
  request(`/${id}`, {
    method: "DELETE"
  });
