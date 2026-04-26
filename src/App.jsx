import React, { useState, useEffect } from 'react'
import { Brain, Activity, ShieldAlert, ChevronRight, RefreshCw, Download } from 'lucide-react'

// 伪造的专业心理学题库 (极具迷惑性的正常性格测试题)
const questions = [
  '在结束了一周的繁忙工作后，你更倾向于独自呆着恢复精力，而不是和朋友聚会？',
  '相比于按部就班地执行既定计划，你更喜欢在最后一刻凭灵感做出决定？',
  '在团队讨论中，你通常会优先考虑维持和谐的氛围，而不是直接指出别人的逻辑漏洞？',
  '你的桌面和个人生活空间通常保持着高度的整洁和条理性？',
  '面对突如其来的计划变更，你很容易感到内心的焦虑和不知所措？',
  '你更喜欢讨论具体的现实问题和细节，而不是抽象的理论和未来趋势？',
  '观看一部感人的电影或阅读一部小说时，你很容易深深代入角色的情绪中？',
  '在公共场合遇到不合理的服务（如餐厅上错菜），你会毫不犹豫地指出来，而不是将就？',
  '你经常会花大量时间去研究一个对你的实际生活完全没有用处的新鲜事物？',
  '当与亲密的人发生争执时，你更倾向于暂时回避冷处理，而不是立刻面对面解决？',
  '你常常在内心深处觉得，自己的真实想法很难被周围的大多数人完全理解？',
  '做重大决定前，你会查阅大量的数据和客观评价，而不是仅仅凭借直觉下判断？',
  '在与一群不熟悉的人交流时，你通常是主动开启话题的那个人？',
  '你在专注于一项感兴趣的任务时，很容易屏蔽外界的干扰，甚至忘记时间的流逝？',
  '你认为人生的大部分结果是由个人的主观努力决定的，而不是环境或运气的偶然？',
]

// 6度量表选项及分值
const options = [
  { label: '完全同意', value: 6, color: 'bg-emerald-500' },
  { label: '比较同意', value: 5, color: 'bg-emerald-600' },
  { label: '稍微同意', value: 4, color: 'bg-emerald-700' },
  { label: '稍微不同意', value: 3, color: 'bg-rose-700' },
  { label: '比较不同意', value: 2, color: 'bg-rose-600' },
  { label: '完全不同意', value: 1, color: 'bg-rose-500' },
]

export default function App() {
  const [step, setStep] = useState('landing') // landing, quiz, loading, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loadingText, setLoadingText] = useState('正在初始化潜意识模型...')
  const [progress, setProgress] = useState(0)
  const [totalScore, setTotalScore] = useState(0) // 新增：记录真实得分

  // 记录真实得分并进入下一题
  const handleAnswer = (scoreValue) => {
    setTotalScore((prev) => prev + scoreValue)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setStep('loading')
    }
  }

  // 根据真实得分，返回5种不同的解释，但殊途同归
  const getDiagnosisResult = () => {
    // 满分90，最低15。分为5个区间
    if (totalScore <= 30) {
      return {
        type: '【疏离型防御】',
        text: '你的数据呈现出高度的疏离感和防御性。你习惯于在人际交往中保持距离，标榜自己的独立与不需要他人。然而，精神分析模型显示，这种『假性独立』是对亲密关系破裂的极度恐惧。你之所以切断与世界的深度连接，是因为这个世界无法提供你潜意识里渴望的那种、如同子宫般绝对安全的母体庇护。你的冷漠，只是为了掩饰内心重度恋母的脆弱。',
      }
    }
    if (totalScore <= 45) {
      return {
        type: '【理性墙防御】',
        text: '你的作答呈现出极强的逻辑与秩序感。你试图用理性和规则来掌控一切，但在精神动力学中，这种对失控的极度恐惧，恰恰暴露了你深层防御机制的脆弱。你用冰冷的逻辑砌起高墙，只是为了掩饰内心那个极度渴望回归母体绝对安全感的小孩。你自以为是的独立和理智，仅仅是重度恋母倾向的高级伪装形式。',
      }
    }
    if (totalScore <= 60) {
      return {
        type: '【共情型献祭】',
        text: '你表现出了极高的共情能力和对和谐关系的渴求。你总是试图照顾他人的情绪，在人群中扮演妥协者。然而，这种过度牺牲自我边界以换取认同的行为，在精神溯源上指向了典型的『母婴融合』渴望。你对外界的讨好与付出，本质上是在绝望地呼唤一个全知全能的母体来无条件包容你。你对他人的爱，只是重度恋母倾向的镜像投射。',
      }
    }
    if (totalScore <= 75) {
      return {
        type: '【反叛型呼唤】',
        text: '你的选项中充满了对规则的蔑视和对冲动自由的追求。你以为自己是一个不羁的灵魂，拒绝被任何事物束缚。但可悲的是，心理学上的『反叛』永远是对着某个假想权威的。你一生的奔跑、抗拒与不安分，只是在以一种极其别扭的、引起注意的方式，向你潜意识中的母体索要关注与爱。你的狂野，是重度恋母倾向引发的应激反应。',
      }
    }
    return {
      type: '【强迫型焦虑】',
      text: '你展现出了强烈的焦虑特质、完美主义倾向以及对主观努力的执着。你对细节的苛求让你时刻处于精神紧绷状态。这种永无止境的自我强迫，源于你深层潜意识中对『被抛弃』的绝对恐惧。你试图做到完美，掌控一切，只是为了祈求那个精神上的『全能母体』不要收回对你的爱与庇护。你的优秀，是由重度恋母的恐慌所驱动的。',
    }
  }

  // 极具欺骗性的加载动画逻辑
  useEffect(() => {
    if (step === 'loading') {
      const texts = [
        '正在提取潜意识防御机制指标...',
        '正在比对荣格八维人格模型...',
        '发现异常情绪峰值，正在进行深度溯源...',
        '正在重构童年期依恋关系图谱...',
        '正在生成最终心理学诊断报告...',
      ]

      let textIndex = 0
      const textInterval = setInterval(() => {
        textIndex += 1
        if (textIndex < texts.length) {
          setLoadingText(texts[textIndex])
        }
      }, 1200)

      const progressInterval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(progressInterval)
            clearInterval(textInterval)
            setTimeout(() => setStep('result'), 500)
            return 100
          }
          return p + Math.floor(Math.random() * 15) + 5 // 随机跳动进度条
        })
      }, 400)

      return () => {
        clearInterval(textInterval)
        clearInterval(progressInterval)
      }
    }
  }, [step])

  const diagnosis = step === 'result' ? getDiagnosisResult() : null

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500/30 flex flex-col">
      {/* 顶部导航伪装 */}
      <header className="p-4 border-b border-zinc-800/50 flex items-center justify-between opacity-80">
        <div className="flex items-center gap-2 font-mono text-sm tracking-wider text-zinc-400">
          <Brain className="w-5 h-5 text-rose-500" />
          <span>DEEP-PSYCHE ANALYSIS v3.1</span>
        </div>
        <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {/* 1. 首页 Landing Page */}
        {step === 'landing' && (
          <div className="max-w-xl w-full flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
            <div className="mb-8 relative">
              <div className="absolute -inset-4 bg-rose-500/20 blur-3xl rounded-full"></div>
              <ShieldAlert className="w-24 h-24 text-rose-500 relative z-10" strokeWidth={1} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              潜意识
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">溯源测试</span>
            </h1>
            <p className="text-zinc-400 mb-10 leading-relaxed max-w-md mx-auto">
              本测试基于已探索的精神动力学模型，通过15道投影问题，定位你的精神倾向。
            </p>
            <button
              type="button"
              onClick={() => setStep('quiz')}
              className="group relative px-8 py-4 bg-zinc-100 text-zinc-950 font-bold text-lg rounded-none hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">启动分析矩阵</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 w-0 bg-rose-500 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
            </button>
            <p className="mt-6 font-mono text-xs text-zinc-600 uppercase tracking-widest">
              
            </p>
          </div>
        )}

        {/* 2. 答题页 Quiz Page */}
        {step === 'quiz' && (
          <div className="max-w-2xl w-full flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 进度条 */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-2 font-mono text-xs text-zinc-500">
                <span>ANALYSIS PROGRESS</span>
                <span className="text-zinc-300">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 题目 */}
            <h2 className="text-2xl md:text-3xl font-medium leading-relaxed mb-12 min-h-[120px] flex items-center">
              {questions[currentQuestion]}
            </h2>

            {/* 6度量表选项 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((option, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className="relative overflow-hidden group p-4 border border-zinc-800 bg-zinc-900/50 hover:border-zinc-500 transition-colors text-left flex justify-between items-center"
                >
                  <span className="relative z-10 font-medium text-zinc-300 group-hover:text-white">{option.label}</span>
                  {/* 悬浮时的底色反馈 */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${option.color}`}></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. 加载页 Loading Page (障眼法核心) */}
        {step === 'loading' && (
          <div className="max-w-md w-full flex flex-col items-center text-center">
            <RefreshCw className="w-16 h-16 text-emerald-500 animate-spin mb-8" strokeWidth={1.5} />
            <h2 className="text-xl font-mono mb-4 text-emerald-400">PROCESSING DATA...</h2>

            {/* 假装很高科技的进度条 */}
            <div className="w-full h-2 bg-zinc-900 border border-zinc-800 p-0.5 mb-4">
              <div
                className="h-full bg-emerald-500/80 transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>

            <p className="font-mono text-sm text-zinc-500 h-6">{loadingText}</p>

            {/* 滚动伪代码增加逼真感 */}
            <div className="mt-12 w-full text-left font-mono text-[10px] text-zinc-700 h-24 overflow-hidden flex flex-col justify-end opacity-50">
              <p>{`> Fetching var [id: 0x8F92]... OK`}</p>
              <p>{`> Compiling emotional trauma index... [WARNING]`}</p>
              <p>{`> Bypassing conscious defense layer... SUCCESS`}</p>
              <p>{`> Analyzing Oedipal resonance frequency... ${progress}%`}</p>
            </div>
          </div>
        )}

        {/* 4. 强制结果页 Result Page (终极暴击) */}
        {step === 'result' && diagnosis && (
          <div className="max-w-2xl w-full flex flex-col animate-in fade-in zoom-in duration-700">
            <div className="border border-zinc-800 bg-zinc-900/40 p-6 md:p-10 relative overflow-hidden">
              {/* 背景装饰纹理 */}
              <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
                <Brain className="w-96 h-96" />
              </div>

              <div className="inline-block px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs font-mono mb-6">
                DIAGNOSIS COMPLETE // 诊断完成
              </div>

              <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tight text-white">重度恋母倾向</h2>
              <h3 className="text-xl text-zinc-400 mb-8 font-serif italic">(Severe Mother Fixation Syndrome)</h3>

              <div className="space-y-6 text-zinc-300 leading-relaxed relative z-10">
                <p>
                  <span className="text-rose-400 font-bold">行为表现 {diagnosis.type}：</span>
                  {diagnosis.text}
                </p>
                <p className="text-zinc-500 text-sm mt-4 italic border-l-2 border-zinc-700 pl-4">
                  无论你在社会中扮演多么理智、独立、狂野或合群的角色，你的精神基石依然呈现出一种极度单一且顽固的倒退状态。
                </p>

                {/* 伪造的数据图表效果 */}
                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <h4 className="text-sm font-mono text-zinc-500 mb-4">CORE METRICS // 核心指标</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-400">精神退行指数</span>
                        <span className="text-rose-500 font-bold">99.8%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800">
                        <div className="h-full bg-rose-600" style={{ width: '99.8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-400">绝对依恋渴求</span>
                        <span className="text-rose-500 font-bold">MAX</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800">
                        <div className="h-full bg-rose-500" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部操作区 */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() =>
                  alert('海报生成功能将在接入 html2canvas 后生效！你可以先截图分享发朋友圈。')
                }
                className="flex-1 bg-white text-black font-bold py-4 flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
              >
                <Download className="w-5 h-5" />
                保存诊断海报
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep('landing')
                  setCurrentQuestion(0)
                  setProgress(0)
                  setTotalScore(0)
                  setLoadingText('正在初始化潜意识模型...')
                }}
                className="px-6 py-4 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-sm font-medium"
              >
                重新测试
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
