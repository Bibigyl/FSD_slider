# Слайдер - jquery плагин

### [Демонстрация работы слайдера](https://bibigyl.github.io/FSD_task_4/demo/demo.html)
## Установка
```
npm install
```
### Режим работы
```
// develop
npm run start

// production
npm run build

// Запустить тесты
npm run test
```
## Использование
Для подключения плагина необходимо:
  * Подключить **jquery** к своему проекту
  * Скачать файлы **slider.js** и **slider.css** из папки dist
  * Подключить файлы **slider.js** и **slider.css** к своему проекту

Для создания слайдера c настройками "по умолчанию" выполните:
```
$('.some_div_element').slider();
```
Для создания слайдера с пользовательскими настройками, выполните функцию slider с одним параметром - объектом с настройками. Например: 
```
$('.some_div_element').slider({
    range: [2, 5],
    vertical: true
});
```
### Доступные настройки
| Название свойства | По умолчанию | Описание |
| ------ | ------ | ------ |
| Данные |
| dataFormat | numeric | Формат данных. Возможные варианты: numeric, date, custom. |
| value | null | Одно значение. По умолчанию, value примет минимальное значение. Value должно быть установлено на шаг |
| minVal | 0 | Минимальное значение |
| maxVal | 10 | Максимальное значение |
| step | 1 | Шаг. (Max - min) должно быть кратно шагу  |
| reverse | false | В обратном порядке |
| range | null | Диапазон, два бегунка. Range должно быть установлено на шаг. Отменяет value |
| customValues | - | Массив с любыми пользовательскими значениями. Только для 'dataFormat: custom', обязательный параметр |
| valueInCustomValues | - | Одно значение из customValues (аналог value). Если таких несколько, определится как первое найденное.
| rangeInCustomValues | - | Диапазон из customValue (аналог range). Если таких несколько, определится как первое найденное.
| Вид |
| length | 300px | Длина или высота. Принимает любые значение, валидные css |
| vertical | false | Вертикальный вид |
| tooltip | false | Подсказки над бегунками |
| tooltipMask | "val" | Маска подсказки. Текущее значение - val. Пример: "'$' + (+val).toFixed(2)" выведет $0.00|
| scale | false | Шкала |
| scaleStep | null | Шаг шкалы. По умолчанию примет значение шага из данных. Должно быть кратно шагу из данных |
| scaleMask | "val" | Маска делений шкалы. По аналогии с tooltipMask |

### Методы

При вызове метода, его название передается в качестве первого аргумента. Пример:
```
// Сначала инициализируем слайдер
$('.some_div_element').slider();

// Добавляем наблюдение
$('.some_div_element').slider('observe', function() {
    console.log(val);
});

// Изменяем количество бегунков
$('.some_div_element').slider('change', {
    range: [1, 3],
});

// Удаляем узел слайдера
$('.some_div_element').slider('destroy');
```
### Доступные методы
| Название метода | Описание |
| ------ | ------ |
| change | Изменяет slider. В качестве второго аргумента необходимо передать объект с новыми параметрами |
| destroy | Удаляет слайдер со страницы вместе с узлом, на котором слайдер создавался |
| observe | Создает объект наблюдателя. Позволяет вывести текущее значение value или диапазон значений range. В качестве второго аргумента необходимо передать функцию |

## Архитектура

### [UML Диаграмма](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R7V1pc5tK1v41rvJ9q%2BQCtNkfvcSJa%2BIklWQ878yXFJJaEhMWBZBs318%2FvSGxNAIkQN3o3A%2B5poEW5zxn7T7dfdG%2Fd94%2B%2BuZq%2BezNkH1haLO3i%2F7DhWEMh7qG%2F0da3lmLcW0MWcvCt2asTd81%2FLD%2BRryRv7hYWzMUJB4MPc8OrVWyceq5LpqGiTbT973X5GNzz07%2B6spcoEzDj6lpZ1v%2FZc3CJSej3x%2FtbnxC1mIZ%2FfRoOGB3HDN6mpMSLM2Z9xpr6n%2B46N%2F7nheyv5y3e2QT9kWMYe895tzdfpmP3LDMC%2BEfbfOP37e%2F%2FrY%2Bvph%2F%2FtO71m6HPU7GxrTXnOILY2Tj%2Fu5W5JPDd86I0Z81%2Bc47x%2FQXlnvRv8V3B6s3%2FK%2B2%2Fbd%2FR9BBb2HPtK0Ff2iKvw757N7cc8NeQDEmt3SdvxR1jv9a8P%2FTT5gIP2FiTn8vfG%2FtznpTz%2FZ81pm%2FmFxigbsw7vFF%2FI%2B%2FDvtt8rzw58t29M1HAaOd94iRYZ0mfwg3TwRtq3Tb0j%2Fqc6JuZtYmv5%2B56Vj2OwfOcwPPNgPGSPyg6azwc%2Fzxqbf2LUKb5qLX9E32iuO5XrAyp4gBYFsu6i25qtBPvYlk5nVphajHnyW3Vj46DLW91FXoB3%2BLq7LwbRFxJwH5Xy%2Fd8Muhtpr0krzxxI14kcwyDmWaKQCAyWGYbCysSwJIXiyqY4BI64gE68l%2FaViRBeUHvwW4NICLloXCnIbWBv1crp2JAI5PP58%2FP1ibDzZykFsrKOLWmrxxcZClpYIsFnYdhIv6YpHEnIYlgtYCahuPdI4PZ6ZL012gS28VWvjbCsRWZUKZJneWupRomu77X10m96zA3Hg4sc6xPfkOppo7yiSBcviLE6KljqtiIxj1hAldERzF0JNRAarF0FqHDXJIUoGv7rO3DtCD9%2Bpeog0O%2FcHBKkud2MGeg0MFuwh2sRG7%2BOxtENhFxakDuwh2EexirXbxnyuwiopTB1YRrCJYxaMpDGxrhnxuFu9ta%2FobLKPi1J2vZYSBaRiYrtml9jWG2e7%2FHLo0yrrBwY39EUdZeqNRs1wUC4CR%2BCljg%2FzQmpr2LSsefQg9OmfKr2w0J295%2BKm5Tcto55Zt80%2FjdcO6zq8fOa8fPiF7g0iv%2BMYydGzy0Pa3yQ%2Bit9xqWn1bo%2Bu8fUSeg0L%2FHT8SvaBFJcpRabM24A2vsULhEW9bxmqEjehBkxcnL7a978p38R%2B8grdCNe9Y5mreyrbrMJua9%2FPWsYLN1NDOXj0RnsyJ7kXNyVfSKmA1pHSTo3p5%2BpqpNpmUN%2FdNlSu36h5OJ6Gdq2CamaH56PmOGa%2FF61ykfVZ5RBD6lrsoILjxuDJjaGBBg0KmjUcmt%2Bl2d%2B1M6EqZpCEc3%2BcKYdGD7tousYqhwSJsSTjuWO6LKVroUZ3lwEvzDXhZEy%2BDEK3Kc7L69dkz2Ec4vw1ExnbieTairhuYROrsBSy6GG4lUeBZ6I3hQwl9x%2F1EKp9nC0r1w70ZCHmKB9N1EHrOC4kqgov%2BowDJiMt3jNFnzzEagT2592UZByxjRgJYVsCydtK%2FBll3skQyF5r8DLPpdPF0tQcJhbKRuyBD6fmaVuw4eTxZMC3RydW4ScPPp1dKBYRnyyW%2BuQwwqQSTns3gdxkveLZ8Ctg%2BQiBKBSz6UTAWAFwiXKpf3Y5pVXzyvj%2B%2BGiam78dlZ%2B8HWlOz99cyz953pRoVygAKygDS%2Bz9NBJbgyJovFWsDYOpRcR%2B6QOGLaV%2F%2BBYFGQ%2BY1GZUwbmOB3jdjJgIjVa5czdQAQlX04TvdZUgEQtn5D0CpeT1iKGFN%2Bn7MZBWo2klVjaS45XwPoNAcCs%2B0GAZwODkOtJAGcDg1Dt9ZjYgQiNJVIoBEDUjEJ5eFcKTqGIrmvTAL0BxnieDf28HvYVvvvg89wKINLPhCFiEQbHgru9RFGjzqq6AAoSktNNhSzr55gUWk4sm99f3LjXDUwnTfBTmW6fvieiDyODXYEOhIkH59oQzPQTZ%2FPIrjlGA%2BQNUQVKFvuoFthujunWbMe6vE92pVbQtJsGdHAH2L0B%2BqoYC5cpgz5L7Oia6L4zXwkm1hwc8ccNFrFB0LA5o2xpHlqTWZeo41xX9rBPDo%2FDZysfDNmYXc8J4h%2FOB6Ltp%2B61G1Kf2b5L4S4362MGVbg5IoTLluqjDlRubClEkt2nyiuvmSh21NBG2dqKo43XKFhAHLnDYkuN5v9Bsv%2BTi%2BruMX7MmgPnUHFn%2Fm2BWoaFLJWVywzSh%2F7cuPSiQ3sDPC1uhrv4q3RwA%2BUT5FWx8AXxJ8KdrGALiUbvgFGxMcxraGtyoAt5DH%2BcqbDNQ4OX%2BO%2FPZyx5%2FSs7dFjKbzdQewWNwKCfYRWxoKmtRPx7ZrCjqccZ5VPl12Jcix%2BfTp091TbGihnpFqehlLVfcuE2pdmwCj8Gs5mNW6WqamyUqZhEEmFdYkWDSjMpbnptjl1%2BZ0UHE7CXaedh6zHgiw7xj2FdYgAfbdwr7auidAXw3097j4NpZXgZg0tXWHIDGvuuSq8XOtAGbJrEFZX3DIarHyMsBpo9tCxUlLQp6COAlpjNwmy5YbT9Tb0UNRPq6MIko1iiLzojiVra1MIGes4fEL5QC7thRU2cVyIAFNaK96C%2BhADmqyBPWtowNImlDNxtfWAWwSZCQdxEb9kQG6ZKIApNNVMJWlA5tv5FtTNtz1YtrWzCR25NK0S45OyE%2BizIVmhw5E7c7UzkRIMzQ313YI6ElEQw568pZ3njU61cZmYdi%2Bbuesgsikvb%2Baoo%2BdPQLXLzkN4PpVpgFcv8w0gOsH13%2Berp%2BtPQXnLzkN4PxVpgGcv8w0gPMH53%2Bezt%2F00Rc28H%2BpPC1XV1fK07AxbfDYUtAgmjsHVwCuoLOuwLFctmAtygD5xnWq09VFa5S7rpxvoqc8veeEWbRbnfIEdxA0vlQT8nQpaBCDA2EZhGXdDcvIkgsIyqSkAYIy9Wgoixld6aQ8tZ1FrL2xGHV8Mi9lzywEv08gd79F6ot0C8EP8%2BHKltx7LqL7hYB7l5IGcO%2Fq0VAWsw0AJgcNEI%2BpRgPEYzBGIhkdrISR7AgQC6WUpwrqGSQhootmO7ZHElhuFeHshuXe7ihDjPdPj%2B8LFYRFW%2BPKT1kXjQbbnAcmQ6WgISdzAmOuIJTdMebElpM9on56D9slxZeQvMtCw0HJuwJ0dRYbMOhg0E9GhxVEi0OKiqzkp6WLJqLEogQFiOogMG1XJoLxBuOdpmOGppZj2t9s%2FGZwiaMJ5SnqoqWACFwiGk4bgUvCAhm8BC9lO97bNb71bnns061G4suMDfJDa2rat7a1cHFT6NEIj1%2FZaE7e8vBTc9t7xS1zy7Y5JT8oIQ%2B6zq8fuSA9fEL2BpFe8Y1l6NjkIQLu0pzRPjQqS4415X8vfHNmITe8Z8g%2BuJ6Ltt9KPhC9sY%2FVWdPK9PHTsab%2Bh4v%2BvfP2EXkOCv13%2FAh%2FwdA19so7f3oQNbxas3DJGofXvC06tpo0Xhu8ESsDbVhsO8etj%2Bwn8R%2FO2z0iHGFfQP82NGvG3gn%2FaJt%2F%2FL799bf18cX885%2FetXY77EVfsCE1eOy5CKuVUGoc019YLhOZAZYYQ9O2%2F1Ixx%2FwJexwyqsWYO1hNz1oDrWN7YcbNzl49EebOWdkqa06%2BktY%2BqyHjMDmql6cXi9rw6CsnR9ueVbptWQ%2BdxUqhpZSCqclB8iei42Te07Zc1IuMEv38m4iu16UVoh5%2Fltxa%2BQe6XOUTvB2jt8cU7L9eoPAzcjFTWz0iVQVW1meDKwEiAOiFhyUlDzI9OkoC6GqDjh1QD7iphttPjE5orZ7N4HeJY0cBPHnAC5LgOfifXPwOP4kHcD2BUv7APpAWNhx19hVAdwKV3EFX%2BfhCUEg5UY0UEnykctAFcejAQ3YEVayQX2o7IRLgO4FSJuEj08WndJQdAOR080%2BgFfVFGbY1Q77Qmn36%2Bfz5wdp8sJGDKDRg1eTD7%2BcSmyxmzR4rGTRAVwV02WAL4NtFfHeDaZch%2B38ZGJNdZo%2BNx1xDc8tFM8EeEweIEeQjcgpPNEAAnltJ%2BKJBgsuA%2FFur3qukxfVlDyCrjcnqdEnmWVmicGcGKH3%2F0uMHCWXljq7fUEccAWmCNJ1W%2F%2BmxLd%2BSSDvk3CgBoOxAKYBaNagxxj89ijdA3VmoJ2vLntF9o3i6EQC43QKXh5LUQ3%2FBCJaIJzPx496pY8Hz%2B0VI9ELVqTDIYmQXPh%2FFxA9sSldg5QE%2FQRXrnxXQfZsB3U6h%2B9lyxWNHssIGQwUKyFbAJ6S%2BeYFF9ygNydWhIUkY7wpGrbshHzTlTM17HCogZJPzPVU4RUOm2xq6ogfJTl91RLQglnKK5dxyZ0m75aLXH3RPN9EcGq8hggowlTD2XFoiXWU9HmAnCXY%2BcrwNIl7i0i3jKkToxubFAWDZAA6iFQzxk4KqDjBVXvzAFT4B8tEicda7YOjDfnIbjKGe3QVjNBDsgjEeN7YLhi7zLhgTldU%2BtbNDju5MBG2d2MKha1a7V0gY7bnJjShq2W0iQdQvm0Z8BbZcaYqpZ%2BssdXlJe4FrrubIYSsWiFu5BUxajyheE4SPsMnECXHxadEKgCIVKOFub4jccVFA5hTIBNGKZHH9P0BzYmjoYPOepRkAzSmgceNLhlvBpgM8rXm2vgJLQbBL2xxaKgg1d1KCQ8sexM7gmNWAAOWJoPxMB%2FUBzo7A%2BZ0NzQCe6uNJxtrACUoJzXZFPOhZZ8AER9gxQMEVdgZRvg%2BBvFCKW2sqG5Du2KL8uT75RDRV2UXeXtA671ZPPQCUKqPEqvFJrfPLnkL6EoXsAOEJFS3%2FFISLYf7yXX5j%2BAAwSgBjEMGI%2BfA9Z2a7FJqgrBKjTPbsKr3BPsB0QpieLRfiFyWAMt8AKBWA%2Bo42yA%2FKntYEUJ0Qqvt1EHrOC1kuId7mnlcLDe9Y%2BHjIcAAAfEKAH8zQfPR8xxSvgyxbYQ1gtQHWV7a5ohApthSOP3GugJ1uYxA1%2BCOVQJOV9tEi%2Byf31vcvxXs4mO67IM01fV88RE0ep%2B4IAkGp4ecZMDuKJQf6aut1ActTYRn6phvYZoju3g87e66pfVpANuSRjUN1HISie0KRqKaHIRu5wWK7BJL5iK9H7u4OGLaCYc25EKDWBmpaj3Fi%2F1ecjJPpD6a7%2FbITx2KbTe8XGvmpYiZMcRoKarYyUREtZb%2FHX1o0bqQA7dGQgOJkCAPcv9Snq4PY5K4QyHGb4E3bi4FUkKaE31dWK2g4QDcSh2hALhqqRgNkIRQEAzKRAcGAvDRAMADBAAQDwrGBaF%2F%2F7bEPqpN1DgYrOzjAYISIQCYyICKQlwaICCAigIggRQfZeDlcxnb0xyZLeaK6aK7oPC4YKTBSZ2ikrODL2kG%2BNb0sWn8iPy1napsUIKqDwJRetAV%2BA%2FxG9%2FzGDE0tx7S%2F2fjN4NJdO8pT1EUjFdUZK09XZ7Gpx3%2Bc9yFr%2BiA6PC12ytrQEJ2yNmrslLW%2BzKesndgtW%2FmaWUVx7OzVE%2BHJnOhi1Jx8Ja01VvrTaqoYnhzVy9OP9eS%2FaBofKZ2UtwRwllydxf%2ByupPysThZcqSas6yQaSgYClTKo9Lpf56IdpF6unqts9SlgRzmLfMmq7lLbEzXsj%2BQb3jikLMCD6JOPUdmhqE5XV56kwD5G%2BFRJ09f%2Bb0D17Cdbt8J9dCYoabROAs2ul5ozd%2BFS2cPZtFZp9I3N8NEJm2M%2B9lM2rgRZNL6oLFMeihzJn1colcuz%2BtEQieiQ%2B3oTWMrwyG9Upg6SK%2B6S91h6VVdA4DHdnPUtOC5zq6Wl44o9Favnhtst1i%2FtxlTzkasHeZEv2hwSGnqsnb84NEwxflQ8ziLiEOKpRYpFRc0Necp5RaX5gf8RBmdfGPCCpWsZYVZk3KgEHCsvtdfrSOV5zUmGdXoRGOSAyM7JtkficYkh42NSY5qHJM0NCZhOcOS0W2RANYu%2FFpM%2FrWYChz0EeXLfKSt8alh3Ddb3bNNVFov76k9XlNSOBPmd752p%2Bx5NvjXxHhL7oeXLT9qWRpKe%2F%2Ft914Y%2Ff6AuoQoHEjd2BIueEUUI2Te28UJe%2BHm98SVANFdYSwhq7hq69WM7Bwd8LmibATBZ5HOLrgIQt%2F7jf7FowC9nnBDH%2BqpeGM0zMYbhi6IN24aCzfGR4Qb8RCDtfcohrtQZH%2F4sccDsoavkzLeLMdQMRHZ%2FYp%2BvI9KkMoEdEtrLbOTe%2FR%2BcL3T9cFNTO%2B1Uta%2BqgPYP56VYxvrcla1eM42PjSPqSQOrDAopqKoquOxxT65dkngk%2FaN%2BdT6vadxrPfMusnmkvWs9xRl60Lved2U94w%2BIOE9Uzghd3br%2B5R9E9ub%2FsbcmJnBEs04x%2FD9RwoN5Si%2BiqMTAyEd9mC2%2Be%2F%2FT167GkaX%2F972iS8e3rZ9kqv36OrNCtlro6HOr%2F8du7d7jVzE3%2FqGfAvzjYwVPmhbUNFsgfZDitmB1XqK9jDyhj0XYnOFwj3PXYtFJCYAejRc4yPbDK1N8ttEEsC7%2B%2BZZZAOhSNyGWnrll3aT7IMRxV%2FbCVKmp9GoqCdGdqYnKpJbKo%2BQUl0KKTW08WFyagzLiynpokE51fWSgsrMUCuSqg%2FSAtZPj06WFVV9ZBR11bSsGlLIasKiaqUlNS6o%2Bl5BrVMmh2Vlst%2BeTOr98VWq4Hc0ONCA6sZNcWdNy6Vo0W1bcnmAfB0qy3XK5bisXI7ak8tRtHp6K0jGobZynIoQdo6%2BLZkcZGTynwHaJ5beCrlZ0UsIaQk57GlXmjaIiSJtGO6Xx2bjx1FJUbtp0Ssb46QrvU6vYygdQN5oBT01LWiidRJlpIybO72SuSsrFu2kAWneD%2FRD7YU%2BSnsxPbO0JQdIzFnzPfbYijwQNAK1aPq5MaiPz2Er5AZ1urayacC4xYgrNTyiZyYNysdb46KuKstprpFM5xucip1Ysz7rFfLspEcrjlPHbjIx5HKl4XCkqtvcKs3O7W6ju6uRUaQ6DWfIZT2x3p4Nx7lISspuDk6QMxsCZbpq2hdftyy7aibFpcVw2KKFNlJJrDG%2BiSKC6jb6urizhkUxUoWYKLqms1cWo7w4GTDExI%2BA%2F4O%2F6vnh0lt4rml%2F2LWmZzjE0yC5UqwnzaUxLCnG1NaOErZ7MCpIwZtNecqn1zkiziWpp9dkZFORsjEYjg81soN0VzflJLty%2FNEfDsUf3Wj80c8OyGtXV%2F%2BXURwfBdbf5oReakk9KdCCiReGnoNv2OYE2XfbOc5oWu7C6M%2Fpfyld2cno1HNdNA35r5Mv5N%2B8fw5vj6FoWgJ7Kdfcu0724M3nAWrGEGYHB1uJJ7WEPSoYgNlaQGzIjKQVHPavTxw1lk6oWhzAyUSN1%2Bl55NIGTRumuxrXFTXiS98jlQi7x31ztXz2Zog88T8%3D)

Плагин выполнен согласно шаблону проектирования MVP (Model-View-Presenter).
#### **Модель**. Класс Model
При иннициализации плагина создается экземпляр класса Model, в него передается объект с настройками.  Модель хранит в себе бизнес-логику приложения. Экземпляр класса создается, после прохождения всех проверок и  сохраняет в себе следующие данные:
 - формат данных (```_dataFormat```)
 - минимальное и максимальное значения (```_minVal``` и ```_maxVal```)
 - шаг (```_step```)
 - одно или два выбранного значения (```_value``` или ```_range```)
 - опция - в обратном порядке (```_reverse```)

Модель предоставляет возможность работать с тремя типами данных (```dataFormat```): числовые значения (```numeric```), даты (```date```), пользовательский диапазон(```custom```). Однако, модель хранит в себе только числовые значения. В случае с датами - данные переводятся в колличество миллисекунд с 1 января 1970 года 00:00:00, шаг -  колличество миллисекунд в сутках. В случае c пользовательским диапазоном - минимальное значение равно 0, максимальное - длина диапазона минус один. Шаг всегда равен единице. Использовать опцию ```reverse``` не рекомендуется.

Валидность данных модели определяется следующими основными правилами:
 - При использовании нечислового формата, опция ```dataFormat``` должна быть введена пользователем.
 - Разность между максимальным и минимальным значениями должна делиться без остатка на шаг.
 - ```value``` и ```range``` должны быть установлены на шаг. 
 - ```range``` имеет больший приоритет и отменяет ```value```. При изменении диапазона на одно значение в существующей модели, нужно указать ```range: null```.
 - При  ```dataFormat: date``` данные вводятся в формате 'dd/mm/yyyy' или 'dd.mm.yyyy' или 'dd-mm-yyyy'. Шаг - как количество дней.
 - При  ```dataFormat: custom```, ```customValues``` - обязательная опция. Минимальное, максимальное значения, шаг игнорируются.
 - ```rangeInCustomValues```, ```valueInCustomValues``` используются только с пользовательским диапазоном. Вводятся как значения из ```customValues```. Если таких несколько, определится как первое найденное.
 - Опции имеют следующий приоритет: ```range``` -> ```rangeInCustomValues``` -> ```value``` -> ```valueInCustomValues```.

Методы **getVal** и **getRange** выводят: 
  - числа, если числовой формат
  - объекты Datе, если формат дат
  - значения из диапазона (а не порядковый номер) - в пользовательском диапазоне.

 #### **Представление**. Класс View
 При создании экземпляра класса View, в него передается объект с настройками, модель, HTML узел, на котором создается слайдер. Валидные данные модели используется в представлении при создании и изменении. Предствление хранит в себе информацию о том, каким образом данные модели представлены пользователю. Экземпляр View хранит в себе следующие данные: 
  - длина ```_length```, то есть высота или ширина поля слайдера
  - вертикальный вид ```_vertical```
  - диапазон ```_range```, то есть один или два бегунка
  - маска подсказки ```_tooltipMask```, маска подписей для делений шкалы ```_scaleMask```
  - количество шагов ```_scaleStep```
  - HTML узел слайдера ```_slider```
  - HTML узел бегунка/бегунков ```_thumb```/ ```_thumbLeft```  и ```_thumbRight```
  - HTML узел полосы ```_line``` 
  - HTML узел подсказки/подсказок ```_tooltip```/```_tooltipLeft``` и ```_tooltipRight```
  - HTML узел шкалы ```_scale```

  Валидность данных представления определяется следующими основными правилами:
 - Если не указана единица измерения длины, применяются 'px'.
 - Разность между максимальным и минимальным значениями модели должна делиться без остатка на шаг шкалы ```_scaleStep```.