import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ListInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      list_string: this.props.list.join(", ")
    }
    this.onChange=this.onChange.bind(this)
    this.closeInput=this.closeInput.bind(this)
  }
  onChange(e){
    this.setState({list_string:e.target.value})
  }
  closeInput(){
    this.props.closeInput(this.state.list_string)
  }
  render(){
    return(
      <div className="input_container">
        <div className='input_box'>
          Liste {this.props.list_id}
          <textarea cols='20' rows='12' value={this.state.list_string} onChange={this.onChange} autoFocus placeholder='Einfügen oder Eingeben der Wortliste. Getrennt durch ein Komma und ein Leerzeichen'/>
          <button className="input_save_button" onClick={this.closeInput}><FontAwesomeIcon icon="save" className="save_icon"/></button>
        </div>
      </div>
    )
  }
}

export default ListInput
