"use client"

import * as React from "react"
import {
  // AudioWaveform,
  Bot,
  CalendarCheck2,
  // Command,
  // GalleryVerticalEnd,
  Home,
  
  PieChartIcon,
  
  SquareTerminal,
  Table2,
} from "lucide-react"

// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
// import { TeamSwitcher } from "./team-switcher"
import { NavProjects } from "./nav-projects"
// import Image from "next/image"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
   
  ],
  navMain: [
    {
      title: "Categories",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: []
    },
    {
      title: "Budget",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Current",
          url: "#",
        },
        {
          title: "Expected",
          url: "#",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Transactions",
      url: "/transactions",
      icon: Table2 ,
    },
    {
      name: "Categories",
      url: "/categories",
      icon: PieChartIcon,
    },
    {
      name: "Budget",
      url: "/budget",
      icon: CalendarCheck2,
    },
  
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar 
      className="!bg-black !text-white" // Forces black background & white text
      collapsible="icon" 
      {...props}
    >
      <SidebarHeader className="!bg-black border-b border-gray-700">
        <div className="w-10 h-10 overflow-hidden ">
          <img
            className="object-contain size-8"
            src="https://png.pngtree.com/png-vector/20231002/ourmid/pngtree-flat-design-purple-wallet-and-money-vector-png-image_10190106.png"
            alt="Money Bag"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="!bg-black !text-white">
        <NavProjects projects={data.projects} />
      </SidebarContent>
      {/* <SidebarRail className="!bg-gradient-to-br from-purple-600 to-purple-900 border-t border-gray-700" /> */}
    </Sidebar>
  );
}

