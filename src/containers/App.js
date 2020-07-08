import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary'


class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: '',
      bgcolor1: '#8da0a0',
      bgcolor2: '#071B52'

    }
  }

  componentDidMount() {

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) });
  }
  componentDidUpdate() {
    let colorChange = `linear-gradient(to right, ${this.state.bgcolor1}, ${this.state.bgcolor2}`

    document.body.style.background = colorChange;

  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }
  onBgChange1 = (event) => {
    this.setState({ bgcolor1: event.target.value })

  }
  onBgChange2 = (event) => {
    this.setState({ bgcolor2: event.target.value })

  }
  render() {
    const { robots, searchfield, bgcolor2, bgcolor1 } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc' >
          <h1 className='f1  hover-navy ' >RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <div className=' tc'>
            <p className='dib v-mid pokemon awesome f4 ttu tracked-mega mt0 b' >Change Background</p>
          <input type='color' value={bgcolor1} className='grow pa0 ma2 ' onChange={this.onBgChange1}></input>
          <input type='color' value={bgcolor2} className='grow pa0 ma2 ' onChange={this.onBgChange2}></input>
          </div>
          
          <hr className='style-one'></hr>

          <Scroll >

            <ErrorBoundary>

              <CardList robots={filteredRobots} />
            </ErrorBoundary>

          </Scroll>


        </div>
      );
  }
}

export default App;