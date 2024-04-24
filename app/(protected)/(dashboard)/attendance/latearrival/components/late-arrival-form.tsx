"use client";

import { newLateArrivalAttendance } from "@/actions/late-arrivals";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { LateArrivalSchema } from "@/schemas/attendance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import BarcodeInput from "@/components/inputs/barcode";

export default function LateArrivalForm() {
  const [isPending, setIsPending] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof LateArrivalSchema>>({
    resolver: zodResolver(LateArrivalSchema),
  });

  const watchIdentificationNumber = form.watch("identificationNumber");

  const onSubmit = async (values: z.infer<typeof LateArrivalSchema>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setIsPending(true);
    try {
      await newLateArrivalAttendance(values).then((response) => {
        if (response.success) {
          toast.success(response.success);
        }
        if (response.error) {
          toast.error(response.error);
        }
        form.reset({
          identificationNumber: NaN,
        });
        router.refresh();
      });
    } catch (error) {
      toast.error("Error al registrar la asistencia");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const validateFields = LateArrivalSchema.safeParse(form.getValues());
    if (!validateFields.success) {
      return;
    }

    if (timeout.current) {
      timeout.current = null;
    }

    if (validateFields.success) {
      const newTimeout = setTimeout(() => {
        const identificationNumberValue = Number(form.getValues().identificationNumber);
        if (identificationNumberValue) {
          onSubmit({ identificationNumber: identificationNumberValue });
        }
      }, 1000);
      timeout.current = newTimeout;
      return () => clearTimeout(newTimeout);
    }

    /* eslint-disable-next-line */
  }, [watchIdentificationNumber]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl">
        <div className="flex flex-row justify-center items-center gap-3 w-full">
          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem className="w-full my-10">
                <FormControl>
                  <BarcodeInput {...field} isPending={isPending} />
                </FormControl>
                <FormDescription>
                  Ingresa el numero de identificación del estudiante o escanea el código de barras
                  del estudiante para registrar la llegada tarde
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
