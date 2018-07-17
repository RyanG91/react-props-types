import React from 'react'
import styledcomponents from 'styled-components'
import types from 'prop-types'


function Bookmark (props) {
  const { _id, title, url, remove } = props
  return (
    <li>
      {title} (<a href={url} target="_blank">Visit</a>)
      <button onClick={ () => remove(_id) }>Delete!</button>
    </li>
  )
}

Bookmark.propTypes = {
  bookmark: types.shape({
    _id: types.string,
    title: types.string.isRequired,
    url: types.string.isRequired,
  }).isRequired,
  remove: types.func,
  // foo: types.oneOf(['bar', 'bat'])
}

export default Bookmark
