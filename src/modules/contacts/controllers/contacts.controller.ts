import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateContact, UpdateContact, UpdateIsActive } from './dto';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../entities/contact.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Contacts')
@Controller('api/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({ summary: 'returns all contacts ' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Contact })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getContacts(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Get(':contactId')
  @ApiOperation({ summary: 'Returns a contact with specified id' })
  @ApiParam({
    name: 'contactId',
    required: true,
    description: 'Note identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Contact })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getOneContacts(
    @Param('contactId', new ParseIntPipe()) contactId: string,
  ): Promise<Contact> {
    const contact = await this.contactsService.findOne(contactId);
    if (contact === undefined) {
      throw new HttpException(
        'Contact with ${contactId} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.contactsService.findOne(contactId);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new contact for the user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Contact })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  createContact(
    @Body()
    createContact: CreateContact,
  ): Promise<Contact> {
    const contact = new Contact();
    contact.username = createContact.username;
    contact.phone = createContact.phone;
    contact.email = createContact.email;
    return this.contactsService.create(contact);
  }

  @Put(':contactId')
  @ApiOperation({ summary: 'Returns update contact with specified id' })
  @ApiParam({
    name: 'contactId',
    required: true,
    description: 'Note identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Contact })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async updateContact(
    @Param('contactId', new ParseIntPipe()) contactId: string,
    @Body() updateContact: UpdateContact,
  ): Promise<Contact> {
    const contact = await this.contactsService.findOne(contactId);
    if (contact === undefined) {
      throw new HttpException(
        'Contact with ${contactId} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    updateContact.username = contact.username;
    updateContact.phone = contact.phone;
    updateContact.email = contact.email;
    updateContact.isActive = contact.isActive;
    return this.contactsService.update(contact);
  }

  @Patch(':contactId')
  @ApiOperation({
    summary: 'Returns update parameter isActive with specified id',
  })
  @ApiParam({
    name: 'contactId',
    required: true,
    description: 'Note identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Contact })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async updateIsActiveContact(
    @Param('contactId', new ParseIntPipe()) contactId: string,
    @Body() updateIsActiveContact: UpdateIsActive,
  ): Promise<Contact> {
    const contact = await this.contactsService.findOne(contactId);
    if (contact === undefined) {
      throw new HttpException(
        'Contact with ${contactId} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    contact.isActive = updateIsActiveContact.isActive;
    return this.contactsService.updateIsActive(contact);
  }

  @Delete(':contactId')
  @ApiOperation({
    summary: 'Returns update parameter isActive with specified id',
  })
  @ApiParam({
    name: 'contactId',
    required: true,
    description: 'Note identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Contact })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  deleteContact(
    @Param('contactId', new ParseIntPipe()) contactId: string,
  ): Promise<void> {
    return this.contactsService.remove(contactId);
  }
}
