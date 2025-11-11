import getExhibition from "@/libs/getExhibition";
import Image from "next/image";
import Link from "next/link";
import Header from "@/component/Header";

export default async function ExhibitionDetailPage({
  params,
}: {
  params: { eid: string };
}) {
  const exhibitionRequest = await getExhibition(params.eid);
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
      <div className="container mx-auto py-45 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 lg:w-2/5 relative min-h-[300px] md:min-h-[500px]">
              <Image
                src={exhibition.posterPicture}
                alt={exhibition.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
            </div>

            <div className="p-8 md:p-12 md:w-1/2 lg:w-3/5 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {exhibition.name}
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-8 text-gray-700">
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
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

              <div className="mt-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/user/exhibition"
                    className="flex-1 order-2 sm:order-1"
                  >
                    <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 transition duration-300 ease-in-out flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                      Back
                    </button>
                  </Link>
                  <Link
                    href={`/user/exhibition/${params.eid}/booking`}
                    className="flex-2 order-1 sm:order-2"
                  >
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-4 px-6 rounded-xl transition duration-300 ease-in-out flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.926 1.661L2.937 12.75h18.126l-.65-4.339c-.162-.937-.966-1.661-1.926-1.661H16.5V6A4.5 4.5 0 107.5 6zM14 6v.75H10V6a2 2 0 114 0zM2.938 17.25h18.125l-.65 4.338c-.162.937-.966 1.662-1.926 1.662H5.513c-.96 0-1.764-.725-1.926-1.662l-.65-4.338z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Make Reservation
                    </button>
                  </Link>
                </div>
                <p className="text-center text-gray-500 text-sm mt-4">
                  Book your space now before booths run out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
