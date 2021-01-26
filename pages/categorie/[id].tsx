import React, { useState,useEffect, useCallback } from "react"
import { useRouter } from 'next/router'
import Categorie from '@components/Categorie/Categorie'
import { Container, Header } from 'semantic-ui-react'

const CategorieDetail = () => {
  const { query } = useRouter()
  const [ playlist, setPlayList ] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect( () => {  
    if (query.id && isLoading) {
      fetch(`/api/music/${query.id}`)
      .then(res => res.json())
      .then( response => {
        if (isLoading) {          
          setPlayList(response) 
          setIsLoading(false)
        }
      })
      .catch(e => console.log(e))    
    }
  },[query.id])    

  if(isLoading) {
    return (
      <h1>Cargando...</h1>
    )
  }
       
  return (  
    playlist.playlists.items.length > 0 &&   
    <>
      <Header> Listas en {query.id} </Header>
      <Container className='contenedor'>
        {
          playlist.playlists.items.map( item => (
            <Categorie className='item' key={item.id} item={item} />
          ))   
        }
        <style jsx global>{`
            .contenedor {
              display:flex !important;
              flex-direction: row;
              justify-content: space-around;
              flex-wrap: wrap
            }
            .item {                                    
              flex-grow: 4;   
              align-self: auto;
              order:5;
              padding:10px;    
            }
        `}</style>
      </Container>     
    </>           
  )  


}

export default CategorieDetail
