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


export const addNewUser = async (
  userName: string,
  password: string,
  role:string
) => {
  const userRepository = AppDataSource.getRepository(User)
        
  const newUser = new User();
  newUser.email = userName;
  newUser.password = password; 
  newUser.role = role;

    try {
      const user = await userRepository.save(newUser);
      return user
    } catch (error) {
        console.error("Error adding user:", error);
        return null;
    }
};

export const getUserById = async (userId:number)=> {
  try {
      console.log("In User service - find by id:", userId);
      const userRepository = AppDataSource.getRepository(User)
      const user = await userRepository.findOne({ where: {id : userId } });
      return user
  } catch (error) {
      console.error(`Error fetching product by id (${userId}):`, error);
      return null;
  }
};


export const getUserByEmail = async (userName:string)=> {
  try {
      console.log("In User service - find by email:", userName);
      const userRepository = AppDataSource.getRepository(User)
      const user = await userRepository.findOne({ where: {email : userName } });
      return user
  } catch (error) {
      console.error(`Error fetching product by Email (${userName}):`, error);
      return null;
  }
};
export default getUserByEmail;