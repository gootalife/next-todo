import Head from 'next/head'
import { Container } from 'react-bootstrap'
import { ToDo } from 'components/ToDo'

const Index = () => {
  return (
    <>
      <Head>
        <title>ToDoApp</title>
      </Head>
      <Container>
        <h1>ToDoApp</h1>
        <ToDo></ToDo>
      </Container>
    </>
  )
}

export default Index
