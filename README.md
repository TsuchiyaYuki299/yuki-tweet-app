# 自分専用つぶやきアプリ (Personal Tweet App)

このURLから見れます
https://yuki-tweet-app.pages.dev/

- だれとも繋がらない、自分だけのつぶやきを。



クラウド（サーバー）にデータを保存せず、**自分のブラウザだけにデータを保存する**、完全プライベートなつぶやき記録アプリです。
URLを知っている他の人がアクセスしても、あなたのデータは見えません。

## 🚀 特徴

* **完全プライベート:** データはブラウザの `LocalStorage` に保存されます。
* **アカウント不要:** ログインなしで、開いた瞬間から使えます。
* **端末ごとに別管理:** PCとスマホで別々のメモ帳として使えます。
* **維持費ゼロ:** Cloudflare Pages の無料枠で運用可能です。

## 🛠️ 使用技術 (Tech Stack)

* **Runtime:** [Cloudflare Pages](https://pages.cloudflare.com/)
* **Framework:** [Hono](https://hono.dev/)
* **Language:** TypeScript
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Database:** LocalStorage (Browser API)

## 📂 ディレクトリ構成

```text
.
├── public/
│   └── static/
│       ├── style.css    # デザイン設定
│       └── script.js    # 投稿・保存・削除のロジック
├── src/
│   ├── index.tsx        # サーバーサイドのエントリーポイント
│   └── renderer.tsx     # HTMLの構造定義
├── package.json
└── wrangler.jsonc       # Cloudflare設定ファイル