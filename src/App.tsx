import { useEffect, useState } from "react"
import { fetchRandomPokemon, Pokemon } from "./pages/pokemonapi"

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null) //aqui se guarda el pokemon que se va a adivinar
  const [input, setInput] = useState("") //aqui se guarda el input del usuario
  const [respuesta, setrespuesta] = useState(false) //aqui se guarda si el usuario ya adivino el pokemon o no
  const [esCorrecta, setesCorrecta] = useState<boolean | null>(null) //aqui se guarda si la respuesta es correcta o no
  const [aciertos, setAciertos] = useState(0)

  useEffect(() => {
    fetchRandomPokemon().then(setPokemon).catch(console.error)
  }, [])
/* al cargar la pagina se llama a la funcion "fetchRandomPokemon" (Que esta en pokemonapi) 
que trae un pokemon aleatorio y lo guarda en el estado pokemon */
  const handleGuess = () => {
    if (!pokemon) return
    const respuestaArreglada = input.trim().toLowerCase()
    const nombreArreglado = pokemon.name.toLowerCase()
    if (!respuesta) setAciertos((prev) => prev + 1)
    if (respuestaArreglada === nombreArreglado) {
      setesCorrecta(true)
      setrespuesta(true)
    } else {
      setesCorrecta(false)
    }
  }
  // luego, en esta parte, se crean 2 variables "respuestaArreglada" y "nombreArreglado" que son la respuesta del usuario y el nombre del pokemon respectivamente,
  // pero recortadas sin espacios y en minusculas, para que no haya problemas con las mayusculas y los espacios
  // luego se compara la respuesta del usuario con el nombre del pokemon, si son iguales se guarda en el estado "esCorrecta" como true y se muestra la imagen del pokemon
  const handleNew = () => {
    fetchRandomPokemon().then(setPokemon).catch(console.error)
    setInput("")
    setrespuesta(false)
    setesCorrecta(null)
  }
  // esta funcion se encarga de traer un nuevo pokemon aleatorio y limpiar el input y la respuesta del usuario
  // y la respuesta correcta, para que el usuario pueda adivinar otro pokemon
  return (
    //todo esto es el front asi bien bonito 
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">¿Quién es este Pokémon?</h1>
  <p className="text-lg text-gray-300">Aciertos: {aciertos}</p>

      {pokemon && (
        <img
          src={pokemon.image}
          alt="Pokémon silueta"
          className={`w-64 h-64 object-contain transition-all duration-300 ${
            respuesta ? "brightness-100" : "brightness-0"
          }`}
        />
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe el nombre..."
        className="px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
        onKeyDown={
          (e) => {
            if (e.key === "Enter") handleGuess()
          }
        }
      />

      <button
        onClick={handleGuess}
        className="bg-blue-600 hover:bg-blue-900 px-6 py-2 rounded font-semibold"
      >
        Adivinar
      </button>

      {esCorrecta === true && <p className="text-green-400">¡Correcto!</p>}
      {esCorrecta === false && <p className="text-red-400">Incorrecto. Intenta de nuevo.</p>}
      <br />
      <button
        onClick={handleNew}
        className="px-3 py-1.5 rounded font-mono bg-fuchsia-600  hover:bg-fuchsia-900"
      >
        Nuevo Pokémon
      </button>
    </div>
  )
}

export default App
