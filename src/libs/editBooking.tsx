export default async function editBooking(
  token: string,
  bookingId: string,
  updatedData: any
) {
  const response = await fetch(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking/${bookingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update booking. Server validation failed (e.g., max exhibition quota reached)."
    );
  }

  return await response.json();
}
