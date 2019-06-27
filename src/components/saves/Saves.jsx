import React from 'react';
import { Link } from 'react-router-dom'
import Bild from '../../assets/pics/Cerberus_saves_background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Save extends React.Component{
  render(){
    return (
      <div className='saves_container'>
        <img src={Bild}></img>
        <div className='header_container'>
          <button className="menu_button" ><Link to="/app/menu"><FontAwesomeIcon icon="times-circle" className="exit_icon"/></Link></button>
        </div>
        <div className='text_container'>
          <ul>
            {this.props.saved ? this.props.saved.map((save,index) => (
                <li key={index}><div>{ save }</div></li>
              )
            ): 'Hier sollten eigentlich Ideen stehen... hast du eine Blockade?'}
          </ul>
        </div>
      </div>
    )
  }
}

export default Save;
