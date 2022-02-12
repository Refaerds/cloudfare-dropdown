import React from 'react';
import DisplayTransition from './DisplayTransition';
import TransitionList from './TransitionList';

const SuggestionsList = ({ options, onSelectItem, inputValue }) => {
  const delay = 500;

  return (
    <ul className="absolute top-full left-0 w-max mt-4 bg-white rounded-lg py-2 text-left">
      <TransitionList items={options} delay={delay}>
        {suggestedItems => (
          suggestedItems.map((item, i) => (
            <DisplayTransition show={item.show} key={'option-' + i} transitionHeight delay={delay}>
            <li className="w-full px-3 py-1 hover:bg-gray-50 cursor-pointer" 
              onClick={() => onSelectItem(item.value, delay)}
            >
              {item.value}
            </li>
          </DisplayTransition>
          ))
        )}
      </TransitionList>

      <DisplayTransition show={inputValue} delay={delay}>
        <li className="w-full px-3 py-1 hover:bg-gray-50 cursor-pointer" onClick={() => onSelectItem(inputValue, delay)}>
          <span className="text-gray-300">Create </span>
          <span>{inputValue}</span>
        </li>
      </DisplayTransition>
    </ul>
  )
}

export default SuggestionsList;