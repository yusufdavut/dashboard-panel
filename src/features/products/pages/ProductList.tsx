import { useEffect, useState } from "react";
import { Input, Select, Card, Spin, Row, Col, theme, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { fetchProducts } from "../slices/productSlice";

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
      <div>
        <Input
          placeholder="Ürün ara..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 16 }}
          value={search}
          allowClear
        />
        <Select
          placeholder="Kategori seç"
          onChange={(value) => setCategory(value)}
          allowClear
          options={[...new Set(products.map((p) => p.category))].map((c) => ({
            label: c,
            value: c,
          }))}
          style={{ marginBottom: 16, width: 300 }}
          value={category || undefined}
        />
      </div>

      <Row gutter={16}>
        {filtered.map((p) => (
          <Col
            key={p.id}
            className="gutter-row"
            span={6}
            style={{ marginBottom: 16 }}
          >
            <Card
              hoverable
              title={p.name}
              onClick={() => navigate(`/products/${p.id}`)}
            >
              <p className="text-sm mb-2">{p.description}</p>
              <div className="flex justify-between items-center w-full">
                <p
                  className="rounded-md text-white py-1 px-2"
                  style={{ background: colorPrimary }}
                >
                  {p.category}
                </p>
                <p className="text-gray-800">Fiyat: {p.price}₺</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListPage;
