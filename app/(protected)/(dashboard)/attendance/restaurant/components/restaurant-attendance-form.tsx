"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RestaurantAttendanceSchema } from "@/schemas/attendance";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import { z } from "zod";
import { newRestaurantAttendance } from "@/actions/restaurant-attendance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RestaurantAttendanceForm() {
  const [isPending, setIsPending] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RestaurantAttendanceSchema),
  });

  const watchIdentificationNumber = form.watch("identificationNumber");

  const onSubmit = async (values: z.infer<typeof RestaurantAttendanceSchema>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setIsPending(true);
    try {
      await newRestaurantAttendance(values).then((response) => {
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
    const validateFields = RestaurantAttendanceSchema.safeParse(form.getValues());
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
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center items-center gap-3 w-full">
          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem className="w-full my-16">
                <FormControl>
                  <Input {...field} type="number" placeholder="Número de identificación" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <PulseLoader size={10} color="#fff" /> : "Registrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
