import "./globals.css";
import { DM_Sans } from "next/font/google";
const font = DM_Sans({ subsets: ["latin"] });
export const metadata = { title: "SpendWise – Personal expense tracker", description: "Track every rupee, stay inside your budget." };
export default function RootLayout({ children }) {
  return (<html lang="en"><body className={font.className}>{children}</body></html>);
}