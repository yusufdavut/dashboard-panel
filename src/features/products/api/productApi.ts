import axiosInstance from "../../../shared/utils/axios";
import type { Product } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("products.json");
  console.log({ response });
  return response.data;
};
