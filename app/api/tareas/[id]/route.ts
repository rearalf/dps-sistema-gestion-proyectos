import { NextRequest, NextResponse } from "next/server";
import { fetchFromJsonServer } from "@/lib/api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const tarea = await fetchFromJsonServer(`/tareas/${id}`, {
      method: "PUT",
      data: body,
    });
    return NextResponse.json(tarea);
  } catch {
    return NextResponse.json(
      { message: "Error al actualizar tarea" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await fetchFromJsonServer(`/tareas/${id}`, { method: "DELETE" });
    return NextResponse.json({ message: "Tarea eliminada correctamente" });
  } catch {
    return NextResponse.json(
      { message: "Error al eliminar tarea" },
      { status: 500 }
    );
  }
}
