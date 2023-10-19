import {
  apply,
  create,
  getAll,
  getDiscById,
  update,
} from "../src/service/discountService";
import { AppDataSource } from "../src/data-source";
import { Discount, DiscountType } from "../src/entity/discount";
import { ProductDiscount } from "../src/entity/ProductDiscounts";
import { getById } from "../src/service/productService";
import { getUserByEmail } from "../src/service/userService";
import { createCartEntry } from "../src/service/cartService";
import { User } from "../src/entity/User";

describe("Cart operations", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("user should be able to add a product to the cart", async () => {
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
    // when
    if (product && user) {
      const newCartEntry = await createCartEntry(user, product, 1);

      console.log("cartEntry: ", newCartEntry);
      //then
      expect(newCartEntry).toBeDefined();
    }
  });
});
