import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// src/controllers/auth.ts - login fonksiyonunu güncelle
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body; // email kullan, username değil
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } }); // email ile ara
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" }
    );

    const { password: _, ...userResponse } = user;
    res.json({ 
      message: "Login successful",
      token, 
      user: userResponse 
    });
  } catch (err: any) {
    res.status(500).json({ error: "Login failed" });
  }
};

// register fonksiyonunu da güncelle - token ekle
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" }
    );

    const { password: _, ...userResponse } = user;
    res.status(201).json({ 
      message: "User registered successfully", 
      token,
      user: userResponse 
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Username or email already exists" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
};