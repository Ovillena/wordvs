import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import socketService from '../services/socketService'
import './app.css'

function MyApp({ Component, pageProps }: AppProps) {
  // const connect = ()=>{
  // const socket = io("http://localhost:8080");

  // socket.on("connect", ()=>{
  //   socket.emit("custom_event", {name:"bozo"})
  // })
  // }

  const connectSocket = async () => {
    const socket = await socketService
      .connect('http://localhost:8080')
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    console.log('useEffect')
    connectSocket()
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
