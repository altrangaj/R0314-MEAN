import React, { useState } from 'react'
import axios from 'axios'
import { Progress } from 'reactstrap'
import { useField } from '../hooks/field'

const UploadForm = ({ itemArray, setItemArray }) => {
  const [loaded, setLoaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const itemName = useField('text', '')
  const itemDetails = useField('text', '')

  const onChangeHandler = (event) => {
    console.log(event)
    const { files } = event.target
    if(files[0] && files[0].size < 2000000 && files[0].name.match(/\.(jpg|jpeg|png)$/)) {
      setLoaded(0)
      setSelectedFile(files[0])
    }
  }

  const upload = async (payload) => {
    const res = await axios.post('http://localhost:8000/api/add', payload, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
      },
      onUploadProgress: (ProgressEvent) => {
        // eslint-disable-next-line no-mixed-operators
        setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
      },
    })
    const item = await axios.get(`http://localhost:8000/api/get/${res.data}`)
    console.log(item)
    console.log('PASKAA')
    console.log(itemArray)
    setItemArray(itemArray.concat(item.data))
  }

  const onClickHandler = () => {
    const data = new FormData()
    data.append('uploaded_file', selectedFile)
    data.append('name', itemName.input.value)
    data.append('details', itemDetails.input.value)
    console.log(data)
    upload(data).then(() => {
      setLoaded(0)
      setSelectedFile(undefined)
      itemName.reset()
      itemDetails.reset()
    }).catch((e) => console.log(e))
  }

  return (
    <div style={{
      height: 'calc(100vh/3 - 4em/3)', width: 'calc(10vw + 10vh)', color: 'white', fontSize: 'calc(.4vh + .3vw + 2px)',
    }}
    >
      <span style={{ fontSize: '3em', color: 'red' }}>add new</span>
      <p style={{ margin: '0.7em 0 .4em 0' }}>Upload picture (jpg,png) </p>
      <input style={{ height: '2em' }} type="file" name="upload_file" className="form-control-file" onChange={onChangeHandler} />
      <p style={{ margin: '0.7em 0 .4em 0' }}>name </p>
      <input placeholder="required" style={{ height: '2em' }} {...itemName.input} className="form-control" required />
      <p style={{ margin: '0.7em 0 .4em 0' }}>details </p>
      <input style={{ height: '2em' }} {...itemDetails.input} className="form-control" />
      <div style={{ marginTop: '2em' }}>
        <Progress max="100" color="success" value={loaded}>
          {Math.round(loaded, 2) }
          %
        </Progress>
        <button style={{ lineHeight: '1em', display: 'inline-block' }} type="submit" className="btn btn-success btn-block" onClick={onClickHandler}>submit</button>
      </div>

    </div>
  )
}

export default UploadForm
