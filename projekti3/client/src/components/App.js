import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from './Image'
import UploadForm from './UploadForm'

const App = () => {
  const [itemArray, setItemArray] = useState(null)

  const fetchFromServer = () => {
    axios.get('/api/getall')
      .then((res) => res.data)
      .then((data) => setItemArray(data.items))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    fetchFromServer()
  }, [])

  if(itemArray) return (

    <div
      className="App"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        border: 'solid 1em transparent',
        display: 'flex',
        marginTop: '-0.15em',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {itemArray.map((i) => (
        <Image
          key={i.id}
          id={i.id}
          imageData={i.picture.data}
          alt={i.name}
          details={i.details}
          fetchFromServer={fetchFromServer}
        />
      ))}
      <UploadForm
        itemArray={itemArray}
        setItemArray={setItemArray}
        style={{ display: 'inline-block', height: 'calc(100vh/3 - 4em/3)' }}
      />
    </div>

  )
  return <div />
}

export default App
