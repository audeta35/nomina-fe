import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from './login'
import Loading from '../component/loading'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if(window.sessionStorage.getItem('session')) {
      router.replace('/hobby');
    } else {
      router.replace('/login');
    }
  }, [])

  return (
    <Loading />
  )
}
