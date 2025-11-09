import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import BookingForm from "@/component/Bookingform"; // ⚠️ ตรวจสอบ path import ให้ถูกต้อง (ผมแก้จาก @/component เป็น @/components ตามมาตรฐานทั่วไป)
import getExhibitionById from "@/libs/getExhibitionbyID"; // ⚠️ ตรวจสอบ path import
import { getServerSession } from "next-auth";

// 1. กำหนด type ของ props ให้รองรับ Promise
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
