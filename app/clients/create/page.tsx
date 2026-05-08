// app/clients/create/page.tsx

import { ClientForm } from "@/components/clients/client-form";

export default function CreateClientPage() {
  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crear cliente</h1>
        <p className="text-sm text-muted-foreground">
          Registra un nuevo cliente para luego asociarle proyectos e hitos de cobro.
        </p>
      </div>

      <ClientForm mode="create" />
    </main>
  );
}