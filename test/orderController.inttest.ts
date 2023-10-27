import { AppDataSource } from "../src/data-source";
import { getUserByEmail } from "../src/service/userService";
import { User } from "../src/entity/User";
import { createOrder, updateOrder } from "../src/service/orderService";
import { createCartEntry, delCart, getCart } from "../src/service/cartService";
import { createProduct, getAllProducts, getById } from "../src/service/productService";
import { apply, create, getAll, getDiscById } from "../src/service/discountService";
import { DiscountType } from "../src/entity/discount";
import { checkProductDiscount } from "../src/controller/cartController";

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
    const orderId = newOrderEntry?.order_id;
    //create products
    await createProduct("Product1 for checkout", 1000, 10);
    await createProduct("Product2 for checkout", 2000, 10);
    await createProduct("Product3 for checkout", 3000, 10);
    //
    const products = await getAllProducts();
    console.log(products);
    //create discounts

    await create(
        "Coupon for Checkout test1",DiscountType.PERCENT,10,true,new Date("2023-10-19"),new Date("2023-11-29")
      );
    await create(
        "Coupon for Checkout test2",DiscountType.FLAT,100,true,new Date("2023-10-19"),new Date("2023-11-29")
      );
    const discounts = await getAll();
    console.log(discounts);

   // apply product discounts
    const productId = 1;
    const discountId = 1;
    const product = await getById(productId);
    const discount = await getDiscById(discountId);
    console.log("discount: ", discount);
    console.log("in apply service ---- product:", product);
    
    // when
    if (product && discount) {
      const productDiscount = await apply(
        product,
        discount,
        new Date("2023-10-09"),
        new Date("2023-11-19")
      );
      console.log("ProductDiscount: ", productDiscount);
    }
    //add products to cart
    let discountRate = await checkProductDiscount(product!);

    console.log("Returned back from checkProductDiscount!!!");
    console.log("****discount Rate:****", discountRate);
    if (discountRate === null) {
      discountRate = 0;
    }
    console.log("****discount Rate:****", discountRate);
 
    const quantityFromJson = 1;
    if (product && user) {
      const newCartEntry1 = await createCartEntry(
        user,
        product,
        quantityFromJson,
        discountRate!
      );

      console.log("cartEntry1: ", newCartEntry1);
    }
      const productId2 = 2
      const product2 = await getById(productId2);
      discountRate = await checkProductDiscount(product2!);
      console.log("Returned back from checkProductDiscount!!!");
      console.log("****discount Rate:****", discountRate);
    if (discountRate === null) {
      discountRate = 0;
    }
    console.log("****discount Rate:****", discountRate);
      const newCartEntry2 = await createCartEntry(
        user!,
        product2!,
        quantityFromJson,
        discountRate!
      );
      console.log("cartEntry2: ", newCartEntry2);
    
    const cartRecords = await getCart(userId);
    console.log("Returned from Cart entity:", cartRecords)
    let totalPrice = 0;
    if (cartRecords){
        for (const record of cartRecords) {
            console.log("price: ", record.total,typeof(record.total));
          
            const total = String(record.total);          
            totalPrice += parseFloat(total);
          }
          
          console.log("Total Price:", totalPrice, typeof(totalPrice));
    }
    
    try {
        const order = await updateOrder(orderId!, totalPrice);
        console.log("status of order: ", order);
        if (!order) {
          console.log("status of order: ", order);
          //return res.status(404).json({ message: "order not found" });
        }
    
        //return res.status(204).send();
      } catch (error) {
        console.error("Error fetching order by ID:", error);
        //return res.status(500).json({ message: "Server error" });
      }
       await delCart(userId);
         
       const cartRecord = await getCart(userId);
       console.log("Cart entry shud not have any records of User id :",userId, cartRecord)

    
     // then

      expect(newOrderEntry).toBeDefined();
      
  });
 
});
