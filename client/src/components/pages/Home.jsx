import React from 'react'
import './Hoome.scss'

export default function Home() {
  function OnOff() {
    document.getElementById('texte').classList.toggle('is-active')
  }
  function OnOff2() {
    document.getElementById('texte2').classList.toggle('is-active')
  }
  function OnOff3() {
    document.getElementById('texte3').classList.toggle('is-active')
  }
  return (
    <div className="Home">
      <h1 className="mainHomeTitle">Welcome to Magma !</h1>
      <div className="parentHomeContainer">
        <div className="homeContainer">
          <div className="questionReponse">
            <button type="text" className="homeBtn1" onClick={OnOff}>
              What's Magma ?
            </button>
            <span id="texte" className="fondDeText">
              Magma is a free pattern creation interface that allows anyone to
              create a pattern with given elements. Thanks to our databases
              classified by theme a wide choice of combinations is possible.
              Enjoy !
            </span>
          </div>
          <div className="questionReponse">
            <button type="text" className="homeBtn2" onClick={OnOff2}>
              How to use
            </button>
            <span id="texte2" className="fondDeText">
              You must be registered and authenticated to be able to use magma's
              features. Once authenticated, you have access to the creation tab,
              the my pattern tab and can save/export your patterns. Don't forget
              to look at the work of our members in the library :)
            </span>
          </div>
          <div className="questionReponse">
            <button type="text" className="homeBtn3" onClick={OnOff3}>
              Contact
            </button>
            <span id="texte3" className="fondDeText3">
              Any questions, requests? <br></br>
              <br></br>
              Click{' '}
              <a href="mailto:margaux.gibert15@hotmail.fr" className="hereLink">
                HERE
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
