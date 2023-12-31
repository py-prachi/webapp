
import { generateToken } from "../src/jwt-service";
const jwt = require("jsonwebtoken");

require("dotenv").config(); // Load environment variables from .env file

const secretKey = process.env.SECRET_KEY;

describe("jwtservice", () => {
  it("should generate a valid JWT token", () => {
    const token = generateToken("test", "user");
    const expectedToken = atob(token.split(".")[1]);
    expect(JSON.parse(expectedToken).sub).toBe("test");
    expect(JSON.parse(expectedToken).role).toBe("user");
  });
});
