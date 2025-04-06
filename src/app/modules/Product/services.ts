import { QueryBuilder } from "../../builders/QueryBuilder";
import { TProduct } from "./interface";
import ProductModel from "./model";

const createProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};
const fetchProduct = async (query: Record<string, any>) => {
  const searchFields = [
    "name",
    "brand",
    "modelNumber",
    "category",
    "features.name",
    "displayType",
    "quality",
  ];
  const filterFields = [
    "category",
    "userId",
    "brand",
    "displayType",
    "hdrSupport",
    "quality",
    "resolution",
    "status",
    "discountPrice",
    "refreshRate",
  ];
  const p = query?.discountPrice;
  if (p == 0) {
    query.discountPrice = { $gt: Number(p) };
  }

  const searchQuery = new QueryBuilder(
    ProductModel.find({ isDeleted: false }),
    query
  )
    .search(searchFields)
    .filter(filterFields)
    .sort()
    .paginate();
  const meta = await searchQuery.countTotal();
  const result = await searchQuery.modelQuery.populate({
    path: "userId",
    select: "-__v -password",
  });

  return { result, meta };
};

const fetchProductById = async (productId: string) => {
  return await ProductModel.findById(productId).populate({
    path: "reviews",
    populate: [
      { path: "userId", select: "-password -__v" },
      { path: "productId", select: "name brand category" },
    ],
  });
};

const updateProductById = async (
  productId: string,
  updateData: Partial<TProduct>
) => {
  return await ProductModel.findByIdAndUpdate(productId, updateData, {
    new: true,
  });
};
const softDeletedProduct = async (productId: string, isDeleted: boolean) => {
  return await ProductModel.findByIdAndUpdate(productId, {
    isDeleted: isDeleted,
    new: true,
  });
};

const deleteProductById = async (productId: string) => {
  return await ProductModel.findByIdAndDelete(productId);
};

export const ProductServices = {
  createProduct,
  fetchProduct,
  fetchProductById,
  updateProductById,
  deleteProductById,
  softDeletedProduct,
};
