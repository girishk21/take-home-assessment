import { setupWorker } from 'msw'
import { handlers } from './handler'

export default setupWorker(...handlers)
