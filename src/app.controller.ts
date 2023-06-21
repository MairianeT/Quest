import { Controller, Get, Render } from '@nestjs/common';

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
}
