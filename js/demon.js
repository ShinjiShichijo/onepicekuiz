'use strict'

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const overlay = document.querySelector('.overlay');

  const quizSet = shuffle([
    {q: '扉絵「エースの黒ひげ大捜査線」に登場したミルク売りの少女の名前は？', c: ['モーダ', 'リリカ', 'ティティ', 'スイートピー']},
    {q: 'ファンク兄弟の出身国は？', c: ['モガロ王国', 'スタンディング王国', 'ブルジョア王国', 'プロデンス王国']},
    {q: '懸賞金ランキングがアルビオンとリップ・ドウテイの間なのはだれ？', c: ['ゴッティ', 'ジャイロ', 'スレイマン', 'ガンビア']},
    {q: 'コビーに覇気のことを教えた医者はどれ？', c: ['フィシュボーネン', 'ナコー', 'ゲルズ', 'ポツーン']},
    {q: 'サイ、ラフィット、アブサロム、ダズ・ボーネスに共通するのはどれ？', c: ['出身の海', '年齢が30代', '身長が2m代', '血液型']},
    {q: '次のうち、"来い...!!!俺たちが相手をしてやる!!!"とシャンクスが言った時のシーンで最も右側にいるのはだれ？', c: ['ホンゴウ', 'ライムジュース', 'ボンク・パンチ', 'ビルディング・スネーク']},
    {q: '次のうち、魚人に登場していない魚はどれ？', c: ['カレイ', 'サケ', 'カジキ', 'カサゴ']},
    {q: '見た目が判明していない悪魔の実はどれ？', c: ['ヒエヒエ', 'スナスナ', 'イトイト', 'カゲカゲ']},
    {q: '次のうち、ワンピースに登場した武器の名前に使われてない漢字はどれ？', c: ['虎', '梅', '千', '金']},
    {q: 'トットランドのエッセンス大臣はだれ？', c: ['サンマルク', 'モービル', 'シブースト', 'コンポ']},
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
    question.textContent = quizSet[currentNum].q;

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