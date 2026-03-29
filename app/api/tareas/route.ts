import { NextResponse } from "next/server";
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
