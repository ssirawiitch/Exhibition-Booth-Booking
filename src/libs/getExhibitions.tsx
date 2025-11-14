export default async function getExhibitions() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/exhibitions`)

    if(!response.ok){
        throw new Error("Failed to fetch exhibitions")
    }
    return await response.json()
}