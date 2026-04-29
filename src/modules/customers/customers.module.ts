import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { Address, AddressSchema } from './schemas/address.schema';
import { CustomersRepository } from './repositories/customers.repository';
import { AddressesRepository } from './repositories/addresses.repository';
import { CustomersService } from './services/customers.service';
import { AddressesService } from './services/addresses.service';
import { CustomersController } from './controllers/customers.controller';
import { AddressesController } from './controllers/addresses.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
            { name: Address.name, schema: AddressSchema },
        ]),
    ],
    providers: [CustomersRepository, AddressesRepository, CustomersService, AddressesService],
    controllers: [CustomersController, AddressesController],
    exports: [CustomersService, AddressesService, CustomersRepository, AddressesRepository],
})
export class CustomersModule { }

