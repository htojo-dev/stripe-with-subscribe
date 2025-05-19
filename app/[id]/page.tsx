import { getSingleLesson } from "@/lib/supabase/lesson";
import { getPremiumContent } from "@/lib/supabase/premium_content";
import { extractYouTubeVideoId } from "@/utils/extractYoutubeVideoId";
import { YouTubeEmbed } from "@next/third-parties/google";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: {id: string} }) => {
  // const { id } = await params;
  const idNum = parseInt(params.id, 10);

  if(isNaN(idNum)) {
    notFound();
  }

  const [lesson, video] = await Promise.all([
    await getSingleLesson(idNum),
    await getPremiumContent(idNum),
  ]);

  const videoId = video?.video_url
    ? extractYouTubeVideoId(video.video_url)
    : null;

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-8">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p className="mb-8">{lesson.description}</p>
      {videoId ? (
        <YouTubeEmbed height={400} videoid={videoId} />
      ) : (
        <p>このコンテンツはサブスク契約者のみ閲覧できます。</p>
      )}
    </div>
  );
};

export default page;
