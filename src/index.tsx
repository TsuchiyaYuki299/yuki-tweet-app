import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { TopPage } from './renderer'

// TypeScriptに「このアプリではDBを使うよ」と教える設定
type Bindings = {
  DB: D1Database;
  USERNAME?: string
  PASSWORD?: string
};

// アプリの初期化（ここでもDBを使うことを伝えます）
const app = new Hono<{ Bindings: Bindings }>();

// 警備員（basic認証）の配置
app.use(
  "/*",
  async (c, next) => {
    const auth = basicAuth({
// 金庫から取る。もし金庫が空なら、とりあえず 'admin' にする（安全策）
    username: c.env.USERNAME || 'admin',
    password: c.env.PASSWORD || 'admin',
  })
  return auth(c, next)
});

// 1. トップページ（/）にアクセスした時の処理
app.get("/", async (c) => {
  // DBから過去のつぶやきを全部取ってくる（作成日時の新しい順）
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM tweets ORDER BY created_at DESC"
  ).all();

  return c.html(TopPage(results))
})

// 2. 「つぶやく」ボタンが押された時の処理
app.post("/", async (c) => {
  // フォームから送られてきたデータ（つぶやき内容）を受け取る
  const body = await c.req.parseBody();
  const content = body["content"];

  if (typeof content === "string" && content.length > 0) {
    // DBに保存する
    await c.env.DB.prepare("INSERT INTO tweets (content) VALUES (?)")
      .bind(content)
      .run();
  }

  // 保存し終わったらトップページに戻る
  return c.redirect("/");
});

// 削除機能
app.post("/delete", async (c) => {
  const body = await c.req.parseBody();
  const id = body["id"];

  // IDを受け取って、DBからそのIDのデータを消す
  await c.env.DB.prepare("DELETE FROM tweets WHERE id = ?").bind(id).run();

  return c.redirect("/");
});

export default app;
