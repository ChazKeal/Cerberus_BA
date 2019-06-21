import React from 'react'

import Menu from './menu/Menu.jsx'
import Slots from './slotmachine/Slots.jsx'
import Admin from './admin/Admin.jsx'
import Save from './saves/Saves.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faRandom, faSave, faPlus, faMinus, faLock, faLockOpen, faBan, faArrowUp, faArrowDown,faTimesCircle, faRedo,} from '@fortawesome/free-solid-svg-icons'

library.add(
  faRandom, faSave, faPlus, faMinus, faLock, faLockOpen, faBan, faArrowUp, faArrowDown,faTimesCircle, faRedo,
)

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      lists: {
        1: ["A","B","C","D","E","F"],
        2: ["A","B","C","D","E","F"],
        3: ["A","B","C","D","E","F"],
      },
      short_description: "Du bist hier, weil du eine Idee brauchst. Mal sehen was dir so einfällt.",
      long_description: "Dies ist eine Ideengenerierung die auf dem Prinzip der Semantischen Intuition basiert. Nutze die Knöpfe die dir gegeben sind um die das Erlebnis anzupassen.",
      saved_combinations: []
    }
    this.saveLists=this.saveLists.bind(this)
    this.saveDescriptions=this.saveDescriptions.bind(this)
    this.saveCombination=this.saveCombination.bind(this)
  }
  saveLists(data){
    this.setState({lists:data})
  }
  saveDescriptions(data){
    this.setState({...this.state, ...data})
  }
  saveCombination(data){
    this.setState({saved_combinations: [...this.state.saved_combinations, data]})
  }
  render(){
    console.log(this.state);
    return(
      <div className='App'>
        { this.props.match.params.category === 'admin' ? <Admin lists={this.state.lists} saveLists={this.saveLists} saveDescriptions={this.saveDescriptions} short_description={this.state.short_description} long_description={this.state.long_description}/>:null}
        { this.props.match.params.category === 'slot' ? <Slots lists={this.state.lists} short_description={this.state.short_description} long_description={this.state.long_description} saveCombination= {this.saveCombination}/>:null}
        { this.props.match.params.category === 'menu' ? <Menu/>:null}
        { this.props.match.params.category === 'saves' ? <Save saved={this.state.saved_combinations}/>:null}
      </div>
    )
  }
}

export default App;
