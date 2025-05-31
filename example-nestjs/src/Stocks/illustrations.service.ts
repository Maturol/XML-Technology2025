import { Injectable } from '@nestjs/common';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { UpdateIllustrationDto } from './dto/update-illustration.dto';
import { FileService } from './file.service';
import { Illustration } from './entities/illustration.entity'

@Injectable()
export class IllustrationsService {
  constructor(private fileService: FileService<Illustration[]>) {}

  create(createIllustrationDto: CreateIllustrationDto) {
    const illustrations = this.fileService.read();

    const illustration = { ...createIllustrationDto, id: illustrations.length + 1 };

    this.fileService.add(illustration);
  }

  findAll(title?: string): Illustration[] {
    const illustrations = this.fileService.read();

    return title
      ? illustrations.filter((illustration) =>
          illustration.title.toLowerCase().includes(title.toLowerCase()),
        )
      : illustrations;
  }

  findOne(id: number): Illustration | null {
    const illustrations = this.fileService.read();

    return illustrations.find((illustration) => illustration.id === id) ?? null;
  }

  update(id: number, updateIllustrationDto: UpdateIllustrationDto): void {
    const illustrations = this.fileService.read();

    const updatedIllustrations = illustrations.map((illustration) =>
      illustration.id === id ? { ...illustration, ...updateIllustrationDto } : illustration,
    );

    this.fileService.write(updatedIllustrations);
  }

  remove(id: number): void {
    const filteredIllustrations = this.fileService
      .read()
      .filter((illustration) => illustration.id !== id);

    this.fileService.write(filteredIllustrations);
  }
}