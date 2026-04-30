import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from '../schemas/address.schema';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressesRepository {
    constructor(@InjectModel(Address.name) private model: Model<AddressDocument>) { }

    async create(customerId: string, data: CreateAddressDto): Promise<AddressDocument> {
        const created = new this.model({ ...data, customerId });
        return created.save();
    }

    async findAddressesByCustomerId(customerId: string): Promise<AddressDocument[]> {
        return this.model.find({ customerId }).exec();
    }

    async findAddressById(addressId: string): Promise<AddressDocument | null> {
        return this.model.findById(addressId).exec();
    }

    async updateAddress(addressId: string, data: UpdateAddressDto): Promise<AddressDocument | null> {
        return this.model.findByIdAndUpdate(addressId, { $set: data }, { new: true }).exec();
    }

    async deleteAddress(addressId: string): Promise<AddressDocument | null> {
        return this.model.findByIdAndDelete(addressId).exec();
    }

    async unsetDefaultAddresses(customerId: string): Promise<void> {
        await this.model.updateMany({ customerId, isDefault: true }, { $set: { isDefault: false } }).exec();
    }
}
