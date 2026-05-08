// app/clients/page.tsx

import Link from "next/link";
import { getClients } from "@/modules/clients/clients.service";
import { ClientList } from "@/components/clients/client-list";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los clientes registrados en el sistema.
          </p>
        </div>

        <Link
          href="/clients/create"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Nuevo cliente
        </Link>
      </div>

      <ClientList clients={clients} />
    </main>
  );
}