import { useEffect, useState } from "react";
import { Input, Select, Card, Spin, theme, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { fetchProducts } from "../slices/productSlice";
import AppTitle from "../components/AppTitle";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filtered, setFiltered] = useState(products);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    let list = [...products];
    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      list = list.filter((p) => p.category === category);
    }
    setFiltered(list);
  }, [search, category, products]);

  if (loading) return <Spin tip="Yükleniyor..." />;

  if (error)
    return <Alert message="Hata" description={error} type="error" showIcon />;

  return (
    <div>
      <AppTitle title="Ürünler" />

      <div className="w-full">
        <Input
          placeholder="Ürün ara..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 16 }}
          value={search}
          allowClear
          className="w-full"
        />

        <Select
          placeholder="Kategori seç"
          onChange={(value) => setCategory(value)}
          allowClear
          options={[...new Set(products.map((p) => p.category))].map((c) => ({
            label: c,
            value: c,
          }))}
          value={category || undefined}
          className="w-full md:w-[300px] mb-4"
        />
      </div>

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {filtered.map((p) => (
          <Card
            hoverable
            title={p.name}
            onClick={() => navigate(`/products/${p.id}`)}
            className="gutter-row"
          >
            <p className="text-sm mb-2">{p.description}</p>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
              <p
                className="rounded-lg text-white py-1 px-2 order-2 lg:order-1 w-fit"
                style={{ background: colorPrimary }}
              >
                {p.category}
              </p>
              <p className="text-gray-800 mb-6 lg:mb-0">Fiyat: {p.price}₺</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
