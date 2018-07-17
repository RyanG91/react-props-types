import React from 'react'
import store from '../store'
import styledcomponents from 'styled-components'
import types from 'prop-types'
import { api } from '../api/init'
import BookmarkList from './BookmarkList'

class BookmarkListContainer extends React.Component {
  remove = (id) => {
    store.dispatch({ type: 'delete_bookmark', id })
  }

  async componentDidMount() {
    try {
      const bookmarks = await api.get('/bookmarks')
      this.setState({ bookmarks: bookmarks.data })
    }
    catch(error) {
      alert('Can\'t get bookmarks!')
    }
  }

  render() {
    const { bookmarks } = store.getState() || []

    return (
      <BookmarkList bookmarks={bookmarks} remove={this.remove} />
    )
  }
}

export default BookmarkListContainer
