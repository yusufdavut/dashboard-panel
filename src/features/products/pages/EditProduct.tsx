/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../slices/productSlice";
import { Form, Input, Button } from "antd";
import type { RootState } from "../../../app/store";
import AppTitle from "../components/AppTitle";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state: RootState) => state.product.products);
  const product = products.find((p) => String(p.id) === id);

  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product]);

  const onFinish = (values: any) => {
    if (!product) return;
    const updated = { ...product, ...values, price: Number(values.price) };
    dispatch(updateProduct(updated));
    navigate("/products");
  };

  if (!product) return <div>Ürün bulunamadı</div>;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <AppTitle title="Ürün Düzenle" />

      <Form.Item name="name" label="Ürün Adı" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Fiyat">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="description" label="Açıklama">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="category" label="Kategori" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductPage;
