import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './permission.model';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}
  async getById(id: string): Promise<PermissionDocument> {
    return this.permissionModel.findById(id);
  }
  async findOneByUserId(id: Types.ObjectId): Promise<PermissionDocument> {
    const pr = await this.permissionModel.findOne({ user: id });

    return this.permissionModel.find({ user: id });
  }
  async findAllByUserId(id: string): Promise<any> {
    return {};
  }
  async findOneByCompanyId(id: string): Promise<any> {
    return {};
  }
  async findAllByCompanyId(id: string): Promise<any> {
    return {};
  }
  async create(
    owner: string,
    data: CreatePermissionDto,
  ): Promise<PermissionDocument> {
    return this.permissionModel.create({ owner, ...data });
  }
  async updateById(owner: string, data: any): Promise<any> {
    return {};
  }
  async deleteByUser(id: string): Promise<any> {
    return {};
  }
  async deleteByCompanyAdmin(id: string): Promise<any> {
    return {};
  }
}
