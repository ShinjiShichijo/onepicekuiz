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
    {q: 'ルフィがアーロンを倒した技は？', c: ['ゴムゴムの斧', 'ゴムゴムの暴風雨', 'ゴムゴムの火拳銃', 'ゴムゴムの鐘']},
    {q: 'ペローナの食べた悪魔の実は？', c: ['ホロホロの実', 'トゲトゲの実', 'スケスケの実', 'アワアワの実']},
    {q: 'cp9の長官の名前は？(2年前)', c: ['スパンダム', 'スパンダイン', 'ルッチ', 'カク']},
    {q: '海軍中将ガープの異名で正しいのは？', c: ['拳骨', '白猟', '黒檻', '追撃']},
    {q: '白ひげ海賊団の船は？', c: ['モビーディック号', 'サウザンドサニー号', 'レッドフォース号', 'オーロジャクソン号']},
    {q: 'アーロンの妹は？', c: ['シャーリー', 'ココロ', 'ケイミー', 'イチカ']},
    {q: 'ローの過去篇でのコラソンの海軍での階級は？', c: ['中佐', '大佐', '少将', '中将']},
    {q: '次のうち最上大業物は？', c: ['むら雲切', '和道一文字', '秋水', '閻魔']},
    {q: '海軍大将藤虎の本名は？', c: ['イッショウ', 'クザン', 'サカズキ', 'ボルサリーノ']},
    {q: '次のうちスイート3将星でないのは？', c: ['ペロスペロー', 'カタクリ', 'スムージー', 'クラッカー']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  // 多い問題から１０問を選びたい
  
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