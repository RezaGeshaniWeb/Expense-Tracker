# Expense Tracker

یک اپلیکیشن وب ساده و کاربردی برای ثبت و مدیریت درآمدها و هزینه‌ها، ساخته‌شده با **Next.js**، **React**، **TypeScript**، **TailwindCSS** و **Zustand**.

---

## ساخته‌شده با Prompt.txt

این پروژه بر اساس مشخصات و دستورالعمل‌های فایل [`Prompt.txt`](./Prompt.txt) پیاده‌سازی شده است.

فایل `Prompt.txt` یک پرامپت کامل برای تولید این Expense Tracker است و نقش «منبع حقیقت» (source of truth) پروژه را دارد. در آن مشخص شده:

| بخش | محتوا |
|-----|--------|
| **ROLE** | نقش توسعه‌دهنده فرانت‌اند ارشد |
| **OBJECTIVE** | هدف کلی: ساخت یک Expense Tracker کامل و واقعی |
| **TECH_STACK** | تکنولوژی‌های مجاز (Next.js، React، TypeScript، TailwindCSS، Zustand و …) |
| **PROJECT_FEATURES** | ویژگی‌های محصول (افزودن/حذف تراکنش، خلاصه مالی، LocalStorage و …) |
| **UI_REQUIREMENTS** | الزامات رابط کاربری (تم روشن، رنگ برند `#4F46E5`، ریسپانسیو و …) |
| **FORM_VALIDATION** | قوانین اعتبارسنجی فرم |
| **NEXTJS / TYPESCRIPT** | قواعد App Router، Client Components و TypeScript سخت‌گیرانه |
| **FILE_STRUCTURE** | ساختار دقیق فایل‌ها و پوشه‌ها |

اگر می‌خواهید ببینید این اپلیکیشن با چه معیارهایی طراحی و کدنویسی شده، ابتدا `Prompt.txt` را بخوانید؛ کد فعلی پروژه همان مشخصات را دنبال می‌کند.

---

## ویژگی‌ها

- افزودن تراکنش جدید (عنوان، مبلغ، نوع: درآمد یا هزینه)
- نمایش **موجودی کل**، **مجموع درآمد** و **مجموع هزینه‌ها**
- لیست تاریخچه تراکنش‌ها
- حذف تراکنش
- ذخیره‌سازی در **LocalStorage** و بازیابی خودکار پس از رفرش صفحه
- به‌روزرسانی پویای محاسبات بعد از هر افزودن یا حذف
- اعتبارسنجی فرم با پیام خطای واضح
- رابط کاربری مدرن، تم روشن و ریسپانسیو

---

## تکنولوژی‌ها

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (همراه با persistence روی LocalStorage)

---

## ساختار پروژه

```
/
├── Prompt.txt                 # پرامپت اصلی ساخت پروژه
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── app/
│   ├── layout.tsx             # شل اصلی (فونت، متادیتا، استایل سراسری)
│   ├── page.tsx               # صفحه اصلی Expense Tracker
│   └── globals.css            # دستورات Tailwind و متغیرهای حداقلی
├── components/
│   ├── Header.tsx
│   ├── BalanceSummary.tsx
│   ├── IncomeExpenseSummary.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── store/
│   └── useExpenseStore.ts     # استور Zustand + LocalStorage
└── types/
    └── transaction.ts         # تایپ‌ها و اعتبارسنجی داده ذخیره‌شده
```

این ساختار مطابق بخش `FILE_STRUCTURE` در `Prompt.txt` است.

---

## پیش‌نیازها

- Node.js (نسخه ۱۸ یا بالاتر پیشنهاد می‌شود)
- npm

---

## راه‌اندازی

```bash
# نصب وابستگی‌ها
npm install

# اجرای محیط توسعه
npm run dev
```

سپس در مرورگر به آدرس [http://localhost:3000](http://localhost:3000) بروید.

### سایر دستورات

```bash
# ساخت نسخه production
npm run build

# اجرای نسخه build‌شده
npm run start

# بررسی lint
npm run lint
```

---

## نحوه کار (خلاصه)

1. **فرم تراکنش** عنوان، مبلغ و نوع (Income / Expense) را می‌گیرد و قبل از ثبت اعتبارسنجی می‌کند.
2. **Zustand store** تراکنش‌ها را نگه می‌دارد و با middleware مربوط به `persist` آن‌ها را در LocalStorage ذخیره می‌کند.
3. **خلاصه مالی** (موجودی، درآمد، هزینه) از روی لیست تراکنش‌ها محاسبه و به‌صورت خودکار به‌روز می‌شود.
4. **لیست تراکنش‌ها** امکان مشاهده و حذف هر آیتم را می‌دهد؛ بعد از حذف، محاسبات دوباره به‌روز می‌شوند.

---

## رنگ‌بندی UI

| مورد | مقدار |
|------|--------|
| تم | Light فقط |
| رنگ برند اصلی | `#4F46E5` |
