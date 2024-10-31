const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const ioClient = require('socket.io-client');
const path = require('path');
const cors = require('cors');

// Tạo ứng dụng Express
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: '*', // Cho phép tất cả các nguồn, bạn có thể tùy chỉnh theo nhu cầu
    },
    maxHttpBufferSize: 100 * 1024 * 1024 // Đặt kích thước tối đa là 2 MB (2 * 1024 * 1024 bytes)
  });
// Kết nối tới Python server qua Socket.IO client
const pythonSocket = ioClient('http://127.0.0.1:8000');

// Khi kết nối thành công tới Python server
pythonSocket.on('connect', () => {
    console.log('Đã kết nối tới server Python:', pythonSocket.id);
});

// Lắng nghe phản hồi từ Python server
pythonSocket.on('send_image', (data) => {
    console.log('Nhận ảnh từ Python');

    // Gửi lại ảnh cho React Native
    io.emit('receive_image', data);
    // Phát dữ liệu này tới client đang kết nối
});

// Xử lý khi mất kết nối với Python server
pythonSocket.on('disconnect', () => {
    console.log('Đã mất kết nối tới server Python');
});

// Xử lý kết nối từ client
io.on('connect', (socket) => {
    console.log(`Client đã kết nối: ${socket.id}`);

    // Lắng nghe yêu cầu từ client
    socket.on('request_camera', (data) => {
        console.log('Nhận được yêu cầu từ client', data.length);
        pythonSocket.emit('request_camera', data); // Gửi dữ liệu với tên sự kiện là 'request_camera'
    });

    // Xử lý khi client ngắt kết nối
    socket.on('disconnect', () => {
        console.log(`Client đã ngắt kết nối: ${socket.id}`);
    });
});
    
// Endpoint để kiểm tra server đang chạy
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Khởi động server
server.listen(3001, () => {
    console.log('Server đang lắng nghe ở cổng 3000');
});
