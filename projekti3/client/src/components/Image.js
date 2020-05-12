import React from 'react'
import Header from './Header'
import InfoPanel from './InfoPanel'

const Image = (props) => {

  const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    // eslint-disable-next-line no-return-assign
    bytes.forEach((b) => binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  const imgstr = `data:${props.imageData.contentType};`
        + `base64,${arrayBufferToBase64(props.imageData.data)}`

  return (
    <div style={{
      width: 'fit-content',
      textAlign: 'center',
      height: 'calc(100vh/3 - 1em/3)',
      margin:'0 1em 0 0'
    }}
    >
      <Header title={props.alt} />
      <img src={imgstr} alt={props.alt} style={{ borderRadius: '0 1em 0 0', height: 'calc(100vh/3 - 4em/3 - 1.7em)' }} />
      <InfoPanel { ...props } />
    </div>
  )
}

export default Image
