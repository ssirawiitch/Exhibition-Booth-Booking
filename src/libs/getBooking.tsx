export default async function getBookings(token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/booking`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookings. Status: " + response.status);
  }

  return await response.json();
}
