"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createClientSchema,
  type CreateClientInput,
} from "@/modules/clients/clients.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type TipoDocumento = CreateClientInput["tipoDocumento"];
type EstadoCliente = CreateClientInput["estadoCliente"];

type ClientFormInitialData = {
  idCliente: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  razonSocial: string;
  telefonoPrincipal?: string | null;
  emailPrincipal?: string | null;
  direccion?: string | null;
  estadoCliente: EstadoCliente;
};

type ClientFormProps =
  | {
      mode: "create";
      initialData?: never;
    }
  | {
      mode: "edit";
      initialData: ClientFormInitialData;
    };

const DOCUMENT_TYPES: TipoDocumento[] = [
  "RUC",
  "DNI",
  "CE",
  "PASAPORTE",
  "OTRO",
];

const CLIENT_STATUSES: EstadoCliente[] = ["Activo", "Inactivo"];

function emptyStringToNull(value: unknown) {
  if (typeof value === "string" && value.trim() === "") {
    return null;
  }

  return value;
}

/**
 * Este schema usa tu createClientSchema como base,
 * pero permite que campos opcionales del formulario lleguen como string vacío.
 *
 * Ejemplo:
 * emailPrincipal: "" => null
 * telefonoPrincipal: "" => null
 * direccion: "" => null
 */
const clientFormSchema = createClientSchema.extend({
  telefonoPrincipal: z.preprocess(
    emptyStringToNull,
    z.string().optional().nullable()
  ),
  emailPrincipal: z.preprocess(
    emptyStringToNull,
    z.string().email("Email inválido").optional().nullable()
  ),
  direccion: z.preprocess(
    emptyStringToNull,
    z.string().optional().nullable()
  ),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

function cleanOptionalText(value?: string | null) {
  if (!value) return null;

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

export function ClientForm(props: ClientFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);

  const isEditMode = props.mode === "edit";

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      tipoDocumento: props.initialData?.tipoDocumento ?? "RUC",
      numeroDocumento: props.initialData?.numeroDocumento ?? "",
      razonSocial: props.initialData?.razonSocial ?? "",
      telefonoPrincipal: props.initialData?.telefonoPrincipal ?? "",
      emailPrincipal: props.initialData?.emailPrincipal ?? "",
      direccion: props.initialData?.direccion ?? "",
      estadoCliente: props.initialData?.estadoCliente ?? "Activo",
    },
  });

  async function onSubmit(values: ClientFormValues) {
    setServerError(null);

    const payload: CreateClientInput = {
      tipoDocumento: values.tipoDocumento,
      numeroDocumento: values.numeroDocumento.trim(),
      razonSocial: values.razonSocial.trim(),
      telefonoPrincipal: cleanOptionalText(values.telefonoPrincipal),
      emailPrincipal: cleanOptionalText(values.emailPrincipal),
      direccion: cleanOptionalText(values.direccion),
      estadoCliente: values.estadoCliente,
    };

    const url = isEditMode
      ? `/api/clients/${props.initialData.idCliente}`
      : "/api/clients";

    const method = isEditMode ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setServerError(
          result?.message ??
            "Ocurrió un error al guardar la información del cliente."
        );
        return;
      }

      const clientId =
        result?.data?.idCliente ?? props.initialData?.idCliente ?? null;

      if (clientId) {
        router.push(`/clients/${clientId}`);
      } else {
        router.push("/clients");
      }

      router.refresh();
    } catch (error) {
      setServerError("No se pudo conectar con el servidor.");
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>
          {isEditMode ? "Editar cliente" : "Crear cliente"}
        </CardTitle>

        <CardDescription>
          {isEditMode
            ? "Actualiza la información general del cliente."
            : "Registra un nuevo cliente para asociarle proyectos e hitos de cobro."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {serverError ? (
          <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {serverError}
          </div>
        ) : null}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="tipoDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de documento</FormLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de documento" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {DOCUMENT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numeroDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de documento</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Ej. 20601234567"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="razonSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razón social / nombre del cliente</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Ej. Constructora San Miguel S.A.C."
                      autoComplete="organization"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="telefonoPrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono principal</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Ej. 987654321"
                        autoComplete="tel"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailPrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email principal</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="cliente@empresa.com"
                        autoComplete="email"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Dirección fiscal o comercial del cliente"
                      className="resize-none"
                      rows={3}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estadoCliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado del cliente</FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el estado" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {CLIENT_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-3 border-t pt-6">
              <Button type="button" variant="outline" asChild>
                <Link
                  href={
                    isEditMode
                      ? `/clients/${props.initialData.idCliente}`
                      : "/clients"
                  }
                >
                  Cancelar
                </Link>
              </Button>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Guardando..."
                  : isEditMode
                    ? "Guardar cambios"
                    : "Crear cliente"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}