## Introduction

```
# 測試資料說明
guestOptions: [guestA, guestB, guestC] 代表有三種房客組合
roomsOptions: [roomsA, roomsB, roomsC] 代表有三種房間組合

1. 使用 useSearchParams 取得 URL query string
2. 使用 guestOptions, roomsOptions 找到對應的 guest, room
3. 將找到的 guest, room 傳入 LocationSelector, RoomAllocation
4. 在 RoomAllocation 內部的 onChange 可以得到使用者選擇的結果

# 用法說明
透過在網址上加上 guestType (A, B, C), roomsType (A, B, C) 可以切換不同的房客組合, 房間組合
舉例: http://localhost:3000/search/%5Bcity%5D?guestType=A&roomsType=A
```

## Tech Stack

- Framework: Next.js
- CSS Framework: Tailwind CSS
- Language: TypeScript
- Other: react-hook-form, react-number-format, react-select, usehooks-ts

## Preview

<img width="500" alt="截圖 2024-06-23 03 58 11" src="https://github.com/milletbard/room-web/assets/25094959/161ff9bb-ef47-44b8-850a-07073c56157f">

<img width="500" alt="截圖 2024-06-23 03 58 23" src="https://github.com/milletbard/room-web/assets/25094959/897853cf-7711-4b12-b943-2ba769d121e3">


---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
