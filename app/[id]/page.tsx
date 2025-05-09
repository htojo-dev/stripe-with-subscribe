import { getSingleLesson } from "@/lib/supabase/lesson";
import { getPremiumContent } from "@/lib/supabase/premium_content";
import { extractYouTubeVideoId } from "@/utils/extractYoutubeVideoId";
import { YouTubeEmbed } from "@next/third-parties/google";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const idNum = parseInt(id, 10);
  const [lesson, video] = await Promise.all([
    await getSingleLesson(idNum),
    await getPremiumContent(idNum)
  ])

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
        <p>No video available</p>
      )}
    </div>
  );
};

export default page;
