import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./layout";
import ProductListPage from "../features/products/pages/ProductList";
import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import FavoritesPage from "../features/products/pages/FavoritesPage";
import AddProductPage from "../features/products/pages/AddProduct";
import EditProductPage from "../features/products/pages/EditProduct";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
        <Route
          path="*"
          element={
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              404 - Sayfa bulunamadı
            </div>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
