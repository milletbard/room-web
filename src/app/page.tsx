import { redirect } from "next/navigation";

export default function Home() {
  redirect("/search/taipei-city");

  return <main />;
}
