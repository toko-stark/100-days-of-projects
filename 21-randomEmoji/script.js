const btn = document.getElementById('new-emoji-button');

btn.addEventListener('click', async () => {
  try {
    const response = await fetch(
      'https://emoji-api.com/emojis?access_key=API_KEY_HERE' // Use ur own one 😡👌
    );

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    const emoji = data[randomIndex];

    console.log(emoji);

    document.querySelector('.emoji').textContent = emoji.character;
    document.querySelector('.emoji-name').textContent =
      'Unicode: ' + emoji.unicodeName;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
});
