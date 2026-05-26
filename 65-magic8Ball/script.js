const A = ['It is certain','Without a doubt','Yes definitely','You may rely on it','As I see it, yes','Most likely','Outlook good','Yes','Signs point to yes','Reply hazy','Ask again later','Better not tell now','Cannot predict','Concentrate and ask again','Don\'t count on it','My reply is no','My sources say no','Outlook not so good','Very doubtful'];
document.getElementById('ask').onclick = () => {
  const ans = document.getElementById('ans');
  ans.style.opacity = 0;
  setTimeout(() => {
    ans.textContent = A[Math.floor(Math.random()*A.length)];
    ans.style.opacity = 1;
  }, 300);
};
