import Icons from "@/components/global/icons";
import { SidebarConfig } from "@/components/global/app-sidebar";

const sidebarConfig: SidebarConfig = {
  brand: {
    title: "AI SDK Template",
    icon: Icons.bot,
    href: "/"
  },
  sections: [
    {
      label: "Features",
      items: [
        {
          title: "Chat",
          href: "/chat",
          icon: Icons.messageCircle
        },
        {
          title: "Voice Assistant",
          href: "/dashboard",
          icon: Icons.mic
        },
      ]
    },
  ]
}

export default sidebarConfig