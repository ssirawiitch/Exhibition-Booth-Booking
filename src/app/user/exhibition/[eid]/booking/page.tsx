import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import BookingForm from "@/component/Bookingform";
import getExhibitionById from "@/libs/getExhibitionbyID";
import { getServerSession } from "next-auth";

type Props = {
  params: Promise<{ eid: string }>;
};

export default async function BookingPage({ params }: Props) {
  const resolvedParams = await params;
  const eid = resolvedParams.eid;
  const session = await getServerSession(authOptions);
  const exhibition = await getExhibitionById(eid);

  if (!exhibition || !exhibition.data) {
    return (
      <div className="text-center p-10 text-red-500 text-xl">
        Exhibition not found
      </div>
    );
  }

  return (
    <div className="text-center p-5">
      <BookingForm
        session={session}
        exhibitionId={exhibition.data.id}
        eventName={exhibition.data.name}
        eventStartDate={exhibition.data.startDate}
        eventDurationDays={exhibition.data.durationDay}
        availableSmall={exhibition.data.smallBoothQuota}
        availableBig={exhibition.data.bigBoothQuota}
      />
    </div>
  );
}
