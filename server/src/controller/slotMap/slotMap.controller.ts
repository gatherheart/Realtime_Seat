import { CreateQuery } from 'mongoose'
import slotMapModel from '../../db/slotMap/slotMap.model'
import { ISlotMap } from '../../interface/slotMapId/slotMap.interface'

function findSlotMapById({ slotMapId }: CreateQuery<{ slotMapId: string }>): Promise<ISlotMap> {
  return new Promise<ISlotMap>((resolve, reject) => {
    slotMapModel
      .findOne({
        slotMapId,
      })
      .then((found: ISlotMap) => {
        resolve(found)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

export { findSlotMapById }
