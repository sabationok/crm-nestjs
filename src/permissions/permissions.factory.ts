import { model, models, Schema, SchemaTypes } from 'mongoose';

// import { AUTH_MODEL_NAME } from '../auth/auth.constants';
// import { COMPANY_MODEL_NAME } from '../companies/companies.constants';
// import { RoleModel } from '../roles';
// import permissionsMessages from './permissions.messages';
import {
  PERMISSION_MODEL_NAME,
  PERMISSION_STATUS_ENUM,
  PERMISSIONS_COLLECTION_NAME,
} from './permissions.constants';
import { permissionsMessages } from './permissions.messages';
import { Injectable } from '@nestjs/common';

// const getPermissionModelName = (companyId: string) =>
//   `${companyId}_${PERMISSION_MODEL_NAME}`;
// const getPermissionCollectionName = (companyId: string) =>
//   `${companyId}_${PERMISSIONS_COLLECTION_NAME}`;
// const createPermissionSchema = (companyId: string) =>
//   new Schema(
//     {
//       company: {
//         type: SchemaTypes.ObjectId,
//         default: null,
//         ref: 'COMPANY_MODEL_NAME',
//         required: [true, permissionsMessages.MISSING_PARAMS(['company'])],
//       },
//       user: {
//         type: SchemaTypes.ObjectId,
//         default: null,
//         ref: 'AUTH_MODEL_NAME',
//         required: [true, permissionsMessages.MISSING_PARAMS(['user'])],
//       },
//       role: {
//         type: SchemaTypes.ObjectId,
//         default: null,
//         ref: companyId && 'RoleModel.getModelName(companyId)',
//         required: [true, permissionsMessages.MISSING_PARAMS(['role'])],
//       },
//       status: {
//         type: String,
//         default: PERMISSION_STATUS_ENUM[0],
//         enum: PERMISSION_STATUS_ENUM,
//       },
//     },
//     {
//       versionKey: false,
//       timestamps: true,
//     },
//   );
//
// function createPermissionModel(companyId: string) {
//   if (models[getPermissionModelName(companyId)]) {
//     return models[getPermissionModelName(companyId)];
//   }
//   const Model = model(
//     getPermissionModelName(companyId),
//     createPermissionSchema(companyId),
//     PERMISSIONS_COLLECTION_NAME,
//   );
//
//   return Model;
// }
//
// export const PermissionModel = {
//   create: createPermissionModel,
//   getModelName: getPermissionModelName,
//   getCollectionName: getPermissionCollectionName,
//   createPermissionModel,
//   getPermissionModelName,
//   getPermissionCollectionName,
// };
@Injectable()
export default class PermissionsModelFactory {
  public static createSchema(companyId: string) {
    return new Schema(
      {
        company: {
          type: SchemaTypes.ObjectId,
          default: null,
          ref: 'COMPANY_MODEL_NAME',
          required: [true, permissionsMessages.MISSING_PARAMS(['company'])],
        },
        user: {
          type: SchemaTypes.ObjectId,
          default: null,
          ref: 'AUTH_MODEL_NAME',
          required: [true, permissionsMessages.MISSING_PARAMS(['user'])],
        },
        role: {
          type: SchemaTypes.ObjectId,
          default: null,
          ref: companyId && 'RoleModel.getModelName(companyId)',
          required: [true, permissionsMessages.MISSING_PARAMS(['role'])],
        },
        status: {
          type: String,
          default: PERMISSION_STATUS_ENUM[0],
          enum: PERMISSION_STATUS_ENUM,
        },
      },
      {
        versionKey: false,
        timestamps: true,
      },
    );
  }

  public static getName = (companyId: string) =>
    `${companyId}_${PERMISSION_MODEL_NAME}`;

  public static getCollectionName = (companyId: string) =>
    `${companyId}_${PERMISSIONS_COLLECTION_NAME}`;

  public static create(companyId: string) {
    if (models[PermissionsModelFactory.getName(companyId)]) {
      return models[PermissionsModelFactory.getCollectionName(companyId)];
    }
    const Model = model(
      PermissionsModelFactory.getName(companyId),
      PermissionsModelFactory.createSchema(companyId),
      PERMISSIONS_COLLECTION_NAME,
    );
  }
}
