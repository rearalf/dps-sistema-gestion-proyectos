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
    const body = await request.json();
    const { nombre, email, password, rol } = body;

    if (!nombre || !email || !password || !rol) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const existingUsers = await fetchFromJsonServer<DbUser[]>(
      `/users?email=${encodeURIComponent(email)}`
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: "El email ya está registrado" },
        { status: 400 }
      );
    }

    const user = await fetchFromJsonServer<DbUser>("/users", {
      method: "POST",
      data: { nombre, email, password, rol },
    });

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
