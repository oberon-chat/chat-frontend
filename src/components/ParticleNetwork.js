import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import particleNetwork from '../lib/particle-network'

class ParticleNetworkComponent extends Component {
  componentDidMount () {
    const container = findDOMNode(this)
    const options = {
      background: 'inherit',
      density: 15000,
      velocity: 0.3
    }

    new particleNetwork(container, options) // eslint-disable-line
  }

  render () {
    const { classes, id } = this.props

    return (
      <div id={id} className={classes} />
    )
  }
}

export default ParticleNetworkComponent
