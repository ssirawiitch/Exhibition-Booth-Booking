export default async function getExhibitions() {
    const response = await fetch("http://localhost:5000/api/v1/exhibitions")

    if(!response.ok){
        throw new Error("Failed to fetch exhibitions")
    }
    return await response.json()
}