"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export type NavItem = {
  title?: string
  label?: string
  url?: string
  href?: string
  icon?: React.ReactNode
  isActive?: boolean
  isSection?: boolean
  items?: NavItem[]
}

// Component riêng cho submenu item để có thể dùng hooks
function SubMenuItem({ item }: { item: NavItem }) {
  const hasChildren = !!item.items?.length
  const itemUrl = item.url || item.href
  const [isOpen, setIsOpen] = React.useState(item.isActive || false)

  // Sync với isActive prop khi search
  React.useEffect(() => {
    if (item.isActive !== undefined) {
      setIsOpen(item.isActive)
    }
  }, [item.isActive])

  if (hasChildren && item.title) {
    return (
      <SidebarMenuSubItem>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton>
              {item.icon}
              <span>{item.title}</span>
              <ChevronRightIcon
                className="ml-auto transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items!.map((subItem, index) => (
                <SubMenuItem key={subItem.title || index} item={subItem} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
    )
  }

  if (item.title) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <a href={itemUrl}>
            <span>{item.title}</span>
          </a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  return null
}

export function NavMain({
  items,
  label,
}: {
  items: NavItem[]
  label?: string
}) {
  // Recursive render function for main items
  const renderItem = (item: NavItem) => {
    // Section label
    if (item.isSection && item.label) {
      return (
        <SidebarGroup key={item.label} className="p-0 pt-5 first:pt-0">
          <SidebarGroupLabel className="p-0 text-xs font-medium uppercase text-sidebar-foreground">
            {item.label}
          </SidebarGroupLabel>
        </SidebarGroup>
      )
    }

    const hasChildren = !!item.items?.length
    const itemUrl = item.url || item.href

    // Item with children → collapsible
    if (hasChildren && item.title) {
      return (
        <SidebarMenuItem key={item.title}>
          <Collapsible
            open={item.isActive}
            className="group/collapsible"
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items!.map((subItem, index) => (
                  <SubMenuItem key={subItem.title || index} item={subItem} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      )
    }

    // Item without children
    if (item.title) {
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            tooltip={item.title}
            className={cn(
              item.isActive
                ? "bg-primary hover:bg-primary dark:bg-blue-500 text-white dark:hover:bg-blue-500 hover:text-white"
                : ""
            )}
          >
            {item.icon}
            <a href={itemUrl} className="w-full">
              {item.title}
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    }

    return null
  }

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map(renderItem)}
      </SidebarMenu>
    </SidebarGroup>
  )
}
