import { InjectModel } from '@nestjs/mongoose';
import { RegisterUser, User, UserDTO } from './user.model';
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/services/base.service';

@Injectable()
export class UserRepositoryService extends BaseService<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  createUser(user: RegisterUser) {
    const newUser: User = {
      ...user,
      dateCreated: Date.now(),
    };
    return this.create(newUser);
  }

  getUserByLogin(login: string) {
    return this.model
      .findOne({ login })
      .exec()
      .then((user) => user?.toObject());
  }

  getUserById(id: ObjectId): Promise<UserDTO> {
    return this.model.findById(id).then((userQuery) => {
      const { password, ...userDTO } = userQuery.toObject();
      return { ...userDTO, id };
    });
  }
}
