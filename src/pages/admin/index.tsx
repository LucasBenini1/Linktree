import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi"

import {
  addDoc,
  collection,
  onSnapshot,
  query, 
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore"

import { db } from "../../services/firebaseConnection";

interface LinksProps{
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string
}

export function Admin(){
  const [nameInput, setNameInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [textColorInput, setTextColorInput] = useState("#f1f1f1")
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

  const [links,setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      const unsub = onSnapshot(queryRef, (snapshot) => {

        const lista = [] as LinksProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })
        })
          console.log(lista)

          setLinks(lista) //Estou passando os items para o useState onde serao armazenados os links.
      })

        return(() => {
          unsub()
        }) // Remove o listener quando for invocado. Ou seja, ao sair da pagina ira desmontar o componente.

    }, [])


   function handleRegister(e: FormEvent){
    e.preventDefault()
    
    if(nameInput === '' || urlInput === ""){
      alert("Preencha todos os campos.")
      return
    }

     addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    }) //Adiciona o documento à uma colecao que chamamos de db(criamos ela no outro arquivo), e à chamamos de links. Entao passaremos props com nome, url, cor, cor de fundo e uma prop com a data de criacao deste link.

    .then(() => {
      setNameInput("")
      setUrlInput("")
      const time = new Date().toLocaleTimeString()
      console.log("Cadastrado com sucesso." + time)
    })
    .catch((error) => {
      console.log("Erro ao cadastrar no banco: " + error)
    })

  }


  async function handleDeleteLink(id: string){
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header/>

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>

        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
        <Input
          type="url"
          placeholder="Digite a URL do link..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">

          <div className="flex gap-2 items-center">

          <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
            <input type="color" 
            value={textColorInput}
            onChange={(e) => setTextColorInput(e.target.value)}
          />

          </div>

          <div className="flex gap-2 items-center">

          <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
            <input type="color" 
            value={backgroundColorInput}
            onChange={(e) => setBackgroundColorInput(e.target.value)}
          />

          </div>


        </section>

        {nameInput !== '' && (
                  <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                  <label className="text-white font-medium mt-2 mb-3">Preview</label>
                  <article
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                    style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
                  >
                    <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
          
                  </article>
                  </div>
        )}

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center ">
          Cadastrar
        </button>


      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus Links
        </h2>

        {links.map((link) => (
            <article
            key={link.id}
              className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
              style={{backgroundColor: link.bg, color: link.color}}
              >
                <p>{link.name}</p>
                <div>
                    <button
                      className="border border-dashed p-1 rounded bg-neutral-900"
                      onClick={() => {handleDeleteLink(link.id)}}
                    >
                      <FiTrash size={18} color="#FFF"/>
                      </button>
                </div>
            </article>
        ))}
    </div>
  )
}