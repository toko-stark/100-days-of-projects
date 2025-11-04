const btnCreateChat = document.querySelector('.create-chat');
const newChatSection = document.querySelector('.section-chat');
const activeChatSection = document.querySelector('.section-active-chatting');
const messagesSection = document.querySelector('.messages');

let databaseRecentChats =
  JSON.parse(localStorage.getItem('DATA_recentChats')) || [];
let databaseChatMessages =
  JSON.parse(localStorage.getItem('DATA_chatMessages')) || [];
let currentChatId = databaseRecentChats?.at(-1)?.chatId || 0;
let currentChat = null;

window.addEventListener('load', () => {
  if (!localStorage.getItem('DATA_recentChats'))
    localStorage.setItem('DATA_recentChats', JSON.stringify([]));
  if (!localStorage.getItem('DATA_chatMessages'))
    localStorage.setItem('DATA_chatMessages', JSON.stringify([]));
  renderRecentChats();
});

class FreshChat {
  constructor(chatId, chatMessages) {
    this.chatId = chatId;
    this.chatMessages = chatMessages;
  }

  getMessages() {
    if (!messagesSection) return;
    const combinedMessagesHtml = this.chatMessages
      .map(
        (msg, i) =>
          `<p class="${i % 2 === 0 ? 'msg msg-user' : 'msg msg-ai'}">${msg}</p>`
      )
      .join('');
    messagesSection.innerHTML = combinedMessagesHtml;
    return combinedMessagesHtml;
  }

  addUserMessage(text) {
    this.chatMessages.push(text);
  }

  addBotMessage(text) {
    this.chatMessages.push(text);
  }
}

function saveToLocalStorage() {
  localStorage.setItem('DATA_recentChats', JSON.stringify(databaseRecentChats));
  localStorage.setItem(
    'DATA_chatMessages',
    JSON.stringify(databaseChatMessages)
  );
}

const formEl = document.querySelectorAll('.form');
formEl.forEach((el) =>
  el.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputText;
    if (e.target.querySelector('.--chatting')) {
      inputText = document.getElementById('input-active-chat').value;
    } else {
      inputText = document.getElementById('input-new-chat').value;
    }

    if (!currentChat) {
      currentChatId++;
      currentChat = new FreshChat(currentChatId, [inputText]);
    } else {
      currentChat.addUserMessage(inputText);
    }

    if (!e.target.classList.contains('--chatting')) {
      newChatSection.classList.add('hidden');
      activeChatSection.classList.remove('hidden');
    }

    const activeInput = document.getElementById('input-active-chat');
    activeInput.disabled = true;

    currentChat.getMessages();

    getAIResponse(currentChat)
      .then((data) => {
        currentChat.addBotMessage(data);

        const existingIndex = databaseChatMessages.findIndex(
          (c) => c.chatId === currentChat.chatId
        );
        if (existingIndex >= 0) {
          databaseChatMessages[existingIndex] = currentChat;
        } else {
          databaseChatMessages.push(currentChat);
          databaseRecentChats.push({
            chatId: currentChat.chatId,
            chatTitle: 'CHAT ' + currentChat.chatId,
          });
        }

        currentChatId = currentChat.chatId;

        saveToLocalStorage();
        currentChat.getMessages();
        activeInput.disabled = false;
      })
      .catch((err) => console.error(err));
  })
);

btnCreateChat?.addEventListener('click', () => {
  newChatSection.classList.remove('hidden');
  activeChatSection.classList.add('hidden');
  currentChat = null;
});

function renderRecentChats() {
  const listEl = document.querySelector('.list');
  if (!listEl) return;

  if (!databaseRecentChats.length) {
    listEl.innerHTML =
      '<p class="list-item"><span>None Existing Chats yet</span></p>';
    return;
  }

  listEl.innerHTML = databaseRecentChats
    .map(
      ({ chatId, chatTitle }) =>
        `<li class="list-item" data-chat-id="${chatId}"><a href="#" data-chat-id="${chatId}">${chatTitle}</a></li>`
    )
    .join('');

  listEl.addEventListener('click', (ev) => {
    const target = ev.target.closest('[data-chat-id]');
    if (!target) return;
    const id = Number(target.dataset.chatId);
    const stored = databaseChatMessages.find((c) => c.chatId === id);
    if (!stored) return;

    currentChat = new FreshChat(stored.chatId, [...stored.chatMessages]);
    currentChatId = stored.chatId;

    newChatSection.classList.add('hidden');
    activeChatSection.classList.remove('hidden');
    currentChat.getMessages();
  });
}

async function getAIResponse({ chatId, chatMessages }) {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: {
            message: 'BOT RESPOND!!',
            timestamp: new Date().toISOString(),
          },
        });
      }, 2000);
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
    return 'Sorry, there was an error processing your request.';
  }
}
