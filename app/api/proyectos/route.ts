import { NextResponse } from "next/server";
import { fetchFromJsonServer } from "@/lib/api";

export async function GET() {
  try {
    const proyectos = await fetchFromJsonServer("/proyectos");
    return NextResponse.json(proyectos);
  } catch {
    return NextResponse.json(
      { message: "Error al obtener proyectos" },
      { status: 500 }
    );
  }
}