# Safeddara — iOS (Capacitor)

**Репозиторий:** [github.com/slmsoft/ios_safeddara](https://github.com/slmsoft/ios_safeddara)

Нативная оболочка **Safeddara** для **iPhone / iPad**. Внутри — веб-приложение (React/Vite), папка **`App/App/public`** (уже включена в репозиторий — можно открыть Xcode сразу после клона).

> **Важно:** для App Store собирается не «APK» (это Android), а **архив Xcode** → загрузка в **App Store Connect** (сборка **IPA** / TestFlight).

### Самый быстрый путь (уже есть Mac и Xcode)

```bash
git clone https://github.com/slmsoft/ios_safeddara.git
cd ios_safeddara
npm install
```

Дальше одно из двух:

- **Только обновить нативные зависимости / SwiftPM** (в `App/App/public` уже есть собранный веб из репозитория):  
  `npm run sync:native`  
  затем `open App/App.xcodeproj`

- **Полная синхронизация** (нужна папка `dist/` с билдом — см. полный репозиторий приложения):  
  `npm run sync`  
  затем открыть Xcode.

После этого в Xcode: **Team**, **Signing**, симулятор и **Run (▶)**.  
Из монорепозитория приложения быстрее один раз: **`npm run ios:sync`** в корне (соберёт веб и заполнит `ios/dist`).

### Публикация в App Store

Готовые тексты и таблицы для копирования в **App Store Connect** и **Apple Developer** (Safeddara, не другие приложения):  
**[APP_STORE_CONNECT.md](./APP_STORE_CONNECT.md)**

---

## Что должно быть на компьютере

| Требование | Зачем |
|------------|--------|
| **macOS** | Xcode работает только на Mac. |
| **Xcode** (последняя стабильная с App Store) | Сборка, симулятор, подпись, загрузка. |
| **Apple Developer Program** (платная учётка) | Публикация в App Store / TestFlight. |
| **Node.js 18+** и **npm** | Собрать веб-часть и выполнить `cap sync` из **корня основного репозитория** приложения. |

---

## Как устроен проект

- **`App/App.xcodeproj`** — открывайте это в Xcode.
- **Bundle ID:** `tj.safeddara.app` (должен совпадать с приложением в [App Store Connect](https://appstoreconnect.apple.com)).
- Версии в проекте: **MARKETING_VERSION** (вид пользователю, например `1.0.2`) и **CURRENT_PROJECT_VERSION** (целое число, каждый раз **больше**, чем в уже загруженной сборке).

---

## Правильный порядок работы (рекомендуется)

Веб-ассеты (`App/App/public`) обновляются командой **`npx cap sync ios`** из репозитория, где есть **`package.json`**, **`capacitor.config.json`** и после **`npm run build`**.

### Шаг 1. Клонировать **полный** репозиторий мобильного приложения

Репозиторий, где лежат `src/`, `capacitor.config.json`, `package.json` (у команды Safeddara это основной mono-repo приложения, не только папка `ios`).

```bash
git clone https://github.com/slmsoft/safeddara.git
cd safeddara
```

*(Если у вас другой URL основного проекта — используйте его.)*

### Шаг 2. Установить зависимости и собрать веб

```bash
npm install
npm run build
```

Должна появиться папка **`dist/`** с собранным фронтендом.

### Шаг 3. Скопировать веб в iOS-проект Capacitor

```bash
npx cap sync ios
```

Эта команда:

- копирует содержимое `dist/` в **`ios/App/App/public`** (или путь, заданный в `webDir` в `capacitor.config.json`);
- обновляет нативные плагины Capacitor.

### Шаг 4. Открыть Xcode

Из **корня** того же репозитория:

```bash
npx cap open ios
```

Или вручную: дважды кликнуть **`ios/App/App.xcodeproj`**.

### Шаг 5. Подпись (Signing)

1. В Xcode слева выберите проект **App** → target **App**.
2. Вкладка **Signing & Capabilities**.
3. Включите **Automatically manage signing**.
4. Выберите **Team** (ваша команда Apple Developer).
5. Проверьте **Bundle Identifier**: `tj.safeddara.app`.

Если Team не виден — войдите в Xcode: **Settings → Accounts** → добавьте Apple ID.

### Шаг 6. Запуск на симуляторе

1. Вверху Xcode выберите любой **iPhone Simulator**.
2. Нажмите **Run** (▶).

### Шаг 7. Сборка для TestFlight / App Store (архив)

1. Вверху выберите **Any iOS Device (arm64)** или **Generic iOS Device** (не симулятор).
2. Меню **Product → Archive**.
3. Дождитесь окончания, в окне **Organizer** нажмите **Distribute App**.
4. Выберите **App Store Connect** и пройдите мастер до загрузки.
5. В [App Store Connect](https://appstoreconnect.apple.com) выберите сборку в версии приложения и отправьте на проверку.

---

## Если вы работаете **только** с репозиторием `ios_safeddara`

Этот репозиторий — **снимок** нативной папки `ios`. Папка **`App/App/public`** устаревает, если не обновлять её из основного проекта.

**Что делать каждый раз перед релизом:**

1. В машине, где есть **полный** проект (с `package.json`), выполнить:

   ```bash
   npm install
   npm run build
   npx cap sync ios
   ```

2. Закоммитить и запушить **обновлённую** папку `ios` (включая `App/App/public`) в `ios_safeddara`, либо просто собирать архив **из полного репозитория** после `cap sync` — так надёжнее.

Короткая команда из корня полного проекта (если в `package.json` задан скрипт):

```bash
npm run ios:sync
```

Она делает `npm run build` и `npx cap sync ios`.

---

## Полезные команды (шпаргалка)

```bash
# Из корня репозитория с capacitor.config.json:
npm install
npm run build
npx cap sync ios
npx cap open ios
```

```bash
# Проверить версию Node
node -v
```

---

## Частые проблемы

| Проблема | Что проверить |
|----------|----------------|
| Пустой/старый экран в приложении | Снова выполнить `npm run build` и `npx cap sync ios` из **корня** веб-проекта. |
| Ошибки подписи | Team, Bundle ID, действующий сертификат в **Signing & Capabilities**. |
| «Version / build» отклонили в App Store | Увеличить **CURRENT_PROJECT_VERSION** в Xcode (целое число) и при необходимости **MARKETING_VERSION**. |
| Нет Mac | Сборка iOS **невозможна** на Windows; нужен Mac или CI с `macos` (GitHub Actions, Codemagic и т.д.). |

---

## Структура каталогов (кратко)

```
ios/
├── README.md                 ← этот файл
├── App/
│   ├── App.xcodeproj/        ← открывать в Xcode
│   └── App/
│       ├── public/           ← сюда cap sync копирует веб-сборку
│       ├── Info.plist
│       └── ...
└── ...
```

---

## Контакты и репозиторий

- **iOS-only репозиторий:** [github.com/slmsoft/ios_safeddara](https://github.com/slmsoft/ios_safeddara)
- Основной код приложения и Capacitor-конфиг — в **главном** репозитории мобильного приложения команды.

---

*Документ сгенерирован для команды Safeddara. При смене Bundle ID или имени приложения обновите Xcode и App Store Connect одинаково.*
