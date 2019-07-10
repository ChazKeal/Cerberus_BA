import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    this.props.closeIdeaInput()
  }

  // handleKeyPress = (event) => {
  //   if (event.key === 'Enter'){
  //    this.props.closeIdeaInput(this.state.idea_string)
  // } else {
  //   return
  // }
//  }
  render(){
    return(
        <div className='idea_input_box'>
          <textarea className='text_area_idea 'cols='20' rows='12' value={this.state.idea_string} onChange={this.onChange} autoFocus placeholder='Welche Idee hast du denn?'/>
          <button className='close_idea_button' onClick={this.closeIdeaInput}><FontAwesomeIcon icon="save" className="save_icon"/></button>
        </div>
    )
  }
}

export default IdeaInput
