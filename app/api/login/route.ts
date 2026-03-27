import { NextRequest, NextResponse } from "next/server";
import { fetchFromJsonServer } from "@/lib/api";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mock-jwt-secret-key-for-dev";

interface DbUser {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const users = await fetchFromJsonServer<DbUser[]>(
      `/users?email=${encodeURIComponent(email)}`
    );

    if (users.length === 0 || users[0].password !== password) {
      return NextResponse.json(
        { message: "Email o contraseña incorrectos" },
        { status: 400 }
      );
    }

    const user = users[0];

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json({ accessToken, user });
  } catch {
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
