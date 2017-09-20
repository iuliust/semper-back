import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Component()
export class PhotoService {
    constructor(
        @Inject('PhotoRepositoryToken') private photoRepository: Repository<Photo>
    ) {}

    async listAllPhotos(): Promise<Photo[]> {
        const photos = await this.photoRepository.find();
        return photos;
    }
}