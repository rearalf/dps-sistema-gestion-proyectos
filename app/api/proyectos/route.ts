import { NextRequest, NextResponse } from "next/server";
import { fetchFromJsonServer } from "@/lib/api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const proyecto = await fetchFromJsonServer(`/proyectos/${id}`, {
      method: "PUT",
      data: body,
    });
    return NextResponse.json(proyecto);
  } catch {
    return NextResponse.json(
      { message: "Error al actualizar proyecto" },
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
    await fetchFromJsonServer(`/proyectos/${id}`, { method: "DELETE" });
    return NextResponse.json({ message: "Proyecto eliminado correctamente" });
  } catch {
    return NextResponse.json(
      { message: "Error al eliminar proyecto" },
      { status: 500 }
    );
  }
}
