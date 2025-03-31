import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { PageLayout } from "~/sharedComponents/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Booktracker" },
    { name: "description", content: "Welcome!" },
  ];
}

export default function Home() {
  return  <PageLayout Content={Welcome}/>;
}
