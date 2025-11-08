import getExhibition from "@/libs/getExhibition";
import Image from "next/image";
import Link from "next/link";

export default async function ExhibitionDetailPage({
  params,
}: {
  params: { eid: string };
}) {
  const exhibitDetail = await getExhibition(params.eid);

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium">{exhibitDetail.data.model}</h1>
      <div className="flex flex-row my-5">
        <Image
          src={exhibitDetail.data.posterPicture}
          alt="car image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5 text-left">
          {exhibitDetail.data.description}

          <Link
            href={`/user/exhibition/${exhibitDetail.data.id}/booking`}
            className="mt-5 block"
          >
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm">
              Make Reservation
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
