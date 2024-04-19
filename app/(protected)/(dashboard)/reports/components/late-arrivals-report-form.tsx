"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ReportSchema } from "@/schemas/report";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuCalendar } from "react-icons/lu";
import PulseLoader from "react-spinners/PulseLoader";
import { z } from "zod";

const FORMAT = "yyyy-MM-dd";

const currentDate = new Date();

// prettier-ignore
const afterDate = new Date(new Date(currentDate).setDate(currentDate.getDate() - 1));

export default function LateArrivalReportForm() {
  const defaultValues = {
    startDate: afterDate,
    endDate: currentDate,
  };

  const [isPending, setPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(ReportSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof ReportSchema>) => {
    setPending(true);
    try {
      const response = await fetch(
        `/api/reports/late-arrivals?&startDate=${values.startDate}&endDate${values.endDate}`,
        {
          method: "GET",
        }
      );

      if (!response.body) {
        return toast.success("No hay datos para mostrar en el reporte");
      }

      if (response.ok) {
        toast.success("Reporte generado correctamente");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${format(new Date(), "yyyy-MM-dd")}-llegadas-tarde.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Error al generar el reporte");
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md w-full">
        <div className="space-y-4 flex flex-col items-end">
          <FormField
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="block">Fecha de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isPending}
                      >
                        {field.value ? (
                          <span>{format(field.value, FORMAT)}</span>
                        ) : (
                          <span> {format(new Date(), FORMAT)} </span>
                        )}
                        <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="endDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="block">Fecha fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isPending}
                      >
                        {field.value ? (
                          <span>{format(field.value, FORMAT)}</span>
                        ) : (
                          <span> {new Date().toLocaleDateString("es-ES")} </span>
                        )}
                        <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <PulseLoader size={10} color="#fff" /> : "Generar reporte"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
