import { Hono } from "hono";
import { TopPage } from './renderer'


// アプリの初期化（ここでもDBを使うことを伝えます）
const app = new Hono()

// 1. トップページ（/）にアクセスした時の処理
app.get("/", (c) => {
// DBアクセスなし！ただHTMLを返すだけ
  return c.html(TopPage())
})

export default app;
