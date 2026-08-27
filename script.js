/* ================================================================
   ============  CONFIG — CHỈNH SỬA Ở ĐÂY  =======================
   Toàn bộ nội dung cá nhân hoá của website nằm trong object này.
   Bạn chỉ cần sửa các giá trị bên dưới, không cần đụng vào phần
   logic phía sau (trừ khi muốn tuỳ biến sâu hơn).

   LUỒNG TRÒ CHƠI HIỆN TẠI:
   intro -> lock1 (mật mã) -> lock2 (trò chuyện nhân vật + thanh cảm xúc, có thể rẽ qua
   mini game ẩn "trồng cây") -> lock3 (morse) -> songGuess (đoán giai điệu)
   -> cakeGame (thắp nến) -> cutCakeGame (cắt bánh chia phần) -> pandaGame (bắt panda)
   -> bombGame (chọn dây màu + nhập mật mã) -> final (ghép mã cuối)
   -> vault -> universe (bấm sao) -> countdown -> burst -> gallery -> ending
   ================================================================ */
const CONFIG = {
  recipientName: "Chị MẪN",              // Tên người nhận (in hoa cho đẹp)
  hostName: "Tài",                    // Tên người dẫn chương trình (không bắt buộc hiển thị)
  initialTimerSeconds: 20*60,        // đồng hồ mở đầu (chỉ mang tính hồi hộp, không giới hạn thật)
  finalTimerSeconds: 2*60+31,        // đồng hồ khoá cuối cùng

  // ---------- MỞ ĐÚNG GIỜ ----------
  // Để trống "" thì website mở ngay lập tức.
  // Điền "YYYY-MM-DDTHH:MM:SS" thì trước giờ đó sẽ hiện màn hình khoá đếm ngược,
  // đến đúng giờ tự động mở, không cần tải lại trang.
  unlockDateTime: "2026-08-28-00T00:00:00",                // ví dụ: "2026-09-10T00:00:00"

  // ---------- ÂM THANH ----------
  audio: {
    bgMusicUrl: "the_mountain-happy-birthday-576570.mp3",          // link file nhạc nền (mp3) — để trống sẽ ẩn nút nhạc
    correctSoundUrl: "",     // để trống sẽ dùng âm thanh tự tạo
    wrongSoundUrl: "",
    unlockSoundUrl: ""
  },

  // ---------- LOCK 1 : mật mã / cipher ----------
  lock1: {
    question: "Một chuỗi ký tự bí ẩn xuất hiện trên cửa. Giải nó nào",
    cipherText: "KHDSSBELUWKGDB",
    answer: "HAPPY BIRTHDAY",
    fragment: "0",
    rewardImage: "ảnh/1787299953877_286772525899532324_6015717168748568226_2ceabebebd42b809d2a2655afc46dfb5.jpg",
    rewardCaption: "HAPPY BIRTHDAY",
    hints: [
      "Gợi ý 1: Đây là một chữ cái tiếng anh đơn giản",
      "Gợi ý 2: Dành cho ngày đặc biệt",
      "Gợi ý 3: Đáp án là một lời chúc quen thuộc, gồm hai từ."
    ]
  },

  // ---------- LOCK 2 : NHÂN VẬT TRÒ CHUYỆN + THANH CẢM XÚC ----------
  // Nhân vật hỏi tổng cộng 3 câu, mỗi câu có 3 lựa chọn và CHỈ được trả lời 1 lần.
  // Mỗi câu mang một "niềm vui" (moodValue) riêng, trả đúng thì cộng vào thanh cảm xúc,
  // trả sai thì mất phần đó luôn (không được thử lại). Hết 3 câu:
  //   - Nếu thanh đầy 100% -> nhân vật vui hết cỡ, kéo quà ra luôn, KHÔNG hiện mini game.
  //   - Nếu thanh CHƯA đầy -> mở ra mini game ẩn: chăm sóc một chú chó bằng cách vuốt ve 3 lần,
  //     xong thì nhân vật mới vui trở lại và kéo quà ra.
  lock2: {
    characterName: "Thần tài",   // hiện phía trên hội thoại, có thể đổi thành tên riêng
    fragment: "1",                      // mảnh mật mã nhận được khi hoàn thành (giữ để ghép mã cuối)
    introLines: [
      `"Ơ, quen hông?"`,
      `"Hông quen mà qua nhà tài, chúng ta phải giải một vài câu hỏi nhỏ đó."`
    ],
    // 4 mức cảm xúc hiển thị theo % thanh cảm xúc: 0%, <100%, gần đầy, đầy 100%
    moods: ["😐", "🙂", "😊", "🥰"],
    // các mặt biểu cảm trêu chọc/hờn dỗi hiện ra thoáng qua khi trả lời SAI (ngẫu nhiên)
    wrongEmojis: ["😏", "😜", "🤭", "😝", "🥺", "😤"],
    // lời trêu chọc khi trả lời sai — nhân vật sẽ "nói" câu này như đang trò chuyện thật
    teasingLines: [
      `"Ơ kìa, sai rồi"`,
      `"Chậc chậc, chị chắc hông"`,
      `"Sai rồi! Nghĩ lại xem nào."`,
      `"Hihi, không phải đáp án đó đâu."`,
      `"Trời ơi, gần đúng... mà vẫn sai."`,
      `"Chưa chuẩn rồi?"`
    ],
    // lời khen khi trả lời đúng — cũng chọn ngẫu nhiên cho tự nhiên
    correctReactions: [
      `"Đúng đó! Dữ dằn."`,
      `"Chuẩn không cần chỉnh!"`,
      `"Yeah, chính xác luôn!"`,
      `"Dữ vậy sao."`,
      `"Hehe, chuẩn rồi."`
    ],
    // mỗi câu có moodValue riêng — cộng dồn đủ 3 câu đúng thì bằng 100
    questions: [
      {
        q: "Câu 1: Hôm nay là ngày gì?",
        options: ["Một ngày bình thường", "Sinh nhật", "Ngày cuối tuần rảnh rỗi"],
        correctIndex: 1,
        moodValue: 34
        // có thể thêm wrongLines: [...] / correctLines: [...] riêng cho câu này nếu muốn,
        // để trống thì dùng chung teasingLines / correctReactions ở trên.
      },
      {
        q: "Câu 2: Điều gì khiến một ngày trở nên đáng nhớ?",
        options: ["Có thật nhiều tiền", "Đi chọc cột sống", "Đi cày"],
        correctIndex: 1,
        moodValue: 33
      },
      {
        q: "Câu 3: Chị nghĩ mình nên làm gì tiếp theo?",
        options: ["Đi coi quà tiếp", "Qua chọc cột sống", "Đi ngủ"],
        correctIndex: 1,
        moodValue: 33
      }
    ],
    giftLine: `"Vậy là xong rồi chúng ta mở quà nào!"`,
    rewardImage: "ảnh/1787299953687_286772525899532324_6015717168748568226_f3e0f1eaee57db32a153054abfa16e41.jpg",
    rewardCaption: "Panda và...",

    // ---------- MINI GAME ẨN : TRỒNG CÂY ----------
    // Chỉ xuất hiện khi hết 3 câu mà thanh cảm xúc CHƯA đầy 100%.
    // Gieo hạt (bấm lần đầu) rồi tưới nước — bấm đủ 3 lần thì cây nở hoa.
    hiddenPlantGame: {
      introLines: [
        `"Ơ... hình như vẫn chưa vui trọn vẹn."`,
        `"Nhưng may quá, có một hạt giống ở đây. Gieo xuống rồi tưới nước cho nó xem sao?"`
      ],
      waterNeeded: 3,          // tổng số lần bấm để cây nở hoa (lần đầu = gieo hạt, các lần sau = tưới nước)
      seedEmoji: "🌰",         // trạng thái ban đầu, chưa bấm lần nào
      // các trạng thái cây sau mỗi lần bấm — độ dài mảng nên bằng waterNeeded
      stageEmojis: ["🌱", "🌿", "🌸"],
      waterReactions: [
        "Hạt giống đã được gieo xuống đất.",
        "Tưới thêm chút nước nào, cây đang lớn lên rồi kìa.",
        "Cây đã nở hoa rồi! Đẹp thật."
      ],
      finishLine: `"Thấy chưa, hoa nở rồi"`,
      rewardImage: "ảnh/1787299953480_286772525899532324_6015717168748568226_a7f6d7b744a1cf0e2e9ae205c3afc6bd.jpg",
      rewardCaption: "Cẩ vườn hoa đã nở rồi"
    }
  },

  // ---------- LOCK 3 : âm thanh / morse ----------
  lock3: {
    morseWord: "HAPPY",
    fragment: "3",
    rewardImage: "ảnh/ôm gấu.jpg",
    rewardCaption: "Đoán xem là ai nè",
    hints: [
      "Gợi ý: Một từ chỉ trạng thái cảm xúc phổ biến.",
      "Gợi ý: Đây là một từ tiếng Anh ngắn, mang ý nghĩa vui vẻ"
    ]
  },

  // ---------- GAME MỚI : ĐOÁN GIAI ĐIỆU BÍ ẨN ----------
  // Nằm ngay sau lock3 (morse) và TRƯỚC màn thắp nến bánh sinh nhật.
  // Người chơi nghe một đoạn nhạc rồi chọn 1 trong 3 đáp án.
  songGuess: {
    introLines: [
      `"Manh động quá còn một câu hỏi nữa."`,
      `"Nghe kỹ giai điệu này, rồi đoán xem đó là gì nhé."`
    ],
    // DÁN LINK FILE NHẠC THẬT VÀO ĐÂY (mp3/wav/ogg), ví dụ "music/song-clip.mp3".
    // Có link thì sẽ phát file này. Để trống "" thì mới dùng giai điệu demo tự tạo bên dưới.
    audioUrl: "Tình Đầu Quá Chén.mp3",
    // giai điệu demo (chỉ dùng khi audioUrl để trống) — mỗi nốt gồm tên nốt (vd "C4") và thời lượng (giây)
    melodyNotes: [
      { note: "C4", dur: 0.32 },
      { note: "E4", dur: 0.32 },
      { note: "G4", dur: 0.32 },
      { note: "C5", dur: 0.5  },
      { note: "G4", dur: 0.32 },
      { note: "E4", dur: 0.32 },
      { note: "C4", dur: 0.55 }
    ],
    options: ["Tình đầu quán chén", "Trói em vào tim", "Thủy triều"],
    correctIndex: 0,
    hints: [
        "Gợi ý: Nói về tình cảm.",
      "Gợi ý: Bài này rất nổi và từng đi thi anh trai"
    ],
    rewardImage: "ảnh/đội nón.jpg",
    rewardCaption: "Có chôm chôm nữa nè"
  },

  // ---------- GAME MỚI : THẮP SÁNG BÁNH SINH NHẬT ----------
  // Nằm ngay sau songGuess. Người chơi phải bấm ĐÚNG 2 ngọn nến theo gợi ý.
  cakeGame: {
    introLines: [
      `"Trước khi đi tiếp, còn một chiếc bánh đang chờ được thắp sáng."`,
      `"Nhìn kỹ gợi ý, và chọn đúng ngọn nến."`
    ],
    candleCount: 6,                 // tổng số nến trên bánh
    // QUAN TRỌNG: đây là SỐ THỨ TỰ nến tính từ trái sang, đếm từ 1 (không phải index).
    // Ví dụ [2, 3] nghĩa là ngọn nến thứ 2 và ngọn nến thứ 3 — đúng như hiển thị trên bánh.
    correctCandleNumbers: [2, 3],
    hint: "Gợi ý: hãy thắp ngọn nến bắt đầu từ số đầu tiên trong sinh nhật hai người",
    rewardImage: "ảnh/ảnh chibi.jpg.jpg",
    rewardCaption: "Thắp bánh sinh nhật nào"
  },

  // ---------- GAME MỚI : CẮT BÁNH CHIA PHẦN ----------
  // Nằm ngay sau cakeGame (sau khi thổi nến), TRƯỚC màn bắt panda.
  // Bấm vào bánh đủ số lần quy định để cắt và chia từng miếng cho mọi người.
   cutCakeGame: {
    introLines: [
      `"Bánh đã thắp sáng rồi, giờ thì cắt ra chia cho mọi người thôi."`,
      `"Giải đúng bài toán thì dao mới cắt được đấy."`
    ],
    // mỗi bài toán gồm: đề bài (text), đáp án (answer - số), và người được chia miếng đó (recipient).
    // Có thể đổi số liệu, đổi phép tính (+ - × ÷), hay đổi recipient tuỳ ý.
    problems: [
      { text: "7 + 9 = ?", answer: 16, recipient: "Miếng này giành cho cả gia đình" },
      { text: "70 - 4 = ?", answer: 66, recipient: "Một người thân thiết" },
      { text: "264 ÷ 3 = ?", answer: 88, recipient: "Cho chị xứng đáng mà" }
    ],
    finishLine: `"Xong rồi, ai cũng có phần. Giờ đi tiếp thôi."`,
    rewardImage: "ảnh/ăn bánh.jpg",
    rewardCaption: "Cắt rồi giờ ăn thui"
  },


  // ---------- GAME MỚI : BẮT PANDA (thay cho vòng câu hỏi cá nhân) ----------
  // Panda sẽ chạy vòng vòng trong khung — bấm trúng nó đủ số lần quy định là bắt được.
  pandaGame: {
    introLines: [
      `"À, còn một vị khách nghịch ngợm đang giữ mảnh ghép tiếp theo."`,
      `"Bắt nó lại, nhưng cẩn thận, panda không đứng yên đâu."`
    ],
    catchesNeeded: 3,       // cần bấm trúng panda bao nhiêu lần
    loopSeconds: 2.7,       // panda chạy hết 1 vòng trong bao nhiêu giây (càng nhỏ càng nhanh)
    fragment: "1",          // mảnh mật mã nhận được khi bắt đủ
    rewardImage: "ảnh/1787462218611_286772525899532324_6015717168748568226_aa83e7b22e832e70da0e9496c374cd5e.jpg",
    rewardCaption: "Ồ quao"
  },

  // ---------- GAME GỠ BOM : chọn dây màu + nhập mật mã ----------
  bombGame: {
    introLines: [
      `"Chờ đã..."`,
      `"Chúng ta chưa tới được đoạn cuối đâu ."`,
      `"Chọn đúng dây, rồi nhập mật mã để tháo nó hoàn toàn."`
    ],
    question: "Bước 1: chọn đúng dây để bắt đầu tháo ngòi nổ.",
    wires: [
      { id: "red",    hex: "#e5484d" },
      { id: "blue",   hex: "#3b82f6" },
      { id: "green",  hex: "#22c55e" },
      { id: "yellow", hex: "#eab308" },
      { id: "purple", hex: "#a855f7" },
      { id: "white",  hex: "#f4f4f5" }
    ],
    correctWireId: "blue",
    wireHints: [
      "Gợi ý: màu của biển cả, màu của bầu trời.",
      "Gợi ý: Một màu chỉ cần ngước mắt lên trời."
    ],
    // Sau khi chọn đúng dây, mật mã cần nhập được TÍNH TỰ ĐỘNG từ ngày/tháng bên dưới
    // (ghép lại thành 4 chữ số, mỗi phần 2 chữ số). Ví dụ day:27, month:8 -> mật mã "2708".
    // Trên màn hình, gợi ý sẽ KHÔNG hiện số thường mà hiện dưới dạng số La Mã để đỡ lộ đáp án.
    passcodeDay: 27,
    passcodeMonth: 8,
    passcodeHintIntro: "Bước 2: Mật mã là một ngày đặc biệt, được viết dưới dạng số La Mã, có bao gồm cả số 0:",
    passcodeHints: [
      "Gợi ý: Số này bao gồm cả số 0  ",
      "Gợi ý: Nó bao gồm ngày tháng người mở có 4 số."
    ],
    timerSeconds: 45,   // hết giờ chỉ tự reset để tạo hồi hộp, không tính là thua
    rewardImage: "ảnh/1787299954133_286772525899532324_6015717168748568226_e6974fc8a0485044bfc2532bdebe7ad0.jpg",
    rewardCaption: "Một chút dịu dàng cảu trời xanh vào tay"
  },

  // thứ tự ghép các mảnh mật mã để mở khoá cuối cùng (đọc trái sang phải)
  finalCodeOrder: ["lock1","lock3","lock2","panda"], // -> mã cuối: 0311

  // ---------- ảnh trong "vũ trụ sao" (5 ngôi sao) ----------
  starMemories: [
    { caption: "Ngôi sao thứ nhất — Một ngày mưa tầm tả" },
    { caption: "Ngôi sao thứ hai — Một ngày đi hóng hớt." },
    { caption: "Ngôi sao thứ ba — Một trận cười hả hê." },
    { caption: "Ngôi sao thứ tư — Một chuyến đi không quên." },
    { caption: "Ngôi sao thứ năm — Một món ăn đáng nhớ." }
  ],

  // ---------- gallery ảnh cuối (Memory Vault) ----------
  gallery: [
    { url:"ảnh/1787474629915_1575921686151592448_1575921686151592448_bc91a1d1a62f6ddb4156a2a0e4daabdb.jpg", caption:"Bắt đầu của mọi thứ.", date:"Ảnh 01" },
    { url:"ảnh/1787474632221_1575921686151592448_1575921686151592448_b9845720e982e3df256cb5d73f92dfda.jpg", caption:"Một ngày nắng đẹp.", date:"Ảnh 02" },
    { url:"ảnh/1787474631315_1575921686151592448_1575921686151592448_878bf534cab7f825c7701236c20d303a.jpg", caption:"Không thể nào quên.", date:"ẢNh 03" },
    { url:"ảnh/panda.jpg", caption:"Chụp check.", date:"Ảnh 04" },
    { url:"ảnh/1787474632221_1575921686151592448_1575921686151592448_b9845720e982e3df256cb5d73f92dfda.jpg", caption:"Tươi rối.", date:"Ảnh 05" },
    { url:"ảnh/1787474630565_1575921686151592448_1575921686151592448_3f659a8f20d9fb18ed72a0529b8a9c62.jpg", caption:"Cùng bay đi biển nào.", date:"Ảnh 06" },
    { url:"ảnh/1787474725496_3847461834490601658_3847461834490601658_31d1c251f8c42f1cb5f8d03098463887.jpg", caption:"Một ngày đi chơi trước thảm họa", date:"Ảnh 07" },
    { url:"ảnh/đồ ăn.jpg", caption:"Một ngày đi ăn.", date:"Anh 08" }
  ],

  finalPhotoUrl: "ảnh/Chụp chung.jpg",
  finalMessage: "Chúc chị có tuổi mới thật rực rỡ và vui vẻ, thành công trong cuộc sống",

  // ---------- bóng bay chúc mừng ở màn kết thúc ----------
  balloons: {
    enabled: true,
    count: 12,
    colors: ["#c9a24b","#ff7a92","#7ea8ff","#8fd9a8","#ffd166"]
  }
};
/* ================== HẾT PHẦN CONFIG ================== */


/* ================================================================
   ENGINE — phần logic điều khiển toàn bộ trải nghiệm
   ================================================================ */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

let fragments = {};
let skipTyping = false;
document.addEventListener('keydown', e=>{ if(e.key==="ArrowRight") skipTyping = true; });

function showScreen(name){
  $$(".screen").forEach(s=>s.classList.remove("active"));
  const el = document.querySelector(`.screen[data-screen="${name}"]`);
  if(el) el.classList.add("active");
  updateProgress(name);
}

function updateProgress(name){
  const progress = $("#progress");
  const clock = $("#clockDisplay");
  const lockScreens = ["lock1","lock2","lock3","songGuess","cake","cutCake","panda","bomb","final"];
  if(lockScreens.includes(name)){
    progress.classList.add("show"); clock.classList.add("show");
  } else {
    progress.classList.remove("show"); clock.classList.remove("show");
  }
  const idx = lockScreens.indexOf(name);
  $$(".dot").forEach((d,i)=>{
    d.classList.remove("active","done");
    if(idx===-1) return;
    if(i<idx) d.classList.add("done");
    else if(i===idx) d.classList.add("active");
  });
}

/* ---------- typewriter ---------- */
function typeLine(el, text, speed=32){
  return new Promise(resolve=>{
    el.innerHTML = "";
    let i=0;
    skipTyping = false;
    const cursor = document.createElement('span');
    cursor.className='cursor';
    function step(){
      if(skipTyping){ el.textContent = text; el.appendChild(cursor); resolve(); return; }
      if(i<text.length){
        el.textContent = text.slice(0,i+1);
        el.appendChild(cursor);
        i++;
        setTimeout(step, speed);
      } else { resolve(); }
    }
    step();
  });
}
async function typeSequence(el, lines, pause=650){
  for(const line of lines){
    await typeLine(el, line);
    await new Promise(r=>setTimeout(r, pause));
  }
}

/* ---------- fragment popup ---------- */
function popFragment(char){
  const pop = $("#fragment-pop");
  pop.textContent = char;
  pop.classList.remove("show");
  void pop.offsetWidth;
  pop.classList.add("show");
}

/* ---------- ảnh thưởng sau khi trả lời/hoàn thành đúng ---------- */
function showRewardImage(url, caption){
  return new Promise(resolve=>{
    if(!url){ resolve(); return; }
    const overlay = document.createElement('div');
    overlay.className = 'reward-overlay';
    overlay.innerHTML = `
      <div class="reward-card">
        <img src="${url}" alt="reward">
        ${caption ? `<div class="reward-caption">${caption}</div>` : ""}
        <button class="btn ghost reward-continue">Tiếp tục</button>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>overlay.classList.add('show'));
    overlay.querySelector('.reward-continue').addEventListener('click', ()=>{
      overlay.classList.remove('show');
      setTimeout(()=>{ overlay.remove(); resolve(); }, 400);
    });
  });
}
function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

/* ================================================================
   ÂM THANH
   ================================================================ */
let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}
function synthTone(freq, start, dur, type='sine', peak=0.22){
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type; osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(peak, start+0.015);
  gain.gain.setValueAtTime(peak, start+dur-0.03);
  gain.gain.linearRampToValueAtTime(0.0001, start+dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start); osc.stop(start+dur);
}
function playUrlOrSynth(url, synthFn){
  if(url){ const a = new Audio(url); a.play().catch(()=>{}); }
  else { synthFn(); }
}
function playCorrectSound(){
  playUrlOrSynth(CONFIG.audio.correctSoundUrl, ()=>{
    const ctx = getAudioCtx(); const t = ctx.currentTime;
    synthTone(523.25, t, 0.14);
    synthTone(659.25, t+0.13, 0.18);
  });
}
function playWrongSound(){
  playUrlOrSynth(CONFIG.audio.wrongSoundUrl, ()=>{
    const ctx = getAudioCtx(); const t = ctx.currentTime;
    synthTone(180, t, 0.22, 'sawtooth', 0.15);
  });
}
function playUnlockSound(){
  playUrlOrSynth(CONFIG.audio.unlockSoundUrl, ()=>{
    const ctx = getAudioCtx(); const t = ctx.currentTime;
    synthTone(392, t, 0.12);
    synthTone(523.25, t+0.11, 0.12);
    synthTone(783.99, t+0.22, 0.28);
  });
}

/* ---------- nhạc nền ---------- */
const bgMusic = $("#bgMusic");
const musicToggle = $("#musicToggle");
let musicPlaying = false;
if(CONFIG.audio.bgMusicUrl){
  bgMusic.src = CONFIG.audio.bgMusicUrl;
  bgMusic.volume = 0.35;
} else {
  // chưa có link nhạc nền -> nút vẫn hiện nhưng làm mờ đi để biết là chưa dùng được
  musicToggle.classList.add('no-audio');
}
// nhạc cho màn "đoán giai điệu" — chỉ gán src nếu có link thật trong CONFIG.songGuess.audioUrl
if(CONFIG.songGuess.audioUrl){
  $("#songAudio").src = CONFIG.songGuess.audioUrl;
}
musicToggle.addEventListener('click', ()=>{
  if(!CONFIG.audio.bgMusicUrl) return;
  if(musicPlaying){
    bgMusic.pause(); musicToggle.textContent = "🔈"; musicToggle.classList.remove('playing');
  } else {
    bgMusic.play().catch(()=>{}); musicToggle.textContent = "🔊"; musicToggle.classList.add('playing');
  }
  musicPlaying = !musicPlaying;
});

// Tránh 2 nguồn âm thanh (nhạc nền + nhạc đoán giai điệu) chồng tiếng nhau:
// khi vào màn đoán giai điệu thì tạm dừng nhạc nền, xong thì phát lại nếu trước đó đang phát.
let bgWasPlayingBeforeSong = false;
function pauseBgMusicForSong(){
  bgWasPlayingBeforeSong = musicPlaying && !bgMusic.paused;
  if(bgWasPlayingBeforeSong) bgMusic.pause();
}
function stopSongAudioAndResumeBgMusic(){
  const audio = $("#songAudio");
  audio.pause();
  audio.currentTime = 0;
  if(bgWasPlayingBeforeSong && musicPlaying){
    bgMusic.play().catch(()=>{});
  }
  bgWasPlayingBeforeSong = false;
}

/* ---------- global countdown clock (cosmetic) ---------- */
let remaining = CONFIG.initialTimerSeconds;
function fmt(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}
setInterval(()=>{
  if(remaining>0){ remaining--; $("#clockDisplay").textContent = fmt(remaining); }
},1000);

/* ================================================================
   MỞ ĐÚNG GIỜ
   ================================================================ */
function initApp(){
  if(CONFIG.unlockDateTime){
    const target = new Date(CONFIG.unlockDateTime).getTime();
    const now = Date.now();
    if(!isNaN(target) && now < target){
      showScreen('locked');
      const targetDate = new Date(target);
      $("#lockedTargetText").textContent = "Sẽ mở vào " + targetDate.toLocaleString('vi-VN');
      startLockedCountdown(target);
      return;
    }
  }
  showScreen('intro');
  runIntro();
}
let lockedInterval = null;
function startLockedCountdown(target){
  clearInterval(lockedInterval);
  function tick(){
    const diff = target - Date.now();
    if(diff<=0){
      clearInterval(lockedInterval);
      showScreen('intro'); runIntro();
      return;
    }
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    $("#lockedCountdown").textContent =
      `${d.toString().padStart(2,'0')}:${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
  tick();
  lockedInterval = setInterval(tick, 1000);
}

/* ================= SCREEN 0 : INTRO ================= */
async function runIntro(){
  const lines = [
    `"Ồ... cuối cùng chị cũng mở rồi sao."`,
    `"Chào mừng đến nhà tài."`,
    `Hôm nay có một món quà đặc biệt dành cho chị, nhưng mà không dễ đâu nha.`,
    `"Chúng ta sẽ chơi các mini game nhỏ để mở khóa từng phần quà."`,
    `"Chúng ta có một quãng thời gian mặc định ở góc màn hình, nên là không nhanh lên là bị khóa đó nha."`
  ];
  await typeSequence($("#introLine"), lines);
  const btn = $("#startBtn");
  btn.style.opacity = 1;
  btn.style.pointerEvents = "auto";
}
$("#startBtn").addEventListener('click', ()=>{
  showScreen("lock1");
  runLock1Intro();
});

/* ================= SCREEN 1 : LOCK 1 ================= */
async function runLock1Intro(){
  $("#lock1Question").textContent = "";
  $("#lock1Cipher").textContent = CONFIG.lock1.cipherText;
  await typeLine($("#lock1Question"), CONFIG.lock1.question, 20);
}
let lock1Attempts = 0;
$("#lock1Submit").addEventListener('click', async ()=>{
  const val = $("#lock1Input").value.trim().toUpperCase();
  const fb = $("#lock1Feedback");
  if(val && val === CONFIG.lock1.answer.toUpperCase()){
    playUnlockSound();
    fb.textContent = "Không tệ. Khóa đầu tiên đã mở"; fb.classList.add("ok");
    fragments.lock1 = CONFIG.lock1.fragment;
    popFragment(CONFIG.lock1.fragment);
    $("#lock1Input").disabled = true; $("#lock1Submit").disabled = true;
    await sleep(1000);
    await showRewardImage(CONFIG.lock1.rewardImage, CONFIG.lock1.rewardCaption);
    showScreen("lock2"); runLock2Intro();
  } else {
    playWrongSound();
    lock1Attempts++;
    fb.classList.remove("ok");
    fb.textContent = lock1Attempts===1 ? "Chưa đúng." : "Thử lại nào";
    const hint = CONFIG.lock1.hints[Math.min(lock1Attempts-1, CONFIG.lock1.hints.length-1)];
    $("#lock1Hint").textContent = hint;
  }
});
$("#lock1Input").addEventListener('keydown', e=>{ if(e.key==="Enter") $("#lock1Submit").click(); });

/* ================= SCREEN 2 : NHÂN VẬT — TRÒ CHUYỆN + THANH CẢM XÚC ================= */
let charQIndex = 0;
let charMoodTotal = 0; // cộng dồn moodValue của các câu trả lời ĐÚNG
async function runLock2Intro(){
  charQIndex = 0;
  charMoodTotal = 0;
  $("#charTag").textContent = CONFIG.lock2.characterName;
  $("#charAvatar").textContent = CONFIG.lock2.moods[0];
  $("#charAvatar").classList.remove('bounce');
  $("#moodBarFill").style.width = "0%";
  $("#moodLabel").textContent = "Cảm xúc: 0%";
  $("#giftReveal").style.display = "none";
  $("#giftEmoji").style.animation = "none";
  $("#charQuestionBox").style.display = "block";
  await typeSequence($("#lock2Line"), CONFIG.lock2.introLines, 500);
  renderCharQuestion();
}
function renderCharQuestion(){
  const total = CONFIG.lock2.questions.length;
  const q = CONFIG.lock2.questions[charQIndex];
  $("#charQCounter").textContent = `CÂU HỎI ${charQIndex+1} / ${total}`;
  $("#charQText").textContent = q.q;
  $("#charFeedback").textContent = "";
  $("#charFeedback").classList.remove("ok");
  const optionsEl = $("#charOptions");
  optionsEl.innerHTML = "";
  q.options.forEach((opt, idx)=>{
    const btn = document.createElement('button');
    btn.className = "answer-btn";
    btn.textContent = opt;
    btn.addEventListener('click', ()=>handleCharAnswer(idx, q, btn));
    optionsEl.appendChild(btn);
  });
}
function updateMoodBar(){
  const percent = Math.max(0, Math.min(100, Math.round(charMoodTotal)));
  $("#moodBarFill").style.width = percent + "%";
  $("#moodLabel").textContent = `Cảm xúc: ${percent}%`;
  // chọn mặt biểu cảm theo % hiện tại: 0% / <70% / <100% / đầy 100%
  let moodIdx = 0;
  if(percent >= 100) moodIdx = 3;
  else if(percent >= 60) moodIdx = 2;
  else if(percent > 0) moodIdx = 1;
  $("#charAvatar").textContent = CONFIG.lock2.moods[moodIdx];
  $("#charAvatar").classList.remove('bounce');
  void $("#charAvatar").offsetWidth;
  $("#charAvatar").classList.add('bounce');
}
function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// CHỈ được trả lời 1 LẦN mỗi câu — trả đúng thì cộng moodValue của câu đó vào
// thanh cảm xúc, trả sai thì mất luôn phần đó (không được thử lại).
async function handleCharAnswer(selectedIdx, q, btn){
  const fb = $("#charFeedback");
  const avatar = $("#charAvatar");
  $$(".answer-btn").forEach(b=>b.disabled = true); // khoá toàn bộ lựa chọn ngay khi đã chọn 1 lần

  if(selectedIdx === q.correctIndex){
    playCorrectSound();
    btn.classList.add('correct');
    charMoodTotal += (q.moodValue || 0);
    updateMoodBar();
    fb.textContent = "Đúng rồi!"; fb.classList.add("ok");
    const pool = (q.correctLines && q.correctLines.length) ? q.correctLines : CONFIG.lock2.correctReactions;
    await typeLine($("#lock2Line"), pickRandom(pool), 26);
    await sleep(700);
  } else {
    playWrongSound();
    btn.classList.add('wrong');
    // đánh dấu luôn đáp án đúng để người chơi biết, vì không còn cơ hội thử lại
    const optionsEl = $("#charOptions");
    optionsEl.children[q.correctIndex]?.classList.add('correct');
    fb.classList.remove("ok");
    fb.textContent = "Chưa đúng, sai rồi thử lại nào";
    // nhân vật "trêu chọc" — đổi mặt thoáng qua + nói một câu ngẫu nhiên, giống như đang trò chuyện thật
    avatar.classList.remove('bounce','tease');
    void avatar.offsetWidth;
    avatar.textContent = pickRandom(CONFIG.lock2.wrongEmojis);
    avatar.classList.add('tease');
    $("#moodBarFill").classList.remove('flash');
    void $("#moodBarFill").offsetWidth;
    $("#moodBarFill").classList.add('flash');
    const pool = (q.wrongLines && q.wrongLines.length) ? q.wrongLines : CONFIG.lock2.teasingLines;
    await typeLine($("#lock2Line"), pickRandom(pool), 26);
    await sleep(900);
    // quay lại đúng mức cảm xúc hiện tại (theo tổng mood đã có, không đổi vì câu này sai)
    avatar.classList.remove('tease');
    const percent = Math.round(charMoodTotal);
    let moodIdx = 0;
    if(percent >= 100) moodIdx = 3; else if(percent >= 60) moodIdx = 2; else if(percent > 0) moodIdx = 1;
    avatar.textContent = CONFIG.lock2.moods[moodIdx];
  }

  charQIndex++;
  if(charQIndex < CONFIG.lock2.questions.length){
    renderCharQuestion();
  } else if(charMoodTotal >= 100){
    // thanh cảm xúc đã đầy -> bỏ qua mini game ẩn, đi thẳng tới phần kéo quà
    await finishCharacterGame();
  } else {
    // thanh CHƯA đầy -> mở mini game ẩn: trồng cây
    showScreen("plant");
    runPlantIntro();
  }
}

async function finishCharacterGame(){
  playUnlockSound();
  fragments.lock2 = CONFIG.lock2.fragment;
  popFragment(CONFIG.lock2.fragment);
  showScreen("lock2");
  $("#charQuestionBox").style.display = "none";
  $("#giftReveal").style.display = "flex";
  $("#giftEmoji").style.animation = "giftPop .7s cubic-bezier(.2,.8,.3,1.4) forwards";
  await typeLine($("#giftLine"), CONFIG.lock2.giftLine, 28);
  await sleep(1200);
  await showRewardImage(CONFIG.lock2.rewardImage, CONFIG.lock2.rewardCaption);
  showScreen("lock3"); runLock3Intro();
}

/* ================= SCREEN 2.5 : MINI GAME ẨN — TRỒNG CÂY ================= */
let plantWaterCount = 0;
async function runPlantIntro(){
  plantWaterCount = 0;
  const cfg = CONFIG.lock2.hiddenPlantGame;
  $("#plantCounter").textContent = `Đã tưới nước: 0 / ${cfg.waterNeeded}`;
  $("#plantReaction").textContent = "";
  const plant = $("#plantAvatar");
  plant.textContent = cfg.seedEmoji;
  plant.classList.remove('bounce');
  plant.onclick = handleWaterPlant;
  await typeSequence($("#plantIntroLine"), cfg.introLines, 500);
}
function handleWaterPlant(){
  const cfg = CONFIG.lock2.hiddenPlantGame;
  if(plantWaterCount >= cfg.waterNeeded) return;
  plantWaterCount++;
  playCorrectSound();
  const plant = $("#plantAvatar");
  plant.classList.remove('bounce');
  void plant.offsetWidth;
  plant.classList.add('bounce');
  // đổi trạng thái cây theo số lần đã tưới (chỉ số mảng = số lần tưới - 1)
  const stageIdx = Math.min(plantWaterCount-1, cfg.stageEmojis.length-1);
  plant.textContent = cfg.stageEmojis[stageIdx];
  spawnWaterDrop(plant);
  $("#plantCounter").textContent = `Đã tưới nước: ${plantWaterCount} / ${cfg.waterNeeded}`;
  $("#plantReaction").textContent = cfg.waterReactions[Math.min(plantWaterCount-1, cfg.waterReactions.length-1)] || "";
  if(plantWaterCount >= cfg.waterNeeded){
    plant.onclick = null;
    finishPlantGame();
  }
}
function spawnWaterDrop(anchorEl){
  const drop = document.createElement('div');
  drop.className = "water-drop";
  drop.textContent = "💧";
  drop.style.left = (40 + Math.random()*20) + "%";
  anchorEl.parentElement.appendChild(drop);
  setTimeout(()=>drop.remove(), 1200);
}
async function finishPlantGame(){
  const cfg = CONFIG.lock2.hiddenPlantGame;
  await sleep(600);
  await typeLine($("#plantIntroLine"), cfg.finishLine, 26);
  await sleep(1000);
  await showRewardImage(cfg.rewardImage, cfg.rewardCaption);
  // chăm sóc xong -> nhân vật vui trở lại, thanh cảm xúc coi như đầy
  charMoodTotal = 100;
  await finishCharacterGame();
}

/* ================= SCREEN 3 : LOCK 3 — SOUND / MORSE ================= */
const MORSE_MAP = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..'};
async function runLock3Intro(){
  await typeSequence($("#lock3Line"), [
    `"Một mã morse đơn giản."`,
    `"Và yên tâm nó chỉ một trạng thái cảm xúc đó ."`
  ], 500);
}
let lock3Attempts = 0;
function playMorseWord(word){
  const ctx = getAudioCtx();
  const unit = 0.11;
  let t = ctx.currentTime + 0.2;
  let visual = "";
  const light = $("#radioLight");
  const events = [];
  for(const ch of word.toUpperCase()){
    const code = MORSE_MAP[ch] || "";
    for(const sym of code){
      const dur = sym==='.' ? unit : unit*3;
      events.push({start:t, dur});
      synthTone(620, t, dur, 'sine', 0.25);
      visual += sym;
      t += dur + unit;
    }
    visual += "  ";
    t += unit*2;
  }
  events.forEach(ev=>{
    setTimeout(()=>light.classList.add('on'), (ev.start-ctx.currentTime)*1000);
    setTimeout(()=>light.classList.remove('on'), (ev.start+ev.dur-ctx.currentTime)*1000);
  });
  $("#morseVisual").textContent = visual.trim();
}
$("#playMorse").addEventListener('click', ()=>{ playMorseWord(CONFIG.lock3.morseWord); });
$("#lock3Submit").addEventListener('click', async ()=>{
  const val = $("#lock3Input").value.trim().toUpperCase();
  const fb = $("#lock3Feedback");
  if(val && val === CONFIG.lock3.morseWord.toUpperCase()){
    playUnlockSound();
    fb.textContent = "Correct. Khoá thứ ba đã mở."; fb.classList.add("ok");
    fragments.lock3 = CONFIG.lock3.fragment;
    popFragment(CONFIG.lock3.fragment);
    $("#lock3Input").disabled = true; $("#lock3Submit").disabled = true;
    await sleep(1000);
    await showRewardImage(CONFIG.lock3.rewardImage, CONFIG.lock3.rewardCaption);
    showScreen("songGuess"); runSongGuessIntro();
  } else {
    playWrongSound();
    lock3Attempts++;
    fb.classList.remove("ok");
    fb.textContent = lock3Attempts>=2 ? "Đáp án vẫn chưa đúng?" : "Chưa đúng, thử nghe lại xem.";
    $("#lock3Hint").textContent = CONFIG.lock3.hints[Math.min(lock3Attempts-1, CONFIG.lock3.hints.length-1)] || "";
  }
});
$("#lock3Input").addEventListener('keydown', e=>{ if(e.key==="Enter") $("#lock3Submit").click(); });

/* ================= SCREEN 3.5A : SONG GUESS — ĐOÁN GIAI ĐIỆU ================= */
// Bảng tần số các nốt nhạc cơ bản (Hz), dùng để đổi tên nốt (vd "C4") thành âm thanh thực.
const NOTE_FREQ = {
  C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00, A4:440.00, B4:493.88,
  C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99, A5:880.00, B5:987.77
};
function playMelody(notes){
  const ctx = getAudioCtx();
  let t = ctx.currentTime + 0.15;
  notes.forEach(n=>{
    const freq = NOTE_FREQ[n.note] || 440;
    synthTone(freq, t, n.dur, 'triangle', 0.22);
    t += n.dur + 0.03;
  });
}
let songGuessAttempts = 0;
async function runSongGuessIntro(){
  songGuessAttempts = 0;
  $("#songFeedback").textContent = "";
  $("#songFeedback").classList.remove("ok");
  $("#songHint").textContent = "";
  await typeSequence($("#songIntroLine"), CONFIG.songGuess.introLines, 500);
  buildSongOptions();
}
function buildSongOptions(){
  const optionsEl = $("#songOptions");
  optionsEl.innerHTML = "";
  CONFIG.songGuess.options.forEach((opt, idx)=>{
    const btn = document.createElement('button');
    btn.className = "answer-btn";
    btn.textContent = opt;
    btn.addEventListener('click', ()=>handleSongAnswer(idx, btn));
    optionsEl.appendChild(btn);
  });
}
$("#playSong").addEventListener('click', ()=>{
  if(CONFIG.songGuess.audioUrl){
    const audio = $("#songAudio");
    audio.currentTime = 0;
    audio.play().catch(()=>{});
  } else {
    playMelody(CONFIG.songGuess.melodyNotes);
  }
});
async function handleSongAnswer(idx, btn){
  const fb = $("#songFeedback");
  if(idx === CONFIG.songGuess.correctIndex){
    playUnlockSound();
    btn.classList.add('correct');
    $$("#songOptions .answer-btn").forEach(b=>b.disabled = true);
    fb.textContent = "Đúng rồi!"; fb.classList.add("ok");
    await sleep(1000);
    await showRewardImage(CONFIG.songGuess.rewardImage, CONFIG.songGuess.rewardCaption);
    showScreen("cake"); runCakeIntro();
  } else {
    playWrongSound();
    btn.classList.add('wrong');
    btn.disabled = true;
    songGuessAttempts++;
    fb.classList.remove("ok");
    fb.textContent = "Chưa đúng, chị thử nghe lại đi";
    $("#songHint").textContent = CONFIG.songGuess.hints[Math.min(songGuessAttempts-1, CONFIG.songGuess.hints.length-1)] || "";
  }
}

/* ================= SCREEN 3.5 : CAKE GAME — THẮP NẾN ================= */
let litCandles = new Set();
// Chuyển "số thứ tự nến" (đếm từ 1, đúng như người chơi nhìn thấy trên bánh)
// thành index nội bộ (đếm từ 0) — tránh lệch 1 đơn vị gây "thắp nhầm nến".
let cakeCorrectIndices = [];
async function runCakeIntro(){
  litCandles = new Set();
  cakeCorrectIndices = CONFIG.cakeGame.correctCandleNumbers.map(n => n - 1);
  $("#cakeFeedback").textContent = "";
  $("#cakeFeedback").classList.remove("ok");
  $("#cakeHint").textContent = CONFIG.cakeGame.hint;
  await typeSequence($("#cakeIntroLine"), CONFIG.cakeGame.introLines, 500);
  buildCandles();
}
function buildCandles(){
  const row = $("#candleRow");
  row.innerHTML = "";
  for(let i=0;i<CONFIG.cakeGame.candleCount;i++){
    const c = document.createElement('div');
    c.className = "candle";
    c.dataset.index = i;
    c.addEventListener('click', ()=>handleCandleClick(i, c));
    row.appendChild(c);
  }
}
async function handleCandleClick(i, el){
  if(el.classList.contains('lit')) return;
  if(cakeCorrectIndices.includes(i)){
    playCorrectSound();
    el.classList.add('lit');
    litCandles.add(i);
    if(litCandles.size >= cakeCorrectIndices.length){
      playUnlockSound();
      $("#cakeFeedback").textContent = "Bánh đã được thắp sáng.";
      $("#cakeFeedback").classList.add("ok");
      await sleep(1100);
      await showRewardImage(CONFIG.cakeGame.rewardImage, CONFIG.cakeGame.rewardCaption);
      showScreen("cutCake"); runCutCakeIntro();
    }
  } else {
    playWrongSound();
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    $("#cakeFeedback").classList.remove("ok");
    $("#cakeFeedback").textContent = "Chưa đúng, thử ngọn nến khác xem.";
  }
}

/* ================= SCREEN 3.7 : CUT CAKE — CẮT BÁNH CHIA PHẦN ================= */
let cutCakeIndex = 0;
async function runCutCakeIntro(){
  cutCakeIndex = 0;
  const cakeEl = $("#cutCakeVisual");
  cakeEl.style.transform = "scale(1)";
  await typeSequence($("#cutCakeIntroLine"), CONFIG.cutCakeGame.introLines, 500);
  renderCutCakeProblem();
}
function renderCutCakeProblem(){
  const total = CONFIG.cutCakeGame.problems.length;
  const p = CONFIG.cutCakeGame.problems[cutCakeIndex];
  $("#cutCakeCounter").textContent = `BÀI TOÁN ${cutCakeIndex+1} / ${total}`;
  $("#cutCakeQuestion").textContent = p.text;
  $("#cutCakeInput").value = "";
  $("#cutCakeInput").disabled = false;
  $("#cutCakeSubmit").disabled = false;
  $("#cutCakeFeedback").textContent = "";
  $("#cutCakeFeedback").classList.remove("ok");
  $("#cutCakeInput").focus();
}
$("#cutCakeSubmit").addEventListener('click', async ()=>{
  const p = CONFIG.cutCakeGame.problems[cutCakeIndex];
  const val = $("#cutCakeInput").value.trim();
  const fb = $("#cutCakeFeedback");
  if(val !== "" && Number(val) === p.answer){
    playCorrectSound();
    fb.textContent = `Chính xác! Một miếng dành cho ${p.recipient}.`;
    fb.classList.add("ok");
    $("#cutCakeInput").disabled = true; $("#cutCakeSubmit").disabled = true;
    const cakeEl = $("#cutCakeVisual");
    cutCakeIndex++;
    cakeEl.style.transform = `scale(${Math.max(0.6, 1 - cutCakeIndex*0.12)})`;
    spawnCakeSlice(cakeEl, p.recipient);
    await sleep(1000);
    if(cutCakeIndex < CONFIG.cutCakeGame.problems.length){
      renderCutCakeProblem();
    } else {
      await finishCutCakeGame();
    }
  } else {
    playWrongSound();
    fb.classList.remove("ok");
    fb.textContent = val === "" ? "Chị cần nhập kết quả trước đã." : "Chưa đúng, thử tính lại xem.";
  }
});
$("#cutCakeInput").addEventListener('keydown', e=>{ if(e.key==="Enter") $("#cutCakeSubmit").click(); });
function spawnCakeSlice(anchorEl, recipient){
  const slice = document.createElement('div');
  slice.className = "cake-slice-fly";
  slice.textContent = "🍰";
  slice.style.left = (20 + Math.random()*60) + "%";
  anchorEl.parentElement.appendChild(slice);
  setTimeout(()=>slice.remove(), 1200);
}
async function finishCutCakeGame(){
  playUnlockSound();
  await sleep(700);
  await typeLine($("#cutCakeIntroLine"), CONFIG.cutCakeGame.finishLine, 26);
  await sleep(1000);
  await showRewardImage(CONFIG.cutCakeGame.rewardImage, CONFIG.cutCakeGame.rewardCaption);
  showScreen("panda"); runPandaIntro();
}
/* ================= SCREEN 4 : PANDA GAME — BẮT PANDA ================= */
let pandaCatches = 0;
async function runPandaIntro(){
  pandaCatches = 0;
  $("#pandaCounter").textContent = `Đã bắt: 0 / ${CONFIG.pandaGame.catchesNeeded}`;
  await typeSequence($("#pandaIntroLine"), CONFIG.pandaGame.introLines, 500);
  spawnPanda();
}
function spawnPanda(){
  const area = $("#pandaArea");
  area.innerHTML = "";
  const panda = document.createElement('div');
  panda.className = 'panda';
  panda.textContent = '🐼';
  panda.style.animation = `pandaLoop ${CONFIG.pandaGame.loopSeconds}s linear infinite`;
  panda.addEventListener('click', onPandaClick);
  area.appendChild(panda);
}
async function onPandaClick(e){
  const panda = e.currentTarget;
  if(panda.dataset.caught === "true") return;
  pandaCatches++;
  playCorrectSound();
  $("#pandaCounter").textContent = `Đã bắt: ${pandaCatches} / ${CONFIG.pandaGame.catchesNeeded}`;
  panda.classList.add('caught-pulse');
  setTimeout(()=>panda.classList.remove('caught-pulse'), 250);
  if(pandaCatches >= CONFIG.pandaGame.catchesNeeded){
    panda.dataset.caught = "true";
    panda.style.animation = "none";
    playUnlockSound();
    fragments.panda = CONFIG.pandaGame.fragment;
    popFragment(CONFIG.pandaGame.fragment);
    await sleep(1000);
    await showRewardImage(CONFIG.pandaGame.rewardImage, CONFIG.pandaGame.rewardCaption);
    showScreen("bomb"); runBombIntro();
  } else {
    // chạy nhanh hơn một chút mỗi lần bắt được để tăng độ khó
    const newDuration = Math.max(1.3, CONFIG.pandaGame.loopSeconds - pandaCatches*0.5);
    panda.style.animation = "none";
    void panda.offsetWidth;
    panda.style.animation = `pandaLoop ${newDuration}s linear infinite`;
  }
}

/* ================= SCREEN 5 : BOMB — CHỌN DÂY + MẬT MÃ ================= */
// Đổi số thường (1-3999) sang số La Mã — dùng để hiện gợi ý mật mã một cách
// úp mở thay vì hiện thẳng con số ra màn hình.
function toRoman(num){
  const map = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],
    [50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let res = "";
  for(const [v,s] of map){ while(num>=v){ res+=s; num-=v; } }
  return res;
}
// Mật mã được ghép tự động từ ngày + tháng, mỗi phần đủ 2 chữ số.
function getBombPasscode(){
  const d = String(CONFIG.bombGame.passcodeDay).padStart(2,'0');
  const m = String(CONFIG.bombGame.passcodeMonth).padStart(2,'0');
  return d + m;
}
let bombTimerInterval = null;
let bombWireChosen = false;
let bombSolved = false;
let bombWireAttempts = 0;
let bombPasscodeAttempts = 0;
async function runBombIntro(){
  bombSolved = false;
  bombWireChosen = false;
  bombWireAttempts = 0;
  bombPasscodeAttempts = 0;
  $("#bombFeedback").textContent = "";
  $("#bombFeedback").classList.remove("ok");
  $("#bombHint").textContent = "";
  $("#bombQuestion").textContent = CONFIG.bombGame.question;
  $("#passcodeBox").style.display = "none";
  $("#passcodeFeedback").textContent = "";
  $("#passcodeFeedback").classList.remove("ok");
  $("#passcodeHintText").textContent = "";
  $("#bombPasscodeInput").value = "";
  $("#bombPasscodeInput").disabled = false;
  $("#bombPasscodeSubmit").disabled = false;
  $("#bombWrap").querySelector(".bomb-body").classList.remove("defused","shake");
  await typeSequence($("#bombIntroLine"), CONFIG.bombGame.introLines, 500);
  buildWires();
  startBombTimer();
}
function buildWires(){
  const row = $("#wireRow");
  row.innerHTML = "";
  CONFIG.bombGame.wires.forEach(wire=>{
    const btn = document.createElement('button');
    btn.className = "wire-btn";
    btn.style.background = wire.hex;
    btn.title = wire.id;
    btn.disabled = false;
    btn.addEventListener('click', ()=>handleWireClick(wire, btn));
    row.appendChild(btn);
  });
}
function startBombTimer(){
  clearInterval(bombTimerInterval);
  let t = CONFIG.bombGame.timerSeconds;
  const timerEl = $("#bombTimer");
  timerEl.textContent = fmt(t);
  timerEl.classList.remove('warn');
  bombTimerInterval = setInterval(()=>{
    if(bombSolved){ clearInterval(bombTimerInterval); return; }
    t--;
    if(t<=10) timerEl.classList.add('warn');
    if(t<=0){
      t = CONFIG.bombGame.timerSeconds;
      timerEl.classList.remove('warn');
      $("#bombFeedback").textContent = "Hết giờ! Đồng hồ được đặt lại — thử lần nữa nào.";
    }
    timerEl.textContent = fmt(t);
  },1000);
}
function handleWireClick(wire, btn){
  if(bombSolved || bombWireChosen) return;
  const bombBody = $("#bombWrap").querySelector(".bomb-body");
  if(wire.id === CONFIG.bombGame.correctWireId){
    bombWireChosen = true;
    playCorrectSound();
    $$(".wire-btn").forEach(b=>b.disabled = true);
    const fb = $("#bombFeedback");
    fb.classList.add("ok");
    fb.textContent = "Đúng dây rồi! Giờ nhập mật mã để hoàn tất.";
    const romanDay = toRoman(CONFIG.bombGame.passcodeDay);
    const romanMonth = toRoman(CONFIG.bombGame.passcodeMonth);
    $("#passcodeHint").innerHTML =
      `${CONFIG.bombGame.passcodeHintIntro}<br><span class="roman-clue">${romanDay} · ${romanMonth}</span>`;
    $("#passcodeBox").style.display = "block";
    $("#bombPasscodeInput").focus();
  } else {
    playWrongSound();
    bombWireAttempts++;
    bombBody.classList.remove("shake");
    void bombBody.offsetWidth;
    bombBody.classList.add("shake");
    const fb = $("#bombFeedback");
    fb.classList.remove("ok");
    fb.textContent = "Sai dây rồi, bình tĩnh, thử dây khác xem.";
    $("#bombHint").textContent = CONFIG.bombGame.wireHints[Math.min(bombWireAttempts-1, CONFIG.bombGame.wireHints.length-1)] || "";
  }
}
$("#bombPasscodeSubmit").addEventListener('click', async ()=>{
  if(bombSolved || !bombWireChosen) return;
  const val = $("#bombPasscodeInput").value.trim();
  const bombBody = $("#bombWrap").querySelector(".bomb-body");
  const fb = $("#passcodeFeedback");
  if(val && val === getBombPasscode()){
    bombSolved = true;
    clearInterval(bombTimerInterval);
    playUnlockSound();
    bombBody.classList.add('defused');
    fb.classList.add("ok");
    fb.textContent = "Ngòi nổ đã được tháo. Dữ dằn.";
    $("#bombPasscodeInput").disabled = true; $("#bombPasscodeSubmit").disabled = true;
    await sleep(1000);
    await showRewardImage(CONFIG.bombGame.rewardImage, CONFIG.bombGame.rewardCaption);
    showScreen("final"); runFinalIntro();
  } else {
    playWrongSound();
    bombPasscodeAttempts++;
    fb.classList.remove("ok");
    fb.textContent = "Sai mật mã rồi.";
    $("#passcodeHintText").textContent = CONFIG.bombGame.passcodeHints[Math.min(bombPasscodeAttempts-1, CONFIG.bombGame.passcodeHints.length-1)] || "";
  }
});
$("#bombPasscodeInput").addEventListener('keydown', e=>{ if(e.key==="Enter") $("#bombPasscodeSubmit").click(); });

/* ================= SCREEN 6 : FINAL LOCK ================= */
let finalTimer = null;
async function runFinalIntro(){
  const row = $("#fragRow");
  row.innerHTML = "";
  CONFIG.finalCodeOrder.forEach(key=>{
    const chip = document.createElement('div');
    chip.className = "frag-chip";
    chip.textContent = fragments[key] || "?";
    row.appendChild(chip);
  });
  await typeSequence($("#finalLine"), [
    `"Đây là khoá cuối cùng."`,
    `"4 mảnh mật mã chị vừa thu nhập từ mật mã, từ cuộc trò chuyện, từ tín hiệu, và từ chú panda nghịch ngợm,đã đủ để ghép thành mã số này."`
  ], 500);
  startFinalCountdown();
}
function startFinalCountdown(){
  let t = CONFIG.finalTimerSeconds;
  $("#finalClock").textContent = fmt(t);
  clearInterval(finalTimer);
  finalTimer = setInterval(()=>{
    t--;
    if(t<0){ t=0; clearInterval(finalTimer); }
    $("#finalClock").textContent = fmt(t);
  },1000);
}
$("#finalSubmit").addEventListener('click', ()=>{
  const code = CONFIG.finalCodeOrder.map(k=>fragments[k]).join("");
  const val = $("#finalInput").value.trim();
  const fb = $("#finalFeedback");
  if(val && val === code){
    playUnlockSound();
    fb.textContent = "ACCESS GRANTED"; fb.classList.add("ok");
    clearInterval(finalTimer);
    $("#finalInput").disabled = true; $("#finalSubmit").disabled = true;
    setTimeout(()=>{ showScreen("vault"); runVaultSequence(); }, 1200);
  } else {
    playWrongSound();
    fb.classList.remove("ok");
    fb.textContent = "Sai mã. Hãy nhìn lại các mảnh phía trên.";
  }
});
$("#finalInput").addEventListener('keydown', e=>{ if(e.key==="Enter") $("#finalSubmit").click(); });

/* ================= SCREEN 7 : VAULT / BOX ================= */
async function runVaultSequence(){
  $("#giftBox").addEventListener('click', openBoxOnce, {once:true});
}
let boxOpened = false;
function openBoxOnce(){
  if(boxOpened) return;
  boxOpened = true;
  $("#boxLid").classList.add("open");
  $("#vaultSub").textContent = "Sắp mở được rồi.";
  setTimeout(()=>{
    $(".screen[data-screen='vault']").style.transition = "opacity 1.2s ease";
    $(".screen[data-screen='vault']").style.opacity = 0;
    setTimeout(()=>{
      $(".screen[data-screen='vault']").style.opacity = "";
      $("#vaultTitle").style.display="none";
      $("#vaultSub").style.display="none";
      $("#giftBox").style.display="none";
      $("#voidText").style.display="block";
      setTimeout(()=>{ showScreen("universe"); runUniverse(); }, 2600);
    }, 1200);
  }, 1300);
}

/* ================= SCREEN 8 : STAR UNIVERSE ================= */
async function runUniverse(){
  const area = $("#starTapArea");
  area.innerHTML = "";
  let opened = 0;
  const total = CONFIG.starMemories.length;
  await typeSequence($("#universeLine"), [
    `"Bất ngờ lắm đúng không, hết quà rồi."`,
    `"Em đùa đó, vẫn chưa hết quà đâu"`
  ], 500);
  CONFIG.starMemories.forEach((mem)=>{
    const star = document.createElement('div');
    star.className = "star-tap";
    star.style.left = (8 + Math.random()*84) + "%";
    star.style.top = (8 + Math.random()*84) + "%";
    star.style.animationDelay = (Math.random()*2) + "s";
    star.addEventListener('click', ()=>{
      if(star.classList.contains('opened')) return;
      star.classList.add('opened');
      playCorrectSound();
      opened++;
      $("#starProgress").textContent = `${opened} / ${total} ngôi sao đã mở`;
      showStarMemory(mem);
      if(opened>=total){
        setTimeout(()=>{ showScreen("countdown"); runCountdown(); }, 1400);
      }
    });
    area.appendChild(star);
  });
}
function showStarMemory(mem){
  const pop = document.createElement('div');
  pop.style.position = "fixed";
  pop.style.left = "50%"; pop.style.top = "50%";
  pop.style.transform = "translate(-50%,-50%)";
  pop.style.background = "rgba(13,16,32,.92)";
  pop.style.border = "1px solid var(--line)";
  pop.style.padding = "20px 26px";
  pop.style.borderRadius = "6px";
  pop.style.zIndex = 25;
  pop.style.fontFamily = "var(--font-body)";
  pop.style.fontSize = "16px";
  pop.style.maxWidth = "320px";
  pop.style.textAlign = "center";
  pop.style.boxShadow = "0 0 40px rgba(126,168,255,.2)";
  pop.textContent = mem.caption;
  document.body.appendChild(pop);
  setTimeout(()=>{ pop.style.transition="opacity .6s ease"; pop.style.opacity=0; setTimeout(()=>pop.remove(),600); }, 1800);
}

/* ================= SCREEN 9 : COUNTDOWN ================= */
async function runCountdown(){
  const big = $("#countdownBig");
  for(let i=5;i>=0;i--){
    big.textContent = i.toString().padStart(2,'0');
    big.style.transform = "scale(1.15)";
    setTimeout(()=>big.style.transform="scale(1)", 150);
    await sleep(700);
  }
  launchFireworks();
  showScreen("burst");
  runBurst();
}

/* ================= SCREEN 10 : BURST ================= */
async function runBurst(){
  $("#burstName").textContent = CONFIG.recipientName;
  await typeSequence($("#burstLine"), [
    `"Chúc mừng sinh nhật."`,
    `"Chúc chị một sinh nhật thật nhiều niềm vui, luôn sinh đẹp, an yên và gặt hái được nhiều điều tuyệt vời trong tuổi mới"`
  ], 600);
  const btn = $("#toGallery");
  btn.style.opacity = 1; btn.style.pointerEvents = "auto";
}
$("#toGallery").addEventListener('click', ()=>{ showScreen("gallery"); buildGallery(); });

/* ================= SCREEN 11 : GALLERY ================= */
function buildGallery(){
  const grid = $("#gallery-grid");
  grid.innerHTML = "";
  CONFIG.gallery.forEach((item)=>{
    const card = document.createElement('div');
    card.className = "polaroid";
    card.style.setProperty('--r', (Math.random()*8-4)+"deg");
    const media = item.url
      ? `<img src="${item.url}" alt="${item.date}">`
      : `<div class="ph-ph"></div>`;
    card.innerHTML = `${media}<div class="ph-cap">${item.date}</div>`;
    card.addEventListener('click', ()=>openLightbox(item));
    grid.appendChild(card);
  });
}
function openLightbox(item){
  $("#lightboxMedia").innerHTML = item.url
    ? `<img src="${item.url}" alt="${item.date}">`
    : `<div class="lb-ph" style="width:min(80vw,420px);height:min(55vh,320px);background:linear-gradient(135deg,#333,#111);border-radius:4px;"></div>`;
  $("#lightboxCap").textContent = item.caption;
  $("#lightboxDate").textContent = item.date;
  $("#lightbox").classList.add("show");
}
$("#closeLightbox").addEventListener('click', ()=>$("#lightbox").classList.remove("show"));
$("#toEnding").addEventListener('click', ()=>{ showScreen("ending"); runEnding(); });

/* ================= SCREEN 12 : ENDING ================= */
async function runEnding(){
  launchBalloons();
  await typeSequence($("#endingLine"), [
    `"Trò chơi kết thúc rồi."`,
    `"Nhưng câu chuyện thì chưa."`,
    `"Tất cả chỉ vừa bắt đầu thôi."`
  ], 700);
  const wrap = $("#finalPhotoWrap");
  wrap.innerHTML = CONFIG.finalPhotoUrl
    ? `<img src="${CONFIG.finalPhotoUrl}" alt="final">`
    : `<div class="fp-ph" style="width:100%;height:100%;background:linear-gradient(135deg,#2a2440,#111);"></div>`;
  const title = $("#endingTitle");
  title.innerHTML = `HAPPY BIRTHDAY,<br>${CONFIG.recipientName} ❤️`;
  setTimeout(()=>{ title.style.opacity = 1; }, 300);
}

/* ================================================================
   BÓNG BAY CHÚC MỪNG — chạy ở màn kết thúc
   ================================================================ */
function launchBalloons(){
  if(!CONFIG.balloons || !CONFIG.balloons.enabled) return;
  const layer = $("#balloon-layer");
  const count = CONFIG.balloons.count || 10;
  const colors = CONFIG.balloons.colors && CONFIG.balloons.colors.length
    ? CONFIG.balloons.colors
    : ["#c9a24b","#ff7a92","#7ea8ff"];
  for(let i=0;i<count;i++){
    setTimeout(()=>{
      const b = document.createElement('div');
      b.className = "balloon";
      const color = colors[Math.floor(Math.random()*colors.length)];
      b.style.background = color;
      b.style.left = (4 + Math.random()*88) + "%";
      b.style.setProperty('--drift', (Math.random()*60-30) + "px");
      const duration = 7 + Math.random()*4;
      b.style.animationDuration = duration + "s";
      layer.appendChild(b);
      setTimeout(()=>b.remove(), duration*1000 + 300);
    }, i*260);
  }
}

/* ================================================================
   BACKGROUND STARFIELD (ambient, chạy suốt toàn bộ trải nghiệm)
   ================================================================ */
const starsCanvas = $("#stars-canvas");
const sctx = starsCanvas.getContext('2d');
let stars = [];
function resizeCanvas(c){ c.width = window.innerWidth; c.height = window.innerHeight; }
function initStars(){
  resizeCanvas(starsCanvas);
  stars = Array.from({length: 160}, ()=>({
    x: Math.random()*starsCanvas.width,
    y: Math.random()*starsCanvas.height,
    r: Math.random()*1.3+0.2,
    tw: Math.random()*Math.PI*2,
    speed: Math.random()*0.015+0.005
  }));
}
function drawStars(){
  sctx.clearRect(0,0,starsCanvas.width, starsCanvas.height);
  sctx.fillStyle = "#05060c";
  sctx.fillRect(0,0,starsCanvas.width, starsCanvas.height);
  stars.forEach(s=>{
    s.tw += s.speed;
    const alpha = 0.35 + Math.sin(s.tw)*0.35;
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    sctx.fillStyle = `rgba(232,233,243,${Math.max(0,alpha)})`;
    sctx.fill();
  });
  requestAnimationFrame(drawStars);
}
initStars(); drawStars();
window.addEventListener('resize', ()=>{ initStars(); });

/* ================================================================
   FIREWORKS (chạy khi vào màn BURST)
   ================================================================ */
const fxCanvas = $("#fx-canvas");
const fctx = fxCanvas.getContext('2d');
let particles = [];
function launchFireworks(){
  resizeCanvas(fxCanvas);
  let bursts = 0;
  const interval = setInterval(()=>{
    spawnBurst(Math.random()*fxCanvas.width, Math.random()*fxCanvas.height*0.6+40);
    bursts++;
    if(bursts>7) clearInterval(interval);
  }, 380);
  requestAnimationFrame(animateFireworks);
}
function spawnBurst(x,y){
  const colors = ["#c9a24b","#ff7a92","#7ea8ff","#ffffff"];
  const color = colors[Math.floor(Math.random()*colors.length)];
  for(let i=0;i<44;i++){
    const angle = (Math.PI*2*i)/44;
    const speed = Math.random()*3+1.5;
    particles.push({
      x,y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      life: 1,
      color
    });
  }
}
function animateFireworks(){
  fctx.clearRect(0,0,fxCanvas.width, fxCanvas.height);
  particles.forEach(p=>{
    p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= 0.012;
    fctx.globalAlpha = Math.max(p.life,0);
    fctx.beginPath();
    fctx.arc(p.x,p.y,2,0,Math.PI*2);
    fctx.fillStyle = p.color;
    fctx.fill();
  });
  fctx.globalAlpha = 1;
  particles = particles.filter(p=>p.life>0);
  if(particles.length>0 || document.querySelector('.screen[data-screen="burst"]')?.classList.contains('active')){
    requestAnimationFrame(animateFireworks);
  }
}
window.addEventListener('resize', ()=>{ resizeCanvas(fxCanvas); });

/* ================================================================
   KHỞI CHẠY
   ================================================================ */
initApp();