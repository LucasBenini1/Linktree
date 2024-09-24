import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection"
import {
  setDoc,
  doc,
  getDoc
} from "firebase/firestore"

export function Networks(){
  const [instagram, setInstagram] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")

  useEffect(() => {
    function loadLinks(){
      const docRef = doc(db, "social", 'link')
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined){
          setInstagram(snapshot.data()?.instagram)
          setLinkedin(snapshot.data()?.linkedin)
          setGithub(snapshot.data()?.github)
        }
      })
    }

    loadLinks()
  }, [])


  function handleRegister(e: FormEvent){
    e.preventDefault()

    setDoc(doc(db, "social", 'link'), {
      instagram: instagram,
      github: github,
      linkedin: linkedin
    })
    .then(() => {
      console.log("Cadastrados com sucesso.")
    })
    .catch((error) => {
      console.log("Erro ao cadastrar redes sociais no banco de dados. " + error)
    })
  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header/>

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>

        <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
          <Input
            type="url"
            placeholder="Digite a URL do instagram"
            value={instagram}
            onChange={(e) => {setInstagram(e.target.value)}}
          />

        <label className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
          <Input
            type="url"
            placeholder="Digite a URL do GitHub"
            value={github}
            onChange={(e) => {setGithub(e.target.value)}}
          />

        <label className="text-white font-medium mt-2 mb-2">Link do LinkedIn</label>
          <Input
            type="url"
            placeholder="Digite a URL do LinkedIn"
            value={linkedin}
            onChange={(e) => {setLinkedin(e.target.value)}}
          />

        <button 
        type="submit"
        className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
        >Salvar Links</button>
      </form>
    </div>
  )
}