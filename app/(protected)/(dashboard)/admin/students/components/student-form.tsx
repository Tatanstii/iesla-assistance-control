"use client";

import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Group, IdentificationType } from "@prisma/client";
import { StudentSchema } from "@/schemas/student";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PulseLoader from "react-spinners/PulseLoader";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { newStudent, updateStudent } from "@/actions/student";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormHead from "@/components/form-head";
import { StudentWithGroup } from "@/types/group";
import { transformNullToUndefined } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

type Props = {
  initData?: StudentWithGroup;
  groups: Group[];
};

const REDIRECT_BASE_PATH_WHEN_SUCCESS = "/admin/students";

export default function StudentForm({ initData, groups }: Props) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const title = initData ? "Editar estudiante" : "Registrar estudiante";
  const action = initData ? "Editar" : "Registrar";

  const defaultValues: z.infer<typeof StudentSchema> = initData
    ? {
        ...transformNullToUndefined(initData),
        groupId: initData.groupId,
      }
    : {
        firstName: "",
        lastName: "",
        identificationType: IdentificationType.TARJETA_IDENTIDAD,
        identificationNumber: undefined,
      };

  const form = useForm({
    resolver: zodResolver(StudentSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof StudentSchema>) => {
    setIsPending(true);
    setError("");
    setSuccess("");

    try {
      if (!initData) {
        await newStudent(values)
          .then((response) => {
            if (response.error) {
              setError(response.error);
              toast.error(response.error);
            }
            if (response.success) {
              setSuccess(response.success);
              toast.success(response.success);
              router.push(REDIRECT_BASE_PATH_WHEN_SUCCESS);
              router.refresh();
            }
          })
          .finally(() => {
            setIsPending(false);
          });
      }
      if (initData && initData.id) {
        await updateStudent(initData.id, values)
          .then((response) => {
            startTransition(() => {
              if (response.error) {
                setError(response.error);
                toast.error(response.error);
              }
              if (response.success) {
                setSuccess(response.success);
                toast.success(response.success);
                router.push(REDIRECT_BASE_PATH_WHEN_SUCCESS);
                router.refresh();
              }
            });
          })
          .finally(() => {
            setIsPending(false);
          });
      }
    } catch (error) {
      setError("Ocurrió un error al procesar la solicitud. Intente nuevamente.");
      setIsPending(false);
      throw error;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg">
            <FormHead title={title} />
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Nombres*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Jhon Doe" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Apellidos*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Velez" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="identificationType"
                    render={({ field }) => (
                      <FormItem className="md:w-[200px]">
                        <FormLabel>Tipo de identificación</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el tipo de identificación" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value={IdentificationType.CEDULA}>
                                Cédula de ciudadanía
                              </SelectItem>
                              <SelectItem value={IdentificationType.TARJETA_IDENTIDAD}>
                                Tarjeta de identidad
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="identificationNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Numero de identificación*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="123456"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="groupId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grupo</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un grupo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {groups.map(({ id, name }) => (
                            <SelectItem key={id} value={`${id}`}>
                              {name}
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
                  name="restaurantMember"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Miembro de restaurante</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          placeholder="1234567890"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormSuccess message={success} />
              <FormError message={error} />
            </div>
            <div className="flex flex-row justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? <PulseLoader size={10} color="#fff" /> : action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
