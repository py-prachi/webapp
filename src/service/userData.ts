import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const authenticateUser = async (userName: string): Promise<User | null> => {
  try {
    console.log("in Authenticate user route!", userName)
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email: userName } });
    console.log("data received is : ",user?.email, user?.password)
    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
