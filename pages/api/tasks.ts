import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'utils/prisma'

type Data = {
  str: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  try {
    switch (method) {
      case 'GET':
        const tasks = await prisma.task.findMany()
        res.json(tasks)
        break
      case 'POST':
        break
      case 'PUT':
        break
      case 'DELETE':
        break
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export default handler
