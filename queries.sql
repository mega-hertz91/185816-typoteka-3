
-- Получить список всех категорий (идентификатор, наименование категории);
SELECT id, name
FROM categories;

-- Получить список категорий, для которых создано минимум одно объявление (идентификатор, наименование категории);

SELECT c.id,
       c.name
FROM categories c
       JOIN publication_categories pc ON c.id = pc.category_id
GROUP BY c.id;

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);

SELECT
  c.id,
  c.name,
  count(pc.category_id) as categories
FROM categories c
       RIGHT JOIN publication_categories pc ON c.id = pc.category_id
GROUP BY c.id;

-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления;

SELECT
  count(c.id) as comments,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
  p.id,
  p.title,
  p.description,
  p.public_date,
  u.first_name,
  u.last_name,
  u.email as comments
FROM publications p
       JOIN users u ON p.user_id = u.id
       JOIN publication_categories pc ON p.id = pc.publication_id
       JOIN categories ON pc.category_id = categories.id
       LEFT JOIN comments c ON p.id = c.publication_id
GROUP BY p.id, u.id
ORDER BY p.public_date ASC;

-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);

SELECT
  count(c.id) as comments,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
  p.id,
  p.title,
  p.description,
  p.public_date,
  u.first_name,
  u.last_name,
  u.email as comments
FROM publications p
       JOIN users u ON p.user_id = u.id
       JOIN publication_categories pc ON p.id = pc.publication_id
       JOIN categories ON pc.category_id = categories.id
       LEFT JOIN comments c ON p.id = c.publication_id
WHERE p.id = 1
GROUP BY p.id, u.id;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);

SELECT c.id,
       c.message,
       u.first_name,
       u.last_name
FROM comments c
LEFT JOIN users u on u.id = c.user_id
ORDER BY id ASC
LIMIT 5;

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;

SELECT c.id,
       c.message,
       u.first_name,
       u.last_name
FROM comments c
LEFT JOIN users u on u.id = c.user_id
WHERE c.id = 1;

-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;

UPDATE publications
SET title = 'Как я встретил Новый год'
WHERE id = 1;


