import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LateArrivalsForm from "./components/late-arrivals-form";
import { HeaderTitle } from "@/components/header-options";
import RestaurantAttendanceForm from "./components/restaurant-attendance-form";
import MilkGlassAttendanceForm from "./components/milk-glass-attendance-form";

const tabs = [
  {
    label: "Llegadas tardes",
    value: "late-arrivals",
    component: LateArrivalsForm,
  },
  {
    label: "Asistencias al restaurante",
    value: "restaurant-attendance",

    component: RestaurantAttendanceForm,
  },
  {
    label: "Asistencias al vaso de leche",
    value: "milk-glass-attendance",

    component: MilkGlassAttendanceForm,
  },
];

export default function ReportsPage() {
  return (
    <Tabs defaultValue={tabs[0].value}>
      <TabsList className="grid w-full grid-cols-3">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <Card>
            <CardHeader>
              <small>Generar reporte</small>
              <HeaderTitle>{tab.label}</HeaderTitle>
            </CardHeader>
            <CardContent>
              <div className="grid place-items-center px-20 py-10">{<tab.component />}</div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
