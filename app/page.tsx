import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllLessons } from "@/lib/supabase/lesson";
import Link from "next/link";

export default async function Home() {
  try {
    const lessons = await getAllLessons();
    return (
      <main className="w-full max-w-3xl mx-auto my-16 px-2">
        <ul className="flex flex-col gap-4">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link href={`/${lesson.id}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{lesson.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{lesson.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    console.log("supabase error:", error);
    return <div>データの取得に失敗しました</div>;
  }
}
