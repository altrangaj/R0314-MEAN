import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Progress } from 'reactstrap'
import { useField } from '../hooks/field'
import { options, urlPrefix} from '../util/config'
import './UpdateForm.css'

const UploadForm = ({ addItem }) => {
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
      addItem(item.data)
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
    <div id="container2">
      <span id="form-header">
        ADD NEW
      </span>
      <div className="flexItem">
        <p className="label-style">Upload picture (jpg/png) </p>
        <input style={{ lineHeight: '1.5em', fontSize: '1em', margin: '0' }} 
        type="file" name="upload_file" className="form-control-file" onChange={onChangeHandler} 
        />
      </div>
      <div className="flexItem">
        <p className="label-style">name </p>
        <input placeholder="required" {...itemName.input} className="form-control text-input" required />
      </div>
      <div className="flexItem">
        <p className="label-style">details </p>
        <input {...itemDetails.input} className="form-control text-input"/>
      </div>
      <div className="flexItem">
        <ToastContainer style={{ fontSize: '1.4em' }} />
        <Progress max="100" color="success" value={loaded}>
          {Math.round(loaded, 2) }
          %
        </Progress>
        <button
          style={{
            fontSize: '1.2em',fontWeight:'bold', verticalAlign:'middle', display: 'inline-block',
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
