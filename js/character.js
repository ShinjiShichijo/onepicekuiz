'use strict'

{
  const question = document.getElementById('question-C');
  const choices = document.getElementById('choices-C');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const overlay = document.querySelector('.overlay');

  const quizSet = shuffle([
    {q: ['悪魔の実の能力者','東の海出身','海賊','初出は一巻である'], c: ['ルフィ', 'バルトロメオ', 'サボ', 'ベンサム']},
    {q: ['四皇','懸賞金40億以上','悪魔の実の能力者','ゾオン系幻獣種'], c: ['カイドウ', 'シャンクス', 'ティーチ', 'リンリン']},
    {q: ['海軍将校','異名に動物が入る','悪魔の実の能力者','グランドライン出身'], c: ['イッショウ', 'ボルサリーノ', 'つる', 'スモーカー']},
    {q: ['懸賞金4億以上','悪魔の実の能力者','古代種の悪魔の実','兄弟がいる'], c: ['うるティ', 'ベロ・ベティ', 'ブラックマリマ', 'カポネ・ベッジ']},
    {q: ['主な武器は刀','刀の名前が判明している','海賊である','所有武器の位列が業物'], c: ['ゾロ', 'Tボーン', 'ビスタ', 'ミホーク']},
    {q: ['元ロックス海賊団','名前が判明していない','現在は死亡している','スリラーバークで登場している'], c: ['キャプテン・ジョン', '王直', '白ひげ', 'ビッグマム']},
    {q: ['イーストブルー編に登場','懸賞金がついている','	クリーク海賊団に所属','異名:鬼神'], c: ['ギン', 'はっちゃん', 'パール', 'カバジ']},
    {q: ['元オフィサーエージェント','懸賞金1000万以上','NEWスパイダーズカフェ勤務','アラバスタで登場'], c: ['ザラ', 'ロビン', 'ギャルディーノ', 'ベーブ']},
    {q: ['四神官の一人','麦わらの一味にやられる','空島後未登場','生存率10%未満'], c: ['オーム', 'サトリ', 'ゲダツ', 'シュラ']},
    {q: ['ミンク族','作中でスーロン化した','鬼ヶ島に登場','ペロスペローと戦闘'], c: ['ネコマムシ', 'イヌアラシ', 'モルガンズ', 'ミヤギ']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for( let i = arr.length -1; i > 0; i-- ) {
      const j = Math.floor(Math.random() * (i + 1));
    [arr[j],arr[i]] = [arr[i],arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      document.getElementById('correct-audio').currentTime = 0;
      document.getElementById('correct-audio').play();
      li.classList.add('correct');
      score++;
    } else {
      document.getElementById('wrong-audio').currentTime = 0;
      document.getElementById('wrong-audio').play();
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
 
    while(question.firstChild) {
      question.removeChild(question.firstChild);
    }

    const quizSetQ = quizSet[currentNum].q;
    quizSetQ.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      question.appendChild(li);
      question.classList.add('current');
    });

    for (let i = 0; i < question.childElementCount; i++) {
      question.children[i].style.opacity = "0";

      setTimeout(function() {
        question.children[i].style.opacity = "1";
      }, i * 2000);
    }
  
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === 9) {
      btn.textContent = '成績';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    question.classList.remove('current');
  
    if (currentNum === 9) {
      scoreLabel.textContent = `成績: ${score} / 10`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });

  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
  })

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
  })
}