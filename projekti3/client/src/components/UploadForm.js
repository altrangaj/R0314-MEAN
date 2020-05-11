import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Progress } from 'reactstrap'
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

const UploadForm = ({ itemArray, setItemArray }) => {
  const [loaded, setLoaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const itemName = useField('text', '')
  const itemDetails = useField('text', '')

  const onChangeHandler = (event) => {
    const { files } = event.target
    if(files[0] && files[0].size < 2000000 && files[0].name.match(/\.(jpg|jpeg|png)$/)) {
      setLoaded(0)
      setSelectedFile(files[0])
    } else {
      toast.warn('File type is wrong or file size too big!')
    }
  }

  const upload = async (payload) => {
    try {
      toast.info('uploading...', options)
      const res = await axios.post(`${urlPrefix}/api/add`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
        },
        onUploadProgress: (ProgressEvent) => {
        // eslint-disable-next-line no-mixed-operators
          setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
        },
      })
      const item = await axios.get(`${urlPrefix}/api/get/${res.data}`)
      toast.dismiss()
      toast.success('upload success')
      setItemArray(itemArray.concat(item.data))
    } catch (e) {
      toast.dismiss()
      toast.error('upload fail')
    }
  }

  const onClickHandler = () => {
    const data = new FormData()
    data.append('uploaded_file', selectedFile)
    data.append('name', itemName.input.value)
    data.append('details', itemDetails.input.value)
    upload(data).then(() => {
      setLoaded(0)
      setSelectedFile(undefined)
      itemName.reset()
      itemDetails.reset()
    }).catch((e) => {
      toast.dismiss()
      toast.error(e)
    })
  }

  return (
    <div style={{
      height: 'calc(100vh/3)', width: 'calc(10vw + 10vh)', color: 'white', fontSize: 'calc(.7vh + .5vw + 3px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', alignContent: 'center', flexWrap: 'nowrap', margin: '0', padding: '0 0 1em 0', whiteSpace: 'nowrap',
    }}

    >

      <span style={{
        fontSize: '1.5em', lineHeight: '1em', fontWeight: '800', padding: '0', color: 'red',
      }}
      >
        ADD NEW
      </span>
      <div style={{ textAlign: 'left', width: '100%', alignSelf: 'strech' }}>
        <p style={{ lineHeight: '1em', margin: '0.2em 0 0.6em 0' }}>Upload picture (jpg,png) </p>
        <input style={{ lineHeight: '1em', fontSize: '1em', margin: '0' }} type="file" name="upload_file" className="form-control-file" onChange={onChangeHandler} />
      </div>
      <div style={{ textAlign: 'left', width: '100%', alignSelf: 'strech' }}>
        <p style={{ lineHeight: '1em', margin: '0.2em 0 0.3em 0', fontSize: '1em' }}>name </p>
        <input
          placeholder="required"
          style={{
            height: '2em', lineHeight: '1em', fontSize: '1em', margin: '0', padding: '0',
          }}
          {...itemName.input}
          className="form-control"
          required
        />
      </div>
      <div style={{ textAlign: 'left', width: '100%', alignSelf: 'strech' }}>
        <p style={{ lineHeight: '1em', margin: '0.2em 0 0.3em 0', fontSize: '1em' }}>details </p>
        <input
          style={{
            lineHeight: '1em', height: '2em', fontSize: '1em', margin: '0', padding: '0',
          }}
          {...itemDetails.input}
          className="form-control"
        />
      </div>
      <div style={{ fontSize: '1em', width: '100%', alignSelf: 'strech' }}>
        <ToastContainer style={{ fontSize: '1em' }} />
        <Progress max="100" color="success" value={loaded}>
          {Math.round(loaded, 2) }
          %
        </Progress>


        <button
          style={{
            fontSize: '1em', padding: '.2em', lineHeight: '1em', display: 'inline-block',
          }}
          type="submit"
          className="btn btn-success btn-block"
          onClick={onClickHandler}
        >
          submit
        </button>
      </div>
    </div>
  )
}

export default UploadForm
