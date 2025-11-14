export default async function getExhibition(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/exhibitions/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch cars")
    }

    return await response.json()
}