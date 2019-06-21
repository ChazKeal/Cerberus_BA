import React from 'react'

class DescriptionInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      description_string: this.props.description
    }
    this.onChange=this.onChange.bind(this)
    this.closeInput=this.closeInput.bind(this)
  }
  onChange(e){
    this.setState({description_string:e.target.value})
  }
  closeInput(){
    this.props.closeInput(this.state.description_string)
  }
  render(){
    return(
      <div className="input_container">
        <div className='input_box'>
          Beschreibung
          <textarea cols='20' rows='12' value={this.state.description_string} onChange={this.onChange} autoFocus placeholder='Einfügen oder Eingeben der Beschreibung'/>
          <button onClick={this.closeInput}>Speichern und Schließen</button>
        </div>
      </div>
    )
  }
}

export default DescriptionInput
