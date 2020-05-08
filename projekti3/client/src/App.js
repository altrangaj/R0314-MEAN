import React, { useEffect, useState } from 'react'

const App = () => {
  const [imgData, setImgData] = useState(null)
  useEffect(() => {
    console.log('EFFECT')
    const arrayBufferToBase64 = (buffer) => {
      let binary = ''
      const bytes = [].slice.call(new Uint8Array(buffer))
      // eslint-disable-next-line no-return-assign
      bytes.forEach((b) => binary += String.fromCharCode(b))
      return window.btoa(binary)
    }
    fetch('http://localhost:8000/api/getall')
      .then(res => res.json())
      .then((data) => {
        const imgstr = `data:${data.items[0].picture.contentType};`
        + `base64,${arrayBufferToBase64(data.items[0].picture.data.data)}`
        setImgData(imgstr)
      })
      .catch((e) => console.log(e))
  })

  if(imgData) return (
    <div className="App">
      <img src={imgData} alt="hohhoijjaa" />
    </div>
  )
  return <div />
}

export default App
