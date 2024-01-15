import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private ContactsRepository: Repository<Contact>,
  ) {}

  findAll(): Promise<Contact[]> {
    return this.ContactsRepository.find();
  }

  findOne(id: string): Promise<Contact | null> {
    return this.ContactsRepository.findOneBy({ id });
  }

  create(contact: Contact): Promise<Contact> {
    delete contact.id;
    return this.ContactsRepository.save(contact);
  }

  update(contact: Contact): Promise<Contact> {
    return this.ContactsRepository.save(contact);
  }
  updateIsActive(contact: Contact): Promise<Contact> {
    return this.ContactsRepository.save(contact);
  }

  async remove(id: string): Promise<void> {
    await this.ContactsRepository.delete(id);
  }
}
