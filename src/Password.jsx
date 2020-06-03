import React, { Component } from 'react';

import zxcvbn from 'zxcvbn'

import { connect } from 'react-redux'
import { addPassword } from './actions'

const styles = {
  button: {
    width: '100%',
    margin:'0.5em 0',
    padding: '0.5em',
    border: '4px solid #4687D3',
    borderRadius: '6px',
    background: '#4A90E2',
    color: '#fff'
  }
}

class Password extends Component {
  constructor(props) {
    super(props)
    this.state = { password: 'p@ssw0rd', name: null }
  }

  generatePassword() {
    // generate a password here
    let password = ""
    for (let i = 0; i < 8; i += 1) {
      const code = Math.floor(Math.random() * (126 - 33 + 1)) + 33;
      password += String.fromCharCode(code)
    }
    this.setState({ password })
  }

  render() {
    let p = this.state.password;
    console.log(p)
    const rating = zxcvbn(p);
    console.log(rating)
    // p = p.slice(0, 3) + " - " + p.slice(3, 5) + " - " + p.slice(5, 8);  // uncomment for formatting
    return (
      <div>
        <div>
          <input
            placeholder="name"
            value={this.state.name}
            onChange={(e) => {this.setState({ name: e.target.value })}}
            type="text"
          />
          <input
          type="text"
            onChange={(e) => {this.setState({ password: e.target.value })}}
            value={this.state.password}
          />
          {rating ? <p>Password Strength: {rating.score + 1}/5</p> : <></>}
          
        </div>
        <div>
          <button className='button' onClick={(e) => {
            this.generatePassword()
          }}>Generate</button>
        </div>
        <div>
          <button style={styles.button} onClick={(e) => {
            this.props.addPassword(this.state.name, this.state.password)
          }}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = () => {
  return {
    addPassword
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Password);