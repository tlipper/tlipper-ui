import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Channel from './Channel'
import { PaginatedList } from 'react-paginated-list'

export const ChannelsComponent = ({channels, classes, loadChannels, createChannel}) => {
  const [newChannelName, setNewChannelName] = useState("")

  useEffect(() => {
    loadChannels()
  }, []);

  const handleNewChannelInput = (e) => {
    setNewChannelName(e.target.value)
  }

  const handleNewChannelSubmit = (e) => {
    e.preventDefault()
    createChannel(newChannelName)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <PaginatedList list={channels} itemsPerPage={6} renderList={(list) => (
          <Grid container spacing={1}>
            <>{list.map((channel, index) => (
              <Grid key={index} item xs={3}>
                <Channel {...channel} classes={classes} />
              </Grid>
            ))}</>
          </Grid>
        )} />
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleNewChannelSubmit}>
          <label>
            Name:
            <input type="text" value={newChannelName} onChange={handleNewChannelInput} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Grid>
    </Grid>
  )
}

ChannelsComponent.propTypes = {
  channels: PropTypes.arrayOf(
		PropTypes.shape({
      display_name: PropTypes.string.isRequired 
    })
  )
}
