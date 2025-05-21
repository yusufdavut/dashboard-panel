import { useSelector } from "react-redux";

import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import AppTitle from "../components/AppTitle";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.product.favorites);

  if (!favorites.length) {
    return <div>Henüz favori ürün yok.</div>;
  }

  return (
    <div>
      <AppTitle title="Favoriler" />
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
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
