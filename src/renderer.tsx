import { html } from "hono/html";

// HTML全体を作って返す関数
export const TopPage = () => html`
  <!DOCTYPE html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <!-- アイコン用 (FontAwesome) -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      
      <title>My Personal Tweets</title>
      <link rel="stylesheet" href="/static/style.css" />
      <script src="/static/script.js" defer></script>
    </head>
    <body>
      
      <div class="container">
        <header>
          <h1>独り言スペース</h1>
        </header>

        <!-- 入力エリア -->
        <div class="input-card">
          <form id="tweet-form">
            <textarea name="content" placeholder="今どうしてる？" required></textarea>
            <!-- ボタンにクラスを追加 -->
            <button type="submit" class="submit-btn">投稿する</button>
          </form>
        </div>

        <!-- 投稿リスト（ここにJSでカードが追加されます） -->
        <div id="tweets-container" class="timeline"></div>
        
      </div>

    </body>
  </html>
`