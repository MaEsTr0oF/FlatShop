import { FC, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './ChatModal.module.css';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  attachment?: {
    type: string;
    name: string;
    base64: string;
  };
}

interface Dialog {
  id: string;
  name: string;
  role: string;
  userId: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  isOnline?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: {
    name: string;
    role: string;
    userId: string;
    avatar?: string;
  };
}

type SearchType = 'user' | 'message';

export const ChatModal: FC<ChatModalProps> = ({ isOpen, onClose, partner }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('user');
  const [isEmojiListOpen, setIsEmojiListOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const [selectedAttachType, setSelectedAttachType] = useState('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeDialogId, setActiveDialogId] = useState<string>('2'); // ID диалога с партнером по умолчанию
  
  // Моковые диалоги для демонстрации
  const mockDialogs: Dialog[] = [
    {
      id: '1',
      name: 'Тех. Поддержка',
      role: 'Поддержка',
      userId: '000001',
      lastMessage: 'Разнообразный и богатый опыт говорит нам, что глубокий уровень погружения требует определения...',
      timestamp: '1 минуту назад',
      isOnline: true
    },
    {
      id: '2',
      ...partner,
      lastMessage: 'Повседневная практика показывает, что дальнейшее развитие различных форм деятельности прекрасно подходит для реализации первоочередных требований.',
      timestamp: '2 минуты назад',
      isOnline: true
    }
  ];

  // Загрузка сообщений из localStorage при первом рендере
  const loadMessages = (dialogId: string) => {
    const savedMessages = localStorage.getItem(`chat_messages_${dialogId}`);
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    return dialogId === '1' ? [
      {
        id: '1',
        text: 'Здравствуйте! Чем могу помочь?',
        timestamp: '5 минут назад',
        isOwn: false
      }
    ] : [
      {
        id: '1',
        text: 'Разнообразный и богатый опыт говорит нам, что глубокий уровень погружения требует определения и уточнения как самодостаточных, так и внешне зависимых концептуальных решений.',
        timestamp: '2 минуты назад',
        isOwn: false
      },
      {
        id: '2',
        text: 'Повседневная практика показывает, что дальнейшее развитие различных форм деятельности прекрасно подходит для реализации первоочередных требований.',
        timestamp: '1 минуту назад',
        isOwn: true
      }
    ];
  };

  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({
    '1': loadMessages('1'),
    '2': loadMessages('2')
  });

  // Сохранение сообщений в localStorage при их изменении
  useEffect(() => {
    Object.entries(messagesMap).forEach(([dialogId, messages]) => {
      localStorage.setItem(`chat_messages_${dialogId}`, JSON.stringify(messages));
    });
  }, [messagesMap]);

  const emojis = ['😊', '😂', '😍', '🤔', '👍', '❤️', '😎', '🎉', '🔥', '✨', '💪', '🙌', '👏', '🤝', '💯'];

  const handleEmojiClick = (emoji: string) => {
    setMessageText(prev => prev + emoji);
    setIsEmojiListOpen(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (selectedAttachType === 'image' && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(file);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAttachTypeSelect = (type: string) => {
    setSelectedAttachType(type);
    setIsAttachMenuOpen(false);
    
    const acceptTypes = {
      file: '*/*',
      image: 'image/*',
      video: 'video/*'
    };
    
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptTypes[type as keyof typeof acceptTypes];
      fileInputRef.current.click();
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDialogSelect = (dialogId: string) => {
    setActiveDialogId(dialogId);
    setMessageText('');
    setSelectedFile(null);
    setSelectedAttachType('text');
    setIsAttachMenuOpen(false);
    setIsEmojiListOpen(false);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() && !selectedFile) return;

    let attachment;
    if (selectedFile) {
      const base64 = await convertFileToBase64(selectedFile);
      attachment = {
        type: selectedAttachType,
        name: selectedFile.name,
        base64
      };
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: 'Только что',
      isOwn: true,
      ...(attachment && { attachment })
    };

    setMessagesMap(prev => ({
      ...prev,
      [activeDialogId]: [...prev[activeDialogId], newMessage]
    }));
    setMessageText('');
    setSelectedFile(null);
    setSelectedAttachType('text');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const attachTypes = [
    { value: 'file', icon: '/img/Base1.svg', label: 'Файл' },
    { value: 'image', icon: '/img/Base2.svg', label: 'Изображение' },
    { value: 'video', icon: '/img/Base3.svg', label: 'Видео' }
  ];

  const activeDialog = mockDialogs.find(dialog => dialog.id === activeDialogId);

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>СООБЩЕНИЯ</h2>
          <div className={styles.headerActions}>
            <button className={styles.newChatButton}>
              + Новый Чат
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.search}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder={searchType === 'user' ? "Поиск по пользователям" : "Поиск по сообщениям"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <select 
                  className={styles.searchTypeSelect}
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as SearchType)}
                >
                  <option value="user">Пользователь</option>
                  <option value="message">Сообщение</option>
                </select>
              </div>
            </div>
            
            <div className={styles.dialogsList}>
              <h3 className={styles.dialogsTitle}>Последние Чаты</h3>
              {mockDialogs.map(dialog => (
                <div 
                  key={dialog.id} 
                  className={`${styles.dialogItem} ${dialog.id === activeDialogId ? styles.active : ''}`}
                  onClick={() => handleDialogSelect(dialog.id)}
                >
                  <div className={styles.dialogAvatar}>
                    <img src={dialog.avatar || '/img/avatar.png'} alt={dialog.name} />
                    {dialog.isOnline && <span className={styles.onlineStatus} />}
                  </div>
                  <div className={styles.dialogInfo}>
                    <div className={styles.dialogHeader}>
                      <h4 className={styles.dialogName}>{dialog.name}</h4>
                      <span className={styles.dialogTime}>{dialog.timestamp}</span>
                    </div>
                    <p className={styles.dialogRole}>{dialog.role}</p>
                    <p className={styles.dialogUserId}>id {dialog.userId}</p>
                    <p className={styles.dialogLastMessage}>{dialog.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chat}>
            <div className={styles.chatHeader}>
              <div className={styles.chatUserInfo}>
                <img 
                  src={activeDialog?.avatar || '/img/avatar.png'} 
                  alt={activeDialog?.name} 
                  className={styles.chatAvatar}
                />
                <div className={styles.chatInfo}>
                  <h3 className={styles.chatName}>{activeDialog?.name}</h3>
                  <p className={styles.chatRole}>{activeDialog?.role}</p>
                  <p className={styles.chatUserId}>id {activeDialog?.userId}</p>
                </div>
              </div>
              <div className={styles.chatActions}>
                <button className={styles.iconButton}>
                  <img src="/img/trash.svg" alt="Удалить" />
                </button>
                <button className={styles.iconButton}>
                  <img src="/img/clip.svg" alt="Прикрепить" />
                </button>
                <button className={styles.iconButton}>
                  <img src="/img/settings.svg" alt="Настройки" />
                </button>
                <button className={styles.iconButton}>
                  <img src="/img/pin.svg" alt="Закрепить" />
                </button>
                <button className={styles.closeButton} onClick={onClose}>✕</button>
              </div>
            </div>

            <div className={styles.messages}>
              {messagesMap[activeDialogId].map(message => (
                <div 
                  key={message.id} 
                  className={`${styles.message} ${message.isOwn ? styles.own : ''}`}
                >
                  <div className={styles.messageContent}>
                    <p className={styles.messageText}>{message.text}</p>
                    {message.attachment && (
                      <div className={styles.attachment}>
                        {message.attachment.type === 'image' ? (
                          <img 
                            src={message.attachment.base64}
                            alt="Изображение" 
                          />
                        ) : (
                          <a 
                            href={message.attachment.base64}
                            download={message.attachment.name}
                            className={styles.fileAttachment}
                          >
                            <img 
                              src={`/img/Base${message.attachment.type === 'video' ? '3' : '1'}.svg`} 
                              alt={message.attachment.type} 
                            />
                            <span>{message.attachment.name}</span>
                          </a>
                        )}
                      </div>
                    )}
                    <span className={styles.messageTime}>{message.timestamp}</span>
                  </div>
                  {message.isOwn && (
                    <img 
                      src="/img/check.svg" 
                      alt="Прочитано" 
                      className={styles.messageStatus}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className={styles.inputArea}>
              <input 
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
              <div className={styles.attachContainer}>
                <button 
                  className={styles.attachButton}
                  onClick={() => setIsAttachMenuOpen(!isAttachMenuOpen)}
                >
                  <img 
                    src={attachTypes.find(type => type.value === selectedAttachType)?.icon || '/img/Base.svg'} 
                    alt="Прикрепить"
                  />
                </button>
                {isAttachMenuOpen && (
                  <div className={styles.attachMenu}>
                    {attachTypes.map((type) => (
                      <button
                        key={type.value}
                        className={styles.attachMenuItem}
                        onClick={() => handleAttachTypeSelect(type.value)}
                      >
                        <img src={type.icon} alt={type.label} />
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selectedFile && (
                <div className={styles.selectedFile}>
                  {selectedAttachType === 'image' ? (
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      className={styles.imagePreview} 
                    />
                  ) : (
                    <div className={styles.fileInfo}>
                      <span>{selectedFile.name}</span>
                      <button onClick={() => setSelectedFile(null)}>✕</button>
                    </div>
                  )}
                </div>
              )}
              <input 
                type="text" 
                className={styles.messageInput} 
                placeholder="Сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className={styles.emojiContainer}>
                <button 
                  className={styles.smileButton}
                  onClick={() => setIsEmojiListOpen(!isEmojiListOpen)}
                >
                  <img src="/img/smile.svg" alt="Смайл" />
                </button>
                {isEmojiListOpen && (
                  <div className={styles.emojiList}>
                    {emojis.map((emoji, index) => (
                      <button 
                        key={index}
                        className={styles.emojiButton}
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                className={styles.sendButton}
                onClick={handleSendMessage}
              >
                <img src="/img/send.svg" alt="Отправить" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}; 