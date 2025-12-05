# Workflow разработки

## Именование Issue

Используем префикс **JSC** (Jira Smart Copy) для всех issue.

### Формат

```
JSC-{номер}: {Краткое описание}
```

### Примеры

- `JSC-1: Add dark mode support`
- `JSC-2: Implement keyboard shortcuts`
- `JSC-3: Fix copy formatting in Firefox`
- `JSC-4: Add support for multiple Jira instances`
- `JSC-5: Improve toast notification styling`

## Именование веток

### Формат

```
jsc-{номер}-{краткое-описание}
```

### Примеры

- `jsc-1-dark-mode-support`
- `jsc-2-keyboard-shortcuts`
- `jsc-3-fix-firefox-formatting`
- `jsc-4-multiple-jira-instances`
- `jsc-5-improve-toast-styling`

## Процесс разработки

### 1. Создание Issue

1. Создайте issue в GitHub с префиксом JSC
2. Опишите задачу, требования и критерии приёмки
3. Присвойте метки (bug, enhancement, feature, etc.)

### 2. Создание ветки

```bash
# Создайте ветку от main
git checkout main
git pull origin main
git checkout -b jsc-{номер}-{описание}
```

### 3. Разработка

1. Делайте коммиты с понятными сообщениями
2. Используйте conventional commits:
   - `feat:` - новая функциональность
   - `fix:` - исправление бага
   - `docs:` - изменения в документации
   - `refactor:` - рефакторинг кода
   - `test:` - добавление тестов
   - `chore:` - технические изменения

**Примеры коммитов:**
```bash
git commit -m "feat(jsc-1): add dark mode toggle in popup"
git commit -m "fix(jsc-3): correct HTML formatting in Firefox"
git commit -m "docs(jsc-1): update README with dark mode info"
```

### 4. Pull Request

1. Запушьте ветку в репозиторий:
```bash
git push origin jsc-{номер}-{описание}
```

2. Создайте Pull Request автоматически с помощью скрипта:
```bash
# Автоматически определит JSC номер из имени ветки
./scripts/create-pr.sh "Add dark mode support"

# Или укажите номер вручную
./scripts/create-pr.sh 5 "Add dark mode support"
```

Скрипт автоматически:
- ✅ Извлечёт номер JSC из имени ветки (если есть)
- ✅ Предложит следующий доступный номер (если нет в ветке)
- ✅ Создаст PR с правильным заголовком `JSC-N: Description`
- ✅ Добавит `Closes #N` в описание

Или используйте `gh` напрямую:
```bash
gh pr create --title "JSC-{номер}: {Описание}" \
  --body "Closes #{номер}" \
  --base main
```

### 5. Мерж

1. После ревью смержите PR в main
2. Удалите ветку после мержа
3. Закройте связанный issue

## Релизы

### Создание релиза

```bash
# После мержа всех нужных фич в main
git checkout main
git pull origin main

# Создайте и запушьте тег
git tag v{версия}
git push origin v{версия}
```

Это автоматически запустит workflow для создания релиза.

## Номерация версий

Используем [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): breaking changes
- **MINOR** (1.0.0 → 1.1.0): новая функциональность (обратно совместимая)
- **PATCH** (1.0.0 → 1.0.1): исправление багов

### Примеры

- `v1.4.1` - исправление бага
- `v1.5.0` - добавление dark mode
- `v2.0.0` - переход на Manifest V3 (breaking change)

## Защита ветки main

Рекомендуется настроить защиту ветки main в GitHub:

1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Включить:
   - ✅ Require pull request before merging
   - ✅ Require approvals (если работаете в команде)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require linear history
   - ✅ Include administrators (опционально)

## Быстрые команды

```bash
# Создать новую фичу
git checkout main && git pull && git checkout -b jsc-{N}-{description}

# Обновить ветку из main
git checkout main && git pull && git checkout jsc-{N}-{description} && git merge main

# Удалить локальную ветку после мержа
git branch -d jsc-{N}-{description}

# Удалить удалённую ветку после мержа
git push origin --delete jsc-{N}-{description}
```
