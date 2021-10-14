import { getRepository } from 'typeorm'
import { HiringProcess } from '@models/entity/HiringProcess'

export const createProcess = async (request, response) => {
  const hiringProcess = {
    name: request.body.name,
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    description: request.body.description
  }

  const convertStringToDate = (date) => {
    return new Date(date)
  }

  const startDateIsValid = (hiringProcess) => {
    const startDate = convertStringToDate(hiringProcess.startDate)
    const endDate = convertStringToDate(hiringProcess.endDate)
    return startDate.getTime() < endDate.getTime()
  }

  const nameIsValid = !(hiringProcess.name === null || hiringProcess.name.length === 0 || hiringProcess.name === undefined)
  const dateIsValid = startDateIsValid(hiringProcess)

  const validations = [{
    name: 'name',
    valid: nameIsValid,
    message: 'Por favor, digite o nome do processo!'
  },
  {
    name: 'startDate',
    valid: dateIsValid,
    message: 'Por favor, insira uma data de início válida'
  }]
  const errors = validations.filter(validation => !validation.valid)
  if (errors.length > 0) {
    return response.status(400).json(errors)
  }

  try {
    const hiringProcessRepository = getRepository(HiringProcess)
    const newHiringProcess = hiringProcessRepository.create(hiringProcess)
    const result = await hiringProcessRepository.save(newHiringProcess)
    return response.json({ message: 'Processo salvo com sucesso', result })
  } catch (error) {
    return response.status(400).json(error)
  }
}