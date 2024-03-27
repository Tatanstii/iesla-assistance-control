"use client";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GroupSchema } from "@/schemas/group";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import { z } from "zod";
import { newGroup, updateGroup } from "@/actions/group";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  initData?: z.infer<typeof GroupSchema>;
};

const REDIRECT_BASE_PATH_WHEN_SUCCESS = "/admin/groups";

export default function GroupForm({ initData }: Props) {
  const defaultValues = initData
    ? {
        ...initData,
      }
    : {
        name: "",
        description: "",
      };

  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const action = initData ? "Editar" : "Registrar";

  const form = useForm({
    resolver: zodResolver(GroupSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof GroupSchema>) => {
    setIsPending(true);
    setError("");
    setSuccess("");
    try {
      if (!initData) {
        await newGroup(values)
          .then((response) => {
            startTransition(() => {
              if (response.error) {
                setError(response.error);
                toast.error(response.error);
                return;
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
      if (initData && initData.id) {
        if (initData && initData.id) {
          await updateGroup(initData.id, values)
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
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row justify-center">
        <Form {...form}>
          <form className="space-y-4 w-full max-w-lg" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre*</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="7-A" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descripción del grupo"
                        className="max-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
