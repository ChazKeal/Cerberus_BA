import React from 'react'
import { Link } from 'react-router-dom'
import Bild from '../../assets/pics/Cerberus_saves_background.png'

class MainMenu extends React.Component{


  render(){
    return (
      <div className="intro">
        <img src={Bild}></img>
        <div className="all_container">
          <div className="links">
            <div className="link link1"><Link to="/app/slot">Start</Link></div>
            <div className="link link2"><Link to="/app/admin">Adminansicht</Link></div>
            <div className="link link3"><Link to="/app/saves">Ergebnisse</Link></div>
          </div>
         <div className="textA"><strong>Willkommen zur interaktiven Ideenfindung mittels Semantischer Intuition.</strong><br />
          Diese Simulation wird sie dazu anleiten aus gegebenen Wörtern die ihnen in einer
          zufällige Konstellation gezeigt werden, Ideen für ihr Projekt zu ziehen.
          Es werden ihnen Kombinationen aus jeweils zwei oder drei Wörtern angezeigt.
          Denken sie über jede Kombination nach, auch wenn sie ihnen zuerst Unsinnig erscheint.
          Sollten sie der Meinung sein, dass eine Kombination sinnvoll und umsetzbar ist,
          dann drücken sie den Button für SPEICHERN.
          Die Ideen werden bei dem Administrator gesammelt und sind für sie über das Menü einsehbar.<br />
        <strong>Viel Erfolg!!!</strong></div>
        </div>
      </div>
    )
  }
}
export default MainMenu;
