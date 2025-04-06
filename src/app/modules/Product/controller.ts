import { Request, Response } from "express";
import { ProductServices } from "./services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = req.body;
  const result = await ProductServices.createProduct(product);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: "product created successful",
  });
});
const fetchProduct = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ProductServices.fetchProduct(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "product fetched successful",
  });
});

export const fetchSingleProduct = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = await ProductServices.fetchProductById(productId);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      data: product,
      message: "single product fetched successfully",
    });
  }
);

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const updateData = req.body;
  const updatedProduct = await ProductServices.updateProductById(
    productId,
    updateData
  );

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    data: updatedProduct,
    message: "Product updated successfully",
  });
});
export const softDeletedProduct = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const { isDeleted } = req.body;

    const updatedProduct = await ProductServices.softDeletedProduct(
      productId,
      isDeleted
    );

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  }
);

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const deletedProduct = await ProductServices.deleteProductById(productId);
  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: deletedProduct,
  });
});

export const ProductControllers = {
  createProduct,
  fetchProduct,
  updateProduct,
  fetchSingleProduct,
  deleteProduct,
  softDeletedProduct,
};
