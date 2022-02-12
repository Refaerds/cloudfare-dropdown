import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DisplayTransition from './DisplayTransition';
import TagsList from './TagsList';
import SuggestionsList from './SuggestionsList';
import debounce from 'lodash.debounce';

class Seletor extends Component {

  constructor() {
    super();
    this.state = {
      selectedItems: [],
      items: [],
      inputValue: '',
      suggestedItems: [],
      loading: true,
      showAddBtn: true,
      showInput: false,
      showSuggestedItems: false
    }
  }

  componentDidMount() {
    fetch('http://api.open-notify.org/astros.json')
      .then(response => (response.json()))
      .then(data => this.setState({ items: data.people.map(person => (person.name)).sort() }))
      .catch(() => alert('Failed to get the list of astronauts. The dropdown will not suggest options.'))
      .finally(() => this.setState({ loading: false }))
  }

  componentDidUpdate(prevProps, prevState) {
    const itemsUpdated = this.state.items.length !== prevState.items.length;
    const selectedItemsUpdated = this.state.selectedItems.length !== prevState.selectedItems.length;
    const inputUpdated = this.state.inputValue !== prevState.inputValue;

    if (itemsUpdated || selectedItemsUpdated || inputUpdated) {
      this.setState({
        suggestedItems: this.state.items.filter(item => 
                          !this.state.selectedItems.includes(item) 
                            && (!this.state.inputValue 
                              || (this.state.inputValue && item.toLowerCase().startsWith(this.state.inputValue.toLowerCase()))))
      });
    }

    if (!this.state.showInput && this.state.showSuggestedItems) this.setState({showSuggestedItems: false})
  }

  showInput = () => {
    this.setState({ showAddBtn: false });
    setTimeout(() => this.setState({ showInput: true }), 300);
  };

  hideInput = () => {
    if (!this.state.inputValue) {
      this.setState({ showInput: false });
    }
  }

  showAddBtn = () => {
    if (!this.state.showInput) this.setState({ showAddBtn: true });
  }

  hideAddBtn = () => {
    if (this.state.showAddBtn && this.state.selectedItems.length) {
      this.setState({ showAddBtn: false });
    }
  }

  deleteTag = (index) => {
    this.setState({ selectedItems: this.state.selectedItems.filter((item, i) => i !== index) });
  }

  onInput = (e) => {
    const debounced = debounce(() => this.updateDropdownItems(e.target.value), 500);
    debounced();
  }

  updateDropdownItems = (inputValue) => {
    this.setState({ inputValue: inputValue.trim() });
  }

  showSuggestedItems = () => {
    this.setState({ showSuggestedItems: true });
  }

  selectItem = (item, delay) => {
    this.setState({ showInput: false }, () => {
      setTimeout(() => {
        this.setState({
          selectedItems: [...this.state.selectedItems, item],
          inputValue: ''
        })
      }, delay)
    });
  }

  render() {
    return (
      <div className="mt-40 text-center">
        {
          this.state.loading 
            ? <p>Loading...</p>
            : <div className="flex flex-row flex-wrap items-center w-7/12 mx-auto my-40 bg-white rounded-xl px-3 py-2" 
                    style={{ minHeight: '3.5rem' }}
                    onMouseEnter={this.showAddBtn} 
                    onMouseLeave={this.hideAddBtn}
              >
                <TagsList tags={this.state.selectedItems} onDeleteClick={this.deleteTag}></TagsList>
                
                <DisplayTransition show={this.state.showAddBtn}>
                  <button className="bg-transparent p-1 text-gray-400 my-1 font-medium" onClick={this.showInput}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-2">Add tag</span>
                  </button>
                </DisplayTransition>

                <div className="relative">
                  <DisplayTransition show={this.state.showInput}>
                    <input type="text" className="caret-gray-300 p-1 outline-none my-1 font-medium" autoFocus 
                            onFocus={this.showSuggestedItems}
                            onBlur={this.hideInput} 
                            onInput={this.onInput}
                    />
                  </DisplayTransition>
                  
                  <DisplayTransition show={this.state.showSuggestedItems}>
                    <SuggestionsList options={this.state.suggestedItems} inputValue={this.state.inputValue} onSelectItem={this.selectItem} />
                  </DisplayTransition>
                  
                </div>
              </div>
        }
      </div>
    )
  }
}

export default Seletor;