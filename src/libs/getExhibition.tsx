export default async function getExhibition(id:string) {
    const response = await fetch(`http://localhost:5000/api/v1/exhibitions/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch cars")
    }

    return await response.json()
}