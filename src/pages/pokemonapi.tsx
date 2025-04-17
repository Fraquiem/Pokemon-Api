export interface Pokemon {
    name: string
    image: string
  }
  
  export async function fetchRandomPokemon(): Promise<Pokemon> {
    const id = Math.floor(Math.random() * 649) + 1 // quiero coger las primeras 5 generaciones porque son las chimbas
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  
    if (!res.ok) throw new Error("No se encontró el pokemon")
  
    const data = await res.json()
    return {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
    }
  }
  
  