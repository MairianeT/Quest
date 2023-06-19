import { Server } from 'socket.io';

export function handleMarkerDetection(io: Server) {
  // Обработка подключения сокета
  io.on('connection', (socket) => {
    console.log('Новое подключение:', socket.id);

    // Обработка события считывания маркерного изображения
    socket.on('markerDetected', () => {
      console.log('Маркерное изображение обнаружено');
      io.emit('displayText', 'что-то'); // Отправка текста всем подключенным клиентам
    });
  });
}
