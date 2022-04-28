import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { ReactNode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header></Header>
      <main className="my-3 layout">{children}</main>
      {/* <Footer></Footer> */}
    </>
  )
}
