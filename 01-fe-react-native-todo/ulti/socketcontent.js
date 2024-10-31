import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.30.101:3001';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current.on('connect', () => {
            console.log('=== socket connected ====');
        });

        socketRef.current.on('disconnect', (reason) => {
            console.log('=== socket disconnected ====', reason);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};

// Hook để sử dụng socket
export const useSocket = () => {
    return useContext(SocketContext);
};
