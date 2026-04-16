import StatisticsBlock from "@/components/shadcn-space/blocks/dashboard-shell/statistics";
import SalesOverviewChart from "@/components/shadcn-space/blocks/dashboard-shell/sales-overview-chart";
import EarningReportChart from "@/components/shadcn-space/blocks/dashboard-shell/earning-report-chart";
import TopProductTable from "@/components/shadcn-space/blocks/dashboard-shell/top-product-table";
import SalesByCountryWidget from "@/components/shadcn-space/blocks/dashboard-shell/salesbycountrywidget";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        <div className="col-span-12">
          <StatisticsBlock />
        </div>
        <div className="xl:col-span-8 col-span-12">
          <SalesOverviewChart />
        </div>
        <div className="xl:col-span-4 col-span-12">
          <EarningReportChart />
        </div>
        <div className="xl:col-span-8 col-span-12">
          <TopProductTable />
        </div>
        <div className="xl:col-span-4 col-span-12">
          <SalesByCountryWidget />
        </div>
      </div>
    </div>
  );
}
