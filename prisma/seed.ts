import prisma from '../utils/prisma'
import { format } from 'date-fns'

const main = async () => {
  const dateFormat = 'yyyyMMddHHmmss'
  await prisma.task.create({
    data: {
      createdAt: format(new Date(), dateFormat),
      updatedAt: format(new Date(), dateFormat),
      title: 'test1',
      content: 'content1'
    }
  })
  await prisma.task.create({
    data: {
      createdAt: format(new Date(), dateFormat),
      updatedAt: format(new Date(), dateFormat),
      title: 'test2',
      content: 'content2'
    }
  })
  console.log('Seeding:Done')
}

main()
  .catch((err) => {
    console.log(err)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
