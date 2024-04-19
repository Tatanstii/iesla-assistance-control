import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LateArrivalReportForm from "./components/late-arrivals-report-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tabs = [
  {
    label: "Llegadas tardes",
    value: "late-arrivals",
    component: LateArrivalReportForm,
  },
  {
    label: "Asistencias al restaurante",
    value: "restaurant-attendance",

    component: LateArrivalReportForm,
  },
  {
    label: "Asistencias a vaso de leche",
    value: "milk-glass-attendance",

    component: LateArrivalReportForm,
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
              <CardTitle>Generar reporte - {tab.label}</CardTitle>
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
