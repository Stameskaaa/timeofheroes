import classNames from 'classnames';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, MessageCircleQuestionMark } from 'lucide-react';
import { ModalIndex } from '@/constants/zIndex';
import { Button } from '@/components/ui/button';
import { Textarea, type TextareaProps } from './Textarea';
import { MarkDownText } from '../../typography/MarkDownText';
import { SidePanel } from '../../modals/sidePanel/SidePanel';

export const TextareaMD: React.FC<TextareaProps> = ({ control, name, className, ...props }) => {
  const {
    field: { value },
  } = useController({ control, name });
  const [isShowed, setIsShowed] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Textarea
        className={classNames('h-60', className)}
        control={control}
        name={name}
        actions={[
          <Button size="sm" key={2} onClick={() => setIsShowed((prev) => !prev)}>
            {isShowed ? <Eye /> : <EyeOff />}
          </Button>,
          <SidePanel
            zIndex={ModalIndex + 2}
            key={3}
            buttonTrigger={
              <Button size="sm">
                <MessageCircleQuestionMark />
              </Button>
            }>
            <div className="w-full h-full overflow-y-auto p-4">
              <MDCrib />
            </div>
          </SidePanel>,
        ]}
        {...props}
      />
      <AnimatePresence mode="wait">
        {isShowed && (
          <motion.div
            className="overflow-y-auto overscroll-contain border rounded-md p-2 border-brand-200"
            layout
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}>
            <MarkDownText className="min-h-[300px] max-h-[500px]">{value}</MarkDownText>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MDCrib = () => {
  return (
    <MarkDownText>
      {`
# Markdown шпаргалка

## Заголовки
# H1  
## H2  
### H3  

\`\`\`md
# H1
## H2
### H3
\`\`\`

---

## Текст
**Жирный** → \`**текст**\`  
*Курсив* → \`*текст*\`  
~~Зачёркнутый~~ → \`~~текст~~\`  
\`Моноширинный\` → \`\` \`текст\` \`\`  

---

## Списки
- элемент  
- элемент  

\`\`\`md
- элемент
- элемент
\`\`\`

1. элемент  
2. элемент  

\`\`\`md
1. элемент
2. элемент
\`\`\`

---

## Ссылки
[Название](https://example.com)  

\`\`\`md
[Название](https://example.com)
\`\`\`

---

## Картинки
Обычная:  
![alt](https://cdna.artstation.com/p/assets/images/images/085/023/762/large/anato-finnstark-img-20230809-152145w34.jpg?1739801345)  

\`\`\`md
![alt](/path/to/image.png)
\`\`\`

С контролем размера:  
<img src="https://cdna.artstation.com/p/assets/images/images/085/023/762/large/anato-finnstark-img-20230809-152145w34.jpg?1739801345" width="58" height="56"/>  

\`\`\`md
<img src="/MarkdownToolboxSmall.png" width="58" height="56"/>
\`\`\`

---

### Ниже представлена таблица с объединением ячеек

Эта таблица демонстрирует использование HTML-тегов table, tr, th, td, а также объединение ячеек с помощью colspan и rowspan.

- table — контейнер всей таблицы.
- tr — строка таблицы.
- th — заголовочная ячейка (обычно жирный текст, центрируется по умолчанию).
- td — обычная ячейка таблицы.
- colspan="N" — объединяет N ячеек по горизонтали.
- rowspan="N" — объединяет N ячеек по вертикали.

Пример кода (можно скопировать и вставить в HTML):

<table>
  <thead>
    <tr>
      <th>Имя</th>
      <th colspan="2">Навыки (Объединение двух столбцов)</th>
      <th>3 столбец</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Артас</td>
      <td>Меч</td>
      <td>Щит</td>
      <td>Строка 3 столбца</td>
    </tr>
    <tr>
      <td>Джайна</td>
      <td colspan="2">Магия (Объединение двух столбцов)</td>
      <td>Строка 3 столбца</td>
    </tr>
  </tbody>
</table>



\`\`\`
<table>
  <thead>
    <tr>
      <th>Имя</th>
      <th colspan="2">Навыки</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Артас</td>
      <td>Меч</td>
      <td>Щит</td>
    </tr>
    <tr>
      <td>Джайна</td>
      <td colspan="2">Магия</td>
    </tr>
  </tbody>
</table>

\`\`\`

---

## Цитаты
> Вот так пишется цитата  

\`\`\`md
> Вот так пишется цитата
\`\`\`

---

## Код
Однострочный → \`код\`  

\`\`\`md
\`код\`
\`\`\`

Многострочный:  
\`\`\`js
console.log("Пример");
\`\`\`

\`\`\`md
\`\`\`js
console.log("Пример");
\`\`\`
\`\`\`

---

## Горизонтальная линия
---

\`\`\`md
---
\`\`\`

---

## Таблицы
| Имя    | Класс | Уровень |
|--------|-------|---------|
| Артас  | Пал   | 10      |
| Джайна | Маг   | 12      |

\`\`\`md
| Имя    | Класс | Уровень |
|--------|-------|---------|
| Артас  | Пал   | 10      |
| Джайна | Маг   | 12      |
\`\`\`

---

## Чекбоксы (списки задач)
- [x] Сделано  
- [ ] Не сделано  

\`\`\`md
- [x] Сделано
- [ ] Не сделано
\`\`\`
      `}
    </MarkDownText>
  );
};
