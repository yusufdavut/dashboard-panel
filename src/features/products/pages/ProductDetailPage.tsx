// src/features/products/pages/ProductDetailPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Spin, theme, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, toggleFavorite } from "../slices/productSlice";
import type { Product } from "../types";
import type { RootState } from "../../../app/store";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AppTitle from "../components/AppTitle";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.product.favorites);
  const products = useSelector((state: RootState) => state.product.products);
  const navigate = useNavigate();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const product = products.find((p) => String(p.id) === id) || null;
  if (!product) return <Spin />;
  const isFavorite = favorites.some((f: Product) => f.id === product.id);

  return (
    <div>
      <AppTitle title="Ürün Detay" />

      <div
        className="w-8 h-8 rounded-full text-white flex items-center justify-center cursor-pointer mb-5"
        style={{ background: colorPrimary }}
        onClick={() => navigate("/products")}
      >
        <ArrowLeftOutlined />
      </div>
      <Card title={product.name}>
        <p className="text-sm mb-2">{product.description}</p>
        <p className="text-gray-800 mb-6">Fiyat: {product.price}₺</p>

        <Space className="flex flex-col lg:flex-row">
          <Button
            type={isFavorite ? "primary" : "default"}
            onClick={() => dispatch(toggleFavorite(product))}
          >
            {isFavorite ? "Favoriden Çıkar" : "Favorilere Ekle"}
          </Button>

          <Button
            type="default"
            onClick={() => navigate(`/edit/${product.id}`)}
          >
            Düzenle
          </Button>

          <Button
            danger
            onClick={() => {
              dispatch(deleteProduct(product.id));
              navigate("/products");
            }}
          >
            Sil
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
