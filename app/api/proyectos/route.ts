import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const proyecto = await fetchFromJsonServer("/proyectos", {
      method: "POST",
      data: body,
    });
    return NextResponse.json(proyecto, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Error al crear proyecto" },
      { status: 500 }
    );
  }
}
