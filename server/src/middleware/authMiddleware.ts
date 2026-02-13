import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase'; 


export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    
    req.user = decodeValue;
    
    next(); 
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};