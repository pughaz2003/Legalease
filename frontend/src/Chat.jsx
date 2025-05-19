import { io } from 'socket.io-client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Paper,
  Avatar,
  IconButton,
  Badge
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';

const socket = io('http://localhost:5000', {
  autoConnect: false, // Manually connect after auth
  reconnectionAttempts: 3,
  withCredentials: true
});

function Chat({ conversationId, userId, participant }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Optimized message handling
  const handleNewMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  // Auto-scroll and connection management
  useEffect(() => {
    socket.connect();
    socket.emit('joinConversation', { conversationId, userId });

    socket.on('newMessage', handleNewMessage);
    socket.on('typing', (status) => setIsTyping(status));

    // Fetch message history (add your API call here)
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/messages/${conversationId}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };
    fetchHistory();

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('typing');
      socket.disconnect();
    };
  }, [conversationId, userId, handleNewMessage]);

  // Scroll behavior
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Message sending with optimizations
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId,
      senderId: userId,
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    socket.emit('sendMessage', messageData);
    setNewMessage('');
    inputRef.current.focus();
  };

  // Typing indicator
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socket.emit('typing', { conversationId, isTyping: !!e.target.value });
  };

  return (
    <Paper elevation={3} sx={{ 
      height: '70vh',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Chat header */}
      <Box sx={{
        p: 2,
        bgcolor: 'primary.main',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Badge overlap="circular" color="success" variant="dot">
          <Avatar>
            <PersonIcon />
          </Avatar>
        </Badge>
        <Typography variant="h6">
          {participant?.name || 'Legal Professional'}
        </Typography>
        {isTyping && (
          <Typography variant="caption" sx={{ ml: 'auto' }}>
            Typing...
          </Typography>
        )}
      </Box>

      {/* Message area */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        p: 2,
        bgcolor: 'background.default'
      }}>
        <List sx={{ py: 0 }}>
          {messages.map((msg, index) => (
            <ListItem 
              key={`${msg.timestamp}-${index}`}
              sx={{ 
                px: 1,
                justifyContent: msg.senderId === userId ? 'flex-end' : 'flex-start'
              }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: msg.senderId === userId ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: 1,
                maxWidth: '80%'
              }}>
                {msg.senderId !== userId && (
                  <Avatar sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'secondary.main'
                  }}>
                    {participant?.name?.charAt(0) || 'L'}
                  </Avatar>
                )}
                <Paper sx={{
                  p: 1.5,
                  bgcolor: msg.senderId === userId ? 'primary.main' : 'background.paper',
                  color: msg.senderId === userId ? 'white' : 'text.primary',
                  borderRadius: msg.senderId === userId 
                    ? '18px 18px 4px 18px' 
                    : '18px 18px 18px 4px'
                }}>
                  <ListItemText
                    primary={msg.message}
                    primaryTypographyProps={{
                      sx: { wordBreak: 'break-word' }
                    }}
                    secondary={
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block',
                          color: msg.senderId === userId ? 'primary.light' : 'text.secondary'
                        }}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    }
                  />
                </Paper>
              </Box>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Input area */}
      <Box sx={{ 
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            inputRef={inputRef}
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type your legal question..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            variant="outlined"
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!newMessage.trim()}
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': { bgcolor: 'action.disabled' }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

export default Chat;