import { PageLayout } from "~/sharedComponents/PageLayout";
import { BooksContent } from "~/books/BooksContent";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
      { title: "Booktracker" },
      { name: "description", content: "Welcome!" },
    ];
  }

export default function Books() {
  return  <PageLayout Content={BooksContent}/>;
}