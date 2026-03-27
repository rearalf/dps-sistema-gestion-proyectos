import { NextResponse } from "next/server";
import { fetchFromJsonServer } from "@/lib/api";

export async function GET() {
  try {
    const data = await fetchFromJsonServer("/tareas");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Error al obtener tareas" },
      { status: 500 }
    );
  }
}
