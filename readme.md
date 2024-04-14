### Как запускать

Установить зависимостей:
`npm run i`

Запуск (на Windows передача токена сработала только в таком виде):
`$env:TOKEN = 'XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX'; npm run serve`

### Что не получилось

В связи с особенностями API поиск по названию и поиск по фильтрам не совместимы. В проекте они работают отдельно: Если ввести название фильма, будет поиск по названию. Если будут применены фильтры - поиск по фильтрам
