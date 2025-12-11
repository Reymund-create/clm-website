import { getMeetTheTeamData } from "@/lib/api";
import MeetTheTeamRenderer from "../../components/Renderer/MeetTheTeamBlockRenderer";
import { notFound } from "next/navigation";

export const metadata = {
  title: 'Meet The Team | Confluence Local Marketing',
  description: 'Meet our expert team dedicated to enhancing your local SEO. Contact us to boost your business visibility today!',
};

export default async function MeetTheTeamPage() {
  const data = await getMeetTheTeamData();

  if (!data) {
    return notFound();
  }

  return (
    <main>
      <MeetTheTeamRenderer blocks={data.data.meetTheTeam} />
    </main>
  );
}