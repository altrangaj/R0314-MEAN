import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from './Image'
import UploadForm from './UploadForm'
import { urlPrefix } from '../util/config'
import './App.css'

const App = () => {
  const [itemArray, setItemArray] = useState(null)

  const addItem = (item) => {
    setItemArray(itemArray.concat(item))
  }

  const fetchFromServer = async () => {
    await axios.get(`${urlPrefix}/api/getall`)
      .then((res) => res.data)
      .then((data) => setItemArray(data.items))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    fetchFromServer()
  }, [])

  if(itemArray) return (
    <div className="App">
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
        addItem={addItem}
      />
    </div>
  )
  return <div />
}

export default App
