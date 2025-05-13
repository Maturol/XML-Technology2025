import { Module } from '@nestjs/common';
import { IllustrationsService } from './illustrations.service';
import { IllustrationsController } from './illustrations.controller';
import { FileService } from './file.service'
import { Illustration } from './entities/illustration.entity'

@Module({
  controllers: [IllustrationsController],
  providers: [
    IllustrationsService,
    {
      provide: FileService,
      useFactory: () => new FileService<Illustration[]>('assets/illustrations.json'),
    },
  ],
})
export class IllustrationsModule {}