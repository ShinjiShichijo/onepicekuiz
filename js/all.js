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
    {q: 'ルフィが食べた悪魔の実は？', c: ['ゴムゴムの実', 'バラバラの実', 'モクモクの実', 'ヒエヒエの実']},
    {q: 'ゾロが初めから持っていた刀は？', c: ['和道一文字', 'エース', '鬼哭', 'むら雲切']},
    {q: 'ウソップのいたシロップ村を襲った海賊は？', c: ['クロ', 'アーロン', 'エネル', 'クロコダイル']},
    {q: 'ローグタウンで出てきた海軍本部大佐は？', c: ['スモーカー', 'ネズミ', 'モーガン', 'コビー']},
    {q: 'ドラム王国の国王は？', c: ['ワポル', 'チェス', 'クレハ', 'チョッパー']},
    {q: 'バロックワークス社長で元七武海の人物は？', c: ['クロコダイル', 'モリア', 'ミホーク', 'ハンコック']},
    {q: 'ゴロゴロの実の能力者は？', c: ['エネル', '青雉', 'ルッチ', '黒ひげ']},
    {q: 'ウォーターセブンで麦わらの一味に入ったのは？', c: ['フランキー', 'ロビン', 'ブルック', 'ナミ']},
    {q: 'エースの所属していた海賊団の船長は？', c: ['白ひげ', 'クリーク', 'バギー', 'キッド']},
    {q: '海底１万Mにある島は？', c: ['魚人島', 'ウォーターセブン', 'スカイピア', 'リトルガーデン']},
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