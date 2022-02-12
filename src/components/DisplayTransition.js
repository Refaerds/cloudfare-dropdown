import React, { Component } from 'react';

class DisplayTransition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      style: '',
      delay: 300
    }

    this.style = {
      show: 'opacity-100',
      hide: 'opacity-0'
    }
  }

  componentDidMount() {
    if (this.props.transitionHeight) {
      this.style = {
        show: 'max-h-20 opacity-100',
        hide: 'max-h-0 opacity-0'
      };
    }

    if (this.props.delay) this.setState({delay: this.props.delay});

    this.setState({style: this.style.hide}, () => {
      if (this.props.show) this.showChild();
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      if (this.props.show) setTimeout(this.showChild, 0);
      else this.hideChild();
    }
  }

  showChild = () => {
    this.setState({
      style: this.style.show,
      show: true
    })
  }

  hideChild = () => {
    this.setState({style: this.style.hide});
  }

  onTransitionEnd = () => {
    this.setState({show: this.props.show});
  }

  render() {
    return (
      <div className={`transition-all duration-${this.state.delay} ${this.state.style}`} onTransitionEnd={this.onTransitionEnd}>
        { this.state.show ? this.props.children : null }
      </div>
    )
  }
}

export default DisplayTransition;