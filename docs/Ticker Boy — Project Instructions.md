# Ticker Boy
## Project Instructions & Engineering Guidelines

**Document Version:** 1.0  
**Project Type:** Discord Ticketing Platform / SaaS  
**Status:** Active Specification  
**Primary Goal:** Build a fast, reliable, scalable, secure, user-friendly and highly customizable Discord ticketing platform.

---

# 1. Project Vision

Ticker Boy باید یک سیستم Ticketing حرفه‌ای برای Discord باشد که بتواند نیاز سرورهای کوچک تا سرورهای بزرگ را پوشش دهد.

هدف پروژه ساخت یک Bot ساده نیست؛ بلکه ساخت یک **Ticketing Platform** است که شامل موارد زیر باشد:

- Discord Bot
- Web Dashboard
- Web Ticket System
- Ticket Engine
- Panel Builder
- Form Builder
- Automation Engine
- Notification System
- Webhook System
- Analytics
- Logging
- Localization
- API
- Support Infrastructure

معماری باید به شکلی طراحی شود که قابلیت‌های آینده بدون بازنویسی گسترده Core سیستم اضافه شوند.

---

# 2. Core Principles

تمام تصمیمات پروژه باید بر اساس اصول زیر باشند.

## 2.1 User First

کاربر نباید مجبور به درک پیچیدگی‌های داخلی سیستم باشد.

پیچیدگی باید در Backend پنهان شود و UI ساده باقی بماند.

اصل:

> Simple by default, powerful when needed.

---

## 2.2 Configuration Driven

رفتارهای اصلی سیستم نباید Hard-code شوند.

مواردی مانند:

- Ticket Type
- Panel
- Button
- Select Menu
- Form
- Notification
- Webhook
- Automation
- Staff Team
- Status
- Priority

باید از طریق Configuration مدیریت شوند.

---

## 2.3 Extensibility

هر Feature جدید باید بتواند بدون تغییرات مخرب در سیستم فعلی اضافه شود.

از معماری‌هایی که Feature جدید را به چندین بخش غیرمرتبط وابسته می‌کنند اجتناب شود.

---

## 2.4 Reliability First

در یک Ticket Bot از دست رفتن Event یا Ticket قابل قبول نیست.

سیستم باید در برابر موارد زیر مقاوم باشد:

- Discord API failure
- Network failure
- Database failure
- Redis failure
- Worker crash
- Bot restart
- Duplicate Event
- Timeout
- Rate Limit
- Partial Failure

---

## 2.5 Security by Default

تمام داده‌ها و عملیات باید حداقل سطح دسترسی ممکن را داشته باشند.

هیچ Secret، Token، API Key یا Credential نباید در:

- Source Code
- Git
- Client
- Logs
- Error Messages

قرار بگیرد.

---

# 3. Recommended Technology Stack

Stack اصلی پیشنهادی:

## Backend

- TypeScript
- Node.js
- Discord.js

## API

یکی از:

- Fastify
- NestJS

انتخاب نهایی باید بر اساس ساختار پروژه و پیچیدگی مورد نیاز انجام شود.

## Dashboard

- Next.js
- React
- Tailwind CSS

## Database

- PostgreSQL

ORM:

- Prisma
- یا Drizzle

## Cache / Queue

- Redis
- BullMQ

## Infrastructure

- Docker
- Reverse Proxy
- CI/CD
- Monitoring
- Logging

انتخاب سرویس‌های Infrastructure باید قابل تغییر باشد و Core پروژه به Provider خاصی وابسته نشود.

---

# 4. Architecture

Ticker Boy باید به صورت Modular طراحی شود.

ساختار مفهومی:

```text
Ticker Boy
│
├── Discord Bot
│
├── Dashboard
│
├── API
│
├── Core
│   ├── Ticket Engine
│   ├── Action Engine
│   ├── Event Engine
│   ├── Automation Engine
│   └── Permission Engine
│
├── Services
│   ├── Notification
│   ├── Webhook
│   ├── Transcript
│   ├── Analytics
│   ├── Localization
│   └── Storage
│
├── Workers
│
├── PostgreSQL
│
└── Redis
```

این ساختار یک پیشنهاد معماری است و می‌تواند در زمان Implementation بهینه شود؛ اما Domain Separation باید حفظ شود.

---

# 5. Domain Separation

Domainهای اصلی:

```text
Guild
User
Staff
Ticket
TicketType
Panel
Component
Action
Form
Automation
Notification
Webhook
Transcript
AuditLog
Analytics
Localization
```

هر Domain باید مسئولیت مشخص داشته باشد.

یک Module نباید بدون دلیل مسئولیت Module دیگر را بر عهده بگیرد.

---

# 6. Ticket Engine

Ticket Engine قلب سیستم است.

باید از انواع مختلف Ticket پشتیبانی کند:

```text
Channel Ticket
Private Thread Ticket
Web Ticket
```

و در آینده امکان اضافه کردن:

```text
DM Ticket
External Ticket
Custom Ticket Provider
```

بدون بازنویسی Core وجود داشته باشد.

---

# 7. Ticket Lifecycle

چرخه استاندارد Ticket:

```text
Created
   ↓
Open
   ↓
Claimed / Unclaimed
   ↓
In Progress
   ↓
Pending
   ↓
Resolved
   ↓
Closed
   ↓
Archived / Deleted
```

Statusها باید قابل توسعه و در آینده قابل Customization باشند.

---

# 8. Ticket Identity

هر Ticket باید دارای شناسه پایدار باشد.

Ticket نباید صرفاً با Channel ID شناسایی شود.

نمونه:

```text
Ticket ID: TCK-0001928
Guild ID: ...
User ID: ...
Discord Channel ID: ...
Type: channel
Status: open
```

Ticket ID باید مستقل از Discord Resource باشد.

---

# 9. Ticket Configuration

هر Guild می‌تواند Configuration مستقل داشته باشد.

موارد قابل تنظیم:

- Ticket Type
- Category
- Staff Roles
- Naming Template
- Topic
- Permissions
- Mention Settings
- Limits
- Cooldown
- Auto Close
- Auto Delete
- Transcript
- Notifications
- Forms
- Tags
- Priority
- Status

---

# 10. Panel System

Panel باید کاملاً Dynamic باشد.

هر Panel می‌تواند شامل:

- Text
- Embed
- Button
- Select Menu
- Link Button
- Multiple Components

باشد.

Panel نباید به Ticket Creation محدود شود.

هر Component باید بتواند یک یا چند Action داشته باشد.

---

# 11. Action Engine

Action Engine باید سیستم مرکزی اجرای عملیات Componentها باشد.

Actionهای پایه:

```text
CreateTicket
CloseTicket
ReopenTicket
ClaimTicket
UnclaimTicket
AddUser
RemoveUser
SendMessage
OpenModal
OpenURL
AddRole
RemoveRole
ChangeStatus
ChangePriority
AddTag
RemoveTag
RunAutomation
SendWebhook
```

Actionها باید قابل توسعه باشند.

هر Action باید:

- Validation
- Permission Check
- Execution
- Error Handling
- Logging

داشته باشد.

---

# 12. Forms

Form Builder باید امکان ساخت فرم‌های قابل تنظیم را فراهم کند.

Fieldهای پایه:

```text
Short Text
Long Text
Number
Email
URL
Select
Multi Select
Checkbox
Date
Attachment
```

هر Field می‌تواند داشته باشد:

- Label
- Description
- Placeholder
- Required
- Validation
- Min Length
- Max Length
- Default Value

Form Result باید به Ticket متصل شود.

---

# 13. Automation Engine

Automation باید Event-Based باشد.

Triggerهای پایه:

```text
ticket.created
ticket.closed
ticket.reopened
ticket.claimed
ticket.unclaimed
ticket.message.created
ticket.message.deleted
ticket.message.edited
ticket.user.added
ticket.user.removed
ticket.status.changed
ticket.priority.changed
form.submitted
```

Actionهای Automation می‌توانند شامل:

```text
Send Message
Add Role
Remove Role
Assign Staff
Change Status
Change Priority
Add Tag
Remove Tag
Send Webhook
Close Ticket
Create Ticket
Wait
Condition
```

Automation نباید باعث Loop بی‌نهایت شود.

---

# 14. Notification System

Notificationها باید Event-Based باشند.

برای هر Event امکان تنظیم:

```text
Enabled
Channel
Webhook
Message Type
Embed
Mention User
Mention Role
Custom Template
```

وجود داشته باشد.

Client باید بتواند Notification Channel را برای هر Event به صورت مستقل تعیین کند.

---

# 15. Logging

Logging باید به دو بخش تقسیم شود:

## System Logs

برای Developers و Infrastructure.

## Audit Logs

برای Client و Staff.

Audit Log باید مشخص کند:

```text
Who
What
When
Where
Before
After
```

مثال:

```text
Admin changed ticket category.

Before: Support
After: Billing

Time: ...
```

---

# 16. Ticket Logs

Ticket باید Event History مستقل داشته باشد.

Eventهای مهم:

```text
Created
Closed
Deleted
Reopened
Claimed
Unclaimed
User Added
User Removed
Message Created
Message Edited
Message Deleted
Attachment Added
Status Changed
Priority Changed
Category Changed
Name Changed
```

Eventها باید Timestamp و Actor داشته باشند.

---

# 17. Transcript

Transcript باید اطلاعات کامل Ticket را نگهداری کند.

شامل:

- Messages
- Authors
- Staff
- Attachments
- Embeds
- Reactions
- Deleted Messages
- Edited Messages
- System Events

فرمت‌های پایه:

```text
HTML
JSON
```

PDF می‌تواند در نسخه‌های بعد اضافه شود.

---

# 18. Internal Notes

Staff باید بتواند Note خصوصی ثبت کند.

Internal Note نباید برای Ticket Creator قابل مشاهده باشد.

---

# 19. Staff System

Staff باید قابل مدیریت باشد.

قابلیت‌ها:

- Staff Roles
- Teams
- Departments
- Permissions
- Assignment
- Claim
- Availability
- Statistics

Staff Permission باید مستقل از Discord Role Permissionها نیز قابل کنترل باشد.

---

# 20. Permission System

Permissionها باید چند سطح داشته باشند:

```text
Discord Permission
Guild Permission
Dashboard Permission
Ticket Permission
Staff Permission
```

هیچ Action مهمی بدون Permission Check اجرا نشود.

---

# 21. Webhook System

Webhook باید قابل تنظیم باشد.

تنظیمات:

```text
Event
URL
Headers
Secret
Timeout
Retry
Enabled
```

Webhook Delivery باید Log شود.

در صورت Failure:

```text
Retry
Backoff
Maximum Attempts
```

وجود داشته باشد.

Webhook Secret نباید در Client نمایش داده شود.

---

# 22. API

API باید Versioned باشد.

مثلاً:

```text
/api/v1/...
```

API باید Authentication و Authorization داشته باشد.

API Keyها باید:

- قابل ایجاد
- قابل حذف
- قابل Revocation
- دارای Scope

باشند.

---

# 23. Web Ticket

Web Ticket باید بتواند با Discord Sync شود.

مثلاً:

```text
Web User
   ↓
Web Ticket
   ↓
Ticket Engine
   ↓
Discord
```

و برعکس:

```text
Discord Staff
   ↓
Ticket Engine
   ↓
Web
```

State باید Single Source of Truth داشته باشد.

---

# 24. Localization

تمام متن‌های داخلی باید از سیستم Localization عبور کنند.

نباید متن‌های زبان‌محور در Core Hard-code شوند.

مثال:

```text
en-US
fa-IR
tr-TR
de-DE
fr-FR
es-ES
ru-RU
ar-SA
```

RTL باید به صورت واقعی پشتیبانی شود.

---

# 25. Customization

تمام موارد قابل مشاهده برای Client تا حد منطقی باید قابل Customization باشند.

شامل:

- Message
- Embed
- Buttons
- Select Menus
- Emoji
- Colors
- Footer
- Thumbnail
- Avatar
- Webhook Name
- Webhook Avatar
- Notifications
- Ticket Naming
- Messages
- Templates

اما Customization نباید باعث کاهش امنیت یا شکستن Validation شود.

---

# 26. Bot Identity

Identity اصلی Discord Bot باید از Webhook Identity جدا باشد.

Webhook می‌تواند:

```text
Custom Name
Custom Avatar
Custom Message
```

داشته باشد.

نباید محدودیت‌های Discord درباره Bot Identity دور زده شوند.

---

# 27. Dashboard

Dashboard باید Client-Oriented باشد.

صفحات پایه:

```text
Overview
Servers
Tickets
Panels
Ticket Types
Categories
Forms
Automations
Staff
Notifications
Webhooks
Analytics
Transcripts
Audit Logs
Localization
Settings
```

---

# 28. Dashboard Rules

Dashboard باید:

- Responsive
- Fast
- Accessible
- Consistent
- Mobile Friendly
- Error Resistant

باشد.

هر عملیات باید Feedback مناسب داشته باشد:

```text
Loading
Success
Warning
Error
Empty
```

---

# 29. Onboarding

اولین ورود Client باید ساده باشد.

Flow پیشنهادی:

```text
Login
 ↓
Select Server
 ↓
Check Permissions
 ↓
Quick Setup
 ↓
Create First Ticket System
 ↓
Publish
```

کاربر نباید برای شروع مجبور به Configuration پیچیده باشد.

---

# 30. Preview System

هر Builder مهم باید Preview داشته باشد.

حداقل:

```text
Panel Preview
Embed Preview
Form Preview
Notification Preview
```

کاربر باید قبل از Publish نتیجه را مشاهده کند.

---

# 31. Draft & Publish

Configurationهای حساس بهتر است دارای:

```text
Draft
Published
```

باشند.

کاربر بتواند تغییرات را قبل از Publish بررسی کند.

---

# 32. Configuration Versioning

در آینده Configuration Versioning باید پشتیبانی شود.

مثلاً:

```text
Version 1
Version 2
Version 3
```

و امکان:

```text
View
Compare
Restore
```

وجود داشته باشد.

---

# 33. Statistics

Server Statistics:

```text
Total Tickets
Open Tickets
Closed Tickets
Average Response Time
Average Resolution Time
Tickets per Category
Tickets per Staff
Peak Hours
Satisfaction
```

Global Statistics:

```text
Servers
Users
Tickets
Active Tickets
API Requests
Commands
Errors
Latency
Uptime
```

داده‌های حساس کاربران نباید در Statistics عمومی نمایش داده شوند.

---

# 34. Support Server

Support Server رسمی باید سیستم Logging مستقل داشته باشد.

Channelهای پیشنهادی:

```text
#bot-joins
#bot-leaves
#user-reports
#updates
#statistics
#feedback
#bugs
```

---

# 35. Bot Join / Leave Logs

زمان Add شدن Bot:

```text
Guild
Guild ID
Member Count
Owner
Added By
Timestamp
```

زمان Remove:

```text
Guild
Member Count
Timestamp
```

اطلاعات حساس باید Mask شوند.

---

# 36. Support Reports

کاربر باید بتواند:

```text
Bug Report
Feature Request
Abuse Report
General Support
```

ارسال کند.

Reports باید قابل Tracking باشند.

---

# 37. Changelog

هر Release باید Changelog داشته باشد.

Changelog باید در:

- Dashboard
- Support Server
- Bot Help

در دسترس باشد.

---

# 38. Help Command

Help باید شامل:

```text
Commands
Dashboard
Support
Latest Update
```

باشد.

Latest Update باید آخرین Version و Changelog را نمایش دهد.

---

# 39. Statistics Command

حداقل:

```text
/stats
/botstats
```

وجود داشته باشد.

`/stats` برای Server و `/botstats` برای آمار کلی Bot استفاده شود.

---

# 40. Live Statistics Message

Support Server باید یک Statistics Message داشته باشد.

Message شامل:

```text
Bot Status
Servers
Users
Tickets
Latency
Uptime
Version
```

باشد.

دکمه:

```text
Refresh
```

باید همان Message را Update کند و Message جدید ایجاد نکند.

---

# 41. Error Handling

هیچ Error نباید باعث Crash کل Bot شود.

تمام Errorها باید:

1. Catch شوند
2. Log شوند
3. Context داشته باشند
4. User-friendly Response داشته باشند

User نباید Stack Trace دریافت کند.

---

# 42. Rate Limiting

تمام Endpointهای حساس باید Rate Limit داشته باشند.

شامل:

- API
- Webhooks
- Dashboard Actions
- Ticket Creation
- Reports
- Automation

Rate Limit باید قابل تنظیم باشد.

---

# 43. Idempotency

Actionهای حساس باید Idempotent باشند.

به‌خصوص:

```text
Create Ticket
Close Ticket
Webhook Delivery
Automation
Database Events
```

Duplicate Event نباید باعث ایجاد Duplicate Ticket یا Duplicate Action شود.

---

# 44. Queue System

کارهای غیرضروری برای Response فوری باید به Queue منتقل شوند.

مثلاً:

```text
Transcript Generation
Webhook Delivery
Analytics Processing
Notifications
Heavy Operations
```

User-facing Action نباید بی‌دلیل منتظر عملیات Background بماند.

---

# 45. Caching

اطلاعاتی که زیاد خوانده می‌شوند و کم تغییر می‌کنند می‌توانند Cache شوند.

مثلاً:

```text
Guild Configuration
Panel Configuration
Localization
Permissions
```

Cache نباید Source of Truth باشد.

Database Source of Truth باقی می‌ماند.

---

# 46. Scalability

سیستم باید حداقل برای:

```text
100+ Active Guilds
```

طراحی شود.

اما Architecture نباید روی عدد 100 محدود شود.

هدف معماری باید امکان رشد به:

```text
1,000+
10,000+
```

Guild نیز باشد.

---

# 47. Discord API

تمام عملیات Discord باید با Rate Limitها سازگار باشند.

نباید API Discord Spam شود.

Batching، Queue و Caching در جایی که منطقی است استفاده شوند.

تمام Discord API Errorها باید Handle شوند.

---

# 48. Database Rules

Database باید:

- Normalized where appropriate
- Indexed
- Migration Based
- Transaction Safe

باشد.

برای Queryهای پرتکرار Index مناسب ایجاد شود.

از N+1 Query جلوگیری شود.

Database Schema نباید بدون Migration تغییر کند.

---

# 49. Data Integrity

Foreign Keyها و Constraintهای لازم باید استفاده شوند.

عملیات چندمرحله‌ای مهم باید Transaction داشته باشند.

در صورت Failure باید امکان Recovery وجود داشته باشد.

---

# 50. Secrets

Secrets فقط از Environment / Secret Manager خوانده شوند.

هرگز:

```text
TOKEN
DATABASE PASSWORD
API KEY
WEBHOOK SECRET
OAUTH SECRET
```

در Repository ذخیره نشوند.

---

# 51. Logging Policy

Logها نباید شامل:

- Password
- Token
- API Key
- OAuth Secret
- Webhook Secret
- Sensitive User Data

باشند.

Log Levelها:

```text
DEBUG
INFO
WARN
ERROR
FATAL
```

---

# 52. Monitoring

سیستم Production باید Metrics داشته باشد.

حداقل:

```text
Bot Latency
API Latency
Database Latency
Redis Latency
Queue Size
Error Rate
Memory
CPU
Active Workers
Gateway Status
```

---

# 53. Health Checks

حداقل Endpoint:

```text
/health
```

و در صورت نیاز:

```text
/ready
/live
```

وجود داشته باشد.

Health Check باید وضعیت Dependencyها را نیز در نظر بگیرد.

---

# 54. Testing

Feature مهم بدون Test نباید وارد Production شود.

سطوح Test:

```text
Unit Test
Integration Test
API Test
Database Test
Discord Mock Test
E2E Test
```

Featureهای Critical باید Coverage مناسبی داشته باشند.

---

# 55. Critical Features

این موارد باید بالاترین سطح تست را داشته باشند:

```text
Ticket Creation
Ticket Closing
Permissions
Authentication
Webhook
Automation
Database Transactions
Discord Event Handling
Configuration Publishing
```

---

# 56. Git Rules

Branchها:

```text
main
develop
feature/*
fix/*
hotfix/*
```

Commitها باید واضح باشند.

مثال:

```text
feat: add private thread tickets
fix: prevent duplicate ticket creation
refactor: improve ticket service
docs: update webhook documentation
```

---

# 57. Code Quality

کد باید:

- Typed
- Readable
- Modular
- Testable
- Maintainable

باشد.

از:

- Any غیرضروری
- God Class
- God Function
- Circular Dependency
- Duplicate Logic

اجتناب شود.

---

# 58. Dependency Rules

Dependencyها باید حداقل و منطقی باشند.

هر Library جدید باید دلیل مشخص داشته باشد.

Package بدون استفاده نباید وارد پروژه شود.

---

# 59. Environment Separation

حداقل:

```text
development
staging
production
```

وجود داشته باشد.

Development نباید به Production Database متصل شود.

---

# 60. Deployment

Production Deployment باید قابل تکرار باشد.

Docker و CI/CD استفاده شود.

Deployment باید:

```text
Build
Test
Migrate
Deploy
Health Check
Rollback
```

را پوشش دهد.

---

# 61. Backup

Backup برای:

```text
PostgreSQL
Configuration
Transcripts
```

باید در نظر گرفته شود.

Backup باید قابل Restore باشد.

Backup بدون تست Restore قابل اعتماد محسوب نمی‌شود.

---

# 62. Disaster Recovery

برای Failureهای بزرگ باید Recovery Plan وجود داشته باشد.

شامل:

- Database Failure
- Redis Failure
- Bot Crash
- Worker Crash
- API Failure
- Server Failure

---

# 63. Documentation

هر Feature مهم باید Documentation داشته باشد.

حداقل:

```text
Purpose
Configuration
API
Events
Permissions
Examples
Error Cases
```

---

# 64. API Documentation

API باید Documentation رسمی داشته باشد.

برای هر Endpoint:

```text
Method
Path
Authentication
Permissions
Request
Response
Errors
Examples
```

---

# 65. Event Documentation

Eventهای داخلی نیز باید Document شوند.

مثلاً:

```text
ticket.created
```

شامل:

```text
Event Name
Payload
Trigger
Consumers
Retry Behavior
```

باشد.

---

# 66. Feature Flags

Featureهای آزمایشی باید قابلیت Enable / Disable داشته باشند.

مثلاً:

```text
FEATURE_WEB_TICKETS=true
FEATURE_AI=false
FEATURE_AUTOMATION=true
```

Feature Flagها نباید به صورت Random در Code پخش شوند.

---

# 67. Backward Compatibility

تغییرات API، Database و Eventها باید تا حد امکان Backward Compatible باشند.

Breaking Change باید:

- Document
- Version
- Announce

شود.

---

# 68. Future AI

AI باید به عنوان یک Module مستقل طراحی شود.

Core Ticket Engine نباید مستقیماً به AI Provider خاصی وابسته شود.

در آینده امکان:

```text
OpenAI
Other Providers
Local Models
```

باید وجود داشته باشد.

---

# 69. Future Plugin System

Plugin Architecture در طراحی آینده در نظر گرفته شود.

Plugin می‌تواند:

```text
Event
Action
Integration
Command
Dashboard Page
```

اضافه کند.

اما Plugin نباید دسترسی نامحدود و بدون Sandbox به Core داشته باشد.

---

# 70. SaaS Readiness

حتی اگر Monetization در V1 وجود نداشته باشد، Architecture باید آماده Subscription باشد.

مثلاً:

```text
Plan
Feature
Limit
Usage
Subscription
```

ولی Featureهای Paid نباید قبل از نیاز واقعی پیچیده شوند.

---

# 71. Privacy

اطلاعات کاربران باید حداقل مورد نیاز ذخیره شود.

Retention Policy برای داده‌هایی مانند:

- Transcript
- Logs
- Analytics

در نظر گرفته شود.

Client باید تا حد امکان کنترل Retention را داشته باشد.

---

# 72. Data Deletion

سیستم باید قابلیت حذف داده‌های مربوط به Guild را داشته باشد.

مثلاً:

```text
Delete Guild Data
```

با Confirmation و Permission مناسب.

---

# 73. UX Rule

هیچ Feature پیچیده‌ای نباید بدون:

```text
Description
Tooltip
Validation
Error Message
Success Feedback
```

باشد.

---

# 74. Confirmation

Actionهای مخرب مانند:

```text
Delete Ticket
Delete Configuration
Delete Guild Data
Revoke API Key
```

باید Confirmation داشته باشند.

---

# 75. Empty States

هر صفحه Empty باید توضیح دهد:

```text
What happened
Why it's empty
What user can do next
```

مثلاً:

```text
No Ticket Panels yet.

Create your first panel to start receiving tickets.

[ Create Panel ]
```

---

# 76. Loading States

از Loading Indicator مناسب استفاده شود.

برای عملیات طولانی:

```text
Processing...
```

و در صورت نیاز:

```text
This may take a few seconds.
```

---

# 77. Error UX

Error باید قابل فهم باشد.

بد:

```text
Error 500
```

خوب:

```text
We couldn't create the ticket.

Discord didn't allow the bot to create this channel.
Please check the bot's permissions.
```

---

# 78. Accessibility

Dashboard باید تا حد امکان:

- Keyboard Accessible
- Screen Reader Friendly
- High Contrast
- Proper Focus State
- Semantic HTML

باشد.

---

# 79. Mobile

Dashboard باید Mobile Responsive باشد.

Featureهای اصلی روی Mobile نیز باید قابل استفاده باشند.

---

# 80. Performance

هدف:

- Fast initial load
- Low API latency
- Minimal Discord API calls
- Efficient Database Queries
- Cached Configuration
- Background Processing

هیچ Optimization نباید باعث کاهش Reliability شود.

---

# 81. Security Boundary

هیچ اطلاعاتی صرفاً به دلیل اینکه در Frontend مخفی شده، امن محسوب نمی‌شود.

تمام Permissionها باید در Backend نیز بررسی شوند.

---

# 82. Client Isolation

هر Guild باید کاملاً از Guildهای دیگر Isolated باشد.

یک Guild نباید بتواند:

- Configuration Guild دیگر
- Tickets Guild دیگر
- Users Guild دیگر
- Webhooks Guild دیگر

را مشاهده یا تغییر دهد.

---

# 83. Multi-Tenant Architecture

Ticker Boy باید Multi-Tenant باشد.

Tenant اصلی:

```text
Guild
```

تمام Resourceها باید Tenant Context داشته باشند.

---

# 84. Global vs Guild Data

داده‌ها باید به دو گروه تقسیم شوند:

## Global

```text
Bot Version
Changelog
Global Statistics
System Configuration
```

## Guild

```text
Panels
Tickets
Forms
Staff
Webhooks
Automations
Settings
```

این دو نباید با هم مخلوط شوند.

---

# 85. Source of Truth

برای هر داده باید مشخص باشد Source of Truth چیست.

مثلاً:

```text
Ticket State → PostgreSQL
Cache → Redis
Discord Message → Discord
Webhook Delivery State → Database
Dashboard Session → Session Store
```

Redis نباید جایگزین Database شود.

---

# 86. Event Driven Design

جاهایی که مناسب است از Event استفاده شود.

مثلاً:

```text
Ticket Created
      ↓
Event Bus
      ├── Notification
      ├── Analytics
      ├── Webhook
      ├── Automation
      └── Audit Log
```

Ticket Service نباید مستقیماً مسئول اجرای تمام این موارد باشد.

---

# 87. Decoupling

مثلاً Ticket Creation نباید به این شکل باشد:

```text
Create Ticket
 ↓
Send Notification
 ↓
Send Webhook
 ↓
Generate Transcript
 ↓
Update Analytics
 ↓
...
```

بلکه:

```text
Create Ticket
      ↓
Emit Event
      ↓
Background Consumers
```

تا Failure یک Consumer باعث Failure کل Ticket Creation نشود.

---

# 88. Retry Policy

Retry باید فقط برای عملیات مناسب انجام شود.

Retry باید:

```text
Limited
Exponential Backoff
Observable
Idempotent
```

باشد.

Retry بی‌نهایت ممنوع است.

---

# 89. Discord Permission Recovery

اگر Bot Permission لازم برای یک عملیات را نداشته باشد:

- Operation Fail شود
- User پیام واضح دریافت کند
- Error Log شود
- در صورت امکان راهنمای رفع مشکل نمایش داده شود

---

# 90. Configuration Validation

قبل از Publish:

```text
Validate
 ↓
Show Errors
 ↓
Confirm
 ↓
Publish
```

Configuration ناقص نباید Publish شود.

---

# 91. Safe Defaults

تمام Featureها باید Default امن داشته باشند.

مثلاً:

```text
Webhook = Disabled
Public API = Disabled
Dangerous Automation = Restricted
```

---

# 92. No Hidden Behavior

سیستم نباید بدون اطلاع Client:

- Ticket ایجاد کند
- Role تغییر دهد
- Webhook ارسال کند
- Message ارسال کند
- داده‌ای جمع‌آوری کند

مگر اینکه در Configuration یا Core Product Behavior تعریف شده باشد.

---

# 93. Naming

نام‌گذاری باید Consistent باشد.

مثلاً:

```text
ticketId
guildId
userId
channelId
staffRoleId
```

و نه ترکیبی از:

```text
guildID
server_id
GuildId
```

در یک بخش.

---

# 94. API Naming

API باید Naming استاندارد داشته باشد.

مثلاً:

```text
GET    /api/v1/guilds
GET    /api/v1/guilds/:guildId/tickets
POST   /api/v1/guilds/:guildId/tickets
PATCH  /api/v1/tickets/:ticketId
DELETE /api/v1/tickets/:ticketId
```

---

# 95. No Premature Microservices

پروژه نباید بدون نیاز واقعی به Microserviceهای متعدد تقسیم شود.

ابتدا:

```text
Modular Architecture
```

سپس در صورت نیاز:

```text
Horizontal Scaling
Workers
Dedicated Services
```

انجام شود.

---

# 96. Scalability Strategy

Scale باید مرحله‌ای باشد:

```text
Stage 1
Single Application
+
Workers

Stage 2
Multiple Workers
+
Redis

Stage 3
Horizontal API Scaling

Stage 4
Dedicated Services
```

از پیچیده کردن Infrastructure قبل از نیاز واقعی اجتناب شود.

---

# 97. Release Strategy

Releaseها:

```text
Major
Minor
Patch
```

مثلاً:

```text
v1.0.0
v1.1.0
v1.1.1
```

Breaking Changes فقط در Major Release مگر موارد ضروری.

---

# 98. Development Workflow

هر Feature:

```text
Idea
 ↓
Specification
 ↓
Design
 ↓
Implementation
 ↓
Tests
 ↓
Review
 ↓
Staging
 ↓
Production
```

Feature بدون Specification نباید مستقیماً وارد Implementation شود.

---

# 99. Definition of Done

Feature زمانی Complete است که:

- Implementation شده باشد
- Error Handling داشته باشد
- Permission بررسی شود
- Test شده باشد
- Documentation داشته باشد
- UI/UX کامل باشد
- Loading/Error/Empty State داشته باشد
- Security بررسی شده باشد
- Logging لازم داشته باشد
- در صورت نیاز Metrics داشته باشد

---

# 100. Golden Rule

در تمام مراحل توسعه Ticker Boy این اصل باید حفظ شود:

> **Build a platform, not a collection of features.**

هر Feature جدید باید:

1. با Architecture سازگار باشد.
2. قابل توسعه باشد.
3. امنیت را تضعیف نکند.
4. UX را پیچیده نکند.
5. قابلیت تست داشته باشد.
6. قابلیت Scale داشته باشد.
7. وابستگی غیرضروری ایجاد نکند.
8. Documentation داشته باشد.
9. Event و Logging مناسب داشته باشد.
10. امکان توسعه در نسخه‌های آینده را حفظ کند.

---

# Final Product Goal

Ticker Boy باید در نهایت یک پلتفرم باشد که Client بتواند تقریباً تمام سیستم Support سرور خود را بدون کدنویسی مدیریت کند:

```text
                    TICKER BOY
                        │
        ┌───────────────┼────────────────┐
        │               │                │
     Discord          Dashboard          Web
        │               │                │
        └───────────────┼────────────────┘
                        │
                   Ticket Engine
                        │
      ┌─────────────────┼──────────────────┐
      │                 │                  │
   Panels             Forms           Automation
      │                 │                  │
      └─────────────────┼──────────────────┘
                        │
                 Notifications
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       Discord       Webhook        Logs
                        │
                        ▼
                   Analytics
```

**Ticker Boy باید سریع، قابل اعتماد، امن، قابل توسعه، Multi-Tenant، User-Friendly و آماده Scale باشد.**

هیچ Feature جدیدی نباید صرفاً برای افزایش تعداد قابلیت‌ها اضافه شود؛ هر Feature باید ارزش واقعی برای Client یا End User ایجاد کند.