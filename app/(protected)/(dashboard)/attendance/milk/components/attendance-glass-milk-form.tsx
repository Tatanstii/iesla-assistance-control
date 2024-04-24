"use client";

import { newMilkGlassAssistance } from "@/actions/milk-glass-assistance";
import BarcodeInput from "@/components/inputs/barcode";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { MilkGlassAttendanceSchema } from "@/schemas/attendance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Values = z.infer<typeof MilkGlassAttendanceSchema>;

export default function AttendanceGlassMilkForm() {
  const [isPending, setIsPending] = useState(false);

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(MilkGlassAttendanceSchema),
  });

  const watchIdentificationNumber = form.watch("identificationNumber");

  const onSubmit = async (values: Values) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setIsPending(true);
    try {
      const response = await newMilkGlassAssistance(values);
      if (response.error) {
        toast.error(response.error);
      }
      if (response.success) {
        toast.success("Asistencia registrada correctamente");
      }
      form.reset({
        identificationNumber: NaN,
      });
      router.refresh();
    } catch (error) {
      toast.error("Ocurrió un error al registrar la asistencia al vaso de leche");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const validateFields = MilkGlassAttendanceSchema.safeParse(form.getValues());
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        <div className="flex flex-row justify-center items-center gap-3 w-full">
          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem className="w-full my-10">
                <FormControl>
                  <BarcodeInput {...field} disabled={isPending} />
                </FormControl>
                <FormDescription>
                  Ingresa el numero de identificación del estudiante o escanea el código de barras
                  del estudiante para registrar la asistencia al vaso de leche
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
