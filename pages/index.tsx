import Head from 'next/head'
import { useState } from 'react'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'
import { Task } from '@prisma/client'
import { ToDo } from 'components/ToDo'
import prisma from 'utils/prisma'

type Props = {
  tasks: Task[]
}

const Index = (props: Props) => {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isOk, setIsOk] = useState(true)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const handleSave = async () => {
    const param: Partial<Task> = {
      title: title,
      content: content
    }
    try {
      const res = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      if (res.ok) {
        setIsOk(true)
        setShow(false)
      } else {
        setIsOk(false)
      }
    } catch (err) {
      setIsOk(false)
    }
  }
  const handleDelete = async (uuid: string) => {
    try {
      const param: Partial<Task> = {
        uuid: uuid
      }
      const res = await fetch('/api/task', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      if (res.ok) {
        setShow(false)
        setIsOk(true)
      } else {
        setIsOk(false)
      }
    } catch (err) {
      setIsOk(false)
    }
  }

  return (
    <>
      <Head>
        <title>ToDoApp</title>
      </Head>
      <Container>
        <h1>ToDoApp</h1>
        {props.tasks.map((task) => (
          <>
            <hr key={task.uuid + '_hr'} />
            <ToDo task={task} key={task.uuid}></ToDo>
            <Button
              variant="primary"
              onClick={async () => {
                await handleDelete(task.uuid)
              }}
            >
              Delete
            </Button>
          </>
        ))}
        <hr />
        <Button variant="primary" onClick={handleShow}>
          Add
        </Button>

        <Modal
          show={show}
          onHide={() => {
            handleClose()
          }}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>New ToDo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" placeholder="content" onChange={(e) => setContent(e.target.value)} />
              </Form.Group>
            </Form>
            {!isOk && <Alert variant="danger">An error occurred.</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose()
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                await handleSave()
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export const getServerSideProps = async () => {
  const tasks = await prisma.task.findMany()
  const props: Props = {
    tasks: tasks
  }
  return {
    props: props
  }
}

export default Index
