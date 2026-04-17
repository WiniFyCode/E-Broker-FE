"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb";

// Map routes sang breadcrumb labels
const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/instructors": "Instructors",
  "/students": "Students",
  "/courses": "Courses",
  "/categories": "Categories",
  "/lessons": "Lessons",
  "/games": "Games",
  "/reports": "Reports",
  "/settings": "Settings",
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Tách path thành segments
  const segments = pathname.split("/").filter(Boolean);

  // Nếu là trang chủ hoặc login/register, không hiển thị breadcrumb
  if (segments.length === 0 || (segments[0] && ["login", "register", "forgot-password"].includes(segments[0]))) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const label = routeLabels[path] || (segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : "");
          const isLast = index === segments.length - 1;

          return (
            <div key={path} className="flex items-center">
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
