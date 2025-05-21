// src/layout/AppLayout.tsx
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

import logo from "/logo.svg";
import {
  FileAddOutlined,
  HeartOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={150}>
        <div className="h-8 m-4 flex justify-center items-center">
          <img src={logo} alt="Logo" />
        </div>
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["products"]}>
          <Menu.Item key="products" className="!rounded-none">
            <ReconciliationOutlined className="mr-2 " />
            <Link to="/products">Ürünler</Link>
          </Menu.Item>
          <Menu.Item key="favorites" className="!rounded-none">
            <HeartOutlined className="mr-2 " />
            <Link to="/favorites">Favoriler</Link>
          </Menu.Item>
          <Menu.Item key="add" className="!rounded-none">
            <FileAddOutlined className="mr-2 " />
            <Link to="/add">Ürün Ekle</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "16px",
            background: "#fff",
            padding: "24px",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
