import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IllustrationsModule } from './Stocks/illustrations.module';

@Module({
  imports: [IllustrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
