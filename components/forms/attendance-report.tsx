"use client";

import { ReportSchema } from "@/schemas/report";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { LuCalendar } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { es } from "date-fns/locale";
import PulseLoader from "react-spinners/PulseLoader";

type ReportValues = z.infer<typeof ReportSchema>;

type PropTypes = {
  isPending?: boolean;
  onSubmit: (values: ReportValues) => void;
};

const START_DATE = "1900-01-01";
const DATE_FORMAT = "yyyy-MM-dd";
const CURRENT_DATE = new Date();
const YESTERDAY_DATE = new Date(new Date(CURRENT_DATE).setDate(CURRENT_DATE.getDate() - 1));

const defaultValues = {
  startDate: YESTERDAY_DATE,
  endDate: CURRENT_DATE,
};

export default function AttendanceReportForm({ isPending = false, onSubmit }: PropTypes) {
  const form = useForm({
    resolver: zodResolver(ReportSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md w-full">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Fecha inicio</FormLabel>
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
                          <span>{format(field.value, DATE_FORMAT)}</span>
                        ) : (
                          <span> {format(new Date(), DATE_FORMAT)} </span>
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
                      disabled={(date) => date > new Date() || date < new Date(START_DATE)}
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
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
                          <span>{format(field.value, DATE_FORMAT)}</span>
                        ) : (
                          <span> {format(new Date(), DATE_FORMAT)} </span>
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
                      disabled={(date) => date > new Date() || date < new Date(START_DATE)}
                      locale={es}
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
