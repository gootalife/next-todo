import { Task } from '@prisma/client'
import { ToDo } from 'components/ToDo'
import Head from 'next/head'
import { useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import prisma from 'utils/prisma'

type Props = {
  tasks: Task[]
}

const Index = (props: Props) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Head>
        <title>ToDoApp</title>
      </Head>
      <Container>
        <h1>ToDoApp</h1>
        {props.tasks.map((task) => (
          <ToDo task={task} key={task.uuid}></ToDo>
        ))}
        <Button variant="primary" onClick={handleShow}>
          Add
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New ToDo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const tasks = await prisma.task.findMany()
  const props: Props = {
    tasks: tasks
  }
  return {
    props: props
  }
}

export default Index
