// jwt.service.ts
import jwt from 'jsonwebtoken';

class JwtService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  
  generateToken(sub: string): string {
    const token = jwt.sign({ sub }, this.secretKey);
    return jwt.sign({ sub }, this.secretKey);
  }
}

export default JwtService;