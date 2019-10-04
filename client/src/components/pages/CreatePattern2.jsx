import React, { useState, useEffect } from 'react'
import { fabric } from 'fabric'
import './CreatePatterns.scss'
import api from '../../api'

const axios = require('axios')
// const rectangle
// var image = '#image-id'.attr('src')
// var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, '')
// var blob = base64ToBlob(base64ImageContent, 'image/png')
// var formData = new FormData()
// formData.get('image/png;base64')
// formData.append('picture', blob)

function base64ToBlob(base64, mime) {
  try {
    mime = mime || ''
    var sliceSize = 1024
    var byteChars = window.atob(base64)
    var byteArrays = []

    for (
      var offset = 0, len = byteChars.length;
      offset < len;
      offset += sliceSize
    ) {
      var slice = byteChars.slice(offset, offset + sliceSize)

      var byteNumbers = new Array(slice.length)
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      var byteArray = new Uint8Array(byteNumbers)

      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: mime })
  } catch (err) {
    return err
  }
}

function CreatePattern2() {
  const [currentColor, setCurrentColor] = useState('#FFBC55')
  const [canvas, setCanvas] = useState(null)
  const [shapes, setShapes] = useState([])
  const [gridStatus, setGridStatus] = useState(true)
  const [selected, setSelected] = useState(null)
  const [newItem, setNewItem] = useState({
    name: null,
    description: null,
  })

  function handleChange(e) {
    console.log(e.target.name)
    const { name, value } = e.target
    setNewItem({ ...newItem, [name]: value })
    // setNewItem(e.target.value)
  }

  const handleDownload = e => {
    // console.log(e)
    // console.log(canvas)
    download(canvas, 'myimage.png')
  }
  /* Canvas Donwload */
  function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk, e
    lnk = document.createElement('a')

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    const base64String = canvas
      .toDataURL('image/png;base64')
      .replace('data:image/png;base64,', '')

    // console.log(base64String.replace("data:image/png;base64,", ""))
    const blob = base64ToBlob(base64String, 'image/png')
    const fd = new FormData()

    if (newItem.name && newItem.description) {
      fd.append('name', newItem.name)
      fd.append('description', newItem.description)
    }
    fd.append('image', blob)

    for (var pair of fd.entries()) {
      console.log(pair)
    }

    api.postMyPattern(fd)

    // tu es ready to use axios to send the formdata to the server

    /*
    lnk.href = canvas.toDataURL('image/png;base64')
    console.log('element link', lnk)

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent('MouseEvents')
      e.initMouseEvent(
        'click',
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )

      lnk.dispatchEvent(e)
    } else if (lnk.fireEvent) {
      lnk.fireEvent('onclick')
    }
    */
  }

  const onOff4 = event => {
    console.log(event.target.checked)
    setGridStatus(event.target.checked)
  }

  useEffect(() => {
    if (!canvas) return
    RemoveGrid()
  }, [gridStatus])

  function drawGrid(grid, canvasSize) {
    console.log('draw grid func')
    let horizontalGridLine, verticalGridLine
    for (var i = 0; i < canvasSize / grid; i++) {
      horizontalGridLine = new fabric.Line(
        [i * grid, 0, i * grid, canvasSize],
        {
          evented: false,
          selectable: false,
          stroke: '#CDCDCD ',
        }
      )
      verticalGridLine = new fabric.Line([0, i * grid, canvasSize, i * grid], {
        evented: false,
        selectable: false,
        stroke: '#CDCDCD ',
      })

      canvas.add(horizontalGridLine, verticalGridLine)
    }

    canvas.on('object:moving', options => {
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid,
      })
    })
  }

  function RemoveGrid() {
    if (!gridStatus) {
      // console.log('here', gridStatus)
      var objects = canvas.getObjects('line')
      objects.forEach(el => {
        console.log(el)
        canvas.remove(el)
      })
    } else {
      drawGrid(20, 780)
    }
  }

  function initCanvas() {
    drawGrid(20, 780)

    // ------- OBJECTS GENERATION HERE  -------

    const rectangle = new fabric.Rect({
      fill: currentColor,
      height: 40,
      left: 100,
      top: 100,
      width: 40,
    })

    // canvas.add(rectangle)

    const circle = new fabric.Circle({
      fill: currentColor,
      left: 300,
      radius: 50,
      top: 300,
    })

    canvas.add(circle, rectangle)

    // Snap-to-grid

    setShapes([...shapes, rectangle, circle])
  }

  function add(e) {
    console.log(e.target)
    if (e.target.value === ' + Rect') {
      var lightgrey = new fabric.Rect({
        top: 100,
        left: 100,
        width: 40,
        height: 40,
        fill: 'lightgrey',
      })

      canvas.add(lightgrey)
    } else if (e.target.value === ' + Cerc') {
      var blue = new fabric.Circle({
        fill: 'lightgrey',
        left: 300,
        radius: 50,
        top: 300,
      })

      canvas.add(blue)
    } else {
      console.log('not a rectangle nor a circle')
    }
  }

  function confirm(message) {
    let val = window.prompt(message)
    return val
  }

  function deleteObjects() {
    // console.log('here')
    setSelected(canvas.getActiveObject())
  }

  const setColor = e => {
    const selectedShape = canvas.getActiveObject()
    if (!selectedShape) return
    setCurrentColor(e.target.value)
    selectedShape.set('fill', currentColor)
    canvas.renderAll()
  }

  useEffect(() => {
    const temp = new fabric.Canvas('foo', {
      width: '800',
      height: '400',
    })
    console.log('in first', temp)
    setCanvas(temp)
    // return
  }, []) // component did mount

  useEffect(() => {
    if (canvas === null) return
    initCanvas()
  }, [canvas]) // déclenché une seule fois, quand la fonction deleteObjects est exec

  useEffect(() => {
    if (canvas && selected) canvas.remove(canvas.getActiveObject())
  }, [selected]) // déclenché à chaque fois qu'un object mis en selection

  console.log(selected)

  // axios.get('http://localhost:3000/create-pattern').then(resp => {
  //   console.log(resp.data)
  // })

  return (
    <div className="CreatePattern">
      {/* <pre>{JSON.stringify(newItem, null, 2)}</pre> */}
      <h2 className="libraryMainTitle">Let's create !</h2>
      <div className="cadreContainer">
        <div className="cadreTjrAuCentreMalgreChangementDeTaille">
          <div className="canvas-wrapper">
            <div className="dimensionBackground">
              <div>
                <input
                  type="checkbox"
                  className="checkboxGrid"
                  onChange={onOff4}
                  id="gridd"
                  checked={gridStatus}
                  // checked
                  // value={gridStatus ? 'on' : 'off'}
                />{' '}
                <label className="checkboxText">Grid</label>
              </div>
              {/* <div className="row">
                <div className="text-1">
                  <label htmlFor="width">Width : </label>
                  <input
                    id="width"
                    type="text"
                    placeholder="361"
                    className="dimensionBackgroundInput"
                  />
                  <label htmlFor="width" className="px1">
                    {' '}
                    px
                  </label>{' '}
                </div>
              </div>
              <div className="row">
                <div className="text-2">
                  <label htmlFor="height">Height : </label>
                  <input
                    id="height"
                    type="text"
                    placeholder="370"
                    className="dimensionBackgroundInput"
                  />
                  <label htmlFor="height" className="px2">
                    {' '}
                    px
                  </label>{' '}
                </div> */}
              {/* </div> */}
              <div className="setting-block">
                <div className="row color-row">
                  <label className="label2" htmlFor="bg-color"></label>
                  <div className="text-2">
                    <input
                      type="color"
                      name="colorPicker"
                      value={currentColor}
                      id="bg-color"
                      onChange={setColor}
                    />
                  </div>
                  <div className="buttonAddContainer">
                    <input
                      type="button"
                      value=" + Rect"
                      className="addShapes"
                      onClick={add}
                    />
                    <input
                      type="button"
                      value=" + Cerc"
                      className="addShapes"
                      onClick={add}
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      value="Detele"
                      className="deleteButton"
                      onClick={deleteObjects}
                      id="delete"
                    />
                  </div>
                  <div>
                    <input
                      type="button"
                      value="Save"
                      className="saveButton"
                      onClick={handleDownload}
                      id="save"
                    />
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        className="text-2"
                        id="Name"
                        value={newItem.name}
                        onChange={handleChange}
                        name="name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Description"
                        className="text-3"
                        id="Description"
                        value={newItem.description}
                        onChange={handleChange}
                        name="description"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <canvas height="1000" id="foo" width="750"></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePattern2
