import request from "supertest";
import { response } from "express";
import app from "../src/app";
import {
  createProduct,
  del,
  getAllProducts,
  getById,
  search,
  update,
} from "../src/service/productService";
import { AppDataSource } from "../src/data-source";
import { Products } from "../src/entity/Products";

describe("CRUD operations on Product", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should add a product to the product table", async () => {
    // given
    const productName = "product1";
    const price = 100;
    const quantity = 10;
    const category = "category1";
    const description = "";

    // when
    const product = await createProduct(
      productName,
      price,
      quantity,
      category,
      description
    );
    console.log("Product: ", product);

    // then
    expect(product).toBeDefined();
    expect(product!.product_name).toBe(productName);
    expect(product!.price).toBe(price);
    expect(product!.quantity).toBe(quantity);
    expect(product!.product_id).toBeDefined();
    expect(product!.product_status).toBe("available");
    expect(product!.description).toBeDefined();
    expect(product!.category).toBe(category);
    expect(product!.specifications).toBeDefined();
    expect(product!.created_at).toBeDefined();
    expect(product!.updated_at).toBeDefined();
  });

  it("should fetch all products from the product table", async () => {
    await createProduct("Product2", 1000, 10);
    await createProduct("Product3", 1000, 10);

    // Act
    const products = await getAllProducts();
    console.log(products);
    // Assert
    expect(products?.length).toBeGreaterThan(0);
  });

  it("should fetch specific product from the product table", async () => {
    const productId = 1;
    // Act
    const products = await getById(productId);
    console.log(products);
    // Assert
    expect(products?.product_id).toBe(productId);
  });

  it("should update specific product", async () => {
    const productId = 1;
    // Act
    const products = await update(1, "updated_product", 1000, 10);
    console.log(products);
    // Assert
    expect(products?.product_id).toBe(productId);
    expect(products?.product_name).toBe("updated_product");
  });
  it("should delete specific product", async () => {
    const productId = 3;
    // Act
    const deleted_product_status = await del(productId);
    console.log(deleted_product_status);
    // Assert
    expect(deleted_product_status).toBe(true);
  });

  it("should fetch product/s for searched Product name", async () => {
    const productName = "mobile";

    await createProduct(
      "Dell Laptop",
      50000,
      10,
      "Electronics",
      "high-performance, sleek, and lightweight portable "
    );
    await createProduct(
      "Mac Laptop",
      100000,
      10,
      "Electronics",
      "high-performance, long-lasting battery "
    );
    await createProduct("Mobile", 10000, 10, "Electronics", "long-lasting battery ");

    let products: Products[] | null = null;

    products = await search(productName, undefined, undefined);
    console.log(products);
    // Assert
    expect(Array.isArray(products)).toBe(true);
    expect(products?.length).toBeGreaterThan(0);
    products?.forEach((product) => {
      expect(product.product_name.toLowerCase()).toContain(
        productName.toLowerCase()
      );
    });
  });

  it("should fetch product/s for searched Product category", async () => {
    const category = "electronics";

    let products: Products[] | null = null;

    products = await search(undefined, category, undefined);
    console.log(products);
    // Assert
    expect(Array.isArray(products)).toBe(true);
    expect(products?.length).toBeGreaterThan(0);
    products?.forEach((product) => {
      expect(product.category?.toLowerCase()).toContain(category.toLowerCase());
    });
  });

  it("should fetch product/s for searched Product description", async () => {
    const description = "long-lasting";

    let products: Products[] | null = null;

    products = await search(undefined, undefined, description);
    console.log(products);
    // Assert
    expect(Array.isArray(products)).toBe(true);
    expect(products?.length).toBeGreaterThan(0);
    products?.forEach((product) => {
      expect(product.description?.toLowerCase()).toContain(
        description.toLowerCase()
      );
    });
  });
});
