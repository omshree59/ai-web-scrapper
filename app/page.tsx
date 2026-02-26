// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the new login page instead of the dashboard
  redirect("/login");
}