/**
 * ios_safeddara — снимок Capacitor+iOS; Vite-сборка живёт в основном репозитории приложения.
 * Этот скрипт вызывается из npm run build, чтобы README не ломался и выводилось ясное сообщение.
 */
const fs = require('fs');
const path = require('path');

const publicIndex = path.join(__dirname, '..', 'App', 'App', 'public', 'index.html');

if (fs.existsSync(publicIndex)) {
  console.log(
    '\n[ios_safeddara] Веб уже лежит в App/App/public — отдельная сборка Vite здесь не нужна.\n' +
      'Дальше: npm run sync   (или сразу откройте App/App.xcodeproj в Xcode).\n' +
      'Чтобы пересобрать фронт: в корне полного репозитория (safeddara / safeddara_mobile) выполните npm run build и npx cap sync ios.\n'
  );
  process.exit(0);
}

console.error(
  '\n[ios_safeddara] Не найден App/App/public/index.html.\n' +
    'Клонируйте репозиторий полностью или соберите веб в основном проекте, затем npx cap sync ios.\n'
);
process.exit(1);
