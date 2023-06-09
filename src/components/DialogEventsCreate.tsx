import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useState } from 'react'

export const DialogEventsCreate = ({
  onClose,
  updateEvents,
  eventsList,
  calendarRef,
}) => {
  const [eventDate, eventDateSet] = useState('')
  const handleDateChange = (event) => {
    eventDateSet(event.target.value)
  }
  const createEvent = () => {
    debugger
    /* const inputDate = eventDate // Store the input date value */
    /* const [year, month, day] = inputDate.split('-')
    const formattedDate = `${year}-${month}-${day}` // Convert to YYYY-MM-DD format */

    /* const calendarApi = calendarRef.current.getApi() */
    /* calendarApi.addEvent({
      title: 'New evento',
      start: eventDate,
      allDay: true,
    }) */
    updateEvents([
      ...eventsList,
      {
        title: 'New evento',
        start: eventDate,
        allDay: true,
      },
    ])
    onClose()
  }
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Creazione evento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Inserisci la data dell&apos;evento
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="event-date"
          type="date"
          fullWidth
          variant="standard"
          value={eventDate}
          onChange={handleDateChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annulla</Button>
        <Button onClick={createEvent}>Crea</Button>
      </DialogActions>
    </Dialog>
  )
}