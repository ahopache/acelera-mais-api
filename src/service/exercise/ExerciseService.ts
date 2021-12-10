import { message } from "@messages/languages/pt-br"
import { Exercise } from "@models/entity/Exercise"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { Brackets, getRepository } from "typeorm"

export class ExerciseService {
  public async getAllExercises({ page, count, hiringProcessId, type, feedback }) {
    const exerciseRepository = getRepository(Exercise)
    const result = await exerciseRepository.find({
      where: {
        hiringProcess: hiringProcessId,
       /*  type: type,
        evaluation: feedback */
      },
      skip: page,
      take: count
    })
    if (result.length === 0) {
      throw new HttpError(message.NOT_FOUND, HttpStatusCode.NOT_FOUND)
    }
    return result
  }
}