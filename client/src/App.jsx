import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
import ManagePage from "./pages/ManagePage";
import {
  createProduct,
  deleteProduct as deleteProductRequest,
  getProducts,
  updateProduct
} from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("gallery");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setMessage("Could not load products. Check that the API server is running.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const saveProduct = async (data) => {
    if (editingProduct) {
      const updatedProduct = await updateProduct(editingProduct._id, data);
      setProducts((prev) => prev.map((p) => (p._id === editingProduct._id ? updatedProduct : p)));
      setEditingProduct(null);
    } else {
      const newProduct = await createProduct(data);
      setProducts((prev) => [newProduct, ...prev]);
    }
    setMessage("");
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProductRequest(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
    if (editingProduct?._id === id) setEditingProduct(null);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setView("manage");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar view={view} onChangeView={setView} />
      {message && <p className="mx-auto mt-6 max-w-6xl rounded-xl bg-amber-50 px-6 py-4 text-sm text-amber-700">{message}</p>}
      {view === "gallery" ? (
        <GalleryPage products={products} loading={loading} />
      ) : (
        <ManagePage
          products={products}
          editingProduct={editingProduct}
          loading={loading}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
          onEdit={startEdit}
          onDelete={deleteProduct}
        />
      )}
      <footer className="py-10 text-center text-sm text-slate-400">Made by John Loren Co · INF233</footer>
    </div>
  );
}
export default App;
