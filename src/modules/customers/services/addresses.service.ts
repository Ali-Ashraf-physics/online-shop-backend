import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { AddressesRepository } from '../repositories/addresses.repository';
import { CustomersRepository } from '../repositories/customers.repository';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AddressResponseDto } from '../dto/address-response.dto';

@Injectable()
export class AddressesService {
    constructor(
        private readonly addressesRepo: AddressesRepository,
        private readonly customersRepo: CustomersRepository,
    ) { }

    private mapToDto(address: import("../schemas/address.schema").AddressDocument): AddressResponseDto {
        return {
            id: address._id.toString(),
            title: address.title,
            street: address.street,
            area: address.area,
            district: address.district,
            phone: address.phone,
            isDefault: address.isDefault,
        };
    }

    private async getCustomerOrThrow(userId: string) {
        const customer = await this.customersRepo.findByUserId(userId);
        if (!customer) throw new NotFoundException('Customer profile not found');
        return customer;
    }

    async addAddress(userId: string, dto: CreateAddressDto): Promise<AddressResponseDto> {
        const customer = await this.getCustomerOrThrow(userId);

        if (dto.isDefault) {
            await this.addressesRepo.unsetDefaultAddresses(customer._id.toString());
        }

        const address = await this.addressesRepo.create(customer._id.toString(), dto);
        return this.mapToDto(address);
    }

    async getAddresses(userId: string): Promise<AddressResponseDto[]> {
        const customer = await this.getCustomerOrThrow(userId);
        const addresses = await this.addressesRepo.findAddressesByCustomerId(customer._id.toString());
        return addresses.map(addr => this.mapToDto(addr));
    }

    async assertAddressBelongsToUser(userId: string, addressId: string): Promise<{ address: import("../schemas/address.schema").AddressDocument; customerId: string }> {
        const customer = await this.getCustomerOrThrow(userId);
        const address = await this.addressesRepo.findAddressById(addressId);

        if (!address) throw new NotFoundException('Address not found');
        if (address.customerId.toString() !== customer._id.toString()) {
            throw new ForbiddenException('Address does not belong to this customer');
        }

        return { address, customerId: customer._id.toString() };
    }

    async updateAddress(userId: string, addressId: string, dto: UpdateAddressDto): Promise<AddressResponseDto> {
        const { customerId } = await this.assertAddressBelongsToUser(userId, addressId);

        if (dto.isDefault) {
            await this.addressesRepo.unsetDefaultAddresses(customerId);
        }

        const updated = await this.addressesRepo.updateAddress(addressId, dto);
        if (!updated) throw new NotFoundException('Address not found'); // Should not happen given assertion

        return this.mapToDto(updated);
    }

    async removeAddress(userId: string, addressId: string): Promise<void> {
        await this.assertAddressBelongsToUser(userId, addressId);
        await this.addressesRepo.deleteAddress(addressId);
    }
}
