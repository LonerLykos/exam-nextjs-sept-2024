Проект задеплоєний на Vercel: [[https://exam-nextjs-sept-2024-113mozp21-lonerlykos-projects.vercel.app/](https://exam-nextjs-sept-2024-113mozp21-lonerlykos-projects.vercel.app)](https://exam-nextjs-sept-2024-3sopgpxwn-lonerlykos-projects.vercel.app/)

Про проект

Для роботи з проектом потрібно пройти логінацію яка реалізована через селекти для спрощення входу. Надано 2 різних варіанти для можливості перевірки помилки на “невірно введені дані”. Обидва варіанти є валідними, помилка генерується перехресним вибором (користувач 1 + пароль 2, або користувач 2 + пароль 1).

Після логінації Вас повертає на головну сторінку, розблоковується меню і можна працювати з сайтом. Також під час логінації ви отримуєте інформацію про користувача і токени. Якщо поточний access токен  застарів його заміна відбувається автоматично, якщо за якихось причин цього не сталось Вас буде розлогінено і повернено на сторінку логінації.

На сайті згідно з ТЗ реалізовані сторінки “користувачів” та “рецептів” з короткою та детальною інформацією про кожен. Загальні сторінки з інформацією (+сторінка фільтрації) пагіновані.

У деяких користувачів в детальній інформації можна знайти створені ними рецепти. Кожна назва це посилання на сторінку з детальною інформацією на конкретний рецепт. Кожен рецепт на сторінці з детальною інформацією містить  вказівник на користувача який його створив, що являє собою посилання на детальну інформацію по конкретному користувачу.

На сайті створено пошук який активний виключно на загальних сторінках користувачів або рецептів і пошук там відбувається відповідно. Шукати можливо як за назвою так і за порядковим номером(ідентифікатором).

Крім того, загальний список рецептів має активні посилання на тегах, при кліці на який вас перенесе на відповідну сторінку фільтрації по тегах.

Це проект Next.js

P.S. я не розумію, а відповідно і не можу виправити проблему з перекиданням користувача на сторінку логінації(а звідти автоматично на головну) при оновленні сторінки вручну. Крім того я не розумію звідки беруться додаткові запити на css яких не існує, які до того ж не використовуються. І на останок я не розумію, чому при редіректі через мідлвар не коректно відображаються стилі які мають бути глобальними. якщо дасте хоч якийсь feedback по цим питанням, буду дуже вдячний.
