import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useField } from '../hooks/field'
import { options, urlPrefix} from '../util/config'
import './InfoPanel.css'

const InfoPanel = ({ alt, id, details, fetchFromServer }) => {
  const [edit, toggleEdit] = useState(false)
  const newName = useField('text', alt)
  const newDetails = useField('text', details)

  const remove = async () => {
    toast.info('removing from server...', options)
    await axios.post(`${urlPrefix}/api/delete/${id}`)
    await fetchFromServer()
    toast.dismiss()
  }

  const update = async () => {
    toast.info('updating to server', options)
    await axios.post(
      `${urlPrefix}/api/update/${id}`,
      { name: newName.input.value, details: newDetails.input.value })
    await fetchFromServer()
    toast.dismiss()
    toggleEdit(!edit)
  }

  return (
    <div id="container">
      <div className="content" hidden={edit}>
        <div style={{ margin: '0 0 .1em .7em', alignSelf: 'strech', lineHeight: '1em' }}>
          {details}
        </div>
        <div style={{ alignItems: 'center',  }}>
          <button type="button" className="left-button" onClick={() => toggleEdit(!edit)}>
            edit
          </button>
          <button
            type="button" className="right-button" onClick={remove}>
            delete
          </button>
        </div>
      </div>
      <div hidden={!edit} className="content">
        <div style={{ alignSelf: 'strech', alignItems: 'center' }}>
          <input placeholder={alt} style={{height: '1.6em', width: '5em',  }} {...newName.input} />
          <input placeholder={details} style={{height: '1.6em', width: '7em',  }} {...newDetails.input} />
        </div>
        <div style={{ alignSelf: 'strech', alignItems: 'center',  }}>
          <button type="button" className="left-button" onClick={update}>
            save
          </button>
          <button type="button" className="right-button" onClick={() => toggleEdit(!edit)}>
            cancel
          </button>
        </div>
      </div>
      </div>
  )
}

export default InfoPanel