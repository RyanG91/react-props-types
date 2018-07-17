import React from 'react'
import styledcomponents from 'styled-components'
import types from 'prop-types'
import Bookmark from './Bookmark'

export default class BookmarkList extends React.Component {
  static propTypes = {
    bookmarks: types.arrayOf(types.shape({
      _id: types.string,
      title: types.string.isRequired,
      url: types.string.isRequired,
    })).isRequired,
    remove: types.func
  }

  render() {
    return (
      <div>
        <h1>Bookmarks</h1>
        <ul>
        {
          this.props.bookmarks.map(
            bookmark => <Bookmark key={bookmark._id} bookmark={bookmark} remove={this.props.remove} />
          )
        }
        </ul>
      </div>
    )
  }
}
