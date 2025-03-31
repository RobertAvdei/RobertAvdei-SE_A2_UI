import { UsersContent } from "~/users/UsersContent";
import { PageLayout } from "~/sharedComponents/PageLayout";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Booktracker" },
    { name: "description", content: "Welcome!" },
  ];
}

export default function Users() {
  return  <PageLayout Content={UsersContent}/>;
}
