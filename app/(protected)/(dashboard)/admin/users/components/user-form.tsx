"use client";

import { RegisterSchema } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { register } from "@/actions/register";
import PulseLoader from "react-spinners/PulseLoader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, UserRole } from "@prisma/client";
import FormHead from "@/components/form-head";
import { updateUser } from "@/actions/user";
import { transformNullToUndefined } from "@/lib/utils";

type Props = {
  initialData?: User;
};

export default function UserForm({ initialData }: Props) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const title = initialData ? "Editar usuario" : "Registrar usuario";
  const action = initialData ? "Actualizar" : "Registrar";

  const defaultValues = initialData
    ? { ...transformNullToUndefined(initialData), password: "", confirmPassword: "" }
    : {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: UserRole.USER,
      };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setIsPending(true);
    setError("");
    setSuccess("");
    try {
      if (!initialData) {
        register(values)
          .then((response) => {
            startTransition(() => {
              if (response.error) {
                setError(response.error);
                toast.error(response.error || "Error al registrar usuario");
                return;
              }
              if (response.success) {
                setSuccess(response.success);
                toast.success(response.success || "Usuario registrado correctamente");
              }
              router.push("/admin/users");
              router.refresh();
            });
          })
          .finally(() => {
            setIsPending(false);
          });
      }
      if (initialData && initialData.id) {
        updateUser(initialData.id, values)
          .then((response) => {
            startTransition(() => {
              if (response.error) {
                setError(response.error);
                toast.error(response.error || "Error al actualizar usuario");
                return;
              }
              if (response.success) {
                setSuccess(response.success);
                toast.success(response.success || "Usuario actualizado correctamente");
              }
              router.push("/admin/users");
              router.refresh();
            });
          })
          .finally(() => {
            setIsPending(false);
          });
      }
    } catch (error) {
      setError("Error al procesar la solicitud");
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-lg">
            <FormHead title={title} />
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Jhon Doe" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electronico</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="jhon.doe@domain.com"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">Usuario</SelectItem>
                        <SelectItem value="ADMIN">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="w-full flex justify-end">
              <Button type="submit" className="w-fit" disabled={isPending}>
                {isPending ? <PulseLoader size={10} color="#fff" /> : action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
