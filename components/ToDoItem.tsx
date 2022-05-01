import { Task } from '@prisma/client'
import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

type Props = {
  task: Task
}

export const ToDoItem = (props: Props) => {
  const [showUpdate, setShowUpdate] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isOk, setIsOk] = useState(true)

  const handleShowUpdate = (task: Task) => {
    setShowUpdate(true)
    setIsOk(true)
    setTitle(task.title)
    setContent(task.content)
  }

  const handleCloseUpdate = () => {
    setShowUpdate(false)
  }

  const handleUpdate = async (uuid: string) => {
    alert(uuid)
    if (!confirm('Update this?')) {
      return
    }
    const param: Partial<Task> = {
      uuid: uuid,
      title: title,
      content: content
    }
    try {
      const res = await fetch('/api/task', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      if (res.ok) {
        setIsOk(true)
        setShowUpdate(false)
        alert('Updated.')
      } else {
        setIsOk(false)
        alert('Failed.')
      }
    } catch (err) {
      setIsOk(false)
      alert('Failed.')
    }
  }

  const handleDelete = async (uuid: string) => {
    if (!confirm('Delete this?')) {
      return
    }
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
        setIsOk(true)
        alert('Deleted.')
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
      <hr />
      <h3>{props.task.title}</h3>
      <div>{props.task.content}</div>
      <div>{props.task.uuid}</div>

      <Button
        variant="primary"
        onClick={() => {
          handleShowUpdate(props.task)
        }}
      >
        Update
      </Button>
      <Modal
        show={showUpdate}
        onHide={() => {
          handleCloseUpdate()
        }}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update ToDo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} defaultValue={props.task.title} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" placeholder="content" onChange={(e) => setContent(e.target.value)} defaultValue={props.task.content} />
            </Form.Group>
          </Form>
          {!isOk && <Alert variant="danger">An error occurred.</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseUpdate()
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await handleUpdate(props.task.uuid)
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        variant="primary"
        onClick={async () => {
          await handleDelete(props.task.uuid)
        }}
      >
        Delete
      </Button>
    </>
  )
}
