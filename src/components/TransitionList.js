import React, { Component } from 'react';

class TransitionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localItems: []
    }
  }

  componentDidMount() {
    this.setItemsFromProps();
  }

  componentDidUpdate(prevProps) {
    if (this.props.items.length !== prevProps.items.length) {
      const updatedLocalItems = this.state.localItems.map(item => ({ ...item, show: this.props.items.includes(item.value) }));
      const newItems = this.props.items.filter(item => !this.state.localItems.find(localItem => localItem.value === item))
                      .map(item => ({ value: item, show: false }));

      this.setState({
        localItems: updatedLocalItems.concat(newItems)
      }, () => {
        this.timeOut1 = setTimeout(() => {
          this.setState({
            localItems: this.state.localItems.map(item => ({ ...item, show: this.props.items.includes(item.value) }))
          })
        }, 0)
        
      });

      this.timeOut2 = setTimeout(this.setItemsFromProps, this.props.delay);
    }
  }

  componentWillUnmount() {
    if (this.timeOut1) clearTimeout(this.timeOut1);
    if (this.timeOut2) clearTimeout(this.timeOut2);
  }

  setItemsFromProps = () => {
    this.setState({
      localItems: this.props.items.map(item => ({value: item, show: true}))
    });
  }

  render() {
    return this.props.children(this.state.localItems);
  }
}

export default TransitionList;