import { NextRequest, NextResponse } from "next/server";
import { fetchFromJsonServer } from "@/lib/api";

export async function GET() {
  try {
    const tareas = await fetchFromJsonServer("/tareas");
    return NextResponse.json(tareas);
  } catch {
    return NextResponse.json(
      { message: "Error al obtener tareas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tarea = await fetchFromJsonServer("/tareas", {
      method: "POST",
      data: body,
    });
    return NextResponse.json(tarea, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Error al crear tarea" },
      { status: 500 }
    );
  }
}
