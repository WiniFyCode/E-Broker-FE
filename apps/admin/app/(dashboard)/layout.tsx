import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";
import { SiteHeader } from "@/components/layout/site-header";
import { DynamicBreadcrumb } from "@/components/layout/dynamic-breadcrumb";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header cố định trên đầu với Breadcrumb và SiteHeader */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* Breadcrumb động dựa trên route */}
          <DynamicBreadcrumb />
          <div className="ml-auto">
            <SiteHeader />
          </div>
        </header>
        {/* Nội dung chính */}
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
