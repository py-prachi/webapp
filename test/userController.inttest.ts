import { authenticateUser } from "../src/service/userService";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";

describe("Authenticate User Function", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should return a user when match is found", async () => {
    // given
    const email = "test@technogise.com";
    const password = "test1234";
    const role = "user";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = password;
    existingUser.role = role;
    await existingUser.save();

    // when
    const user = await authenticateUser(email, password);

    // then
    expect(user).toBeDefined();
    expect(user!.email).toBe(email);
    expect(user!.created_at).toBeDefined();
    expect(user!.updated_at).toBeDefined();
    expect(user!.id).toBeDefined();
    expect(user!.role).toBe("user");
  });
});
