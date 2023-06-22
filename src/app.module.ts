import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StationModule } from './station/station.module';
import { AnimationModule } from './animation/animation.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [UserModule, StationModule, AnimationModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
