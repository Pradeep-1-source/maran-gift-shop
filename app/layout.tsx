import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maran Gift Shop | Perfect Gifts for Every Occasion",
  description: "Browse premium, elegant, and customized gifts for birthdays, anniversaries, weddings, and more. Local trusted gift store in Tamil Nadu.",
  keywords: ["gift shop", "tamil nadu", "premium gifts", "customized gifts", "birthday gifts", "wedding gifts"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

