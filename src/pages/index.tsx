import styles from '@/styles/Home.module.css'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'

import { Inter } from 'next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const calendarRef = useRef<React.Ref>()

  const events = [
    { title: 'event 1', date: new Date() },
    { title: 'event 2', date: '2023-06-06' },
  ]
  const headerToolbar = {
    left: 'myCustomButton',
    center: 'title',
  }
  const handleDateClick = (arg: DateClickArg) => {
    console.log('handleDateClick arg:', arg)
  }
  const handleEventClick = (arg: EventClickArg) => {
    console.log('handleEventClick arg:', arg)
  }
  const handleEventAdd = (eventAddArg: EventAddArg) => {
    eventAddArg.revert()
  }
  const customButtons = {
    myCustomButton: {
      text: 'Crea evento',
      click: (arg) => {
        console.log('arg:', arg)
        const dateStr = prompt('Enter a date in YYYY-MM-DD format')
        const date = new Date(dateStr + 'T00:00:00') // will be in local time

        if (!isNaN(date.valueOf())) {
          // valid?
          const calendarApi = calendarRef.current.getApi()
          calendarApi.addEvent({
            title: 'dynamic event',
            start: date,
            allDay: true,
          })
        } else {
          alert('Invalid date.')
        }
      },
    },
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventAdd={handleEventAdd}
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
