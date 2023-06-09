const MISSING_PARAMS = (params = ['']) =>
  `Missing params: ${params.join(', ')}`;
const FOUND_RESULT_SUCCESS = (amount = 0) =>
  `Permissions amount found: ${amount}`;
const FOUND_RESULT_ERROR = (amount = 0) =>
  `Permissions amount found: ${amount}`;
const ALREADY_EXIST = 'Permission already exist';
const CREATE_SUCCESS = 'Permission successfully created';
const CREATE_ERROR = 'Permission creating error';
const UPDATE_SUCCESS = 'Permission successfully updates';
const UPDATE_ERROR = 'Permission updating error';
const DELETE_SUCCESS = 'Permission successfully deleted';
const DELETE_ERROR = 'Permission deleting error';

export const permissionsMessages = {
  MISSING_PARAMS,
  CREATE_SUCCESS,
  CREATE_ERROR,
  FOUND_RESULT_SUCCESS,
  FOUND_RESULT_ERROR,
  ALREADY_EXIST,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  DELETE_SUCCESS,
  DELETE_ERROR,
};
