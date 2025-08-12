# TodoList

此 TodoeList 為面試展示用，功能包括註冊、登入、登出、待辦事項新增 / 修改 / 完成 / 刪除，並透過 Token 認證保護使用者資料

按[這裡](http://kaitodolist.s3-website-ap-northeast-1.amazonaws.com/)進入網站
---

## 功能列表

### 使用者帳戶功能
- 註冊新帳號
- 登入並取得 JWT Token（儲存在 Cookie）
- 登出並清除 Token
- 取得登入使用者資料

### 待辦事項功能
- 建立待辦事項
- 查詢所有事項 / 今天事項 / 已完成 / 未完成
- 編輯標題、內容、截止日期
- 標記為完成 / 未完成
- 刪除事項

---

## API 說明

### 使用者認證
| 方法   | 路徑            | 說明           |
| ---- | ------------- | ------------ |
| POST | `/api/login`  | 使用者登入        |
| POST | `/api/logout` | 使用者登出        |
| POST | `/api/users`  | 註冊帳號         |
| GET  | `/api/users`  | 取得使用者資料（需登入） |


### 待辦事項
| 方法     | 路徑                           | 說明           |
| ------ | ---------------------------- | ------------ |
| GET    | `/api/todos`                 | 取得所有事項       |
| GET    | `/api/todos/todaytasks`      | 今日截止事項       |
| GET    | `/api/todos/completedtasks`  | 已完成事項        |
| GET    | `/api/todos/incompletetasks` | 未完成事項        |
| GET    | `/api/todos/:id`             | 取得單一事項       |
| POST   | `/api/todos`                 | 建立新事項        |
| PATCH  | `/api/todos/:id`             | 編輯事項標題/內容/截止 |
| PATCH  | `/api/todos/:id/complete`    | 標記為完成        |
| PATCH  | `/api/todos/:id/incomplete`  | 標記為未完成       |
| DELETE | `/api/todos/:id`             | 刪除事項         |
> 所有 /api/todos 路由都需附帶登入的 Cookie Token（JWT）才能使用。

---

## 使用技術

### 前端
- React
- TypeScript
- React Router
- Context API（登入狀態管理）
- CSS Modules
- Bootstrap 5 + Icons
- SPA
- zxcvbn (輸入格式檢查)

### 後端
- Node.js + Express
- MySQL（使用 mysql2/promise）
- JWT 驗證（儲存在 Cookie）
- bcrypt 加密密碼
- CORS / Cookie 中介處理
- dotenv（環境變數管理）
- pm2
- RESTful API 設計

### 部署
- S3（前端）
- EC2（後端）
- RDS for MySQL（資料庫管理）
