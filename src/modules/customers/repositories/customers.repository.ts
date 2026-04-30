import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomersRepository {
    constructor(@InjectModel(Customer.name) private model: Model<CustomerDocument>) { }

    async create(data: CreateCustomerDto): Promise<CustomerDocument> {
        const created = new this.model(data);
        return created.save();
    }

    async findByUserId(userId: string): Promise<CustomerDocument | null> {
        return this.model.findOne({ userId }).exec();
    }

    async updateByUserId(userId: string, data: UpdateCustomerDto): Promise<CustomerDocument | null> {
        return this.model.findOneAndUpdate({ userId }, { $set: data }, { new: true }).exec();
    }
}
