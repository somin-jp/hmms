/**
 * SocialTalk (소셜톡) - Pragmatic Language Scenario Data
 * Contains comprehensive 10-step scenarios for Child, Youth, and Adult across 6 major domains.
 */

const SCENARIO_CATEGORIES = [
    {
        id: "school",
        name: "학교생활",
        icon: "fa-school",
        description: "교실, 쉬는시간, 급식실, 복도 규칙 및 질문하기와 도움 요청",
        targetAges: ["child", "youth"]
    },
    {
        id: "teacher",
        name: "교사와의 관계",
        icon: "fa-chalkboard-user",
        description: "선생님께 인사하기, 수업 질문, 재설명 요청, 피드백 반응과 사과",
        targetAges: ["child", "youth"]
    },
    {
        id: "peer",
        name: "또래와의 관계",
        icon: "fa-people-group",
        description: "대화 물꼬 트기, 함께 놀기 제안, 차례 지키기, 거절 수용과 화해",
        targetAges: ["child", "youth", "adult"]
    },
    {
        id: "home",
        name: "가정생활",
        icon: "fa-house-user",
        description: "가족 간 대화, 솔직한 감정 표현, 집안일 협동 및 갈등 조율",
        targetAges: ["child", "youth", "adult"]
    },
    {
        id: "community",
        name: "지역사회",
        icon: "fa-store",
        description: "마트, 편의점, 식당 주문, 병원, 약국, 도서관, 대중교통 이용",
        targetAges: ["child", "youth", "adult"]
    },
    {
        id: "workplace",
        name: "성인생활/직장",
        icon: "fa-briefcase",
        description: "직장 상사/동료 대화, 업무 질의, 실수 대처, 전화 예절, 공공기관",
        targetAges: ["adult"]
    }
];

const SCENARIOS = [
    // 1. School Life / Beginner - Asking Teacher a Question
    {
        id: "scen_school_01",
        categoryId: "school",
        title: "수업 중 이해가 안 될 때 질문하기",
        level: "beginner", // beginner, intermediate, advanced
        ageRange: ["child", "youth"],
        summary: "선생님이 설명을 마치신 후 손을 들고 차례를 기다려 친절하게 질문을 드립니다.",
        steps: {
            step1: {
                title: "1단계: 상황 이해",
                description: "수업 시간에 선생님이 수학 문제 풀이를 설명하셨습니다. 하지만 나는 3번 문제가 왜 그렇게 되는지 잘 이해가 되지 않습니다. 주위를 둘러보니 다른 친구들은 문제집을 풀고 있습니다.",
                audioText: "수업 시간에 선생님의 설명이 이해되지 않을 때는, 무작정 소리를 지르거나 혼자 아파하기보다 손을 들고 차례를 기다리는 것이 좋습니다.",
                svgGraphic: `
                <svg viewBox="0 0 300 200" width="280" height="180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="200" fill="#E2E8F0" rx="12"/>
                    <!-- Chalkboard -->
                    <rect x="30" y="20" width="240" height="80" fill="#065F46" rx="6"/>
                    <text x="50" y="55" fill="#FFFFFF" font-size="14" font-weight="bold">수학 3번: 15 + 7 = ?</text>
                    <!-- Teacher -->
                    <circle cx="80" cy="140" r="18" fill="#F59E0B"/>
                    <rect x="68" y="158" width="24" height="30" fill="#2563EB" rx="4"/>
                    <text x="68" y="130" font-size="11" fill="#1E293B">선생님</text>
                    <!-- Student Raising Hand -->
                    <circle cx="210" cy="145" r="16" fill="#10B981"/>
                    <line x1="225" y1="145" x2="235" y2="115" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
                    <text x="195" y="180" font-size="11" opacity="0.8">손을 든 학생</text>
                </svg>
                `
            },
            step2: {
                title: "2단계: 사회적 단서 파악",
                description: "그림과 상황 속에 숨겨진 3가지 사회적 단서를 클릭해보세요.",
                cues: [
                    { id: "cue1", title: "선생님의 시선과 표정", text: "선생님이 칠판 설명을 마치고 교실을 둘러보고 계십니다 (질문을 받을 준비가 됨)." },
                    { id: "cue2", title: "친구들의 행동", text: "다른 친구들은 조용히 문제를 풀고 있으므로 크게 소리치면 방해가 됩니다." },
                    { id: "cue3", title: "나의 행동 단서", text: "손을 똑바로 들고 선생님과 눈이 맞출 때까지 기다려야 합니다." }
                ]
            },
            step3: {
                title: "3단계: 상대방 감정 및 의도 추론",
                question: "내가 수업 중간에 갑자기 크게 소리를 지르며 '몰라요!'라고 말한다면, 선생님은 어떤 마음이 드실까요?",
                options: [
                    { id: "a", text: "갑작스러운 소리에 놀라고, 수업 흐름이 깨져 당황스러우실 것이다.", isCorrect: true, explanation: "정답입니다! 다른 학생들이 공부하고 있을 때 소리를 지르면 선생님과 친구들 모두 당황합니다." },
                    { id: "b", text: "내가 모르는 것을 알고 기뻐서 당장 달려오실 것이다.", isCorrect: false, explanation: "아닙니다. 모르는 것은 괜찮지만 표현 방식이 타인에게 방해가 됩니다." },
                    { id: "c", text: "아무런 생각도 들지 않고 신경 쓰지 않으실 것이다.", isCorrect: false, explanation: "선생님은 교실 안의 모든 학생 반응에 관심이 있으십니다." }
                ]
            },
            step4: {
                title: "4단계: 적절한 행동 선택",
                question: "선생님께 모르는 문제를 질문하고 싶을 때 가장 적절한 행동은 무엇인가요?",
                options: [
                    { id: "a", text: "선생님 자리로 다가가 옷자락을 계속 당긴다.", isCorrect: false, explanation: "갑자기 신체를 만지거나 옷을 당기는 것은 예의에 어긋납니다." },
                    { id: "b", text: "자리에서 조용히 손을 들고 선생님이 나를 바라보실 때까지 기다린다.", isCorrect: true, explanation: "훌륭합니다! 손을 들고 기다리는 것이 신사적이고 예의 바른 행동입니다." },
                    { id: "c", text: "모르는 문제는 포기하고 문제집을 바닥에 던진다.", isCorrect: false, explanation: "물건을 던지면 위험하고 문제를 해결할 수 없습니다." }
                ]
            },
            step5: {
                title: "5단계: 적절한 언어 표현 선택",
                question: "선생님이 'OO아, 질문 있니?'라고 부르셨을 때 뭐라고 말하는 것이 가장 좋을까요?",
                options: [
                    { id: "a", text: "선생님, 3번 문제 풀이가 잘 이해되지 않는데 다시 설명해 주실 수 있나요?", isCorrect: true, explanation: "완벽합니다! 구체적인 문제 번호와 함께 존댓말로 정중히 요청했습니다." },
                    { id: "b", text: "이거 왜 이래요? 너무 어려워요!", isCorrect: false, explanation: "조금 더 정중하고 명확하게 어느 부분인지 전달하는 것이 좋습니다." },
                    { id: "c", text: "그냥 다 몰라요.", isCorrect: false, explanation: "어디까지 이해했는지 구체적으로 말해야 도움을 받기 쉽습니다." }
                ],
                aacRecommended: ["선생님", "도움이", "필요해요", "감사합니다"]
            },
            step6: {
                title: "6단계: 직접 말하기 (STT 음성 훈련)",
                instruction: "아래 목표 문장을 마이크 버튼을 누르고 자신 있게 말해보세요.",
                targetSentence: "선생님, 3번 문제가 잘 이해되지 않는데 다시 설명해 주실 수 있나요?"
            },
            step7: {
                title: "7단계: 특수교육 전문가 피드백 & 보상",
                feedbackTitle: "최고예요! 정중한 질문 기술을 습득했습니다.",
                feedbackContent: "손을 들고 차례를 기다린 후 '선생님, ~해 주실 수 있나요?'라고 요청하는 정중한 표현법은 교실 생활에서 가장 소중한 사회적 규칙입니다.",
                badge: "질문 왕 배지 획득!"
            },
            step8: {
                title: "8단계: 상대방 관점 고려 (Perspective Taking)",
                perspectivePerson: "선생님의 마음",
                thoughtText: "OO이가 손을 들고 조용히 기다렸다가 정중하게 질문해 주어서 기쁘다. 어떤 부분이 어려운지 친절하게 다시 설명해 줘야겠어!"
            },
            step9: {
                title: "9단계: 실전 응용 (Generalization)",
                question: "이번엔 식당이나 매점에서 원하는 메뉴를 주문하거나 질문할 때도 이 원리를 적용할 수 있습니다. 어떻게 해야 할까요?",
                options: [
                    { id: "a", text: "점원분을 정중히 부르고 '이 음식 매운가요?'라고 물어본다.", isCorrect: true, explanation: "맞습니다! 상대방의 상황을 살피고 정중하게 물어보는 원리는 어디서나 같습니다." },
                    { id: "b", text: "음식을 주방으로 가서 직접 꺼내온다.", isCorrect: false, explanation: "규칙을 위반하게 됩니다." }
                ]
            },
            step10: {
                title: "10단계: 성취 리포트",
                scores: {
                    cueRecognition: 95,
                    intentInference: 90,
                    actionSelection: 100,
                    expressionAccuracy: 92,
                    speechPronunciation: 88
                },
                summaryText: "손 들고 질문하기 화용 단계를 완벽히 이수하셨습니다!"
            }
        }
    },

    // 2. Peer Relationship / Intermediate - Joining a Game
    {
        id: "scen_peer_01",
        categoryId: "peer",
        title: "친구들의 보드게임에 자연스럽게 참여하기",
        level: "intermediate",
        ageRange: ["child", "youth"],
        summary: "쉬는시간에 친구들이 보드게임을 하고 있을 때 상황을 파악하고 제안하는 기술을 배웁니다.",
        steps: {
            step1: {
                title: "1단계: 상황 이해",
                description: "쉬는시간에 교실 뒤편에서 친구 3명이 보드게임을 하며 신나게 웃고 있습니다. 나도 같이 놀고 싶습니다.",
                audioText: "친구들이 이미 놀이를 시작했을 때는 무작정 중간에 끼어들기보다, 게임 규칙과 분위기를 먼저 관찰하는 것이 중요합니다.",
                svgGraphic: `
                <svg viewBox="0 0 300 200" width="280" height="180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="200" fill="#FEF3C7" rx="12"/>
                    <!-- Board Game Table -->
                    <circle cx="150" cy="120" r="50" fill="#D97706"/>
                    <rect x="130" y="100" width="40" height="40" fill="#FFF" rx="4"/>
                    <!-- Friends -->
                    <circle cx="100" cy="110" r="16" fill="#EF4444"/>
                    <circle cx="150" cy="65" r="16" fill="#3B82F6"/>
                    <circle cx="200" cy="110" r="16" fill="#10B981"/>
                    <!-- Me Standing Aside -->
                    <circle cx="50" cy="150" r="16" fill="#8B5CF6"/>
                    <text x="35" y="180" font-size="11" fill="#4C1D95">나 (관찰 중)</text>
                </svg>
                `
            },
            step2: {
                title: "2단계: 사회적 단서 파악",
                cues: [
                    { id: "cue1", title: "친구들의 대화와 게임 상태", text: "지금 게임이 한창 진행 중인지, 새 라운드가 시작될 참인지 확인합니다." },
                    { id: "cue2", title: "인원수 단서", text: "게임 판에 자리가 남아있는지, 최대 인원 제한이 있는지 확인합니다." },
                    { id: "cue3", title: "친구들의 표정", text: "친구들의 표정이 조급해 보이는지 신나 보이는지 살핍니다." }
                ]
            },
            step3: {
                title: "3단계: 상대방 감정 및 의도 추론",
                question: "친구들이 한창 집중해서 주사위를 던지고 있을 때, 내가 중간판을 갑자기 빼앗는다면 어떤 기분일까요?",
                options: [
                    { id: "a", text: "게임 흐름이 깨져 화가 나고 짜증이 날 것이다.", isCorrect: true, explanation: "정답입니다. 아무리 같이 놀고 싶어도 플레이 중인 말이나 판을 건드리면 안 됩니다." },
                    { id: "b", text: "재미있는 장난으로 생각하고 웃을 것이다.", isCorrect: false, explanation: "집중하고 있던 놀이를 방해받는 것은 장난이 아닙니다." }
                ]
            },
            step4: {
                title: "4단계: 적절한 행동 선택",
                question: "함께 놀고 싶을 때 가장 바람직한 행동 순서는 무엇인가요?",
                options: [
                    { id: "a", text: "옆으로 다가가 조용히 게임을 구경하다가, 이번 판이 끝날 때 물어본다.", isCorrect: true, explanation: "정확합니다! 놀이 판의 끊어지는 타이밍(Round End)을 노리는 것이 고급 사회적 단서 활용입니다." },
                    { id: "b", text: "내 말을 게임판 위에 그냥 올린다.", isCorrect: false, explanation: "규칙에 어긋납니다." }
                ]
            },
            step5: {
                title: "5단계: 적절한 언어 표현 선택",
                question: "이번 판이 끝난 후 친구들에게 어떻게 제안해야 할까요?",
                options: [
                    { id: "a", text: "얘들아, 게임 재미있어 보인다! 다음 판에 나도 같이 할 수 있을까?", isCorrect: true, explanation: "완벽합니다! 칭찬과 함께 정중한 거절 가능성을 열어두고 물었습니다." },
                    { id: "b", text: "나도 차례 줘. 당장 해.", isCorrect: false, explanation: "명령조 표현은 친구들을 불편하게 만듭니다." }
                ],
                aacRecommended: ["친구들", "같이", "놀고 싶어요", "가능할까요"]
            },
            step6: {
                title: "6단계: 직접 말하기 (STT 음성 훈련)",
                instruction: "아래 목표 문장을 부드러운 목소리로 말해보세요.",
                targetSentence: "얘들아, 게임 정말 재미있어 보인다! 다음 판에 나도 같이 할 수 있을까?"
            },
            step7: {
                title: "7단계: 특수교육 전문가 피드백 & 보상",
                feedbackTitle: "훌륭해요! 또래 관계의 관찰 후 제안 기술 성공!",
                feedbackContent: "상대방의 놀이 흐름을 방해하지 않고 '다음 판'에 참여를 요청하는 기술은 매우 성숙한 사회적 기술입니다.",
                badge: "친화력 대장 배지 획득!"
            },
            step8: {
                title: "8단계: 상대방 관점 고려 (Perspective Taking)",
                perspectivePerson: "친구들의 마음",
                thoughtText: "OO이가 우리 게임을 재미있게 구경하다가 이번 판 끝나고 친절하게 물어봐 줬네. 다음 판엔 자리 만들어서 같이 하자고 해야겠어!"
            },
            step9: {
                title: "9단계: 실전 응용 (Generalization)",
                question: "만약 친구들이 '미안해, 이 게임은 3인용이라 자리가 없어'라고 거절하면 어떻게 반응해야 할까요?",
                options: [
                    { id: "a", text: "'아 그렇구나! 그럼 구경해도 될까? 다음 게임 때 불러줘'라고 웃으며 말한다.", isCorrect: true, explanation: "멋집니다! 거절을 의연하게 받아들이는 것도 중요한 화용 능력입니다." },
                    { id: "b", text: "화내며 게임판을 엎어버린다.", isCorrect: false, explanation: "절대 해서는 안 되는 행동입니다." }
                ]
            },
            step10: {
                title: "10단계: 성취 리포트",
                scores: {
                    cueRecognition: 90,
                    intentInference: 95,
                    actionSelection: 92,
                    expressionAccuracy: 96,
                    speechPronunciation: 90
                },
                summaryText: "또래 대화 수용 및 제안 단계를 훌륭하게 수행했습니다!"
            }
        }
    },

    // 3. Workplace & Adult / Advanced - Handling Workplace Mistake
    {
        id: "scen_workplace_01",
        categoryId: "workplace",
        title: "직장에서 업무 관련 실수에 솔직하고 정중하게 대처하기",
        level: "advanced",
        ageRange: ["adult"],
        summary: "업무 보고서에서 오타 또는 실수가 발견되었을 때 상사에게 신속하게 사과하고 해결책을 제시합니다.",
        steps: {
            step1: {
                title: "1단계: 상황 이해",
                description: "팀장님께 제출한 월간 결과 보고서의 숫자에 오차가 있다는 사실을 뒤늦게 알게 되었습니다. 팀장님께서 자리에서 서류를 검토 중이십니다.",
                audioText: "직장 생활에서 실수를 숨기거나 핑계를 대면 신뢰가 크게 떨어집니다. 신속한 오인 인정과 대안 제시가 핵심 화용 기술입니다.",
                svgGraphic: `
                <svg viewBox="0 0 300 200" width="280" height="180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="200" fill="#1E293B" rx="12"/>
                    <!-- Office Desk -->
                    <rect x="40" y="110" width="220" height="50" fill="#334155" rx="4"/>
                    <rect x="70" y="90" width="40" height="25" fill="#0EA5E9" rx="2"/>
                    <!-- Team Leader -->
                    <circle cx="210" cy="80" r="18" fill="#F43F5E"/>
                    <rect x="195" y="100" width="30" height="40" fill="#475569" rx="4"/>
                    <text x="185" y="55" fill="#F8FAFC" font-size="11" font-weight="bold">팀장님 (검토 중)</text>
                    <!-- Employee -->
                    <circle cx="90" cy="140" r="16" fill="#3B82F6"/>
                    <text x="65" y="175" fill="#94A3B8" font-size="11">나 (사과 및 수정안 준비)</text>
                </svg>
                `
            },
            step2: {
                title: "2단계: 사회적 단서 파악",
                cues: [
                    { id: "cue1", title: "팀장님의 심각한 표정과 보고서 검토 중인 상황", text: "팀장님이 보고서 수치를 확인하기 전 먼저 찾아가 신속히 알리는 것이 피해를 줄입니다." },
                    { id: "cue2", title: "직장 내 암묵적 비즈니스 매너", text: "변명보다는 '사과 + 정확한 수정본 + 재발 방지'가 포함되어야 합니다." },
                    { id: "cue3", title: "대화의 톤앤매너", text: "정중하고 차분하며 책임감 있는 태도를 유지합니다." }
                ]
            },
            step3: {
                title: "3단계: 상대방 감정 및 의도 추론",
                question: "만약 실수를 알고도 숨기다가 외부 미팅 때 팀장님이 뒤늦게 오류를 발견하신다면 팀장님의 마음은 어떠실까요?",
                options: [
                    { id: "a", text: "업무 신뢰도가 크게 떨어지고 상황 처리에 큰 어려움을 느껴 몹시 화가 나실 것이다.", isCorrect: true, explanation: "맞습니다. 보고서의 정확성은 팀 전체의 신뢰와 직결됩니다." },
                    { id: "b", text: "누구나 할 수 있는 실수니 그냥 웃어넘기실 것이다.", isCorrect: false, explanation: "비즈니스 환경에서는 신뢰 위기 상황이 발생할 수 있습니다." }
                ]
            },
            step4: {
                title: "4단계: 적절한 행동 선택",
                question: "오류를 발견했을 때 가장 직장인다운 적절한 행동은 무엇인가요?",
                options: [
                    { id: "a", text: "오류 부분을 올바르게 수정한 수정본을 즉시 출력하여 팀장님께 다가가 정중히 보고한다.", isCorrect: true, explanation: "완벽합니다! 문제 파악과 동시에 해결책(수정본)을 함께 지참하는 것이 고급 업무 처리 능력입니다." },
                    { id: "b", text: "다른 동료가 작성했다고 거짓말을 한다.", isCorrect: false, explanation: "거짓말은 직장 내에서 치명적인 문제를 야기합니다." }
                ]
            },
            step5: {
                title: "5단계: 적절한 언어 표현 선택",
                question: "팀장님께 수정을 보고할 때 가장 적절한 언어 표현은 무엇인가요?",
                options: [
                    { id: "a", text: "팀장님, 아까 제출해 드린 보고서 3페이지 매출 수치에 오차가 있어 수정본을 다시 가져왔습니다. 미리 꼼꼼히 확인하지 못해 죄송합니다.", isCorrect: true, explanation: "탁월합니다! 책임 인정, 경위 전달, 수정본 제시, 사과가 완벽하게 구성되었습니다." },
                    { id: "b", text: "컴퓨터 프로그램이 이상해서 숫자가 틀렸네요.", isCorrect: false, explanation: "남 탓이나 핑계로 들릴 수 있습니다." }
                ],
                aacRecommended: ["팀장님", "보고서", "수정본", "죄송합니다"]
            },
            step6: {
                title: "6단계: 직접 말하기 (STT 음성 훈련)",
                instruction: "실제 비즈니스 톤으로 명확하고 차분하게 말해보세요.",
                targetSentence: "팀장님, 제출해 드린 보고서 수치에 오차가 있어 수정본을 가져왔습니다. 미리 확인하지 못해 죄송합니다."
            },
            step7: {
                title: "7단계: 특수교육 전문가 피드백 & 보상",
                feedbackTitle: "최고의 직장 생활 사회적 대처 능력입니다!",
                feedbackContent: "실수를 감추지 않고 올바른 수정본과 함께 명확한 존댓말로 보고하는 것은 성인 화용언어의 핵심 요소입니다.",
                badge: "프로 직장인 배지 획득!"
            },
            step8: {
                title: "8단계: 상대방 관점 고려 (Perspective Taking)",
                perspectivePerson: "팀장님의 마음",
                thoughtText: "오류가 있어서 아쉽지만, 본인이 신속하게 파악해서 수정본을 들고 와 정중히 사과하니 오히려 책임감 있어 보이는군."
            },
            step9: {
                title: "9단계: 실전 응용 (Generalization)",
                question: "전화 통화 업무 중 상대방 고객의 말을 잘못 이해했을 때는 어떻게 해야 할까요?",
                options: [
                    { id: "a", text: "'죄송합니다, 확인 차 다시 한번 말씀해 주시겠습니까?'라고 정중히 요청한다.", isCorrect: true, explanation: "정확합니다! 업무 시 확인 및 재설명 요청도 훌륭한 화용 전략입니다." },
                    { id: "b", text: "잘 모르는 채 아는 척 넘어간다.", isCorrect: false, explanation: "더 큰 오해를 낳을 수 있습니다." }
                ]
            },
            step10: {
                title: "10단계: 성취 리포트",
                scores: {
                    cueRecognition: 94,
                    intentInference: 92,
                    actionSelection: 98,
                    expressionAccuracy: 95,
                    speechPronunciation: 93
                },
                summaryText: "성인 직장 화용 갈등 대처 모듈을 성공적으로 이수하셨습니다!"
            }
        }
    }
];

// AAC Picture Symbol Dictionary
const AAC_DICTIONARY = {
    who: [
        { id: "w1", text: "선생님", icon: "fa-chalkboard-user" },
        { id: "w2", text: "친구들", icon: "fa-users" },
        { id: "w3", text: "팀장님", icon: "fa-user-tie" },
        { id: "w4", text: "저기요/점원분", icon: "fa-store" },
        { id: "w5", text: "엄마/아빠", icon: "fa-people-roof" }
    ],
    action: [
        { id: "a1", text: "도움이", icon: "fa-hand-holding-hand" },
        { id: "a2", text: "같이 놀고", icon: "fa-gamepad" },
        { id: "a3", text: "다시 설명해", icon: "fa-rotate-right" },
        { id: "a4", text: "주문하고", icon: "fa-receipt" },
        { id: "a5", text: "수정본을", icon: "fa-file-pen" }
    ],
    feeling: [
        { id: "f1", text: "필요해요", icon: "fa-circle-exclamation" },
        { id: "f2", text: "싶어요", icon: "fa-heart" },
        { id: "f3", text: "이해가 안 돼요", icon: "fa-circle-question" },
        { id: "f4", text: "궁금해요", icon: "fa-magnifying-glass" },
        { id: "f5", text: "죄송해요", icon: "fa-face-sad-tear" }
    ],
    polite: [
        { id: "p1", text: "감사합니다", icon: "fa-hands-clapping" },
        { id: "p2", text: "가능할까요?", icon: "fa-circle-check" },
        { id: "p3", text: "해 주실 수 있나요?", icon: "fa-hands-praying" },
        { id: "p4", text: "부탁드립니다", icon: "fa-envelope-open-text" }
    ]
};
