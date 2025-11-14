interface CreateBookingParams {
  smallCount: number;
  bigCount: number;
  exhibitionId: string;
  token: string | null;
}
const API_URL = `${process.env.BACKEND_URL}/api/v1/booking`;
export async function createBooking({
  smallCount,
  bigCount,
  exhibitionId,
  token,
}: CreateBookingParams) {
  const apiCalls = [];

  if (smallCount > 0) {
    apiCalls.push(
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          exhibition: exhibitionId,
          boothType: "small",
          amount: smallCount,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          console.error("API Error Detail (Small):", errorData);
          throw new Error(
            errorData.error || errorData.message || "Failed to book Small booth"
          );
        }
        return res.json();
      })
    );
  }

  if (bigCount > 0) {
    apiCalls.push(
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          exhibition: exhibitionId,
          boothType: "big",
          amount: bigCount,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          console.error("API Error Detail (Big):", errorData);
          throw new Error(
            errorData.error || errorData.message || "Failed to book Big booth"
          );
        }
        return res.json();
      })
    );
  }
  return Promise.all(apiCalls);
}
