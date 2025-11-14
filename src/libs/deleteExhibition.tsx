export default async function deleteExhibition(token: string, id: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/exhibitions/${id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete exhibition");
    }

    return await response.json();
}
