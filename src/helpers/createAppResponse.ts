import { HttpStatus } from '@nestjs/common';

export interface IAppSuccessResponse<MD = any, RD = any> {
  statusCode: number;
  message: string;
  innerCode?: number;
  description?: string;
  data: {
    meta: MD;
    data: RD;
  };
}

export function createAppResponse<MD = any, RD = any>({
  statusCode = HttpStatus.OK,
  message = 'Default success response',
  innerCode,
  description,
  data,
}: IAppSuccessResponse<MD, RD>): IAppSuccessResponse<MD, RD> {
  const res: IAppSuccessResponse<MD, RD> = {
    statusCode,
    message,
    data,
  };

  if (innerCode) {
    res.innerCode = innerCode;
  }
  if (description) {
    res.description = description;
  }
  return res;
}
