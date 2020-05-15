import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from './Image'
import UploadForm from './UploadForm'
import { urlPrefix } from '../util/config'
import './App.css'
import { ReactComponent as Spinner } from './Spinner.svg'

const App = () => {
  const [itemArray, setItemArray] = useState(null)
  const [loading, setLoading] = useState(true)

  const addItem = (item) => {
    setItemArray(itemArray.concat(item))
  }

  const fetchFromServer = async () => {
    await axios.get(`${urlPrefix}/api/getall`)
      .then((res) => res.data)
      .then((data) => setItemArray(data.items))
      .catch((e) => console.log(e))
    setLoading(false)
  }

  useEffect(() => {
    fetchFromServer()
  }, [])

  return loading
    ? (
      <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
        <Spinner style={{ position: 'absolute', top: 'calc(50% - 100px)', left: 'calc(50% - 100px)' }} />
      </div>
    )
    : (
      <div className="App">
        {itemArray && itemArray.map((i) => (
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
}

export default App
