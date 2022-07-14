import { rest, RestHandler } from 'msw'
import { faker } from '@faker-js/faker'

const total = 100

export const handlers: RestHandler[] = [
  rest.get('http://localhost:8080/api/posts', (req, res, ctx) => {
    const searchParams = req.url.searchParams

    if (!searchParams.has('page')) {
      return res(ctx.status(400), ctx.json({ error: 'page is required' }))
    }

    if (!searchParams.has('num')) {
      return res(ctx.status(400), ctx.json({ error: 'num is required' }))
    }

    const num = Number(searchParams.get('num') ?? 0)
    const page = Number(searchParams.get('page') ?? 0)

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        results: Array.from({ length: Number(num) }).map(() => ({
          id: faker.datatype.uuid(),
          title: faker.lorem.sentence(),
          post: faker.lorem.paragraph(),
          user: faker.internet.userName(),
          createdAt: faker.date.past(),
          avatar: faker.image.cats(480, 480, true),
        })),
        hasNext: page * num < total,
        total,
      }),
    )
  }),
]
