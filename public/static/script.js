// LocalStorageの保存場所の名前
const STORAGE_KEY = 'my_tweets';

// ページが読み込まれたら動く処理
document.addEventListener('DOMContentLoaded', () => {
  loadTweets();

  // 投稿ボタンが押された時の処理
  const form = document.getElementById('tweet-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // サーバーへの送信をキャンセル
    const content = form.content.value;
    if (content) {
      addTweet(content);
      form.reset(); // 入力欄を空にする
    }
  });
});

// Tweetを追加して保存する関数
function addTweet(content) {
  const tweets = getTweets();
  const newTweet = {
    id: Date.now(),
    content: content,
    created_at: Math.floor(Date.now() / 1000)
  };
  tweets.unshift(newTweet); // 配列の先頭に追加
  saveTweets(tweets);
  renderTweets(tweets);
}

// Tweetを削除する関数
window.deleteTweet = function(id) {
  if (!confirm('本当に削除しますか？')) return;

  let tweets = getTweets();
  tweets = tweets.filter(t => t.id !== id);
  saveTweets(tweets);
  renderTweets(tweets);
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

// 画面に表示する関数（ここをデザインに合わせて大幅変更！）
function renderTweets(tweets) {
  const container = document.getElementById('tweets-container');
  container.innerHTML = ''; // 一旦空にする

  tweets.forEach(tweet => {
    // 新しいカードデザインのHTML構造を作成
    const html = `
    <div class="tweet-card">
      <button class="delete-btn" onclick="deleteTweet(${tweet.id})">
        <i class="fas fa-trash-alt"></i>
      </button>
      
      <span class="tweet-date">${formatDate(tweet.created_at)}</span>
      
      <div class="tweet-content">
        <div class="user-avatar">
          <i class="fas fa-user"></i>
        </div>
        <p class="tweet-text">${escapeHTML(tweet.content)}</p>
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
  return `${y}/${m}/${d} ${h}:${min}`;
}

// セキュリティ対策（XSS防止）
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