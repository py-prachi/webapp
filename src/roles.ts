export type Role = "admin" | "user";

export type Permissions = {
  [role in Role]: string[];
};

export const roles: Permissions = {
  admin: [
    "addProduct",
    "getProducts",
    "getProductById",
    "updateProduct",
    "deleteProduct",
    "addDiscount",
    "getDiscount",
    "updateDiscount",
    "addProductDiscount",
  ],
  user: ["addToCart", "checkoutCart", "orderHistory"],
  
};


