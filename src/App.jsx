import { useState } from "react";

const questions = [
  {
    id: 1,
    text: "子どもが「勉強したくない」と言ったとき、どんな反応をしますか？",
    options: [
      { label: "「じゃあ、ゲームみたいにやってみよう！」と遊びに変える", scores: { A: 3, B: 1, C: 0, D: 0 } },
      { label: "「なんでやりたくないの？」と気持ちを聞く", scores: { A: 0, B: 3, C: 0, D: 1 } },
      { label: "「やらないと困るよ」と言ってしまう", scores: { A: 0, B: 0, C: 3, D: 1 } },
      { label: "「じゃあ今日は何をしたい？」と子どもに選ばせる", scores: { A: 1, B: 1, C: 0, D: 3 } },
    ],
  },
  {
    id: 2,
    text: "子どもが夢中になっていることは？",
    options: [
      { label: "体を動かすこと、スポーツ、外遊び", scores: { A: 3, B: 0, C: 1, D: 0 } },
      { label: "お友達と一緒に遊ぶこと、おしゃべり", scores: { A: 0, B: 3, C: 0, D: 0 } },
      { label: "ゲーム、マンガ、自分だけの世界", scores: { A: 0, B: 0, C: 3, D: 1 } },
      { label: "工作、実験、じっくり何かを作ること", scores: { A: 1, B: 0, C: 0, D: 3 } },
    ],
  },
  {
    id: 3,
    text: "子どもに新しいことを教えるとき、どんな入れ方がうまくいきますか？",
    options: [
      { label: "「やってみて！」とまず体験させる", scores: { A: 3, B: 0, C: 1, D: 0 } },
      { label: "「一緒にやろう」と隣でサポートする", scores: { A: 0, B: 3, C: 0, D: 1 } },
      { label: "子どもが自分で「やりたい」と言うまで待つ", scores: { A: 0, B: 1, C: 3, D: 1 } },
      { label: "「なんでそうなるか」を説明してから始める", scores: { A: 0, B: 0, C: 0, D: 3 } },
    ],
  },
  {
    id: 4,
    text: "子どもがほめられたとき、どんな様子ですか？",
    options: [
      { label: "うれしくてテンションが上がり、次もやる気になる", scores: { A: 3, B: 1, C: 0, D: 0 } },
      { label: "照れながらも笑顔になり、もっとやろうとする", scores: { A: 1, B: 3, C: 0, D: 0 } },
      { label: "素直に受け取れず、照れ隠しに「別に」と言う", scores: { A: 0, B: 0, C: 3, D: 0 } },
      { label: "「本当に？」と確かめてから、じっくり自信にする", scores: { A: 0, B: 0, C: 1, D: 3 } },
    ],
  },
  {
    id: 5,
    text: "おうち学習で一番困っていることは？",
    options: [
      { label: "集中が続かない、すぐ飽きてしまう", scores: { A: 3, B: 0, C: 0, D: 0 } },
      { label: "やる気が周りの雰囲気に左右される", scores: { A: 0, B: 3, C: 0, D: 0 } },
      { label: "機嫌次第でやったりやらなかったり", scores: { A: 0, B: 0, C: 3, D: 0 } },
      { label: "完璧じゃないとやらない、最初の一歩が重い", scores: { A: 0, B: 0, C: 0, D: 3 } },
    ],
  },
];

const types = {
  A: {
    emoji: "🚀",
    name: "冒険家タイプ",
    subtitle: "体で学ぶ、動いて伸びる",
    color: "#F97316",
    light: "#FFF7ED",
    mid: "#FED7AA",
    description: "好奇心旺盛でエネルギーにあふれた子。じっと座って勉強するのが苦手なのは、体と脳が一緒に動きたいサインです。",
    insight: "「飽きっぽい」のではなく、インプットの速度が速いだけ。次の刺激を求めているのです。",
    voiceOk: [
      { scene: "取り組み始め", text: "「タイムアタックでやってみよう！何分でできる？」" },
      { scene: "飽きてきたとき", text: "「じゃあ、場所を変えてやってみようか」" },
      { scene: "できたとき", text: "「すごい！体で覚えてるんだね、最強だよ」" },
    ],
    voiceNg: [
      "「ちゃんと座ってやりなさい」",
      "「なんで集中できないの」",
    ],
    lectureHook: "この子には「学びを遊びに変換する技術」がそのまま使えます。動作・リズム・競争要素を入れるだけで激変します。",
  },
  B: {
    emoji: "🌸",
    name: "つながりタイプ",
    subtitle: "関係性の中で安心して伸びる",
    color: "#EC4899",
    light: "#FDF2F8",
    mid: "#FBCFE8",
    description: "人との関わりを大切にする、やさしくて空気が読める子。「一緒にやろう」の一言で驚くほどやる気が変わります。",
    insight: "「やる気がない」のではなく、「安心できる関係性」があるかどうかが、学習スイッチのカギです。",
    voiceOk: [
      { scene: "勉強の誘い方", text: "「今日は一緒にやろうか、お母さんも隣にいるよ」" },
      { scene: "うまくいかないとき", text: "「どこが難しかった？教えて、一緒に考えよう」" },
      { scene: "できたとき", text: "「一緒にやれてよかった！○○のおかげで楽しかったよ」" },
    ],
    voiceNg: [
      "「自分でやりなさい」",
      "「なんでできないの、さっき教えたじゃない」",
    ],
    lectureHook: "お母さんが「戦略的に隣にいる」だけで変わる。ひとりでやらせることが正解ではない理由、講座で詳しくお伝えしています。",
  },
  C: {
    emoji: "⚡",
    name: "こだわりタイプ",
    subtitle: "自分ルールで動く、感情が燃料",
    color: "#8B5CF6",
    light: "#F5F3FF",
    mid: "#DDD6FE",
    description: "感情が豊かで、強い意志を持つ個性派。「やる気スイッチ」が入ったときのパワーは本物。そのスイッチの場所を知ることが大切です。",
    insight: "「言うことを聞かない」のではなく、自分の世界観を持っているだけ。それを尊重した声かけで、驚くほど動きます。",
    voiceOk: [
      { scene: "取り組まないとき", text: "「○○が決めていいよ、どこからやりたい？」" },
      { scene: "感情が爆発したとき", text: "「気持ちが大きくなったね。少し落ち着いたら話を聞くよ」" },
      { scene: "できたとき", text: "「自分でやり方を決めてやり遂げたね、それってすごいことだよ」" },
    ],
    voiceNg: [
      "「なんでそんなに怒るの」",
      "「そのやり方はダメ、こうしなさい」",
    ],
    lectureHook: "この子のエネルギーは、正しく活かせば最大の武器になります。「勉強を遊びに変える」アプローチが一番響くタイプです。",
  },
  D: {
    emoji: "🔭",
    name: "研究者タイプ",
    subtitle: "深く理解してから動く慎重派",
    color: "#0EA5E9",
    light: "#F0F9FF",
    mid: "#BAE6FD",
    description: "観察力・思考力が高く、なんでも深く考えてから動く子。「なんで？」が多いのは知的好奇心のあらわれです。",
    insight: "「取り掛かりが遅い・慎重すぎる」のではなく、丁寧に処理しているだけ。急かすと逆効果になります。",
    voiceOk: [
      { scene: "なかなか始めないとき", text: "「準備が整ったら教えて、急がなくていいよ」" },
      { scene: "「なんで？」と聞いてきたとき", text: "「いい質問！一緒に調べてみよう」" },
      { scene: "できたとき", text: "「ちゃんと考えてからやったんだね、その丁寧さが強みだよ」" },
    ],
    voiceNg: [
      "「ぐずぐずしないで早くして」",
      "「考えすぎ、まずやってみて」",
    ],
    lectureHook: "この子には「なぜそうなるか」から入る学びが最も効きます。遊びへの変換も「仕組みを教える」ところから始めると面白いように動き出します。",
  },
};

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [fadeKey, setFadeKey] = useState(0);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    if (current + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
      setFadeKey(k => k + 1);
    } else {
      const totals = { A: 0, B: 0, C: 0, D: 0 };
      newAnswers.forEach(ans => {
        Object.entries(ans.scores).forEach(([k, v]) => { totals[k] += v; });
      });
      const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
      setPhase("result");
    }
  };

  const reset = () => {
    setPhase("intro");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setFadeKey(0);
  };

  const t = result ? types[result] : null;

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700;900&family=Shippori+Mincho:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .opt-btn:hover { transform: translateX(4px); }
        .opt-btn { transition: all 0.18s ease; }
      `}</style>

      {phase === "intro" && (
        <div style={s.intro} className="fade-up">
          <div style={s.introBadge}>おうち学習 × 子どもタイプ診断</div>
          <div style={s.introEmoji}>🏠✏️</div>
          <h1 style={s.introTitle}>
            あなたのお子さんは<br />
            <span style={s.introHighlight}>どの学びタイプ？</span>
          </h1>
          <p style={s.introDesc}>
            「勉強しなさい」が通じない理由は、<br />
            子どものタイプを知らないから。<br /><br />
            5つの質問で、お子さんに合った<br />
            <strong>声かけ＆学びの入れ方</strong>がわかります。
          </p>
          <div style={s.introNote}>
            📖 所要時間：約2分
          </div>
          <button style={s.startBtn} onClick={() => setPhase("quiz")}>
            診断スタート →
          </button>
          <p style={s.introSub}>親勉インストラクター<br />つちえやすこ</p>
        </div>
      )}

      {phase === "quiz" && (
        <div style={s.card} key={fadeKey} className="fade-up">
          {/* Progress */}
          <div style={s.progressWrap}>
            <div style={s.progressMeta}>
              <span style={s.progressLabel}>Question {current + 1} / {questions.length}</span>
              <span style={s.progressPct}>{Math.round(((current) / questions.length) * 100)}%</span>
            </div>
            <div style={s.bar}>
              <div style={{ ...s.barFill, width: `${((current) / questions.length) * 100}%` }} />
            </div>
          </div>

          {/* Question */}
          <p style={s.question}>{questions[current].text}</p>

          {/* Options */}
          <div style={s.options}>
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                className="opt-btn"
                onClick={() => setSelected(opt)}
                style={{
                  ...s.optBtn,
                  ...(selected === opt ? s.optSelected : {}),
                }}
              >
                <span style={{
                  ...s.optAlpha,
                  ...(selected === opt ? s.optAlphaSelected : {}),
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={s.optText}>{opt.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selected}
            style={{ ...s.nextBtn, opacity: selected ? 1 : 0.35 }}
          >
            {current + 1 === questions.length ? "結果を見る →" : "次へ →"}
          </button>
        </div>
      )}

      {phase === "result" && t && (
        <div style={s.resultWrap} className="fade-up">
          {/* Hero */}
          <div style={{ ...s.resultHero, background: t.light, borderColor: t.mid }}>
            <div style={s.resultLabel}>あなたのお子さんは…</div>
            <div style={{ fontSize: 64, animation: "float 3s ease-in-out infinite" }}>{t.emoji}</div>
            <h2 style={{ ...s.resultName, color: t.color }}>{t.name}</h2>
            <p style={s.resultSubtitle}>{t.subtitle}</p>
            <p style={s.resultDesc}>{t.description}</p>
          </div>

          {/* Insight */}
          <div style={{ ...s.insightBox, borderColor: t.color }}>
            <span style={{ ...s.insightIcon, background: t.color }}>💡</span>
            <p style={s.insightText}>{t.insight}</p>
          </div>

          {/* Voice OK */}
          <div style={s.section}>
            <h3 style={{ ...s.sectionTitle, color: t.color }}>✅ こう声をかけると変わる</h3>
            {t.voiceOk.map((v, i) => (
              <div key={i} style={s.voiceCard}>
                <div style={{ ...s.voiceScene, background: t.light, color: t.color }}>{v.scene}</div>
                <p style={s.voiceText}>{v.text}</p>
              </div>
            ))}
          </div>

          {/* Voice NG */}
          <div style={s.section}>
            <h3 style={s.ngTitle}>❌ これは逆効果になりやすい</h3>
            {t.voiceNg.map((v, i) => (
              <div key={i} style={s.ngCard}>
                <span style={s.ngMark}>×</span>
                <span style={s.ngText}>{v}</span>
              </div>
            ))}
          </div>

          {/* Lecture hook */}
          <div style={{ ...s.lectureBox, background: t.color }}>
            <p style={s.lectureLabel}>📚 講師からのひとこと</p>
            <p style={s.lectureText}>{t.lectureHook}</p>
            <div style={s.lectureDivider} />
            <p style={s.lectureCta}>
              「勉強を遊びに変換する」おうち学習の戦略を<br />
              <strong>無料体験会で詳しくお伝えしています。</strong>
            </p>
            <button style={s.ctaBtn} onClick={() => window.open("https://system.faymermail.com/forms/21124", "_blank")}>
              無料体験会に申し込む →
            </button>
          </div>

          <button onClick={reset} style={s.retryBtn}>
            もう一度診断する
          </button>
        </div>
      )}
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh",
    background: "#FAFAF7",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: "'Zen Maru Gothic', 'Hiragino Kaku Gothic ProN', sans-serif",
    padding: "32px 16px 60px",
  },

  // Intro
  intro: {
    maxWidth: 480,
    width: "100%",
    textAlign: "center",
    paddingTop: 16,
  },
  introBadge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: 99,
    background: "#F0FDF4",
    border: "1px solid #BBF7D0",
    color: "#15803D",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 20,
    letterSpacing: "0.04em",
  },
  introEmoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 900,
    color: "#1C1C1C",
    lineHeight: 1.5,
    marginBottom: 20,
    fontFamily: "'Shippori Mincho', serif",
  },
  introHighlight: {
    color: "#F97316",
    borderBottom: "3px solid #FED7AA",
  },
  introDesc: {
    fontSize: 15,
    color: "#555",
    lineHeight: 1.9,
    marginBottom: 20,
  },
  introNote: {
    fontSize: 13,
    color: "#888",
    marginBottom: 28,
  },
  startBtn: {
    display: "block",
    width: "100%",
    padding: "18px",
    borderRadius: 16,
    border: "none",
    background: "linear-gradient(135deg, #F97316 0%, #EC4899 100%)",
    color: "#fff",
    fontSize: 18,
    fontWeight: 900,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 24px rgba(249,115,22,0.35)",
    marginBottom: 16,
    letterSpacing: "0.04em",
  },
  introSub: {
    fontSize: 12,
    color: "#AAA",
    lineHeight: 1.7,
  },

  // Quiz
  card: {
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: 480,
    padding: "28px 24px 24px",
  },
  progressWrap: {
    marginBottom: 28,
  },
  progressMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: 700,
    letterSpacing: "0.06em",
  },
  progressPct: {
    fontSize: 12,
    color: "#F97316",
    fontWeight: 700,
  },
  bar: {
    height: 5,
    background: "#F0F0EE",
    borderRadius: 99,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg, #F97316, #EC4899)",
    borderRadius: 99,
    transition: "width 0.4s ease",
  },
  question: {
    fontSize: 17,
    fontWeight: 700,
    color: "#1C1C1C",
    lineHeight: 1.7,
    marginBottom: 20,
    fontFamily: "'Shippori Mincho', serif",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  optBtn: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 16px",
    borderRadius: 14,
    border: "2px solid #EBEBEB",
    background: "#FAFAF7",
    fontSize: 14,
    color: "#333",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    lineHeight: 1.6,
  },
  optSelected: {
    border: "2px solid #F97316",
    background: "#FFF7ED",
  },
  optAlpha: {
    minWidth: 26,
    height: 26,
    borderRadius: 8,
    background: "#EBEBEB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 900,
    color: "#999",
    flexShrink: 0,
    marginTop: 1,
  },
  optAlphaSelected: {
    background: "#F97316",
    color: "#fff",
  },
  optText: {
    flex: 1,
  },
  nextBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #F97316, #EC4899)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "opacity 0.2s",
    letterSpacing: "0.04em",
  },

  // Result
  resultWrap: {
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  resultHero: {
    borderRadius: 24,
    border: "2px solid",
    padding: "32px 24px",
    textAlign: "center",
  },
  resultLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: 700,
    marginBottom: 12,
    letterSpacing: "0.06em",
  },
  resultName: {
    fontSize: 26,
    fontWeight: 900,
    margin: "8px 0 4px",
    fontFamily: "'Shippori Mincho', serif",
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: 700,
    marginBottom: 14,
    letterSpacing: "0.04em",
  },
  resultDesc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.85,
  },
  insightBox: {
    background: "#fff",
    borderRadius: 16,
    border: "2px solid",
    padding: "16px 18px",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  insightIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    flexShrink: 0,
  },
  insightText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 1.8,
    fontWeight: 600,
  },
  section: {
    background: "#fff",
    borderRadius: 20,
    padding: "20px 20px 16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 900,
    marginBottom: 14,
  },
  voiceCard: {
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #F0F0EE",
    marginBottom: 10,
  },
  voiceScene: {
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 700,
  },
  voiceText: {
    padding: "10px 14px",
    fontSize: 14,
    color: "#222",
    lineHeight: 1.7,
    fontWeight: 700,
    background: "#fff",
  },
  ngTitle: {
    fontSize: 15,
    fontWeight: 900,
    color: "#D0021B",
    marginBottom: 12,
  },
  ngCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    background: "#FFF5F5",
    borderRadius: 10,
    marginBottom: 8,
  },
  ngMark: {
    color: "#D0021B",
    fontWeight: 900,
    fontSize: 18,
    flexShrink: 0,
  },
  ngText: {
    fontSize: 14,
    color: "#888",
    textDecoration: "line-through",
  },
  lectureBox: {
    borderRadius: 20,
    padding: "24px 22px",
    color: "#fff",
  },
  lectureLabel: {
    fontSize: 13,
    fontWeight: 700,
    opacity: 0.85,
    marginBottom: 10,
    letterSpacing: "0.04em",
  },
  lectureText: {
    fontSize: 14,
    lineHeight: 1.85,
    marginBottom: 16,
  },
  lectureDivider: {
    height: 1,
    background: "rgba(255,255,255,0.25)",
    marginBottom: 16,
  },
  lectureCta: {
    fontSize: 14,
    lineHeight: 1.8,
    marginBottom: 16,
    opacity: 0.95,
  },
  ctaBtn: {
    display: "block",
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "2px solid rgba(255,255,255,0.8)",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.04em",
  },
  retryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 14,
    border: "2px solid #DDDDD8",
    background: "#fff",
    color: "#888",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
};
