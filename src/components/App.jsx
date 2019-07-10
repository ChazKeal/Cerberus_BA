import React from "react";

import Menu from "./menu/Menu.jsx";
import Slots from "./slotmachine/Slots.jsx";
import Admin from "./admin/Admin.jsx";
import Save from "./saves/Saves.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRandom,
  faSave,
  faPlus,
  faMinus,
  faLock,
  faLockOpen,
  faBan,
  faArrowUp,
  faArrowDown,
  faTimesCircle,
  faRedo,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faRandom,
  faSave,
  faPlus,
  faMinus,
  faLock,
  faLockOpen,
  faBan,
  faArrowUp,
  faArrowDown,
  faTimesCircle,
  faRedo,
  faLightbulb
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists : null,
      text: {
        short_description: "",
        long_description: "",
        saved_combinations: [],
      }
    };
    this.saveLists = this.saveLists.bind(this);
    this.saveDescriptions = this.saveDescriptions.bind(this);
    this.saveCombination = this.saveCombination.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:4000/lists")
      .then(response => response.json())
      .then(lists => this.setState({ ...this.state, ...lists }));

    fetch("http://localhost:4000/text")
      .then(response => response.json())
      .then(text => this.setState({ ...this.state, ...text }));
  }

  saveLists(data) {
    this.setState({ lists: data });
  }
  saveDescriptions(data) {
    this.setState({text:{ ...this.state.text, ...data }});
  }
  saveCombination(data) {
    this.setState({
      ...this.state,
      text: {
        ...this.state.text,
        saved_combinations: [...this.state.text.saved_combinations, data]
      }
    });
  }


  render() {
    console.log(this.state);
    return (
      <div className="App">
        {this.props.match.params.category === "admin" ? (
          <Admin
            lists={this.state.lists}
            saveLists={this.saveLists}
            saveDescriptions={this.saveDescriptions}
            short_description={this.state.text.short_description}
            long_description={this.state.text.long_description}
          />
        ) : null}
        {this.props.match.params.category === "slot" ? (
          <Slots
            lists={this.state.lists}
            short_description={this.state.text.short_description}
            long_description={this.state.text.long_description}
            saveCombination={this.saveCombination}
          />
        ) : null}
        {this.props.match.params.category === "menu" ? <Menu /> : null}
        {this.props.match.params.category === "saves" ? (
          <Save saved={this.state.text.saved_combinations} />
        ) : null}
      </div>
    );
  }
}
export default App;
