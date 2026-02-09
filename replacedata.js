const newHymns = [
  {
    "book": 4,
    "code": 36,
    "title": "新耶路撒冷—宇宙的金燈台",
    "lyrics": "新耶路撒冷—宇宙的金燈台\nF大調 4/4\n\n1\n四圍盡都是黑暗，\n日光月光也已隱藏，\n惟見一金燈台堅立不變，\n始終灼灼在發亮；\n照耀在神帳幕裏，\n也曾在聖殿裏發光，\n今在召會最深黑夜的時期，\n加倍顯耀更輝煌。\n\n(副)\n黑夜的火燈，\n榮耀何神聖，\n耶穌的見證—\n新耶路撒冷。\n\n2\n祂是純金所打造，\n表徵父神聖別性情，\n像台子形狀作子神豫表，\n燈是靈神的說明；\n這七靈如七盞燈，\n好能將我焚燒煉淨，\n也是羔羊七眼，\n注視並搜尋，\n將神傳輸我全人。\n\n(副)\n黑夜的火燈，\n榮耀何神聖，\n耶穌的見證—\n新耶路撒冷。\n\n3\n這獨一的金燈臺，\n要在各地得著繁殖，\n眾召會要如此建造起來，\n作三一神的複製；\n我要活在這實際，\n完全脫離自己樣式，\n有分這見證，\n直到新天新地，\n神榮光照耀不止。\n\n(副)\n黑夜的火燈，\n榮耀何神聖，\n耶穌的見證—\n新耶路撒冷。\n",
    "favorite": 0
  }
];

// 從 localStorage 讀取原始的 hymns 資料
let hymns = JSON.parse(localStorage.getItem('hymns'));

// 檢查是否有 hymns 資料，如果沒有則初始化為空陣列
if (!hymns) {
  hymns = [];
}

// 將 newHymns 中的每一個項目加入或更新到 hymns 中
newHymns.forEach(newHymn => {
  // 嘗試找到符合 book 和 code 的詩歌
  let existingHymn = hymns.find(hymn => hymn.book === newHymn.book && hymn.code === newHymn.code);

  // 如果找到了，更新歌詞；如果找不到，則加入新的詩歌
  if (existingHymn) {
    existingHymn.lyrics = newHymn.lyrics; // 更新歌詞
    console.log(`更新歌詞：book=${newHymn.book}, code=${newHymn.code}`);
  } else {
    hymns.push(newHymn); // 新增詩歌
    console.log(`新增詩歌：book=${newHymn.book}, code=${newHymn.code}`);
  }
});

// 更新後將 hymns 儲存回 localStorage
localStorage.setItem('hymns', JSON.stringify(hymns));

const TMSG = "Timmy的前言：\n心疼年長者帶太多詩歌本，\n所以我個人獨立設計，免費供會所弟兄姊妹使用。\n由於經費相關問題，\n故不再開發安卓版\n未來網站維護若超過我個人所能負擔，\n該項造福工作也會就此結束\n\n\n大本詩歌附歌1-6歌號\n本系統從1001\n至1006\n\n\n本版功能特色：\n(1)若使用系統後關閉網頁而不清除緩存，\n爾後開啟運作速度提升100倍以上且不佔流量\n\n(2)歌詞部分\n系統自動放大\n而不需要再手動調整\n歌詞單行點擊一次，\n即時高亮顯示，\n高亮顯示時點擊2次，\n語音讀此行歌詞\n(3)搜尋功能可以輸入日期，\n例如搜尋欄輸入：1131229，\n則會將1131229那一天唱過的詩歌找出來\n(4)歷史點唱紀錄將紀錄於歌詞末端\n(5)功能及歌詞資料庫自動更新\n(6)若歌詞AI自動調整放大功能造成視覺困擾，\n可於搜尋中輸入：縮小字體5，\n這個5你可以使用任意數字，\n將依照你的數字縮排幾個字的寬。\n(7)清除網頁緩存，\n則會清除所有自訂數據，\n包含點歌紀錄\n其餘數據不變。\n\n2025/03/11新增功能說明\n顯示歌詞後，1.[說明]鍵會異動為分享\n點選分享即分享至Line功能\n2.[搜尋]鍵會異動為[感覺]，\n點選感覺則可以輸入您對這首詩歌的摸著或亮光\n，3.[清除鍵]可復原[感覺][分享]鍵等原有功能鍵\n，若有相關問題或錯別字請聯繫：timmy594168@yahoo.com.tw\n\n歌詞版權為召會所有，\n該系統僅是聚會相調主日所用\n本網頁版權為我個人擁有";
localStorage.setItem('TimmyMSG', TMSG);

const databaseVersion = 20260209;//與HTML一致

localStorage.setItem('hymnsVersion', databaseVersion);


