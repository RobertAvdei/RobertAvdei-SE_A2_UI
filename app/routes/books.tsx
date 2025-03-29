import { PageLayout } from "~/sharedComponents/PageLayout";
import { BooksContent } from "~/books/booksContent";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
      { title: "Book managing App" },
      { name: "description", content: "Welcome!" },
    ];
  }

export default function Books() {
  return  <PageLayout Content={BooksContent}/>;
}