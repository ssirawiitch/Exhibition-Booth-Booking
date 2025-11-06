export default async function editExhibition(token: string, id: string , updatedData: any) {

    const response = await fetch(`http://localhost:5000/api/v1/exhibitions/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update exhibition");
    }

    return await response.json();
}
