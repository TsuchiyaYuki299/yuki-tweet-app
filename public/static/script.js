// LocalStorageの保存場所の名前
const STORAGE_KEY = 'my_tweets';

// ページが読み込まれたら動く処理
document.addEventListener('DOMContentLoaded', () => {
  loadTweets();

  // 投稿ボタンが押された時の処理
  const form = document.getElementById('tweet-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); //サーバーへの送信をキャンセル（画面遷移させない）
    const content = form.content.value;
    if (content) {
      addTweet(content);
      form.reset() //入力欄を空にする
    }
  });
});

// Tweetを追加して保存する関数
function addTweet(content) {
  const tweets = getTweets();
  const newTweet = {
    id: Date.now(), //今の時間をIDにする
    content: content,
    created_at: Math.floor(Date.now() / 1000)
  };
  tweets.unshift(newTweet); //配列の先頭に追加
  saveTweets(tweets);
  renderTweets(tweets);
}

// Tweetを削除する関数
// HTMLの中から onclick="deleteTweet(...)" で呼ばれるので window に紐づける
window.deleteTweet = function(id) {
  if (!confirm('本当に削除しますか？')) return;

  let tweets = getTweets();
  tweets = tweets.filter(t => t.id !== id); //指定したID以外を残す
  saveTweets(tweets);
  renderTweets(tweets)
}

// LocalStorageからデータを読み込む関数
function getTweets() {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

// LocalStorageにデータを保存する関数
function saveTweets(tweets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tweets));
}

// 画面に表示する関数
function renderTweets(tweets) {
  const container = document.getElementById('tweets-container');
  container.innerHTML = ''; //一旦空にする

  tweets.forEach(tweet => {
    const html = `
    <div class="tweet">
  <p>${escapeHTML(tweet.content)}</p>
  <div class="meta">
    <span>${formatDate(tweet.created_at)}</span>
    <button class="delete-btn" onclick="deleteTweet(${tweet.id})">削除</button>
  </div>
</div>
    `;
container.innerHTML += html;

  });
}

// 日付整形関数
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const w = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}年${m}月${d}日(${w}) ${h}:${min}`;
}

// セキュリティ対策（文字を無害化する。XSS防止）
function escapeHTML(str) {
  if(!str) return '';
  return str.replace(/[<>&"']/g, (match) => {
    const escape = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escape[match];
  });
}

// 最初に読み込み実行
function loadTweets() {
  const tweets = getTweets();
  renderTweets(tweets);
}