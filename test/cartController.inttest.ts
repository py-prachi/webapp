import { AppDataSource } from "../src/data-source";

import { checkProductDiscount } from "../src/controller/cartController";
import {  getById } from "../src/service/productService";
import { getUserByEmail } from "../src/service/userService";
import { createCartEntry } from "../src/service/cartService";
import { User } from "../src/entity/User";
import { DiscountType } from "../src/entity/discount";
import {
  apply,
  create,
  getDiscById,
  update,
} from "../src/service/discountService";
import { type } from "os";

describe("Cart operations", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("user should be able to add a product to the cart (no discounts applied to product)", async () => {
    //given

    const email = "test4@test4.com";
    const password = "password4";
    const role = "user";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = password;
    existingUser.role = role;
    await existingUser.save();

    const productId = 1;
    const userName = "test4@test4.com";
    const product = await getById(productId);
    const user = await getUserByEmail(userName);
    console.log("product:", product);
    console.log("user: ", user);

    let discountRate = await checkProductDiscount(product!);

    console.log("Returned back from checkProductDiscount!!!");
    console.log("****discount Rate:****", discountRate);
    if (discountRate === null) {
      discountRate = 0;
    }
    console.log("****discount Rate:****", discountRate);
    // when
    const quantityFromJson = 1;
    if (product && user) {
      const newCartEntry = await createCartEntry(
        user,
        product,
        quantityFromJson,
        discountRate!
      );

      console.log("cartEntry: ", newCartEntry);
      //then

      expect(newCartEntry).toBeDefined();
      expect(newCartEntry?.discountApplied).toBeDefined();
      expect(newCartEntry?.product.product_id).toBe(productId);
      expect(newCartEntry?.discountApplied).toBe("0.00");
      expect(newCartEntry?.quantity).toBe(quantityFromJson);
      expect(newCartEntry?.subtotal).toBe("1000.00");
      expect(newCartEntry?.total).toBe("1000.00");
    }
  });

  it("user should be able to add a product to the cart (FLAT Discount applied to product)", async () => {
    //given

    const productId = 1;
   
    const userName = "test4@test4.com";
    const product = await getById(productId);
    const user = await getUserByEmail(userName);
    console.log("product:", product);
    console.log("user: ", user);

    const coupon = "flatCoupon";
    const discount_rate = 100;
    const status = true;

    const createDiscount = await create(
      coupon,
      DiscountType.FLAT,
      discount_rate,
      status,
      new Date("2023-10-19"),
      new Date("2023-10-29")
    );
    console.log(
      "discount created:",
      createDiscount,
      createDiscount?.discount_id
    );
    const discountId = 1;
  
    const discount = await getDiscById(discountId);
    console.log("applying discount to product");
    console.log("product:", product);
    console.log("discount: ", discount);
    if (product && discount) {
      console.log("Both product and discount present...applying discount...");
      const productDiscount = await apply(
        product,
        discount,
        new Date("2023-10-19"),
        new Date("2023-10-29")
      );
      console.log("ProductDiscount: ", productDiscount);
      console.log(
        "product within prodDisc:",
        productDiscount?.product.product_id
      );

      let discountRate = await checkProductDiscount(product!);

      if (discountRate === null) {
        discountRate = 0;
      }
      console.log("****discount Rate:****", discountRate);
      const quantityFromJson = 1;
      // when
      if (product && user) {
        const newCartEntry = await createCartEntry(
          user,
          product,
          quantityFromJson,
          discountRate!
        );

        console.log("cartEntry : ", newCartEntry);
        console.log(
          "discount Applied for assert : ",
          newCartEntry?.discountApplied
        );
        //then
        //discount Type is "flat"
        const expected = "100.00";
        const productPrice = "1000.00";
        const totalPrice = (
          parseInt(productPrice) - parseInt(expected)
        ).toFixed(2);

        expect(newCartEntry).toBeDefined();
        expect(newCartEntry?.discountApplied).toBeDefined();
        expect(newCartEntry?.discountApplied).toBe(expected);
        expect(newCartEntry?.quantity).toBe(quantityFromJson);
        expect(newCartEntry?.subtotal).toBe(productPrice);
        expect(newCartEntry?.total).toBe(String(totalPrice));
      }
    }
  });

  it("user should be able to add a product to the cart (PERCENT Discount applied to product)", async () => {
    //given

    const productId = 1;
    const price = 1000;
    const userName = "test4@test4.com";
    const product = await getById(productId);
    const user = await getUserByEmail(userName);
    console.log("product:", product);
    console.log("user: ", user);

    const coupon = "percentCoupon";
    const discount_rate = 20;
    const status = true;
    const discountId = 1;
    const discount = await update(
      discountId,
      coupon,
      DiscountType.PERCENT,
      discount_rate,
      status,
      new Date("2023-10-19"),
      new Date("2023-10-29")
    );
    console.log("applying discount to product");
    console.log("product:", product);
    console.log("discount: ", discount);

    let discountRate = await checkProductDiscount(product!);

    if (discountRate === null) {
      discountRate = 0;
    }
    console.log("****discount Rate:****", discountRate);
    const quantityFromJson = 1;
    // when
    if (product && user) {
      const newCartEntry = await createCartEntry(
        user,
        product,
        quantityFromJson,
        discountRate!
      );

      console.log("cartEntry : ", newCartEntry);
      console.log(
        "discount Applied for assert : ",
        newCartEntry?.discountApplied
      );
      //then

      const expected = "200.00";
      const productPrice = "1000.00";
      const totalPrice = (parseInt(productPrice) - parseInt(expected)).toFixed(2);

      expect(newCartEntry).toBeDefined();
      expect(newCartEntry?.discountApplied).toBeDefined();
      expect(newCartEntry?.discountApplied).toBe(expected);
      expect(newCartEntry?.quantity).toBe(quantityFromJson);
      expect(newCartEntry?.subtotal).toBe(productPrice);
      expect(newCartEntry?.total).toBe(String(totalPrice));
    }
  });

  it("should add products(qty>1) to the cart (FLAT Discount applied to product)", async () => {
    //given

    const productId = 1;
    const productPrice = 1000;
    const userName = "test4@test4.com";
    const product = await getById(productId);
    const user = await getUserByEmail(userName);
    console.log("product:", product);
    console.log("user: ", user);

    const discountId = 1;

    const discount = await getDiscById(discountId);
    console.log("applying discount to product");
    console.log("product:", product);
    console.log("discount: ", discount);

    let discountRate = await checkProductDiscount(product!);

    if (discountRate === null) {
      discountRate = 0;
    }
    console.log("****discount Rate:****", discountRate);
    const quantityFromJson = 2;
    // when
    if (product && user) {
      const newCartEntry = await createCartEntry(
        user,
        product,
        quantityFromJson,
        discountRate!
      );

      console.log("cartEntry : ", newCartEntry);
      console.log(
        "discount Applied for assert : ",
        newCartEntry?.discountApplied
      );
      //then

      const expected = "400.00";

      const subtotal = productPrice * quantityFromJson;
      const totalPrice = (subtotal - parseInt(expected)).toFixed(2);

      expect(newCartEntry).toBeDefined();
      expect(newCartEntry?.discountApplied).toBeDefined();
      expect(newCartEntry?.discountApplied).toBe(expected);
      expect(newCartEntry?.quantity).toBe(quantityFromJson);
      expect(newCartEntry?.subtotal).toBe(String(subtotal.toFixed(2)));
      expect(newCartEntry?.total).toBe(String(totalPrice));
    }
  });
});
