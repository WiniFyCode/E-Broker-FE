import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import UserDropdown from "@/components/shadcn-space/blocks/dashboard-shell/user-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import NotificationDropdown from "@/components/shadcn-space/blocks/dashboard-shell/notification-dropdown";
import { BellRing } from "lucide-react";

export function SiteHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <NotificationDropdown
          defaultOpen={false}
          align="center"
          trigger={
            <div className="rounded-full p-2 hover:bg-accent relative before:absolute before:bottom-0 before:left-1/2 before:z-10 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:top-1 cursor-pointer">
              <BellRing className="size-4" />
            </div>
          }
        />
        <UserDropdown
          defaultOpen={false}
          align="center"
          trigger={
            <div className="rounded-full">
              <Avatar className="size-8 cursor-pointer">
                <AvatarImage
                  src="https://images.shadcnspace.com/assets/profiles/user-11.jpg"
                  alt="David McMichael"
                />
                <AvatarFallback>DM</AvatarFallback>
              </Avatar>
            </div>
          }
        />
      </div>
    </div>
  );
}
