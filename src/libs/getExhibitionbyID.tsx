export default async function getExhibitionById(id: string) {
  const response = await fetch(
    `http://localhost:5000/api/v1/exhibitions/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
