import React from 'react'

class Tagline extends React.Component {
  constructor(props) {
    super(props)

    this.perks = [
      'A Seoul based user interface & frontend developer',
      'I build digital products with 🔥',
      'Got anything in mind?',
      'Hit me up with email.'
    ]

    this.state = {
      perk: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick = () => {
    let perk = this.state.perk

    this.setState({
      perk: perk === this.perks - 1 ? 0 : ++perk
    })
  }

  render() {
    const { perk } = this.state

    return (
      <p className="perks">
        {this.perks[perk]}
        <style jsx>{`
          .perks {
            display: none;
          }
          @media screen and (min-width: 768px) {
            .perks {
              display: block;
              margin-top: 2.5rem;
            }
          }
        `}</style>
      </p>
    )
  }
}

export default Tagline
