import React from 'react';
import DisplayTransition from './DisplayTransition';
import TransitionList from './TransitionList';
import Tag from './Tag';

const TagsList = ({ tags, onDeleteClick }) => {
  const delay = 300;

  return (
    <>
      <TransitionList items={tags} delay={delay}>
        {tags => (
          tags.map((tag, i) => (
            <DisplayTransition show={tag.show} key={'tag-' + i} delay={delay}>
              <Tag name={tag.value} index={i} onDeleteClick={onDeleteClick}/>
            </DisplayTransition>
          ))
        )}
      </TransitionList>
    </>
  )
}

export default TagsList;