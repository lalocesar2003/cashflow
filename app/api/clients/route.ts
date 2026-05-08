// app/api/clients/route.ts

import { NextResponse } from "next/server";
import { createClientSchema } from "@/modules/clients/clients.schema";
import {
  createClient,
  getClients,
} from "@/modules/clients/clients.service";

export async function GET() {
  try {
    const clients = await getClients();

    return NextResponse.json({
      ok: true,
      data: clients,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Error al listar clientes",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = createClientSchema.parse(body);

    const client = await createClient(validatedData);

    return NextResponse.json(
      {
        ok: true,
        data: client,
        message: "Cliente creado correctamente",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Error al crear cliente",
      },
      { status: 400 }
    );
  }
}