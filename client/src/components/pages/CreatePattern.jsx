import React from 'react'
// import api from '../../api'
// import './CreatePatterns.scss'
import { fabric } from 'fabric'
export default function CreatePattern(props) {
  console.log('ici ----> createpattern')

  var canvas = new props.Canvas('c', { selection: false })
  var grid = 50

  // create grid

  for (var i = 0; i < 600 / grid; i++) {
    canvas.add(
      new props.Line([i * grid, 0, i * grid, 600], {
        stroke: '#ccc',
        selectable: false,
      })
    )
    canvas.add(
      new props.Line([0, i * grid, 600, i * grid], {
        stroke: '#ccc',
        selectable: false,
      })
    )
  }

  // add objects

  canvas.add(
    new props.Rect({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      fill: '#faa',
      originX: 'left',
      originY: 'top',
      centeredRotation: true,
    })
  )

  canvas.add(
    new props.Circle({
      left: 300,
      top: 300,
      radius: 50,
      fill: '#9f9',
      originX: 'left',
      originY: 'top',
      centeredRotation: true,
    })
  )

  // snap to grid

  canvas.on('object:moving', function(options) {
    options.target.set({
      left: Math.round(options.target.left / grid) * grid,
      top: Math.round(options.target.top / grid) * grid,
    })
  })
  return (
    <div className="CreatePattern">
      <h2 className="libraryMainTitle">Let's create !</h2>
      <div className="cadreContainer">
        <div className="dimensionBackground">
          <span className="label">Background dimensions</span>
          <div className="row">
            <div className="text-1">
              <label for="width">Width : </label>
              <input
                id="width"
                type="text"
                placeholder="361"
                className="dimensionBackgroundInput"
              />
              <label for="width" className="px1">
                {' '}
                px
              </label>{' '}
            </div>
          </div>
          <div className="row">
            <div className="text-2">
              <label for="height">Height : </label>
              <input
                id="height"
                type="text"
                placeholder="370"
                className="dimensionBackgroundInput"
              />
              <label for="height" className="px2">
                {' '}
                px
              </label>{' '}
            </div>
          </div>
          <div className="setting-block">
            <div className="row color-row">
              <label className="label2" for="bg-color">
                Background Color
              </label>
              <div class="text-2">
                <input
                  id="bg-color"
                  type="text"
                  placeholder="#4ea6ca"
                  className="dimensionBackgroundInputColor"
                />
              </div>
              <a
                id="background-color-btn"
                className="btn-color color-1"
                href="javascript:;"
              ></a>
            </div>
          </div>
        </div>
        <div className="cadreTjrAuCentreMalgreChangementDeTaille">
          <div>
            <canvas id="c" width="600" height="600"></canvas>
          </div>
          {/* <div className="cadre">
            <div class="grid-container">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
              <div class="grid-item">5</div>
              <div class="grid-item">6</div>
              <div class="grid-item">7</div>
              <div class="grid-item">8</div>
              <div class="grid-item">9</div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
