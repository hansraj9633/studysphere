import StatCards from "@/components/admin/StatCards";
import UploadSection from "@/components/admin/UploadSection";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import MaterialsTable from "@/components/admin/MaterialsTable";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-sm text-zinc-400">Welcome back, Admin. Here is what is happening today.</p>
        </div>
      </div>
      
      <StatCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 min-h-[450px]">
          <AnalyticsCharts />
        </div>
        <div className="xl:col-span-1 min-h-[450px]">
          <UploadSection />
        </div>
      </div>

      <MaterialsTable />
    </div>
  );
}
