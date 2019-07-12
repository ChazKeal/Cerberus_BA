import React from 'react'
import { Link } from 'react-router-dom'
import Bild from '../../assets/pics/Cerberus_saves_background.png'

class MainMenu extends React.Component{
//   constructor(props){
//       super(props)
//       this.askForPasswort=this.askForPasswort.bind(this);
//     }
// askForPasswort(a){
//   var password = document.getElementById('password_id').value;
//   if (password == "1234")
//   {window.location = "/app/admin"}
//   else
//   {alert('Wrong Password')}
// }

  render(){
    return (
      <div className="intro">
        <img src={Bild}></img>
        <div className="all_container">
          <div className="links">
            <div className="link link1"><Link to="/app/slot">Start</Link></div>
            <div className="link link2"><Link to="/app/admin">Upload</Link></div>
            <div className="link link3"><Link to="/app/saves">Ideen</Link></div>
          </div>
         <div className="textA"><strong>Willkommen zur interaktiven Ideenfindung mittels Semantischer Intuition.</strong><br />
          Diese Simulation wird Sie dazu anleiten aus gegebenen Wörtern die Ihnen in einer
          zufällige Konstellation gezeigt werden, Ideen für Ihr Projekt zu ziehen.
          Es werden Ihnen Kombinationen aus jeweils zwei oder drei Wörtern angezeigt.
          Denken Sie über jede Kombination nach, auch wenn Sie ihnen zuerst Unsinnig erscheint.
          Sollten Sie der Meinung sein, dass eine Kombination sinnvoll und umsetzbar ist,
          dann drücken Sie den Button mit der Glühbirne.
          Die Ideen werden bei dem Administrator gesammelt und sind für Sie über das Menü einsehbar.<br />
        <strong>Viel Erfolg!!!</strong></div>
        </div>
      </div>
    )
  }
}
export default MainMenu;
