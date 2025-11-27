import { html } from "hono/html";


// HTML全体を作って返す関数
export const TopPage = () => html`
  <!DOCTYPE html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>自分専用つぶやきアプリ</title>
      <link rel="stylesheet" href="/static/style.css" />
      <script src="/static/script.js" defer></script>
    </head>
    <body>
      <h1>独り言スペース</h1>

      <form id="tweet-form">
  <textarea name="content" placeholder="今どうしてる？" required></textarea>
  <br><br>
  <button type="submit">つぶやく</button>
</form>

      <hr />

      <div id="tweets-container"></div>
    </body>
  </html>
`