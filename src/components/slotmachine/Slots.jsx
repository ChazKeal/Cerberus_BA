import React from 'react'
import { Link } from 'react-router-dom'
import Bild from '../../assets/pics/background_cerberus.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IdeaInput from './IdeaInput.jsx'

import Timer from 'react-compound-timer'

const MOTIVATIONAL_QUOTES = ['Gute Idee!',
'Das hatte noch niemand vor dir.',
'Damit kann man arbeiten.',
'Genial!',
'Das da niemand früher drauf gekommen ist.',
'Schöne Kombination.',
'Das war naheliegend.',
'Diese Wörter sind wie für einander gemacht.',
'Ohne übertreiben zu wollen: Super Einfall!',
'Was man daraus wohl alles machen könnte.',
'Schöner Einfall. ',
'Die Ideen fliegen die ja nur so zu.',
'Das hätte jeder gespeichert.',
'Dazu fallen mir tausend Dinge ein. Gut gemacht.',
'Weiter so Champ!',
'Mit diesen Ideen führst du das Projekt zum Erfolg.',
'Ich bin stolz auf dich.' ]

class Slot extends React.Component{
  constructor(props){
    super(props)
    this.state={
      lists: props.lists,
      word_one_id: null,
      word_two_id: null,
      word_three_id: null,
      save_counter: 0,
      old_state: null,
      word_one_fixed: false,
      word_one_hidden: false,
      word_two_fixed: false,
      word_two_hidden: false,
      word_three_fixed: false,
      word_three_hidden: false,
      word_one_input: false,
      word_two_input: false,
      word_three_input: false,
      random_idea_counter: 0,
      motivational_quote_id: null,
      cool_down: false,
      long_description_open: true,
      idea_input_open: false,
    }

    this.shuffle=this.shuffle.bind(this);
    this.scrollUp=this.scrollUp.bind(this);
    this.scrollDown=this.scrollDown.bind(this);
    this.saveCombination=this.saveCombination.bind(this);
    this.deleteWord=this.deleteWord.bind(this);
    this.addWord=this.addWord.bind(this);
    this.reDo = this.reDo.bind(this);
    this.toggleStateSwitch = this.toggleStateSwitch.bind(this);
    this.wordInput=this.wordInput.bind(this);
    this.randomIdeaCounterLoop=this.randomIdeaCounterLoop.bind(this)
    this.randomMotivator= this.randomMotivator.bind(this);
    this.resetRandomMotivator= this.resetRandomMotivator.bind(this);
    this.openIdeaInput= this.openIdeaInput.bind(this);
    this.closeIdeaInput= this.closeIdeaInput.bind(this);
  }
  componentDidMount(){
    setTimeout(this.randomIdeaCounterLoop, 0)
    // TODO: Change the starting time for the counter to 15000
    this.setState({
      word_one_id: Math.floor(Math.random()*(this.props.lists[1].length)),
      word_two_id: Math.floor(Math.random()*(this.props.lists[2].length)),
      word_three_id: Math.floor(Math.random()*(this.props.lists[3].length)),
    })
    document.addEventListener("keydown",this.handleKeyPress.bind(this))
  }

  componentWillUnmount(){
    if(this._randomIdeaCounterLoop){
      clearTimeout(this._randomIdeaCounterLoop)
      this._randomIdeaCounterLoop = 0
    }
  }

  shuffle(){
    if ( this.state.word_one_input || this.state.word_two_input || this.state.word_three_input){
      return
    }
    this.setState({
      word_one_id: !this.state.word_one_fixed ? Math.floor(Math.random()*(this.state.lists[1].length)) : this.state.word_one_id,
      word_two_id: !this.state.word_two_fixed ? Math.floor(Math.random()*(this.state.lists[2].length)) : this.state.word_two_id,
      word_three_id: !this.state.word_three_fixed ? Math.floor(Math.random()*(this.state.lists[3].length)) : this.state.word_three_id,
      old_state: this.state,
    })
  }
  scrollUp(target_id){
    if ( this.state.word_one_input || this.state.word_two_input || this.state.word_three_input){
      return
    }
    let new_id
    switch (target_id) {
      case '1':
        new_id = this.state.word_one_id + 1
        this.setState({word_one_id: (new_id >= this.state.lists[1].length ? 0 : new_id) })
        break;
      case '2':
        new_id = this.state.word_two_id + 1
        this.setState({word_two_id: (new_id >= this.state.lists[2].length ? 0 : new_id) })
        break;
      case '3':
        new_id = this.state.word_three_id + 1
        this.setState({word_three_id: (new_id >= this.state.lists[3].length ? 0 : new_id) })
        break;
      default: break;

    }
  }
  scrollDown(target_id){
    if ( this.state.word_one_input || this.state.word_two_input || this.state.word_three_input){
      return
    }
    let new_id
    switch (target_id) {
      case '1':
        new_id = this.state.word_one_id - 1
        this.setState({word_one_id: (new_id < 0 ? (this.state.lists[1].length-1) : new_id) })
        break;
      case '2':
        new_id = this.state.word_two_id - 1
        this.setState({word_two_id: (new_id < 0 ? (this.state.lists[2].length-1) : new_id) })
        break;
      case '3':
        new_id = this.state.word_three_id - 1
        this.setState({word_three_id: (new_id < 0 ? (this.state.lists[3].length-1) : new_id) })
        break;
      default: break;
    }
  }

  deleteWord(target_id){
    if ( this.state.word_one_input || this.state.word_two_input || this.state.word_three_input){
      return
    }
    let word_key
    switch (target_id) {
      case '1':
        word_key = "word_one_id"
        break;
      case '2':
        word_key = "word_two_id"
        break;
      case '3':
        word_key = "word_three_id"
        break;
      default: break;
    }
    this.setState({
      lists:{
        ...this.state.lists,
        [target_id]:this.state.lists[target_id].filter((element,index) =>  index !== this.state[word_key] )
      },
      [word_key]:0,
      old_state: this.state
    })
  }

  addWord(target_id, word_key, word_to_add, input_key, key){
    document.removeEventListener("keydown", this.handleKeyPress)
    const new_list = this.state.lists[target_id].slice(0)
    if (!(word_to_add === "")){ new_list.push("*" + word_to_add) }
    this.setState({
      lists:{
        ...this.state.lists,
        [target_id]:new_list
      },
      [word_key]:(!(word_to_add === "")) ? this.state.lists[target_id].length : this.state[word_key],
      [input_key]:false,
      [key]: !this.state[key],
      old_state: this.state
    })
  }

  wordInput(input_key, key){
    if ( this.state.word_one_input || this.state.word_two_input || this.state.word_three_input){
      return
    }
    this.setState({
      [input_key]: true
    })
    this.toggleStateSwitch(key)
  }

  toggleStateSwitch(key){
    if ( this.state.word_one_input || this.state.word_two_input || this.state.word_three_input){
      return
    }
    this.setState({[key]:!this.state[key], old_state: this.state})
  }

  saveCombination(input_string){
    if ( this.state.word_one_input || this.state.word_two_input || this.state.word_three_input){
      return
    }
    this.props.saveCombination([
      !this.state.word_one_hidden ? this.state.lists[1][this.state.word_one_id] : '', ' , ',
      !this.state.word_two_hidden ? this.state.lists[2][this.state.word_two_id] : '',' , ',
      !this.state.word_three_hidden ? this.state.lists[3][this.state.word_three_id] : '',' | ',
      input_string
    ])
    this.setState({save_counter: this.state.save_counter +1, random_idea_counter:this.state.random_idea_counter +1})
    if(Math.random() >= 0.6 && !this.state.cool_down) {this.randomMotivator()}
  }

  openIdeaInput(e){
    this.setState({idea_input_open:true})
  }

  closeIdeaInput(input_string){
    if(this.state.idea_input_open){
      this.props.saveIdea({
        idea_description: input_string
        })
      }
    this.saveCombination(input_string)
    this.setState({
      idea_input_open: false,
    })
  }

  reDo(){
    this.setState({...this.state.old_state, save_counter: this.state.save_counter, random_idea_counter:this.state.random_idea_counter})
  }

  randomIdeaCounterLoop(){
    if(Math.random() >= 0.99 ) {this.setState({random_idea_counter:this.state.random_idea_counter +1})}
    this._randomIdeaCounterLoop = setTimeout(this.randomIdeaCounterLoop, 50)
  }

  randomMotivator(){
    this.setState({cool_down: true, motivational_quote_id: Math.floor(Math.random() * (MOTIVATIONAL_QUOTES.length))})
    setTimeout(this.resetRandomMotivator, 10000)
  }
  resetRandomMotivator(){
    console.log("reset");
    this.setState({cool_down: false, motivational_quote_id: null})
  }
  handleKeyPress = (event) => {
    if(event.charCode === 82){
      this.shuffle()
     } else if (event.key === 'Enter' && this.state.idea_input_open === true){
         this.closeIdeaInput(this.props.input_string)
     } else {
       return
    }
  }

  render(){
    //const audio = new Audio("../public/sound.mp3")
    //const audio = new Audio("../public/sound.mp3")
    return(
      <div className="slotmachine_container">
        <img src={Bild}></img>
        <div className="item_container">
          {
            this.state.long_description_open ?
              <div className='long_description_box'>
                <div className='close_ld_box' onClick={ () => this.setState({long_description_open: false})}><FontAwesomeIcon icon="times-circle" className="exit_icon"></FontAwesomeIcon></div>
                <div className='long_description_text'>{this.props.long_description}</div>
              </div>
              :null
          }
          { (this.state.idea_input_open) ? <IdeaInput closeIdeaInput={this.closeIdeaInput} description={this.props.idea_description}/> : null}
          <div className="header_container">
            <div className='save_counter_box'>Ideas:{this.state.save_counter}</div>
            <div className='timer_box'>All Ideas:
              {this.state.random_idea_counter} <br/>
              <Timer>
                Time:
                <Timer.Minutes />{" min "}
                <Timer.Seconds />{" sec "}
              </Timer>
            </div>
          {  /* TODO: Einfügen von den Beschreibungen der Projekte. */}
            <div className='message_box'>{ (this.state.motivational_quote_id !== null) ? MOTIVATIONAL_QUOTES[this.state.motivational_quote_id] : this.props.short_description}</div>
              {
              !this.state.long_description_open ?
              <button className="menu_button" ><Link to="/app/menu"><FontAwesomeIcon icon="times-circle" className="exit_icon"/></Link></button>
              :null
              }
            <button className='redo_button' onClick={() => this.reDo()}><FontAwesomeIcon icon='redo' className='redo_icon'/></button>
          </div>
          <div className="box_container">
            {this.state.lists ? (
              <React.Fragment>
              <div className="box box_left">
                {!this.state.word_one_hidden ? this.state.lists[1][this.state.word_one_id]: null}
                {this.state.word_one_input ? <input className='add_word_box' type='text' autoFocus onKeyPress={(e) => {if (e.key==='Enter') this.addWord('1','word_one_id',e.target.value,"word_one_input","word_one_hidden") }}/>: null}
              </div>
              <div className="box box_middle">
                {!this.state.word_two_hidden ? this.state.lists[2][this.state.word_two_id] : null}
                {this.state.word_two_input ? <input className='add_word_box' type='text' autoFocus onKeyPress={(e) => {if (e.key==='Enter') this.addWord('2','word_two_id',e.target.value,"word_two_input","word_two_hidden") }}/>: null}
              </div>
              <div className="box box_right">
                {!this.state.word_three_hidden ? this.state.lists[3][this.state.word_three_id] : null}
                {this.state.word_three_input ? <input className='add_word_box' type='text' autoFocus onKeyPress={(e) => {if (e.key==='Enter') this.addWord('3','word_three_id',e.target.value,"word_three_input","word_three_hidden") }}/>: null}
              </div>
              </React.Fragment>): null}
          </div>
          <div className="button_container">
            <button className="save_button" onClick={this.openIdeaInput}><FontAwesomeIcon icon="lightbulb" className="lightbulb_icon"/></button>
            <button className="shuffle_button" onClick={this.shuffle} onKeyPress={this.handleKeyPress}><FontAwesomeIcon icon="random" className="random_icon"/></button>
            <div className="upper_buttons">
              <div className="upper_buttons_box1">
                <button className="buttons_upper_left word_up1" onClick={() => this.scrollUp("1")}><FontAwesomeIcon icon="arrow-up" className="arrow_up_icon"/></button>
                <button className="buttons_upper_right word_down1" onClick={() => this.scrollDown("1")}><FontAwesomeIcon icon="arrow-down" className="arrow_down_icon"/></button>
                <button className="buttons_upper_left add_word1" onClick={() => this.wordInput("word_one_input","word_one_hidden")}><FontAwesomeIcon icon="plus" className="plus_icon"/></button>
                <button className="buttons_upper_right delete_word1" onClick={() => this.deleteWord("1")}><FontAwesomeIcon icon="minus" className="minus_icon"/></button>
              </div>
              <div className="upper_buttons_box2">
                <button className="buttons_upper_left word_up2" onClick={() => this.scrollUp("2")}><FontAwesomeIcon icon="arrow-up" className="arrow_up_icon"/></button>
                <button className="buttons_upper_right word_down2" onClick={() => this.scrollDown("2")}><FontAwesomeIcon icon="arrow-down" className="arrow_down_icon"/></button>
                <button className="buttons_upper_left add_word2" onClick={() => this.wordInput("word_two_input","word_two_hidden")}><FontAwesomeIcon icon="plus" className="plus_icon"/></button>
                <button className="buttons_upper_right delete_word2" onClick={() => this.deleteWord("2")}><FontAwesomeIcon icon="minus" className="minus_icon"/></button>
                </div>
              <div className="upper_buttons_box3">
                <button className="buttons_upper_left word_up3" onClick={() => this.scrollUp("3")}><FontAwesomeIcon icon="arrow-up" className="arrow_up_icon"/></button>
                <button className="buttons_upper_right word_down3" onClick={() => this.scrollDown("3")}><FontAwesomeIcon icon="arrow-down" className="arrow_down_icon"/></button>
                <button className="buttons_upper_left add_word3" onClick={() => this.wordInput("word_three_input","word_three_hidden")}><FontAwesomeIcon icon="plus" className="plus_icon"/></button>
                <button className="buttons_upper_right delete_word3" onClick={() => this.deleteWord("3")}><FontAwesomeIcon icon="minus" className="minus_icon"/></button>
              </div>
            </div>
            <div className="lower_buttons">
                <button className="buttons_down fixed1" onClick={() => this.toggleStateSwitch('word_one_fixed')} ><FontAwesomeIcon icon={this.state.word_one_fixed ? "lock":"lock-open" } className="lock_icon"/></button>
                <button className="buttons_down fixed2" onClick={() => this.toggleStateSwitch('word_two_fixed')} ><FontAwesomeIcon icon={this.state.word_two_fixed ? "lock":"lock-open" } className="lock_icon"/></button>
                <button className="buttons_down fixed3" onClick={() => this.toggleStateSwitch('word_three_fixed')} ><FontAwesomeIcon icon={this.state.word_three_fixed ? "lock":"lock-open" } className="lock_icon"/></button>
                <button className={"buttons_down hiddenbox" + (this.state.word_one_hidden ? ' hidden' : '')} onClick={() => this.toggleStateSwitch('word_one_hidden')} ><FontAwesomeIcon icon="ban" className="ban_icon"/></button>
                <button className={"buttons_down hiddenbox" + (this.state.word_two_hidden ? ' hidden' : '')} onClick={() => this.toggleStateSwitch('word_two_hidden')} ><FontAwesomeIcon icon="ban" className="ban_icon"/></button>
                <button className={"buttons_down hiddenbox" + (this.state.word_three_hidden ? ' hidden' : '')} onClick={() => this.toggleStateSwitch('word_three_hidden')} ><FontAwesomeIcon icon="ban" className="ban_icon"/></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Slot
