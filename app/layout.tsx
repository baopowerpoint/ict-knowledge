import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DrawerProvider } from "@/contexts/DrawContext";
import { ConceptDrawer } from "@/components/shared/lesson/ConceptDrawer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ICT Knowledge",
  description: "Smart Money Concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        jetbrainsMono.variable,
        "font-mono dark",
      )}
    >
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <DrawerProvider>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <main className="min-h-screen bg-ict-bg">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
          <ConceptDrawer />
        </DrawerProvider>
      </body>
    </html>
  );
}
