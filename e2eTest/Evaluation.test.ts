import { axiosInstance } from './EndToEndConfig'
import { HttpStatusCode } from '../src/service/HttpError'

test('should edit evaluation', async () => {
  const response = await axiosInstance.post('/exercise', {
    mentorName: 'teste mentor',
    feedback: 'teste feedback',
    score: 5
  })
  expect(response.status).toEqual(HttpStatusCode.OK)
  const id = response.data.id
  const responseEdit = await axiosInstance.patch('/exercise/' + id, {
    mentorName: 'novo mentor',
    feedback: 'novo feedback',
    score: 5
  })
  expect(responseEdit.status).toEqual(HttpStatusCode.OK)
  expect(responseEdit.data.mentorName).toEqual('novo mentor')
  expect(responseEdit.data.feedback).toEqual('novo feedback')
  expect(responseEdit.data.score).toEqual('novo score')
}, 5000)
