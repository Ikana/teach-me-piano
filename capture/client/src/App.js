import { useRef, useState, useEffect } from 'react'
import axios from 'axios'

import logo from './logo.svg';
import './App.css';

function saveImage({ img, prefix }) {

  if (prefix === undefined) return

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  img.crossOrigin = "Anonymous";
  context.drawImage(img, 0, 0);
  // const myData = context.getImageData(0, 0, img.width, img.height);
  canvas.toBlob((blob) => {
    console.log(blob)
    axios.post('http://localhost:3001/', blob, { headers: { 'X-Prefix': prefix } }).then((res) => {
      console.log(res)
    })
  })
}

function App() {
  const imgRef = useRef(null)
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    function clickKey({ keyCode }) {

      if(keyCode === 32) {
        saveImage({ img: imgRef.current, prefix })
      }
    }
    window.addEventListener('keydown', clickKey)
    return () => {
      window.removeEventListener('keydown', clickKey)
    }
  }, [prefix, imgRef])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src="http://192.168.50.171:8000/stream.mjpg" width="640" height="480" ref={imgRef} alt="livestream" />
        <label htmlFor="prefix">prefix</label>

        <select name="prefix" id="prefix-select" onChange={(evt) => {
          setPrefix(evt.target.value)
        }}>
          <option value="">--Please choose an option--</option>
          <option value="flush">flush</option>
          <option value="do">Do</option>
          <option value="re">Re</option>
          <option value="mi">Mi</option>
          <option value="fa">Fa</option>
          <option value="sol">Sol</option>
          <option value="la">La</option>
          <option value="si">Si</option>
        </select>
        <button onClick={() => {
          saveImage({ img: imgRef.current, prefix })
        }}>Save</button>
      </header>
    </div>
  );
}

export default App;
