import getExhibition from "@/libs/getExhibition";
import Image from "next/image";
import Header from "@/component/Header";
import BookingForm from "@/component/Bookingform";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function ExhibitionDetailPage({
  params,
}: {
  params: Promise<{ eid: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { eid } = await params; 
  const exhibitionRequest = await getExhibition(eid);
  const exhibition = exhibitionRequest.data;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const startDate = new Date(exhibition.startDate);
  const formattedDate = startDate.toLocaleDateString("en-US", options);

  return (
    <main>
      <Header />
      <div className="flex justify-center items-center">
        <div className="mt-25 mb-5  min-h-screen ">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="w-full flex flex-row justify-between">
              <div className=" w-[800px] relative min-h-[500px]">
                <Image
                  src={exhibition.posterPicture}
                  alt={exhibition.name}
                  fill
                  className="object-cover object-center rounded-l-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>

              <div className="p-12 w-[680px] flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {exhibition.name}
                  </h1>

                  <div className="flex flex-row gap-4 mb-8 text-gray-700">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-red-600 hover:text-red-700 shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">{exhibition.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-red-600 hover:text-red-700 shrink-0"
                      >
                        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5 .75.75 0 000 1.5z" />
                        <path
                          fillRule="evenodd"
                          d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      About this exhibition
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {exhibition.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-indigo-50 p-4 rounded-xl text-center">
                      <div className="text-indigo-600 font-bold text-2xl">
                        {exhibition.durationDay}
                      </div>
                      <div className="text-gray-600 text-sm">Days Duration</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <div className="text-green-600 font-bold text-2xl">
                        {exhibition.smallBoothQuota}
                      </div>
                      <div className="text-gray-600 text-sm">Small Booths</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <div className="text-blue-600 font-bold text-2xl">
                        {exhibition.bigBoothQuota}
                      </div>
                      <div className="text-gray-600 text-sm">Big Booths</div>
                    </div>
                  </div>
                </div>
                <BookingForm
                  session={session}
                  exhibitionId={exhibition.id}
                  availableSmall={exhibition.smallBoothQuota}
                  availableBig={exhibition.bigBoothQuota}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
