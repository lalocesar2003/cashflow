// app/api/clients/[id]/route.ts

import { NextResponse } from "next/server";
import { updateClientSchema } from "@/modules/clients/clients.schema";
import {
  getClientById,
  updateClient,
} from "@/modules/clients/clients.service";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const client = await getClientById(params.id);

    if (!client) {
      return NextResponse.json(
        {
          ok: false,
          message: "Cliente no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: client,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Error al obtener cliente",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const body = await request.json();

    const validatedData = updateClientSchema.parse(body);

    const client = await updateClient(params.id, validatedData);

    return NextResponse.json({
      ok: true,
      data: client,
      message: "Cliente actualizado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Error al actualizar cliente",
      },
      { status: 400 }
    );
  }
}