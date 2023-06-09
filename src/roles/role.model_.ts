// import { model, models, Schema, SchemaTypes } from 'mongoose';
//
// import { Prop, Schema as IsSchema } from '@nestjs/mongoose';
//
// // import { AUTH_MODEL_NAME } from '../auth/auth.constants';
// // import { COMPANY_MODEL_NAME } from '../companies/companies.constants';
// // import { RoleModel } from '../roles';
// // import rolesMessages from './permissions.messages';
// import { rolesConstants } from './roles.constants';
// import { rolesMessages } from './roles.messages';
// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export default class RoleModelFactory {
//   private readonly BASE_NAME = 'role';
//   private readonly BASE_COLLECTION_NAME = 'roles';
//
//   getName = (companyId: string) => `${companyId}_${this.BASE_NAME}`;
//
//   getCollectionName = (companyId: string) =>
//     `${companyId}_${this.BASE_COLLECTION_NAME}`;
//
//   private createSchemaClass(companyId: string) {
//     @IsSchema()
//     class Test {
//       @Prop()
//       testProp: string;
//     }
//
//     return Test;
//   }
//   create(companyId: string) {
//     if (models[this.getName(companyId)]) {
//       return models[this.getCollectionName(companyId)];
//     }
//     return model(
//       this.getName(companyId),
//       this.createSchema(companyId),
//       this.getCollectionName(companyId),
//     );
//   }
//   private createSchema(companyId: string) {
//     return new Schema(
//       {
//         company: {
//           type: SchemaTypes.ObjectId,
//           default: null,
//           ref: COMPANY_MODEL_NAME,
//           required: [true, rolesMessages.MISSING_PARAMS(['company'])],
//         },
//         user: {
//           type: SchemaTypes.ObjectId,
//           default: null,
//           ref: AUTH_MODEL_NAME,
//           required: [true, rolesMessages.MISSING_PARAMS(['user'])],
//         },
//         role: {
//           type: SchemaTypes.ObjectId,
//           default: null,
//           ref: companyId && RoleModel.getModelName(companyId),
//           required: [true, rolesMessages.MISSING_PARAMS(['role'])],
//         },
//         status: {
//           type: String,
//           default: rolesConstants.STATUS[0],
//           enum: rolesConstants.STATUS,
//         },
//       },
//       {
//         versionKey: false,
//         timestamps: true,
//       },
//     );
//   }
// }
