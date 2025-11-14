export default async function getExhibition(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/exhibitions/${id}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  return await response.json();
}
