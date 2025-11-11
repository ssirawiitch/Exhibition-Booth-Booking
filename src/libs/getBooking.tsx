export default async function getBookings(token: string) {
  const response = await fetch("http://localhost:5000/api/v1/booking", {
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
