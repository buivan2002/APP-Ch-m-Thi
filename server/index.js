const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const ioClient = require('socket.io-client');
const path = require('path');

// Tạo ứng dụng Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Kết nối tới Python server qua Socket.IO client
const pythonSocket = ioClient('http://127.0.0.1:8000');

// Khi kết nối thành công tới Python server
pythonSocket.on('connect', () => {
    console.log('Đã kết nối tới server Python:', pythonSocket.id);
});

// Lắng nghe phản hồi từ Python server
pythonSocket.on('camera_response', (data) => {
    console.log('Nhận được dữ liệu từ server Python:', data);

    // Phát dữ liệu này tới client đang kết nối
    io.emit('camera_response', data);
});

// Xử lý khi mất kết nối với Python server
pythonSocket.on('disconnect', () => {
    console.log('Đã mất kết nối tới server Python');
});

// Xử lý kết nối từ client
io.on('connection', (socket) => {
    console.log(`Client đã kết nối: ${socket.id}`);

    // Lắng nghe yêu cầu từ client
    socket.on('request_camera', () => {
        console.log('Nhận được yêu cầu từ client');
        pythonSocket.emit('request_camera', { message: 'Yêu cầu dữ liệu camera từ Node.js' });
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
    console.log('Server đang lắng nghe ở cổng 3001');
});
