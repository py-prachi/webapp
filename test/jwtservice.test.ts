import JwtService from "../src/jwt-service";
import jwt from "jsonwebtoken";

jest.mock('jsonwebtoken');

require('dotenv').config(); // Load environment variables from .env file

const secretKey = process.env.SECRET_KEY;

describe('jwtservice', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

    it('should generate a valid JWT token', ()=>{

        const Jwtservice = new JwtService(secretKey!);
        const token = Jwtservice.generateToken("test@test.com")
       
        console.debug("Token generated is : ", token);

        // Mock the jwt.sign method to return a known token
        const expectedToken = 'validtoken';
        (jwt.sign as jest.Mock).mockReturnValue(expectedToken);

        console.log(`expected token : ${expectedToken}`);

        expect(token).toBe(expectedToken);
        expect(jwt.sign).toHaveBeenCalledWith({ sub: 'test' }, secretKey);
    })
    

}

)

