import React, { useState } from 'react'
import axios from 'axios'
import { useField } from '../hooks/field'


const Image = ({
  id, imageData, alt, details, fetchFromServer,
}) => {
  const [edit, toggleEdit] = useState(false)
  const newName = useField('text', alt)
  const newDetails = useField('text', details)

  const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    // eslint-disable-next-line no-return-assign
    bytes.forEach((b) => binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  const imgstr = `data:${imageData.contentType};`
        + `base64,${arrayBufferToBase64(imageData.data)}`

  const remove = async () => {
    await axios.post(`/api/delete/${id}`)
    fetchFromServer()
  }
  const update = async () => {
    await axios.post(`/api/update/${id}`, { name: newName.input.value, details: newDetails.input.value })
    await fetchFromServer()
    toggleEdit(!edit)
  }
  return (
    <div style={{
      width: 'fit-content',
      textAlign: 'center',
      height: 'calc(100vh/3 - 1em/3)',
      margin: '0 1em 0 0',
    }}
    >
      <div style={{
        position: 'relative',
        top: '1em',
        height: 'fit-content',
        fontSize: 'calc(.7vh + .5vw + 3px)',
        lineHeight: '1em',
        marginTop: '-1em',
      }}
      >
        <div style={{
          display: 'inline-block',
          float: 'left',
          textAlign: 'left',
          borderBottom: 'solid .085em black',
          borderRadius: '0 0 .333em 0',
          backgroundColor: 'black',
        }}
        >
          <span style={{ padding: '0 .2em 0 0em', fontFamily: 'Russo One, sans-serif', color: '#a9bfd6' }}>
            {alt}
          </span>
        </div>

      </div>

      <img src={imgstr} alt={alt} style={{ borderRadius: '1em', height: 'calc(100vh/3 - 4em/3 - 2em)' }} />
      <div style={{
        display: 'block', whiteSpace: 'nowrap', height: '2em', backgroundColor: 'red', color: 'white', fontSize: '1em',
      }}
      >
        <div style={{ display: 'block', whiteSpace: 'nowrap' }} hidden={edit}>
          <div style={{
            display: 'inline-block', float: 'left', overflow: 'hidden', paddingLeft: '.7em',
          }}
          >
            {details}
          </div>
          <div style={{ display: 'inline-block', float: 'right', whiteSpace: 'nowrap' }}>
            <button type="button" style={{ display: 'inline-block' }} onClick={() => toggleEdit(!edit)}>edit</button>
            <button type="button" style={{ display: 'inline-block' }} onClick={remove}>delete</button>
          </div>
        </div>
        <div hidden={!edit} style={{ display: 'block', whiteSpace: 'nowrap' }}>
          <input placeholder={alt} style={{ display: 'inline', float: 'left' }} {...newName.input} />
          <input placeholder={details} style={{ display: 'inline', float: 'left' }} {...newDetails.input} />
          <button type="button" style={{ display: 'inline', float: 'right' }} onClick={update}>save</button>
          <button type="button" style={{ display: 'inline', float: 'right' }} onClick={() => toggleEdit(!edit)}>cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Image
