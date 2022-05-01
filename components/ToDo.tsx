import { Task } from '@prisma/client'
import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import useSWR from 'swr'
import { ToDoItem } from './ToDoItem'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const ToDo = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isOk, setIsOk] = useState(true)
  const { data: tasks } = useSWR<Task[], Error>('/api/task', fetcher)

  const handleShowAdd = () => {
    setShowAdd(true)
    setIsOk(true)
  }

  const handleCloseAdd = () => {
    setShowAdd(false)
  }

  const handleSave = async () => {
    if (!confirm('Add this?')) {
      return
    }
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
        setShowAdd(false)
        alert('Added.')
      } else {
        setIsOk(false)
        alert('Failed.')
      }
    } catch (err) {
      setIsOk(false)
      alert('Failed.')
    }
  }

  return (
    <>
      {tasks && (
        <>
          {tasks.map((task) => (
            <ToDoItem key={task.uuid} task={task}></ToDoItem>
          ))}
        </>
      )}
      <hr />
      <Button
        variant="primary"
        onClick={(e) => {
          handleShowAdd()
        }}
      >
        Add
      </Button>
      <Modal
        show={showAdd}
        onHide={() => {
          handleCloseAdd()
        }}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New ToDo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
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
              handleCloseAdd()
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async (e) => {
              await handleSave()
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
