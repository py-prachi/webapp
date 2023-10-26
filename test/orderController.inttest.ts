import { AppDataSource } from "../src/data-source";
import { getUserByEmail } from "../src/service/userService";
import { User } from "../src/entity/User";
import { createOrder } from "../src/service/orderService";
import { getCart } from "../src/service/cartService";

describe("Checkout Cart operations", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("user should be able to checkout cart", async () => {
    //given

    const email = "test5@test.com";
    const password = "password5";
    const role = "user";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = password;
    existingUser.role = role;
    await existingUser.save();
    
    const userName = "test5@test.com";
   
    const user = await getUserByEmail(userName);
    const shippingAddress = 'XYZ';
    const contactNumber = '9823378987';
    const cardNumber = '1234123412341234'
    console.log("user: ", user, user?.id);
    const userId = user!.id;
    const newOrderEntry = await createOrder(userId, shippingAddress, contactNumber, cardNumber);

    console.log("Returned back from createOrder!!!",newOrderEntry);

    const cartRecords = await getCart(userId);
    console.log("Returned from Cart entity:", cartRecords)
    
     // then

      expect(newOrderEntry).toBeDefined();
      
  });
 
});
