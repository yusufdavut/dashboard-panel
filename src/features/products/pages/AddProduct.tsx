/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form } from "antd";
import { addProduct } from "../slices/productSlice";
import AppTitle from "../components/AppTitle";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newProduct = {
      id: Date.now(),
      name: values.name,
      price: Number(values.price),
      description: values.description,
      category: values.category,
    };
    dispatch(addProduct(newProduct));
    navigate("/products");
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <AppTitle title="Ürün Ekle" />

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
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductPage;
