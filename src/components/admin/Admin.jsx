import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Bild from '../../assets/pics/Cerberus_saves_background.png'
import ListInput from './ListInput.jsx'
import DescriptionInput from './DescriptionInput.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Administator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      input_open:false,
      open_list_id:null,
      open_description_id: null
    }
    this.openListInput=this.openListInput.bind(this)
    this.closeInput=this.closeInput.bind(this)
    this.getListFromId=this.getListFromId.bind(this)
    this.getDescriptionFromId=this.getDescriptionFromId.bind(this)
    this.goToMenu=this.goToMenu.bind(this)
    this.openDescriptionInput=this.openDescriptionInput.bind(this)
  }
  openListInput(e){
    //console.log(e.target.id)
    this.setState({open_list_id:e.target.id,input_open:true})
  }

  openDescriptionInput(e){
    this.setState({open_description_id:e.target.id,input_open:true})
  }

  closeInput(input_string){
    if(this.state.open_list_id){
      this.props.saveLists({
        ...this.props.lists,
        [this.state.open_list_id]:input_string.split(', ')
      })
    }
    if(this.state.open_description_id){
      if (this.state.open_description_id === "1") {
        this.props.saveDescriptions({
          long_description: input_string
        })
      }
      if (this.state.open_description_id === "2") {
        this.props.saveDescriptions({
          short_description: input_string
        })
      }
    }
    this.setState({
      open_list_id: null,
      open_description_id: null,
      input_open: false
    })
  }
  getListFromId(){
    return this.props.lists[this.state.open_list_id]
  }
  getDescriptionFromId(){
    if (this.state.open_description_id === "1") {
      return this.props.long_description
    }
    if (this.state.open_description_id === "2") {
      return this.props.short_description
    }
    return ""
  }
  goToMenu(){
    this.props.history.push('/menu')
  }
  render(){
    console.log(this.props);
    return(
      <div className="intro">
        <img src={Bild}></img>
        <div className="all_container">
            <button className='exit_button'><Link to="/app/menu"><FontAwesomeIcon icon="times-circle" className="exit_icon"/></Link></button>
          <div className="cases">
            <div id='1' className="case link1" onClick= {this.openListInput}>Liste1</div>
            <div id='2' className="case link2" onClick= {this.openListInput}>Liste2</div>
            <div id='3' className="case link3" onClick= {this.openListInput}>Liste3</div>
            <div className='case task_description_long' id= '1' onClick= {this.openDescriptionInput}>Lange Beschreibung der Aufgabe</div>
            <div className='case task_description_kurz' id= '2' onClick= {this.openDescriptionInput}>Kurze Beschreibung der Aufgabe</div>
          </div>
          { (this.state.input_open && this.state.open_list_id)  ? <ListInput closeInput={this.closeInput} list_id={this.state.open_list_id} list={this.getListFromId()}/> : null}
          { (this.state.input_open && this.state.open_description_id) ? <DescriptionInput closeInput={this.closeInput} description={this.getDescriptionFromId()}/> : null}
          <div className= 'text'>Admin Page <br />
            <strong>Upload der Listen</strong><br />
            Auf dieser Seite können sie die Listen hochladen,
            mit denen sie die Ideenfindung durchführen wollen, sowie eine
            kurze Aufgabenstellung für die Probanden.
            Es können bis zu drei Wortlisten hochgeladen werden,
            die dann entsprechend randomisiert werden.
            Die Listen werden untereinander nicht gemischt. Die Wortlisten
            werden lediglich zufällige Einträge anzeigen.
            Die Wörter müssen wie folgt: <strong style={{color: "red"}}>Wort1, Wort2, Wort3,... </strong>
          voneinander getrennt sein. Also ein Komma und dann ein Leerzeichen zwischen jedem Wort.
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Administator)
