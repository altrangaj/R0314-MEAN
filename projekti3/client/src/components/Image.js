import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useField } from '../hooks/field'

let urlPrefix = ''
if(process.env.NODE_ENV === 'development') urlPrefix = 'http://localhost:8000'
const options = {
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0.5,
}

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

  const imgstr = `data:${imageData.contentType || imageData.type};`
        + `base64,${arrayBufferToBase64(imageData.data)}`

  const remove = async () => {
    toast.info('removing from server...', options)
    await axios.post(`${urlPrefix}/api/delete/${id}`)
    await fetchFromServer()
    toast.dismiss()
  }
  const update = async () => {
    toast.info('updating to server', options)
    await axios.post(`${urlPrefix}/api/update/${id}`, { name: newName.input.value, details: newDetails.input.value })
    await fetchFromServer()
    toast.dismiss()
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
          borderBottom: 'solid .2em black',
          borderRadius: '0 0 .333em 0',
          backgroundColor: 'black',
        }}
        >
          <span style={{
            fontSize: '1.15em', padding: '0 .2em 0 0em', fontFamily: 'Russo One, sans-serif', color: '#a9bfd6',
          }}
          >
            {alt}
          </span>
        </div>

      </div>

      <img src={imgstr} alt={alt} style={{ borderRadius: '0 1em 0 0', height: 'calc(100vh/3 - 4em/3 - 1.7em)' }} />
      <div style={{
        display: 'block', borderRadius: '0 0 0 1em', whiteSpace: 'nowrap', height: '1.7em', backgroundColor: '#800000', color: 'white', fontSize: 'calc(.7vh + .5vw + 3px)', padding: '0',
      }}
      >
        <div
          style={{
            height: '1.7em', display: 'flex', flexFlow: 'row-wrap', fontSize: '1em', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', flexWrap: 'nowrap', overflow: 'hidden', margin: '0', padding: '0', whiteSpace: 'nowrap',
          }}
          hidden={edit}
        >
          <div style={{
            margin: '0 0 .1em .7em', alignSelf: 'strech', lineHeight: '1em', fontSize: '.8em',
          }}
          >
            {details}
          </div>
          <div style={{ alignItems: 'center', fontSize: '.8em' }}>
            <button
              type="button"
              style={{
                alignItems: 'center', fontWeight: 'bold', height: '1.4em', lineHeight: '1em', margin: '.4em',
              }}
              onClick={() => toggleEdit(!edit)}
            >
              edit
            </button>
            <button
              type="button"
              style={{
                alignItems: 'center', fontWeight: 'bold', height: '1.4em', lineHeight: '1em', margin: '.4em .3em .4em 0',
              }}
              onClick={remove}
            >
              delete
            </button>
          </div>
        </div>
        <div
          hidden={!edit}
          style={{
            height: '1.7em', display: 'flex', flexFlow: 'row-wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', flexWrap: 'nowrap', overflow: 'hidden', margin: '0', padding: '0', whiteSpace: 'nowrap',
          }}
        >
          <div style={{ alignSelf: 'strech', alignItems: 'center' }}>
            <input placeholder={alt} style={{ width: '5em', fontSize: '.8em' }} {...newName.input} />
            <input placeholder={details} style={{ width: '7em', fontSize: '.8em' }} {...newDetails.input} />
          </div>
          <div style={{ alignSelf: 'strech', alignItems: 'center', fontSize: '.8em' }}>
            <button
              type="button"
              style={{
                alignItems: 'center', fontWeight: 'bold', height: '1.4em', lineHeight: '1em', margin: '.4em',
              }}
              onClick={update}
            >
              save
            </button>
            <button
              type="button"
              style={{
                alignItems: 'center', fontWeight: 'bold', height: '1.4em', lineHeight: '1em', margin: '.4em .3em .4em 0',
              }}
              onClick={() => toggleEdit(!edit)}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Image
