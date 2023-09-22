
import JwtService from '../src/jwt-service';


require('dotenv').config(); // Load environment variables from .env file

const secretKey = process.env.SECRET_KEY;

//jest.mock('jsonwebtoken');

describe('jwtservice', () => {
    
    it('should generate a valid JWT token', ()=>{

        const Jwtservice = new JwtService(secretKey!);
        const token = Jwtservice.generateToken("test")
       
        console.debug("Token generated is : ", token);

        // // Mock the jwt.sign method to return a known token
        // const expectedToken = 'test';
        // (jwt.sign as jest.Mock).mockReturnValue(expectedToken);

        const expectedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjk1Mzg0MDgyfQ._Ft_7fnBmWUngyKE9E6ZvZRNQub48GcvFlarBN1xlIU"
        expect(token).toBe(expectedToken);
        // expect(jwt.sign).toHaveBeenCalledWith({ sub: 'test' }, secretKey);
    })
    

}

)

