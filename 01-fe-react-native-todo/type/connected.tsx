import React, { useEffect } from 'react';
import socket  from '../ulti/socketio'; // Giả sử bạn có một hook để quản lý socket

const SocketComponent = ({ base64Data }) => {
  socket.initializeSocket(); // Hook để kết nối và quản lý socket

  useEffect(() => {
    if (base64Data) {
      socket.emit('request_camera', base64Data); // Gửi dữ liệu khi có ảnh
    }
  }, [base64Data, socket]);

  return null; // Không cần render gì từ component này
};

export default SocketComponent;
