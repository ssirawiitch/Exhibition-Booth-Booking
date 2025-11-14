export default async function deleteBooking(token: string, bookingId: string) {
  const response = await fetch(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking/${bookingId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }

  return await response.json();
}
