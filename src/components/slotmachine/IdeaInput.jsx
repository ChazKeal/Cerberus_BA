import React from 'react'

class IdeaInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      idea_string: this.props.idea
    }
    this.onChange=this.onChange.bind(this)
    this.closeIdeaInput=this.closeIdeaInput.bind(this)
  }
  onChange(e){
    this.setState({idea_string:e.target.value})
  }
  closeIdeaInput(){
    this.props.closeIdeaInput(this.state.idea_string)
  }
  render(){
    return(
      <div className="idea_input_container">
        <div className='idea_input_box'>
          Idee
          <textarea cols='20' rows='12' value={this.state.idea_string} onChange={this.onChange} autoFocus placeholder='Welche Idee hast du denn?'/>
          <button onClick={this.closeIdeaInput}>Speichern und Schließen</button>
        </div>
      </div>
    )
  }
}

export default IdeaInput
