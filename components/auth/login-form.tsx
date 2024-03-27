"use client";

import { LoginSchema } from "@/schemas/login";
import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuLogIn } from "react-icons/lu";
import { login } from "@/actions/login";
import PulseLoader from "react-spinners/PulseLoader";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);
    startTransition(() => {
      login(values)
        .then((response) => {
          if (response.error) {
            form.reset();
            setError(response.error);
          }
          if (response.success) {
            form.reset();
            setSuccess(response.success);
          }
        })
        .finally(() => {
          setIsPending(false);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="flex flex-row justify-end">
          <Button
            type="submit"
            className="w-full flex flex-row gap-1 items-center"
            disabled={isPending}
          >
            {isPending ? (
              <PulseLoader size={10} color="#fff" />
            ) : (
              <>
                <LuLogIn size={18} />
                <span>Ingresar</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
