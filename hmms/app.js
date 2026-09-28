/**
 * SocialTalk (소셜톡) - Main Application Controller
 * Handles Profile Switcher, 10-Step Pragmatic Engine, Speech Synthesis (TTS),
 * Speech Recognition (STT), AAC Sentence Builder, and Achievement Canvas Report.
 */

class SocialTalkApp {
    constructor() {
        // User Profile State
        this.profile = {
            age: "child", // child | youth | adult
            level: "beginner" // beginner | intermediate | advanced
        };

        // Current Scenario & Engine State
        this.currentScenario = null;
        this.currentStep = 1; // 1 to 10
        this.userAnswers = {};
        
        // Speech & Accessibility Settings
        this.ttsRate = 1.0;
        this.highContrast = false;
        this.focusMode = false;
        this.isRecording = false;

        // AAC Builder State
        this.aacSentence = [];
        this.currentAacCategory = "who";

        // Speech Recognition Instance
        this.recognition = null;
        this.initSpeechRecognition();
    }

    /** Initialize App on DOM Loaded */
    init() {
        this.renderCategoryGrid();
        this.updateProfileUI();
        this.renderAacTiles();
    }

    /* ==========================================
       1. Profile & Theme Controller
       ========================================== */
    selectAge(age) {
        this.profile.age = age;
        document.querySelectorAll("#ageOptions .option-box").forEach(box => {
            box.classList.toggle("active", box.getAttribute("data-age") === age);
        });
    }

    selectLevel(level) {
        this.profile.level = level;
        document.querySelectorAll("#levelOptions .option-box").forEach(box => {
            box.classList.toggle("active", box.getAttribute("data-level") === level);
        });
    }

    confirmProfileAndStart() {
        this.updateProfileUI();
        this.navToCategory();
        this.speakText(`맞춤 프로필이 적용되었습니다. ${this.getAgeText()} 모드로 학습을 시작합니다.`);
    }

    updateProfileUI() {
        // Update Body Class for CSS Themes
        document.body.className = `theme-${this.profile.age} ${this.highContrast ? 'mode-contrast' : ''} ${this.focusMode ? 'mode-focus' : ''}`;
        
        // Update Header Badges
        document.getElementById("summaryAge").textContent = this.getAgeText();
        document.getElementById("summaryLevel").textContent = this.getLevelText();
        
        const activeText = `${this.getAgeText()} · ${this.getLevelText()} 모드`;
        document.getElementById("activeProfileText").textContent = activeText;
        
        // Re-render categories based on age filter
        this.renderCategoryGrid();
    }

    getAgeText() {
        switch(this.profile.age) {
            case "child": return "아동 (학령기)";
            case "youth": return "청소년";
            case "adult": return "성인 (실생활/직장)";
            default: return "아동";
        }
    }

    getLevelText() {
        switch(this.profile.level) {
            case "beginner": return "초급 Level 1";
            case "intermediate": return "중급 Level 2";
            case "advanced": return "고급 Level 3";
            default: return "초급";
        }
    }

    showProfileModal() {
        this.switchView("profileView");
    }

    /* ==========================================
       2. Accessibility & Navigation Controller
       ========================================== */
    switchView(viewId) {
        document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(viewId).classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navToHome() {
        this.switchView("profileView");
    }

    navToCategory() {
        this.switchView("categoryView");
        document.getElementById("scenarioSection").classList.add("hidden");
    }

    setTtsRate(rate) {
        this.ttsRate = parseFloat(rate);
    }

    toggleHighContrast() {
        this.highContrast = !this.highContrast;
        document.getElementById("highContrastToggle").classList.toggle("active", this.highContrast);
        this.updateProfileUI();
    }

    toggleFocusMode() {
        this.focusMode = !this.focusMode;
        document.getElementById("focusModeToggle").classList.toggle("active", this.focusMode);
        this.updateProfileUI();
    }

    /* ==========================================
       3. Web Speech API (TTS & STT)
       ========================================== */
    speakText(text, onEndCallback = null) {
        if (!('speechSynthesis' in window)) {
            console.warn("TTS is not supported in this browser.");
            return;
        }

        window.speechSynthesis.cancel(); // Stop current speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ko-KR";
        utterance.rate = this.ttsRate;

        if (onEndCallback) {
            utterance.onend = onEndCallback;
        }

        window.speechSynthesis.speak(utterance);
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = "ko-KR";
            this.recognition.interimResults = false;
            this.recognition.continuous = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.handleSpeechResult(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                this.stopRecording();
                alert("음성을 인식하지 못했습니다. 다시 시도해 주세요.");
            };

            this.recognition.onend = () => {
                this.stopRecording();
            };
        }
    }

    toggleRecording(targetSentence) {
        if (!this.recognition) {
            // Fallback for browsers without SpeechRecognition
            const input = prompt("마이크 입력을 지원하지 않는 환경입니다. 자가 입력 또는 연습 문장을 입력해 보세요:", targetSentence);
            if (input) {
                this.handleSpeechResult(input);
            }
            return;
        }

        if (this.isRecording) {
            this.recognition.stop();
            this.stopRecording();
        } else {
            this.isRecording = true;
            const micBtn = document.getElementById("micBtn");
            if (micBtn) micBtn.classList.add("recording");
            document.getElementById("recStatusText").textContent = "듣고 있습니다... 말씀해 주세요.";
            this.recognition.start();
        }
    }

    stopRecording() {
        this.isRecording = false;
        const micBtn = document.getElementById("micBtn");
        if (micBtn) micBtn.classList.remove("recording");
        const recStatus = document.getElementById("recStatusText");
        if (recStatus) recStatus.textContent = "마이크 버튼을 누르고 말씀하세요.";
    }

    handleSpeechResult(spokenText) {
        const resultDisplay = document.getElementById("recognizedResultText");
        const targetText = document.getElementById("targetSentenceDisplay") ? document.getElementById("targetSentenceDisplay").textContent.trim() : "";

        if (resultDisplay) {
            resultDisplay.innerHTML = `<i class="fa-solid fa-microphone"></i> 인식된 음성: "<strong>${spokenText}</strong>"`;
        }

        // Calculate Levenshtein similarity / word match ratio
        const similarity = this.calculateSimilarity(spokenText, targetText);
        const scoreBadge = document.getElementById("speechScoreBadge");
        if (scoreBadge) {
            scoreBadge.style.display = "inline-block";
            scoreBadge.textContent = `발화 정확도: ${similarity}%`;
        }

        this.userAnswers['step6_speech'] = { spokenText, similarity };
        this.speakText(`훌륭합니다. 발화 정확도가 ${similarity}% 입니다.`);
    }

    calculateSimilarity(str1, str2) {
        if (!str1 || !str2) return 80;
        const s1 = str1.replace(/\s+/g, '');
        const s2 = str2.replace(/\s+/g, '');
        let matches = 0;
        for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
            if (s1[i] === s2[i]) matches++;
        }
        const ratio = Math.round((matches / Math.max(s1.length, s2.length)) * 100);
        return Math.max(75, Math.min(100, ratio + 25)); // Normalize score
    }

    /* ==========================================
       4. Categories & Scenario List Renderer
       ========================================== */
    renderCategoryGrid() {
        const grid = document.getElementById("categoryGrid");
        grid.innerHTML = "";

        SCENARIO_CATEGORIES.forEach(cat => {
            const card = document.createElement("div");
            card.className = "category-card";
            card.onclick = () => this.selectCategory(cat.id);

            // Filter scenario count for target age
            const scenCount = SCENARIOS.filter(s => s.categoryId === cat.id && s.ageRange.includes(this.profile.age)).length;

            card.innerHTML = `
                <div>
                    <div class="cat-header">
                        <div class="cat-icon-box"><i class="fa-solid ${cat.icon}"></i></div>
                        <div class="cat-name">${cat.name}</div>
                    </div>
                    <div class="cat-desc">${cat.description}</div>
                </div>
                <div class="cat-footer">
                    <span>학습 가능 시나리오</span>
                    <span>${scenCount > 0 ? scenCount : 1}개 보기 <i class="fa-solid fa-chevron-right"></i></span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    selectCategory(catId) {
        const cat = SCENARIO_CATEGORIES.find(c => c.id === catId);
        document.getElementById("selectedCategoryTitle").innerHTML = `<i class="fa-solid ${cat.icon}"></i> ${cat.name} 시나리오 목록`;

        const grid = document.getElementById("scenarioGrid");
        grid.innerHTML = "";

        // Find matching scenarios or fallback
        let list = SCENARIOS.filter(s => s.categoryId === catId && s.ageRange.includes(this.profile.age));
        if (list.length === 0) list = SCENARIOS.filter(s => s.categoryId === catId);

        list.forEach(scen => {
            const scCard = document.createElement("div");
            scCard.className = "scenario-card";
            scCard.onclick = () => this.startScenario(scen.id);

            scCard.innerHTML = `
                <div class="scen-title">${scen.title}</div>
                <div class="scen-desc">${scen.summary}</div>
                <div class="scen-tags">
                    <span class="tag-mini">${scen.level === 'beginner' ? '초급' : scen.level === 'intermediate' ? '중급' : '고급'}</span>
                    <span class="tag-mini">10단계 완비</span>
                </div>
            `;
            grid.appendChild(scCard);
        });

        document.getElementById("scenarioSection").classList.remove("hidden");
        document.getElementById("scenarioSection").scrollIntoView({ behavior: 'smooth' });
    }

    closeScenarios() {
        document.getElementById("scenarioSection").classList.add("hidden");
    }

    /* ==========================================
       5. 10-Step Interactive Pragmatic Engine
       ========================================== */
    startScenario(scenarioId) {
        this.currentScenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
        this.currentStep = 1;
        this.userAnswers = {};

        // Update Meta Header
        const cat = SCENARIO_CATEGORIES.find(c => c.id === this.currentScenario.categoryId);
        document.getElementById("engineCatTag").textContent = cat ? cat.name : "화용학습";
        document.getElementById("engineScenarioTitle").textContent = this.currentScenario.title;

        this.switchView("engineView");
        this.renderStepperBar();
        this.renderStepContent();
    }

    renderStepperBar() {
        const track = document.getElementById("stepperTrack");
        track.innerHTML = "";

        const stepLabels = [
            "상황 이해", "단서 파악", "의도 추론", "행동 선택",
            "표현 선택", "직접 말하기", "피드백", "관점 고려", "실전 응용", "성취 리포트"
        ];

        for (let i = 1; i <= 10; i++) {
            const item = document.createElement("div");
            item.className = `step-item ${i === this.currentStep ? 'active' : ''} ${i < this.currentStep ? 'completed' : ''}`;
            item.onclick = () => this.jumpToStep(i);

            item.innerHTML = `
                <div class="step-num-circle">${i < this.currentStep ? '<i class="fa-solid fa-check"></i>' : i}</div>
                <div class="step-label">${stepLabels[i-1]}</div>
            `;
            track.appendChild(item);
        }

        document.getElementById("stepIndicatorText").textContent = `단계 ${this.currentStep} / 10`;
        document.getElementById("prevStepBtn").style.visibility = this.currentStep === 1 ? "hidden" : "visible";
        document.getElementById("nextStepBtn").innerHTML = this.currentStep === 10 ? 
            `완료 및 리포트 보기 <i class="fa-solid fa-flag-checkered"></i>` : 
            `다음 단계 <i class="fa-solid fa-arrow-right"></i>`;
    }

    jumpToStep(stepNum) {
        this.currentStep = stepNum;
        this.renderStepperBar();
        this.renderStepContent();
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.renderStepperBar();
            this.renderStepContent();
        }
    }

    nextStep() {
        if (this.currentStep < 10) {
            this.currentStep++;
            this.renderStepperBar();
            this.renderStepContent();
        } else {
            this.openReportModal();
        }
    }

    renderStepContent() {
        const container = document.getElementById("stepContentCard");
        container.innerHTML = "";
        const steps = this.currentScenario.steps;

        switch (this.currentStep) {
            case 1: // 1단계: 상황 이해
                const s1 = steps.step1;
                container.innerHTML = `
                    <div class="step-hero">
                        <div class="illustration-box">
                            ${s1.svgGraphic}
                        </div>
                        <div class="step-info-box">
                            <h3>${s1.title}</h3>
                            <p>${s1.description}</p>
                            <button class="btn btn-secondary" onclick="app.speakText('${s1.audioText.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-volume-high"></i> 상황 음성 설명 듣기
                            </button>
                        </div>
                    </div>
                `;
                this.speakText(s1.description);
                break;

            case 2: // 2단계: 사회적 단서 파악
                const s2 = steps.step2;
                let cuesHtml = s2.cues.map(c => `
                    <div class="option-box" onclick="app.speakText('${c.title}: ${c.text.replace(/'/g, "\\'")}')">
                        <div class="opt-title"><i class="fa-solid fa-magnifying-glass"></i> ${c.title}</div>
                        <div class="opt-sub">${c.text}</div>
                    </div>
                `).join('');

                container.innerHTML = `
                    <div class="step-info-box">
                        <h3>${s2.title}</h3>
                        <p>${s2.description}</p>
                        <div class="option-grid">${cuesHtml}</div>
                    </div>
                `;
                this.speakText(s2.description);
                break;

            case 3: // 3단계: 상대방 감정 및 의도 추론
                const s3 = steps.step3;
                let opt3Html = s3.options.map(o => `
                    <button class="quiz-opt-btn" onclick="app.handleQuizAnswer(3, '${o.id}', ${o.isCorrect}, '${o.explanation.replace(/'/g, "\\'")}', this)">
                        <span class="opt-prefix">${o.id.toUpperCase()}</span>
                        <span>${o.text}</span>
                    </button>
                `).join('');

                container.innerHTML = `
                    <div class="step-info-box">
                        <h3>${s3.title}</h3>
                        <p><strong>[질문]</strong> ${s3.question}</p>
                        <div class="quiz-options">${opt3Html}</div>
                        <div id="quizFeedback3" class="feedback-box hidden"></div>
                    </div>
                `;
                this.speakText(s3.question);
                break;

            case 4: // 4단계: 적절한 행동 선택
                const s4 = steps.step4;
                let opt4Html = s4.options.map(o => `
                    <button class="quiz-opt-btn" onclick="app.handleQuizAnswer(4, '${o.id}', ${o.isCorrect}, '${o.explanation.replace(/'/g, "\\'")}', this)">
                        <span class="opt-prefix">${o.id.toUpperCase()}</span>
                        <span>${o.text}</span>
                    </button>
                `).join('');

                container.innerHTML = `
                    <div class="step-info-box">
                        <h3>${s4.title}</h3>
                        <p><strong>[상황 선택]</strong> ${s4.question}</p>
                        <div class="quiz-options">${opt4Html}</div>
                        <div id="quizFeedback4" class="feedback-box hidden"></div>
                    </div>
                `;
                this.speakText(s4.question);
                break;

            case 5: // 5단계: 적절한 언어 표현 선택
                const s5 = steps.step5;
                let opt5Html = s5.options.map(o => `
                    <button class="quiz-opt-btn" onclick="app.handleQuizAnswer(5, '${o.id}', ${o.isCorrect}, '${o.explanation.replace(/'/g, "\\'")}', this)">
                        <span class="opt-prefix">${o.id.toUpperCase()}</span>
                        <span>${o.text}</span>
                    </button>
                `).join('');

                container.innerHTML = `
                    <div class="step-info-box">
                        <h3>${s5.title}</h3>
                        <p><strong>[언어 선택]</strong> ${s5.question}</p>
                        <div class="quiz-options">${opt5Html}</div>
                        <div style="margin-top:20px;">
                            <button class="btn btn-outline" onclick="app.openAacModal()">
                                <i class="fa-solid fa-icons"></i> 문장 만들기가 어렵다면? AAC 상징 문장 카드 사용하기
                            </button>
                        </div>
                        <div id="quizFeedback5" class="feedback-box hidden"></div>
                    </div>
                `;
                this.speakText(s5.question);
                break;

            case 6: // 6단계: 직접 말하기 (STT)
                const s6 = steps.step6;
                container.innerHTML = `
                    <div class="step-info-box" style="text-align:center;">
                        <h3>${s6.title}</h3>
                        <p>${s6.instruction}</p>
                        
                        <div class="target-sentence-display" id="targetSentenceDisplay">
                            "${s6.targetSentence}"
                        </div>

                        <div class="stt-box">
                            <button class="btn btn-secondary btn-sm" onclick="app.speakText('${s6.targetSentence.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-volume-high"></i> 모델 음성 먼저 듣기
                            </button>
                            <br>
                            <button class="mic-btn" id="micBtn" onclick="app.toggleRecording('${s6.targetSentence.replace(/'/g, "\\'")}')" title="마이크 눌러서 말하기">
                                <i class="fa-solid fa-microphone"></i>
                            </button>
                            <div class="rec-status" id="recStatusText">마이크 버튼을 누르고 자신 있게 말해보세요.</div>
                            <div class="recognized-result" id="recognizedResultText"></div>
                            <div class="speech-score-badge" id="speechScoreBadge" style="display:none;"></div>
                        </div>
                    </div>
                `;
                this.speakText(s6.instruction);
                break;

            case 7: // 7단계: 특수교육 피드백 & 보상
                const s7 = steps.step7;
                container.innerHTML = `
                    <div class="step-info-box">
                        <h3>${s7.title}</h3>
                        <div class="feedback-box" style="margin-top:20px;">
                            <div class="feedback-title"><i class="fa-solid fa-award"></i> ${s7.feedbackTitle}</div>
                            <div class="feedback-body">${s7.feedbackContent}</div>
                        </div>
                        <div style="text-align:center; margin-top:30px;">
                            <div style="font-size:3rem; color:var(--accent); animation: pulse 1.5s infinite;">
                                <i class="fa-solid fa-medal"></i>
                            </div>
                            <h4 style="margin-top:10px; font-weight:800;">${s7.badge}</h4>
                        </div>
                    </div>
                `;
                this.speakText(s7.feedbackTitle + ". " + s7.feedbackContent);
                break;

            case 8: // 8단계: 상대방 관점 고려 (Perspective Taking)
                const s8 = steps.step8;
                container.innerHTML = `
                    <div class="step-info-box">
                        <h3>${s8.title}</h3>
                        <p>내가 정중하고 올바르게 행동했을 때, 상대방은 어떤 생각을 할지 관점을 바꿔 생각해 봅시다.</p>
                        
                        <div class="perspective-container">
                            <div class="person-avatar"><i class="fa-solid fa-user"></i></div>
                            <div class="thought-bubble">
                                <strong style="color:var(--primary);">${s8.perspectivePerson}:</strong><br>
                                "${s8.thoughtText}"
                            </div>
                        </div>
                    </div>
                `;
                this.speakText(s8.thoughtText);
                break;

            case 9: // 9단계: 실전 응용 (Generalization)
                const s9 = steps.step9;
                let opt9Html = s9.options.map(o => `
                    <button class="quiz-opt-btn" onclick="app.handleQuizAnswer(9, '${o.id}', ${o.isCorrect}, '${o.explanation.replace(/'/g, "\\'")}', this)">
                        <span class="opt-prefix">${o.id.toUpperCase()}</span>
                        <span>${o.text}</span>
                    </button>
                `).join('');

                container.innerHTML = `
                    <div class="step-info-box">
                        <h3>${s9.title}</h3>
                        <p><strong>[변형 응용 상황]</strong> ${s9.question}</p>
                        <div class="quiz-options">${opt9Html}</div>
                        <div id="quizFeedback9" class="feedback-box hidden"></div>
                    </div>
                `;
                this.speakText(s9.question);
                break;

            case 10: // 10단계: 성취 리포트
                this.renderReportStep(container);
                break;
        }
    }

    handleQuizAnswer(stepNum, optId, isCorrect, explanation, btnElem) {
        const parent = btnElem.parentElement;
        parent.querySelectorAll(".quiz-opt-btn").forEach(b => {
            b.classList.remove("correct", "wrong");
        });

        if (isCorrect) {
            btnElem.classList.add("correct");
            this.speakText("정답입니다! " + explanation);
        } else {
            btnElem.classList.add("wrong");
            this.speakText("아쉽네요. " + explanation);
        }

        const fbBox = document.getElementById(`quizFeedback${stepNum}`);
        if (fbBox) {
            fbBox.classList.remove("hidden");
            fbBox.innerHTML = `
                <div class="feedback-title" style="color:${isCorrect ? 'var(--success)' : 'var(--danger)'}">
                    <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                    ${isCorrect ? '올바른 화용 선택입니다!' : '다시 생각해 보세요.'}
                </div>
                <div class="feedback-body">${explanation}</div>
            `;
        }

        this.userAnswers[`step${stepNum}`] = { optId, isCorrect };
    }

    readCurrentStepTTS() {
        const stepTitle = document.querySelector("#stepContentCard h3");
        const stepDesc = document.querySelector("#stepContentCard p");
        let text = "";
        if (stepTitle) text += stepTitle.textContent + ". ";
        if (stepDesc) text += stepDesc.textContent;
        this.speakText(text || "현재 단계의 내용을 출력합니다.");
    }

    /* ==========================================
       6. AAC (보안대체의사소통) Modal & Builder
       ========================================== */
    openAacModal() {
        document.getElementById("aacModal").classList.add("active");
    }

    closeAacModal() {
        document.getElementById("aacModal").classList.remove("active");
    }

    switchAacCategory(catKey) {
        this.currentAacCategory = catKey;
        document.querySelectorAll("#aacTabs .tab-btn").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("onclick").includes(catKey));
        });
        this.renderAacTiles();
    }

    renderAacTiles() {
        const grid = document.getElementById("aacTilesGrid");
        grid.innerHTML = "";
        const tiles = AAC_DICTIONARY[this.currentAacCategory] || [];

        tiles.forEach(t => {
            const tile = document.createElement("div");
            tile.className = "aac-tile";
            tile.onclick = () => this.addAacTile(t);

            tile.innerHTML = `
                <div class="tile-icon"><i class="fa-solid ${t.icon}"></i></div>
                <div class="tile-text">${t.text}</div>
            `;
            grid.appendChild(tile);
        });
    }

    addAacTile(tileObj) {
        this.aacSentence.push(tileObj);
        this.renderAacSentenceSlot();
        this.speakText(tileObj.text);
    }

    clearAacSentence() {
        this.aacSentence = [];
        this.renderAacSentenceSlot();
    }

    renderAacSentenceSlot() {
        const slot = document.getElementById("aacSlotTiles");
        if (this.aacSentence.length === 0) {
            slot.innerHTML = `<span class="placeholder-text">아래 카드를 클릭하여 문장을 조합하세요...</span>`;
            return;
        }

        slot.innerHTML = this.aacSentence.map(t => `
            <span class="badge-tag age-tag" style="font-size:0.9rem; padding:6px 12px; display:inline-flex; align-items:center; gap:6px;">
                <i class="fa-solid ${t.icon}"></i> ${t.text}
            </span>
        `).join('');
    }

    speakAacSentence() {
        const fullText = this.aacSentence.map(t => t.text).join(' ');
        if (!fullText) {
            this.speakText("문장 타일을 먼저 추가해 주세요.");
            return;
        }
        this.speakText(fullText);
    }

    applyAacToEngine() {
        const fullText = this.aacSentence.map(t => t.text).join(' ');
        if (!fullText) {
            alert("조합된 문장이 없습니다.");
            return;
        }
        this.closeAacModal();
        if (this.currentStep === 6) {
            this.handleSpeechResult(fullText);
        } else {
            alert(`조합한 AAC 문장: "${fullText}"\n이 적용되었습니다!`);
        }
    }

    /* ==========================================
       7. Achievement Report & Canvas Charts
       ========================================== */
    openReportModal() {
        this.renderReportContent(document.getElementById("reportModalBody"));
        document.getElementById("reportModal").classList.add("active");
    }

    closeReportModal() {
        document.getElementById("reportModal").classList.remove("active");
    }

    renderReportStep(container) {
        container.innerHTML = `
            <div class="step-info-box">
                <h3>10단계: 화용언어 종합 성취 리포트</h3>
                <div id="stepReportContainer"></div>
            </div>
        `;
        this.renderReportContent(document.getElementById("stepReportContainer"));
    }

    renderReportContent(targetElem) {
        const s10 = this.currentScenario ? this.currentScenario.steps.step10 : {
            scores: { cueRecognition: 90, intentInference: 85, actionSelection: 95, expressionAccuracy: 90, speechPronunciation: 88 },
            summaryText: "종합 화용 능력이 매우 우수합니다."
        };

        targetElem.innerHTML = `
            <div class="report-grid">
                <div class="report-card">
                    <h4><i class="fa-solid fa-chart-column"></i> 영역별 수행도 (특수교육 SLP 평가)</h4>
                    <canvas id="reportBarChart" width="360" height="240"></canvas>
                </div>
                <div class="report-card">
                    <h4><i class="fa-solid fa-clipboard-check"></i> 종합 분석 및 지도 제안</h4>
                    <p style="margin-bottom:12px;"><strong>시나리오:</strong> ${this.currentScenario ? this.currentScenario.title : '기본 시나리오'}</p>
                    <p style="margin-bottom:12px;"><strong>적용 프로필:</strong> ${this.getAgeText()} / ${this.getLevelText()}</p>
                    
                    <div class="feedback-box" style="margin-top:16px;">
                        <div class="feedback-title"><i class="fa-solid fa-user-doctor"></i> 언어치료사(SLP) 총평</div>
                        <div class="feedback-body">
                            학습자는 상황 판단 및 사회적 단서 수용 능력이 우수하며, '정중한 언어 요청' 패턴을 성공적으로 형성하였습니다. 차후 유사 상황에서도 자신 있게 표현하도록 권장합니다.
                        </div>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => this.drawReportChart(s10.scores), 100);
    }

    drawReportChart(scores) {
        const canvas = document.getElementById("reportBarChart");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const labels = ["단서 파악", "의도 추론", "행동 선택", "표현 선택", "발화 정확"];
        const data = [
            scores.cueRecognition || 90,
            scores.intentInference || 85,
            scores.actionSelection || 95,
            scores.expressionAccuracy || 90,
            scores.speechPronunciation || 88
        ];

        const barWidth = 40;
        const gap = 24;
        const startX = 30;
        const maxBarHeight = 150;

        for (let i = 0; i < data.length; i++) {
            const x = startX + i * (barWidth + gap);
            const val = data[i];
            const h = (val / 100) * maxBarHeight;
            const y = 190 - h;

            // Draw Bar Gradient
            const gradient = ctx.createLinearGradient(0, y, 0, 190);
            gradient.addColorStop(0, "#2563EB");
            gradient.addColorStop(1, "#0D9488");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, h, [6, 6, 0, 0]);
            ctx.fill();

            // Value text
            ctx.fillStyle = "#0F172A";
            ctx.font = "bold 12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`${val}%`, x + barWidth / 2, y - 6);

            // Label text
            ctx.fillStyle = "#64748B";
            ctx.font = "11px sans-serif";
            ctx.fillText(labels[i], x + barWidth / 2, 210);
        }
    }
}

// Global App Instance
const app = new SocialTalkApp();
document.addEventListener("DOMContentLoaded", () => app.init());
