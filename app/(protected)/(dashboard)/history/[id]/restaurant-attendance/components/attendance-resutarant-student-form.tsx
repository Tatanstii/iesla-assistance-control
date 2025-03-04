"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { LuCalendar, LuX } from "react-icons/lu";
import { FilterAttendance } from "@/schemas/attendance";

export default function AttendanceResutarantStudentForm() {
  const defaultValues: z.infer<typeof FilterAttendance> = {
    date: undefined,
  };

  const params = useParams();
  const router = useRouter();

  const studentId = params.id;

  const form = useForm({
    resolver: zodResolver(FilterAttendance),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof FilterAttendance>) => {
    if (values.date) {
      router.push(`/history/${studentId}/restaurant-attendance?date=${values.date}`);
    }
  };

  const clearFieldDate = () => {
    form.setValue("date", undefined);
    router.push(`/history/${studentId}/restaurant-attendance`);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form className="space-y-4 md:max-w-lg" onClick={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 items-end">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormDescription>Seleccione la fecha para filtrar</FormDescription>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button className="w-full">
                        <LuCalendar className="mr-2 " size={18} />
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Seleccionar fecha"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={clearFieldDate}>
            <LuX size={18} />
          </Button>
        </div>
      </form>
    </Form>
  );
}
