export default async function getExhibitionById(id: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/exhibitions/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
