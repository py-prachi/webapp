import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const authenticateUser = async (
  userName: string,
  password: string
): Promise<User | null> => {
  try {
    console.log("in Authenticate user route!", userName);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email: userName } });
    
    if (!user || user.password !== password) {
      console.error("Authentication failed for user:", userName);
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
