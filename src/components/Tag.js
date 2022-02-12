import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Tag = ({ name, index, onDeleteClick }) => {
  return (
    <span className="flex flex-row flex-nowrap items-center bg-gray-50 rounded-lg px-2 py-1 mr-3 my-1">
      <span>{ name }</span>
      <button className="ml-2 h-5 w-5 flex items-center justify-center rounded-sm hover:bg-gray-200 text-gray-400 transition-colors duration-500">
        <FontAwesomeIcon icon={faTimes} onClick={() => onDeleteClick(index)} />
      </button>
    </span>
  )
}

export default Tag;