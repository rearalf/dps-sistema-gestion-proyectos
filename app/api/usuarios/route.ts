import { NextRequest, NextResponse } from "next/server";

import { Usuario } from "@/interfaces/user.interface";
import { fetchFromJsonServer } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const users: Usuario[] = await fetchFromJsonServer("/users");
    const { searchParams } = new URL(request.url);
    const rol = searchParams.get("rol");

    let usuarios = users.filter((user) => user.id !== 1) || [];

    if (rol) {
      usuarios = usuarios.filter((user) => user.rol === rol);
    }

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error al leer usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 },
    );
  }
}
