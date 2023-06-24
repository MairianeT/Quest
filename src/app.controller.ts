import { Controller, Get, Render, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getIndexPage() {
    return { title: 'Квест по станциям' };
  }

  @Get('/admin')
  @Render('admin')
  getAdminPage() {
    return { title: 'Квест по станциям' };
  }

  @Get('/geo')
  @Render('geo')
  getGeoPage() {
    return { title: 'Квест по станциям' };
  }

  @Get('/ar-camera')
  @Render('ar-camera')
  getCameraPage() {
    return { title: 'Квест по станциям' };
  }
  @Get('/start')
  @Render('start')
  getStartPage() {
    return { title: 'Квест по станциям' };
  }

  @Get('/results')
  @Render('results')
  getResultsPage() {
    return { title: 'Квест по станциям' };
  }
}
