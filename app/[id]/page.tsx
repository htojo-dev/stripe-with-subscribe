import { getSingleLesson } from "@/lib/supabase/lesson";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const idNum = parseInt(id, 10);
  const lesson = await getSingleLesson(idNum);

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-8">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p className="mb-8">{lesson.description}</p>
    </div>
  );
};

export default page;