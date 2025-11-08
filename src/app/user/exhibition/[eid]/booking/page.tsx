import BookingForm from "@/component/Bookingform";
import getExhibitionById from "@/libs/getExhibitionbyID";
export default async function BookingPage({
  params,
}: {
  params: { eid: string };
}) {
  const exhibition = await getExhibitionById(params.eid);

  if (!exhibition) {
    return <div>Exhibition not found</div>;
  }

  return (
    <div className="text-center p-5">
      <BookingForm
        exhibitionId={exhibition.data.id}
        eventName={exhibition.data.name}
        eventStartDate={exhibition.data.startDate}
        eventEndDate={exhibition.data.endDate}
        availableSmall={exhibition.data.smallBoothQuota}
        availableBig={exhibition.data.bigBoothQuota}
      />
    </div>
  );
}
