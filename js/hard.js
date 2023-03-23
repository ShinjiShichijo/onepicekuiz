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
    {q: 'フーシャ村の村長の名前は？', c: ['ウープ・スラップ', 'マキノ', 'ゲンゾウ', 'プードル']},
    {q: 'Mr2 ボンクレーの本名は？', c: ['ベンサム', 'ジェム', 'ギャルディーノ', 'ダズ・ボーネス']},
    {q: '白ひげ海賊団3番隊隊長ジョズの悪魔の実は？', c: ['キラキラの実', 'イシイシの実', 'ジキジキの実', 'トントンの実']},
    {q: '次のうち火拳のエースと同じ懸賞金のキャラは？', c: ['リトル・オーズJr', 'スクアード', 'サボ', 'イゾウ']},
    {q: '次のうち麦わらの一味がくまに飛ばされた場所でないのはどれ？', c: ['ルスカイナ', 'シッケアール王国', 'トリノ王国', 'テーナ・ゲーナ王国']},
    {q: '次のうち一番身長が一番高いのはだれ？', c: ['カタクリ', 'ドフラミンゴ', 'マゼラン', 'エリザベローⅡ世']},
    {q: '海軍G1支部の基地長はだれ(元を含む)？', c: ['モモンガ', 'ヴェルゴ', 'ガープ', 'おつる']},
    {q: '次のうちビッグマムの子供で一番若いのはどれ？', c: ['プラリネ', 'ガレット', 'スナック', 'スムージー']},
    {q: '次のうち海賊船でないのはどれ？', c: ['ヴィントグランマ号', 'ピースオブスパディル号', 'ビッグトップ号', 'ヴィクトリアパンク号']},
    {q: '次のうち、ゾロの技に使われてない漢字はどれ？', c: ['鰐', '豹', '蟹', '狸']},
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