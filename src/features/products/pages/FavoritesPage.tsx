import { useSelector } from "react-redux";

import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.product.favorites);

  if (!favorites.length) {
    return <div>Henüz favori ürün yok.</div>;
  }

  return (
    <div>
      <h2>Favori Ürünlerim</h2>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {favorites.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            extra={
              <a onClick={() => navigate(`/products/${product.id}`)}>Detay</a>
            }
          >
            <p>{product.description}</p>
            <p>{product.price} ₺</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
