
import { Category, RussianLetter, PhonicsRule } from './types';

export const RUSSIAN_ALPHABET: RussianLetter[] = [
  {
    id: 'a', uppercase: 'А', lowercase: 'а', name: 'а', nameIpa: '[a]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[a]', audioPrompt: 'а', label: 'Standard' }],
    description: 'Like "a" in father.',
    descriptionZh: '发音类似于汉语拼音的 "a"，如“爸爸”。',
    examples: [
      { word: 'Ад', translation: 'Hell', translationZh: '地狱', transcription: '[at]' },
      { word: 'Арбуз', translation: 'Watermelon', translationZh: '西瓜', transcription: '[ar-bus]' },
      { word: 'Астрономия', translation: 'Astronomy', translationZh: '天文学', transcription: '[as-tra-no-mʲi-ja]' }
    ]
  },
  {
    id: 'b', uppercase: 'Б', lowercase: 'б', name: 'бэ', nameIpa: '[bɛ]', category: Category.CONSONANTS,
    pronunciations: [
      { ipa: '[b]', audioPrompt: 'ба', label: 'Hard' },
      { ipa: '[bʲ]', audioPrompt: 'бя', label: 'Soft' }
    ],
    description: 'Like "b" in boy. Softens before soft vowels.',
    descriptionZh: '发音类似于汉语拼音的 "b"，但在软元音前会变软。',
    examples: [
      { word: 'Бог', translation: 'God', translationZh: '上帝', transcription: '[bok]' },
      { word: 'Банан', translation: 'Banana', translationZh: '香蕉', transcription: '[ba-nan]' },
      { word: 'Библиотека', translation: 'Library', translationZh: '图书馆', transcription: '[bʲi-blʲi-a-tʲe-ka]' }
    ]
  },
  {
    id: 'v', uppercase: 'В', lowercase: 'в', name: 'вэ', nameIpa: '[vɛ]', category: Category.CONSONANTS,
    pronunciations: [
      { ipa: '[v]', audioPrompt: 'ва', label: 'Hard' },
      { ipa: '[vʲ]', audioPrompt: 'вя', label: 'Soft' }
    ],
    description: 'Like "v" in van.',
    descriptionZh: '类似于英语的 "v"，上齿轻触下唇发音。',
    examples: [
      { word: 'Век', translation: 'Century', translationZh: '世纪', transcription: '[vʲek]' },
      { word: 'Весна', translation: 'Spring', translationZh: '春天', transcription: '[vʲe-sna]' },
      { word: 'Велосипед', translation: 'Bicycle', translationZh: '自行车', transcription: '[vʲe-la-sʲi-pʲet]' }
    ]
  },
  {
    id: 'g', uppercase: 'Г', lowercase: 'г', name: 'гэ', nameIpa: '[gɛ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[g]', audioPrompt: 'га', label: 'Standard' }],
    description: 'Like "g" in go.',
    descriptionZh: '发音类似于汉语拼音的 "g"，如“哥哥”。',
    examples: [
      { word: 'Год', translation: 'Year', translationZh: '年', transcription: '[got]' },
      { word: 'Город', translation: 'City', translationZh: '城市', transcription: '[go-rat]' },
      { word: 'Государство', translation: 'State', translationZh: '国家', transcription: '[ga-su-dar-stva]' }
    ]
  },
  {
    id: 'd', uppercase: 'Д', lowercase: 'д', name: 'дэ', nameIpa: '[dɛ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[d]', audioPrompt: 'да', label: 'Standard' }],
    description: 'Like "d" in dog.',
    descriptionZh: '发音类似于汉语拼音的 "d"，如“弟弟”。',
    examples: [
      { word: 'Дом', translation: 'House', translationZh: '房子', transcription: '[dom]' },
      { word: 'Дорога', translation: 'Road', translationZh: '路', transcription: '[da-ro-ga]' },
      { word: 'Достопримечательность', translation: 'Attraction', translationZh: '景点', transcription: '[da-sta-prʲi-mʲe-tɕa-tʲelʲ-nastʲ]' }
    ]
  },
  {
    id: 'ye', uppercase: 'Е', lowercase: 'е', name: 'е', nameIpa: '[je]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[je]', audioPrompt: 'е', label: 'Standard' }],
    description: 'Like "ye" in yes.',
    descriptionZh: '类似于汉语拼音的 "ye"，如“爷爷”。',
    examples: [
      { word: 'Еда', translation: 'Food', translationZh: '食物', transcription: '[je-da]' },
      { word: 'Европа', translation: 'Europe', translationZh: '欧洲', transcription: '[je-vro-pa]' },
      { word: 'Естествознание', translation: 'Natural science', translationZh: '自然科学', transcription: '[je-stʲe-stva-zna-nʲi-je]' }
    ]
  },
  {
    id: 'yo', uppercase: 'Ё', lowercase: 'ё', name: 'ё', nameIpa: '[jo]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[jo]', audioPrompt: 'ё', label: 'Standard' }],
    description: 'Like "yo" in yonder.',
    descriptionZh: '类似于汉语拼音的 "yo"，如“哟”。',
    examples: [
      { word: 'Ёж', translation: 'Hedgehog', translationZh: '刺猬', transcription: '[josh]' },
      { word: 'Ёлка', translation: 'Fir tree', translationZh: '圣诞树', transcription: '[jol-ka]' },
      { word: 'Ёмкость', translation: 'Capacity', translationZh: '容器', transcription: '[jom-kastʲ]' }
    ]
  },
  {
    id: 'zh', uppercase: 'Ж', lowercase: 'ж', name: 'жэ', nameIpa: '[ʐɛ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[ʐ]', audioPrompt: 'жа', label: 'Standard' }],
    description: 'Like "s" in treasure.',
    descriptionZh: '发音类似于汉语拼音的翘舌音 "r"，如“日”。',
    examples: [
      { word: 'Жук', translation: 'Beetle', translationZh: '甲虫', transcription: '[ʐuk]' },
      { word: 'Живот', translation: 'Stomach', translationZh: '肚子', transcription: '[ʐy-vot]' },
      { word: 'Жизнедеятельность', translation: 'Vital activity', translationZh: '生命活动', transcription: '[ʐiz-nʲe-dʲe-ja-tʲelʲ-nastʲ]' }
    ]
  },
  {
    id: 'z', uppercase: 'З', lowercase: 'з', name: 'зэ', nameIpa: '[zɛ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[z]', audioPrompt: 'за', label: 'Standard' }],
    description: 'Like "z" in zoo.',
    descriptionZh: '发音类似于汉语拼音的 "z"，如“左”，但带声。',
    examples: [
      { word: 'Зал', translation: 'Hall', translationZh: '大厅', transcription: '[zal]' },
      { word: 'Замок', translation: 'Castle', translationZh: '城堡', transcription: '[za-mak]' },
      { word: 'Законодательство', translation: 'Legislation', translationZh: '立法', transcription: '[za-ka-na-da-tʲelʲ-stva]' }
    ]
  },
  {
    id: 'i', uppercase: 'И', lowercase: 'и', name: 'и', nameIpa: '[i]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[i]', audioPrompt: 'и', label: 'Standard' }],
    description: 'Like "ee" in see.',
    descriptionZh: '发音类似于汉语拼音的 "i"，如“衣”。',
    examples: [
      { word: 'Имя', translation: 'Name', translationZh: '名字', transcription: '[i-mʲa]' },
      { word: 'Икона', translation: 'Icon', translationZh: '圣像', transcription: '[i-ko-na]' },
      { word: 'Инструмент', translation: 'Instrument', translationZh: '工具', transcription: '[in-stru-mʲent]' }
    ]
  },
  {
    id: 'j', uppercase: 'Й', lowercase: 'й', name: 'и краткое', nameIpa: '[i ˈkratkəjə]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[j]', audioPrompt: 'и краткое', label: 'Standard' }],
    description: 'Like "y" in toy.',
    descriptionZh: '短促的 "i"，通常出现在元音后，类似于 "y"。',
    examples: [
      { word: 'Чай', translation: 'Tea', translationZh: '茶', transcription: '[tɕaj]' },
      { word: 'Йогурт', translation: 'Yogurt', translationZh: '酸奶', transcription: '[jo-gurt]' },
      { word: 'Йошкар-Ола', translation: 'Yoshkar-Ola', translationZh: '约什卡尔奥拉', transcription: '[josh-kar-a-la]' }
    ]
  },
  {
    id: 'k', uppercase: 'К', lowercase: 'к', name: 'ка', nameIpa: '[ka]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[k]', audioPrompt: 'ка', label: 'Standard' }],
    description: 'Like "k" in kitten.',
    descriptionZh: '发音类似于汉语拼音的 "k"，如“课”。',
    examples: [
      { word: 'Кот', translation: 'Cat', translationZh: '猫', transcription: '[kot]' },
      { word: 'Книга', translation: 'Book', translationZh: '书', transcription: '[knʲi-ga]' },
      { word: 'Компьютер', translation: 'Computer', translationZh: '电脑', transcription: '[kam-pju-tʲer]' }
    ]
  },
  {
    id: 'l', uppercase: 'Л', lowercase: 'л', name: 'эль', nameIpa: '[elʲ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[ɫ]', audioPrompt: 'ла', label: 'Hard' }, { ipa: '[lʲ]', audioPrompt: 'ля', label: 'Soft' }],
    description: 'Like "l" in lamp.',
    descriptionZh: '发音类似于汉语拼音的 "l"，如“乐”。',
    examples: [
      { word: 'Лес', translation: 'Forest', translationZh: '森林', transcription: '[lʲes]' },
      { word: 'Лимон', translation: 'Lemon', translationZh: '柠檬', transcription: '[lʲi-mon]' },
      { word: 'Литература', translation: 'Literature', translationZh: '文学', transcription: '[lʲi-tʲe-ra-tu-ra]' }
    ]
  },
  {
    id: 'm', uppercase: 'М', lowercase: 'м', name: 'эм', nameIpa: '[em]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[m]', audioPrompt: 'ма', label: 'Standard' }],
    description: 'Like "m" in map.',
    descriptionZh: '发音类似于汉语拼音的 "m"，如“妈”。',
    examples: [
      { word: 'Мир', translation: 'World', translationZh: '世界/和平', transcription: '[mʲir]' },
      { word: 'Музыка', translation: 'Music', translationZh: '音乐', transcription: '[mu-zy-ka]' },
      { word: 'Математика', translation: 'Mathematics', translationZh: '数学', transcription: '[ma-tʲe-ma-tʲi-ka]' }
    ]
  },
  {
    id: 'n', uppercase: 'Н', lowercase: 'н', name: 'эн', nameIpa: '[en]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[n]', audioPrompt: 'на', label: 'Standard' }],
    description: 'Like "n" in no.',
    descriptionZh: '发音类似于汉语拼音的 "n"，如“那”。',
    examples: [
      { word: 'Нос', translation: 'Nose', translationZh: '鼻子', transcription: '[nos]' },
      { word: 'Небо', translation: 'Sky', translationZh: '天空', transcription: '[nʲe-ba]' },
      { word: 'Независимость', translation: 'Independence', translationZh: '独立', transcription: '[nʲe-za-vʲi-sʲi-mastʲ]' }
    ]
  },
  {
    id: 'o', uppercase: 'О', lowercase: 'о', name: 'о', nameIpa: '[o]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[o]', audioPrompt: 'о', label: 'Stressed' }, { ipa: '[a]', audioPrompt: 'а', label: 'Unstressed' }],
    description: 'Pronounced [o] when stressed, and [a] when unstressed.',
    descriptionZh: '重读时发 [o]，非重读时弱化为 [a]。',
    examples: [
      { word: 'Оса', translation: 'Wasp', translationZh: '黄蜂', transcription: '[a-sa]' },
      { word: 'Океан', translation: 'Ocean', translationZh: '海洋', transcription: '[a-kʲe-an]' },
      { word: 'Образование', translation: 'Education', translationZh: '教育', transcription: '[a-bra-za-va-nʲi-je]' }
    ]
  },
  {
    id: 'p', uppercase: 'П', lowercase: 'п', name: 'пэ', nameIpa: '[pɛ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[p]', audioPrompt: 'па', label: 'Standard' }],
    description: 'Like "p" in pet.',
    descriptionZh: '发音类似于汉语拼音的 "p"，如“怕”。',
    examples: [
      { word: 'Папа', translation: 'Dad', translationZh: '爸爸', transcription: '[pa-pa]' },
      { word: 'Погода', translation: 'Weather', translationZh: '天气', transcription: '[pa-go-da]' },
      { word: 'Преподаватель', translation: 'Teacher', translationZh: '老师', transcription: '[prʲi-pa-da-va-tʲelʲ]' }
    ]
  },
  {
    id: 'r', uppercase: 'Р', lowercase: 'р', name: 'эр', nameIpa: '[er]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[r]', audioPrompt: 'ра', label: 'Standard' }],
    description: 'Rolled "r".',
    descriptionZh: '颤音（大舌音），舌尖颤动。',
    examples: [
      { word: 'Рот', translation: 'Mouth', translationZh: '嘴', transcription: '[rot]' },
      { word: 'Россия', translation: 'Russia', translationZh: '俄罗斯', transcription: '[ra-sʲi-ja]' },
      { word: 'Расписание', translation: 'Schedule', translationZh: '课表/计划', transcription: '[ras-pʲi-sa-nʲi-je]' }
    ]
  },
  {
    id: 's', uppercase: 'С', lowercase: 'с', name: 'эс', nameIpa: '[es]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[s]', audioPrompt: 'са', label: 'Standard' }],
    description: 'Like "s" in set.',
    descriptionZh: '发音类似于汉语拼音的 "s"，如“思”。',
    examples: [
      { word: 'Сын', translation: 'Son', translationZh: '儿子', transcription: '[syn]' },
      { word: 'Солнце', translation: 'Sun', translationZh: '太阳', transcription: '[son-tse]' },
      { word: 'Стихотворение', translation: 'Poem', translationZh: '诗', transcription: '[stʲi-xa-tva-rʲe-nʲi-je]' }
    ]
  },
  {
    id: 't', uppercase: 'Т', lowercase: 'т', name: 'тэ', nameIpa: '[tɛ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[t]', audioPrompt: 'та', label: 'Standard' }],
    description: 'Like "t" in tea.',
    descriptionZh: '发音类似于汉语拼音的 "t"，如“特”。',
    examples: [
      { word: 'Тигр', translation: 'Tiger', translationZh: '老虎', transcription: '[tʲigr]' },
      { word: 'Театр', translation: 'Theater', translationZh: '剧院', transcription: '[tʲi-atr]' },
      { word: 'Телевидение', translation: 'Television', translationZh: '电视', transcription: '[tʲi-lʲi-vʲi-dʲe-nʲi-je]' }
    ]
  },
  {
    id: 'u', uppercase: 'У', lowercase: 'у', name: 'у', nameIpa: '[u]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[u]', audioPrompt: 'у', label: 'Standard' }],
    description: 'Like "oo" in boot.',
    descriptionZh: '发音类似于汉语拼音的 "u"，如“五”。',
    examples: [
      { word: 'Ухо', translation: 'Ear', translationZh: '耳朵', transcription: '[u-xa]' },
      { word: 'Улица', translation: 'Street', translationZh: '街道', transcription: '[u-lʲi-tsa]' },
      { word: 'Университе特', translation: 'University', translationZh: '大学', transcription: '[u-nʲi-vʲir-sʲi-tʲet]' }
    ]
  },
  {
    id: 'f', uppercase: 'Ф', lowercase: 'ф', name: 'эф', nameIpa: '[ef]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[f]', audioPrompt: 'фа', label: 'Standard' }],
    description: 'Like "f" in face.',
    descriptionZh: '发音类似于汉语拼音的 "f"，如“佛”。',
    examples: [
      { word: 'Флаг', translation: 'Flag', translationZh: '旗帜', transcription: '[flak]' },
      { word: 'Физика', translation: 'Physics', translationZh: '物理', transcription: '[fʲi-zʲi-ka]' },
      { word: 'Фотография', translation: 'Photograph', translationZh: '照片', transcription: '[fa-ta-gra-fʲi-ja]' }
    ]
  },
  {
    id: 'h', uppercase: 'Х', lowercase: 'х', name: 'ха', nameIpa: '[xa]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[x]', audioPrompt: 'ха', label: 'Standard' }],
    description: 'Like "ch" in Loch.',
    descriptionZh: '发音类似于汉语拼音的 "h"，如“喝”。',
    examples: [
      { word: 'Хор', translation: 'Choir', translationZh: '合唱团', transcription: '[xor]' },
      { word: 'Хорошо', translation: 'Good', translationZh: '好', transcription: '[xa-ra-sho]' },
      { word: 'Хлебобулочные', translation: 'Bakery products', translationZh: '烘焙产品', transcription: '[xlʲe-ba-bu-ɫatɕ-ny-je]' }
    ]
  },
  {
    id: 'ts', uppercase: 'Ц', lowercase: 'ц', name: 'цэ', nameIpa: '[tsɛ]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[ts]', audioPrompt: 'ца', label: 'Standard' }],
    description: 'Like "ts" in sits.',
    descriptionZh: '发音类似于汉语拼音的 "ts"，如“磁”。',
    examples: [
      { word: 'Цирк', translation: 'Circus', translationZh: '马戏团', transcription: '[tsyrk]' },
      { word: 'Цветок', translation: 'Flower', translationZh: '花', transcription: '[tsʲvʲe-tok]' },
      { word: 'Цивилизация', translation: 'Civilization', translationZh: '文明', transcription: '[tsy-vʲi-lʲi-za-tsy-ja]' }
    ]
  },
  {
    id: 'ch', uppercase: 'Ч', lowercase: 'ч', name: 'че', nameIpa: '[tɕe]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[tɕ]', audioPrompt: 'ча', label: 'Standard' }],
    description: 'Like "ch" in cheap.',
    descriptionZh: '发音类似于汉语拼音的 "q"，如“七”。',
    examples: [
      { word: 'Чай', translation: 'Tea', translationZh: '茶', transcription: '[tɕaj]' },
      { word: 'Человек', translation: 'Human', translationZh: '人', transcription: '[tɕi-la-vʲek]' },
      { word: 'Чрезвычайный', translation: 'Emergency', translationZh: '紧急', transcription: '[tɕrʲez-vy-tɕaj-nyj]' }
    ]
  },
  {
    id: 'sh', uppercase: 'Ш', lowercase: 'ш', name: 'ша', nameIpa: '[ʂa]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[ʂ]', audioPrompt: 'ша', label: 'Standard' }],
    description: 'Like "sh" in shut.',
    descriptionZh: '发音类似于汉语拼音的翘舌音 "sh"，如“师”。',
    examples: [
      { word: 'Шар', translation: 'Ball', translationZh: '球', transcription: '[ʂar]' },
      { word: 'Школа', translation: 'School', translationZh: '学校', transcription: '[ʂko-ɫa]' },
      { word: 'Шахматистка', translation: 'Chess player (f)', translationZh: '女棋手', transcription: '[ʂax-ma-tʲis-tka]' }
    ]
  },
  {
    id: 'shch', uppercase: 'Щ', lowercase: 'щ', name: 'ща', nameIpa: '[ɕːa]', category: Category.CONSONANTS,
    pronunciations: [{ ipa: '[ɕː]', audioPrompt: 'ща', label: 'Standard' }],
    description: 'Long soft "sh".',
    descriptionZh: '发音类似于汉语拼音的 "x"，如“西”，发音稍长且软。',
    examples: [
      { word: 'Щи', translation: 'Soup', translationZh: '白菜汤', transcription: '[ɕːi]' },
      { word: 'Щётка', translation: 'Brush', translationZh: '刷子', transcription: '[ɕːot-ka]' },
      { word: 'Щепетильность', translation: 'Scrupulousness', translationZh: '审慎', transcription: '[ɕːe-pʲe-tʲilʲ-nastʲ]' }
    ]
  },
  {
    id: 'hard_sign', uppercase: 'Ъ', lowercase: 'ъ', name: 'твёрдый знак', nameIpa: '[ˈtvʲordɨj znak]', category: Category.SIGNS,
    pronunciations: [{ ipa: '-', audioPrompt: 'твёрдый знак', label: 'Sign Name' }],
    description: 'Prevents softening of consonants.',
    descriptionZh: '硬音符号，不发音，分隔前面的辅音和后面的元音，防止辅音软化。',
    examples: [
      { word: 'Объезд', translation: 'Bypass', translationZh: '绕道', transcription: '[ab-jest]' },
      { word: 'Подъезд', translation: 'Entrance', translationZh: '入口/门厅', transcription: '[pad-jest]' },
      { word: 'Объективность', translation: 'Objectivity', translationZh: '客观性', transcription: '[ab-jek-tʲiv-nastʲ]' }
    ]
  },
  {
    id: 'y_vowel', uppercase: 'Ы', lowercase: 'ы', name: 'ы', nameIpa: '[ɨ]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[ɨ]', audioPrompt: 'ы', label: 'Standard' }],
    description: 'Hard "i" sound.',
    descriptionZh: '发音类似于“衣”，但舌根后缩，带一点“额”的味道。',
    examples: [
      { word: 'Мы', translation: 'We', translationZh: '我们', transcription: '[my]' },
      { word: 'Рыба', translation: 'Fish', translationZh: '鱼', transcription: '[ry-ba]' },
      { word: 'Выздоровление', translation: 'Recovery', translationZh: '康复', transcription: '[vy-zda-ra-vlʲe-nʲi-je]' }
    ]
  },
  {
    id: 'soft_sign', uppercase: 'Ь', lowercase: 'ь', name: 'мягкий знак', nameIpa: '[ˈmʲæxʲkʲɪj znak]', category: Category.SIGNS,
    pronunciations: [{ ipa: '-', audioPrompt: 'мягкий знак', label: 'Sign Name' }],
    description: 'Softens the preceding consonant.',
    descriptionZh: '软音符号，不发音，使前面的辅音软化。',
    examples: [
      { word: 'Мать', translation: 'Mother', translationZh: '母亲', transcription: '[matʲ]' },
      { word: 'Медведь', translation: 'Bear', translationZh: '熊', transcription: '[mʲed-vʲetʲ]' },
      { word: 'Промышленность', translation: 'Industry', translationZh: '工业', transcription: '[pra-mysh-lʲen-nastʲ]' }
    ]
  },
  {
    id: 'e_rev', uppercase: 'Э', lowercase: 'э', name: 'э', nameIpa: '[ɛ]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[ɛ]', audioPrompt: 'э', label: 'Standard' }],
    description: 'Like "e" in met.',
    descriptionZh: '类似于汉语拼音的 "e"，如“也”。',
    examples: [
      { word: 'Это', translation: 'This', translationZh: '这个', transcription: '[e-ta]' },
      { word: 'Экран', translation: 'Screen', translationZh: '屏幕', transcription: '[ek-ran]' },
      { word: 'Электростанция', translation: 'Power plant', translationZh: '发电站', transcription: '[e-lʲek-tra-stan-tsy-ja]' }
    ]
  },
  {
    id: 'yu', uppercase: 'Ю', lowercase: 'ю', name: 'ю', nameIpa: '[ju]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[ju]', audioPrompt: 'ю', label: 'Standard' }],
    description: 'Like "u" in universe.',
    descriptionZh: '类似于汉语拼音的 "you"，如“邮”。',
    examples: [
      { word: 'Юг', translation: 'South', translationZh: '南方', transcription: '[juk]' },
      { word: 'Юмор', translation: 'Humor', translationZh: '幽默', transcription: '[ju-mar]' },
      { word: 'Юриспруденция', translation: 'Jurisprudence', translationZh: '法学', transcription: '[ju-rʲis-pru-dʲen-tsy-ja]' }
    ]
  },
  {
    id: 'ya', uppercase: 'Я', lowercase: 'я', name: 'я', nameIpa: '[ja]', category: Category.VOWELS,
    pronunciations: [{ ipa: '[ja]', audioPrompt: 'я', label: 'Standard' }],
    description: 'Like "ya" in yard.',
    descriptionZh: '类似于汉语拼音的 "ya"，如“牙”。',
    examples: [
      { word: 'Я', translation: 'I', translationZh: '我', transcription: '[ja]' },
      { word: 'Яблоко', translation: 'Apple', translationZh: '苹果', transcription: '[jab-la-ka]' },
      { word: 'Ясновидение', translation: 'Clairvoyance', translationZh: '透视/预见', transcription: '[jas-na-vʲi-dʲe-nʲi-je]' }
    ]
  }
];

export const PHONICS_RULES: PhonicsRule[] = [
  {
    id: 'vowel_reduction_o',
    title: 'Vowel Reduction of "О"',
    titleZh: '元音 "О" 的弱化',
    category: 'Vowels',
    description: 'In unstressed syllables, the letter "О" is pronounced like [a].',
    descriptionZh: '在非重读音节中，字母 "О" 读作 [a]。',
    examples: [
      { word: 'Молоко', translation: 'Milk', translationZh: '牛奶', transcription: '[ma-la-ko]' },
      { word: 'Москва', translation: 'Moscow', translationZh: '莫斯科', transcription: '[mas-kva]' }
    ]
  },
  {
    id: 'devoicing',
    title: 'Final Consonant Devoicing',
    titleZh: '词尾辅音清化',
    category: 'Consonants',
    description: 'Voiced consonants (б, в, г, д, ж, з) become voiceless at word ends.',
    descriptionZh: '浊辅音（б, в, г, д, ж, з）在词尾时会变为对应的清辅音。',
    examples: [
      { word: 'Друг', translation: 'Friend', translationZh: '朋友', transcription: '[druk]' },
      { word: 'Хлеб', translation: 'Bread', translationZh: '面包', transcription: '[xlʲep]' }
    ]
  }
];
