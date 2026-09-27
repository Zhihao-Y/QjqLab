import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "运动营养与健康实验室",
  description: "Sports Nutrition & Health Laboratory, Beijing Sport University. Research, people and publications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
