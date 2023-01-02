import { IsObject, IsString } from 'class-validator';

export class CreateRefundDto {
  @IsString()
  name: string;
}
