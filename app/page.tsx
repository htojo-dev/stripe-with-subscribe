import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";



export default async function Home() {
  const supabase = await createClient();
  const { data: lessons, error } = await supabase.from("lesson").select("*");

  if (error) {
    console.error("Supabase Error:", error.message);
    return <div>データの取得に失敗しました</div>;
  }

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
}
