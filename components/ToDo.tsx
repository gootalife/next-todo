import { Task } from '@prisma/client'

type Props = {
  task: Task
}

export const ToDo = (props: Props) => {
  return (
    <>
      <h3>{props.task.title}</h3>
      <div>{props.task.content}</div>
    </>
  )
}
