import { html } from "hono/html";

// 日付整形関数
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(date.getTime() + jstOffset);

  const y = jstDate.getUTCFullYear();
  const m = String(jstDate.getUTCMonth() + 1).padStart(2, "0");
  const d = String(jstDate.getUTCDate()).padStart(2, "0");
  const w = ["日", "月", "火", "水", "木", "金", "土"][jstDate.getUTCDay()];
  const h = String(jstDate.getUTCHours()).padStart(2, "0");
  const min = String(jstDate.getUTCMinutes()).padStart(2, "0");

  return `${y}年${m}月${d}日(${w}) ${h}:${min}`;
};

// HTML全体を作って返す関数
export const TopPage = (tweets: any[]) => html`
  <!DOCTYPE html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>自分専用つぶやきアプリ</title>

      <link rel="stylesheet" href="/static/style.css" />
    </head>
    <body>
      <h1>独り言スペース</h1>

      <form method="POST" action="/">
        <textarea
          name="content"
          placeholder="今どうしてる？"
          required
        ></textarea>
        <br /><br />
        <button type="submit">つぶやく</button>
      </form>

      <hr />

      <div id="tweets">
        ${tweets.map(
          (tweet) => html`
            <div class="tweet">
              <p>${tweet.content}</p>
              <div class="meta">
                <span>${formatDate(tweet.created_at)}</span>

                <form
                  method="POST"
                  action="/delete"
                  onsubmit="return confirm('本当に削除しますか？');"
                >
                  <input type="hidden" name="id" value="${tweet.id}" />
                  <button type="submit" class="delete-btn">削除</button>
                </form>
              </div>
            </div>
          `
        )}
      </div>
    </body>
  </html>
`;
