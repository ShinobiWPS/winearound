import { DialogEventsCreate } from '@/components/DialogEventsCreate'
import useModal from '@/hooks/useModal'
import { EventAddArg, EventClickArg } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import {
  Box,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material'

import Head from 'next/head'
import { useRef } from 'react'

export default function Home() {
  const calendarRef = useRef<React.Ref>()

  const [isVisible, isVisibleSet] = useModal()

  const events = [
    { title: 'event 1', date: new Date() },
    { title: 'event 2', date: '2023-06-05' },
  ]
  const headerToolbar = {
    left: 'myCustomButton',
    center: 'title',
  }
  const handleEventClick = (arg: EventClickArg) => {
    if (arg.jsEvent.shiftKey) arg.event.remove()
  }
  const handleEventAdd = (eventAddArg: EventAddArg) => {
    eventAddArg.revert()
  }

  const customButtons = {
    myCustomButton: {
      text: 'Crea evento',
      click: () => isVisibleSet(false),
    },
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Typography variant="h3" gutterBottom align="center">
            Calendario Eventi
          </Typography>
        </header>
        <main>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item>
              <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                nowIndicator={true}
                headerToolbar={headerToolbar}
                customButtons={customButtons}
                eventClick={handleEventClick}
                eventAdd={handleEventAdd}
              />
            </Grid>
          </Grid>
        </main>
        <Box component="footer" sx={{ bgcolor: '#f0f0f0', py: 2 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  sagittis tellus vitae neque tempus, sed fringilla tellus
                  tincidunt.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">Contact</Typography>
                <Typography variant="body2">
                  Address: 123 Main St, City, Country
                  <br />
                  Phone: +1 234 567 890
                  <br />
                  Email: info@example.com
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">Links</Typography>
                <List>
                  <ListItem>
                    <Link href="/" underline="hover">
                      Home
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/about" underline="hover">
                      About
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/services" underline="hover">
                      Services
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="/contact" underline="hover">
                      Contact
                    </Link>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">Follow Us</Typography>
                <List>
                  <ListItem>
                    <Link href="https://twitter.com" underline="hover">
                      Twitter
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://facebook.com" underline="hover">
                      Facebook
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://instagram.com" underline="hover">
                      Instagram
                    </Link>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      {/* qui avrei usato un Portal che su next richiede un filo di codice in piu */}
      {isVisible && (
        <DialogEventsCreate
          onClose={() => isVisibleSet(false)}
          calendarRef={calendarRef}
        />
      )}
    </>
  )
}
