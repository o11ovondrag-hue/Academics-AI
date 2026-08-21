document.addEventListener('DOMContentLoaded', () => {
  const ENCODED_KEY = "QVEuQWI4Uk42TDAxWUxxNUJzOGNDcloyLUFIMzJfZlZGSlN2dVpTbGVybEc1bXVTRjFGZ3c="; 
  const GEMINI_API_KEY = atob(ENCODED_KEY);

  let currentLang = 'ru';
  let savedSyllabi = JSON.parse(localStorage.getItem('academic_syllabi')) || [];
  let loadedFileText = "";

  const i18n = {
    ru: {
      nav_generator: "Генератор", nav_registry: "Реестр курсов", nav_analytics: "Анализ источников", nav_time: "Тайм-менеджмент",
      gen_title: "Генератор академических программ", gen_subtitle: "Автоматическое формирование силлабуса и учебного плана",
      lbl_title: "Название дисциплины", lbl_level: "Академический уровень", lbl_weeks: "Длительность (недель)", lbl_domain: "Предметная область",
      opt_ba_basic: "Бакалавриат — базовый", opt_ba_adv: "Бакалавриат — продвинутый", opt_ma: "Магистратура", opt_phd: "PhD / Докторантура",
      opt_history: "История и Источниковедение", opt_linguistics: "Языкознание и Лингвистика", opt_political: "Политология и Международные отношения", opt_sociology: "Социология и Философия", opt_culture: "Культурология и Антропология",
      btn_generate: "Сформировать курс", msg_loading: "Генерация учебного плана... Пожалуйста, подождите.",
      reg_title: "Реестр сохраненных курсов", reg_subtitle: "Ваша локальная библиотека силлабусов",
      an_title: "Академический разбор источников", an_subtitle: "Глубокий 8-уровневый разбор текстов и документов",
      lbl_file: "Загрузить PDF или TXT файл:", lbl_text: "Или вставьте текст вручную:", lbl_category: "Категория источника:", lbl_focus: "Фокус анализа:",
      opt_art: "Научная статья", opt_book: "Монография / Глава книги", opt_arch: "Исторический архивный документ", opt_pol: "Аналитический доклад",
      opt_f_bal: "Общий сбалансированный разбор", opt_f_meth: "Акцент на методологии", opt_f_src: "Акцент на источниках и цитатах", opt_f_ctx: "Историко-политологический контекст",
      btn_analyze: "Провести разбор", msg_analyzing: "Идет анализ текста...",
      time_title: "Калькулятор учебной нагрузки", time_subtitle: "Оценка затрат времени и кредитов ECTS",
      lbl_pages: "Общий объем страниц для чтения:", lbl_calc_weeks: "Количество недель курса:", btn_calc: "Рассчитать нагрузку",
      level_label: "Уровень", weeks_label: "Недель", week_str: "Неделя", delete_btn: "Удалить", open_btn: "Открыть", close_btn: "Закрыть", no_courses: "Нет сохраненных курсов",
      sec1: "1. Библиографический контекст и метаданные",
      sec2: "2. Главная тезисная база и исследовательские вопросы",
      sec3: "3. Теоретико-методологическая рамка и концепты",
      sec4: "4. Методология и источники данных",
      sec5: "5. Ключевые эмпирические результаты",
      sec6: "6. Академический вклад и практическая значимость",
      sec7: "7. Критическая оценка и ограничения",
      sec8: "8. Цитаты и ключевые фрагменты"
    },
    en: {
      nav_generator: "Generator", nav_registry: "Course Registry", nav_analytics: "Source Analysis", nav_time: "Time Management",
      gen_title: "Academic Syllabus Generator", gen_subtitle: "Automated course outline and curriculum generation",
      lbl_title: "Course Title", lbl_level: "Academic Level", lbl_weeks: "Duration (weeks)", lbl_domain: "Discipline",
      opt_ba_basic: "Bachelor (BA) — Introductory", opt_ba_adv: "Bachelor (BA) — Advanced", opt_ma: "Master (MA)", opt_phd: "PhD / Doctoral",
      opt_history: "History & Source Studies", opt_linguistics: "Linguistics", opt_political: "Political Science & IR", opt_sociology: "Sociology & Philosophy", opt_culture: "Cultural Studies",
      btn_generate: "Generate Syllabus", msg_loading: "Generating curriculum... Please wait.",
      reg_title: "Saved Courses Registry", reg_subtitle: "Your local syllabus library",
      an_title: "Academic Source Analysis", an_subtitle: "Deep 8-level document analysis",
      lbl_file: "Upload PDF or TXT file:", lbl_text: "Or paste text manually:", lbl_category: "Source Category:", lbl_focus: "Analysis Focus:",
      opt_art: "Journal Article", opt_book: "Monograph / Book Chapter", opt_arch: "Historical Archival Document", opt_pol: "Policy Paper",
      opt_f_bal: "Balanced Overview", opt_f_meth: "Focus on Methodology", opt_f_src: "Focus on Sources & Citations", opt_f_ctx: "Historical & Political Context",
      btn_analyze: "Analyze Text", msg_analyzing: "Analyzing text...",
      time_title: "Workload Calculator", time_subtitle: "Estimate reading hours and ECTS credits",
      lbl_pages: "Total pages to read:", lbl_calc_weeks: "Course duration (weeks):", btn_calc: "Calculate Load",
      level_label: "Level", weeks_label: "Weeks", week_str: "Week", delete_btn: "Delete", open_btn: "Open", close_btn: "Close", no_courses: "No saved courses",
      sec1: "1. Bibliographic & Contextual Metadata",
      sec2: "2. Core Thesis & Research Questions",
      sec3: "3. Theoretical Frameworks & Concepts",
      sec4: "4. Methodological Assessment & Data Sources",
      sec5: "5. Key Findings & Empirical Analysis",
      sec6: "6. Academic Contribution & Policy Implications",
      sec7: "7. Critical Evaluation & Limitations",
      sec8: "8. Citations & Key Excerpts"
    },
    kz: {
      nav_generator: "Генератор", nav_registry: "Курстар тізілімі", nav_analytics: "Дереккөздерді талдау", nav_time: "Тайм-менеджмент",
      gen_title: "Академиялық бағдарламалар генераторы", gen_subtitle: "Силлабус пен оқу жоспарын автоматты түрде жасау",
      lbl_title: "Пәннің атауы", lbl_level: "Академиялық деңгей", lbl_weeks: "Уақыты (апта)", lbl_domain: "Пән саласы",
      opt_ba_basic: "Бакалавриат — базистік", opt_ba_adv: "Бакалавриат — тереңдетілген", opt_ma: "Магистратура", opt_phd: "PhD / Докторантура",
      opt_history: "Тарих және Деректану", opt_linguistics: "Тіл білімі мен Лингвистика", opt_political: "Саясаттану және Халықаралық қатынастар", opt_sociology: "Әлеуметтану және Философия", opt_culture: "Мәдениеттану және Антропология",
      btn_generate: "Курсты қалыптастыру", msg_loading: "Оқу жоспары дайындалуда... Күте тұрыңыз.",
      reg_title: "Сақталған курстар тізілімі", reg_subtitle: "Силлабустардың жергілікті кітапханасы",
      an_title: "Дереккөздерді академиялық талдау", an_subtitle: "Мәтіндерді 8 деңгейлі терең талдау",
      lbl_file: "PDF немесе TXT файлын жүктеу:", lbl_text: "Немесе мәтінді қолмен қойыңыз:", lbl_category: "Дереккөз санаты:", lbl_focus: "Талдау бағыты:",
      opt_art: "Ғылыми мақала", opt_book: "Монография / Кітап тарауы", opt_arch: "Тарихи архивтік құжат", opt_pol: "Талдамалық баяндама",
      opt_f_bal: "Жалпы теңгерімді талдау", opt_f_meth: "Әдіснамаға басымдық беру", opt_f_src: "Дереккөздер мен иектерге басымдық", opt_f_ctx: "Тарихи-саяси контекст",
      btn_analyze: "Талдау жүргізу", msg_analyzing: "Мәтін талдануда...",
      time_title: "Оқу жүктемесінің калькуляторы", time_subtitle: "Уақыт пен ECTS кредиттерін есептеу",
      lbl_pages: "Оқитын беттердің жалпы көлемі:", lbl_calc_weeks: "Курстың апта саны:", btn_calc: "Жүктемені есептеу",
      level_label: "Деңгейі", weeks_label: "Апта", week_str: "Апта", delete_btn: "Жою", open_btn: "Ашу", close_btn: "Жабу", no_courses: "Сақталған курстар жоқ",
      sec1: "1. Библиографиялық контекст және метадеректер",
      sec2: "2. Негізгі тезистік база және зерттеу сұрақтары",
      sec3: "3. Теориялық-әдіснамалық шеңбер және тұжырымдар",
      sec4: "4. Әдіснама және деректер көздері",
      sec5: "5. Негізгі эмппирикалық нәтижелер",
      sec6: "6. Академиялық үлес және практикалық маңызы",
      sec7: "7. Сын тұрғысынан бағалау және шектеулер",
      sec8: "8. Дәйексөздер мен негізгі үзінділер"
    }
  };

  // Парсер карточной сетки (Grid UI)
  function parseAdvancedDashboardUI(text) {
    if (!text) return '';
    let html = text.trim();

    // 1. Контейнер карточки для разделов
    html = html.replace(/^(?:###?\s*)?(\d+\.\s+[^\n]+)/gim, '</div></div><div class="dashboard-card"><div class="dash-card-header">$1</div><div class="dash-card-grid">');

    // 2. Цитаты (Раздел 8)
    html = html.replace(/\[CITATION\]\s*([^:\n]+):\s*"([^"]+)"/gim, `
      <div class="quote-card">
        <div class="quote-topic">$1</div>
        <div class="quote-body">“$2”</div>
      </div>
    `);

    // 3. Превращаем [ITEM] в блочные карточки с бэджами
    html = html.replace(/\[ITEM\]\s*([^|]+)\|\s*([^|]+)\|\s*([^\n]+)/gim, (match, title, core, detail) => {
      let badgeClass = "badge-blue";
      const t = title.toLowerCase();

      if (t.includes('limit') || t.includes('risk') || t.includes('bias') || t.includes('gap') || t.includes('ambiguity') || t.includes('asymmetry') || t.includes('ограничен') || t.includes('риск')) {
        badgeClass = "badge-amber";
      } else if (t.includes('finding') || t.includes('result') || t.includes('contribution') || t.includes('thesis') || t.includes('находк') || t.includes('вывод')) {
        badgeClass = "badge-green";
      }

      return `
        <div class="grid-item-card">
          <div class="item-header">
            <span class="dash-badge ${badgeClass}">${title.trim().toUpperCase()}</span>
          </div>
          <div class="item-core-claim">${core.trim()}</div>
          <div class="item-detail-text">${detail.trim()}</div>
        </div>
      `;
    });

    if (html.startsWith('</div></div>')) {
      html = html.substring(12);
    }

    return html + '</div></div>';
  }

  function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang-key]').forEach(el => {
      const key = el.getAttribute('data-lang-key');
      if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    renderRegistry();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => setLanguage(e.target.getAttribute('data-lang')));
  });

  document.body.addEventListener('click', (e) => {
    const navBtn = e.target.closest('.nav-item');
    if (!navBtn) return;
    const targetTab = navBtn.getAttribute('data-tab');

    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    navBtn.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    const activeSection = document.getElementById(`tab-${targetTab}`);
    if (activeSection) activeSection.classList.remove('hidden');

    if (targetTab === 'registry') renderRegistry();
  });

  async function callGemini(promptText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
    });
    const data = await response.json();
    if (response.ok && data.candidates && data.candidates[0]) {
      let raw = data.candidates[0].content.parts[0].text;
      return raw.replace(/```json/g, '').replace(/```/g, '').trim();
    }
    throw new Error(data.error?.message || "API Error");
  }

  // 1. GENERATOR MODULE
  const generatorForm = document.getElementById('generator-form');
  if (generatorForm) {
    generatorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('course-title').value.trim();
      const levelSelect = document.getElementById('course-level');
      const levelText = levelSelect.options[levelSelect.selectedIndex].text;
      const weeks = document.getElementById('course-weeks').value;

      const loader = document.getElementById('loader');
      const resultContainer = document.getElementById('result-container');
      const outputContent = document.getElementById('output-content');

      loader.classList.remove('hidden');
      resultContainer.classList.add('hidden');

      const prompt = `Сформируй учебную программу курса.
ОБЯЗАТЕЛЬНО: Ответ должен быть ТОЛЬКО на языке "${currentLang}".
Название: "${title}", Уровень: ${levelText}, Длительность: ${weeks} недель.

Верни СТРОГО JSON:
{
  "course_title": "${title}",
  "academic_level": "${levelText}",
  "weeks_count": ${weeks},
  "summary": "Краткое описание курса",
  "schedule": [
    {"week": 1, "topic": "Тема", "lecture": "Лекционный материал", "reading": "Основная литература"}
  ]
}`;

      try {
        const responseText = await callGemini(prompt);
        const data = JSON.parse(responseText);
        data.id = Date.now();
        
        outputContent.innerHTML = renderSyllabusHTML(data);
        resultContainer.classList.remove('hidden');

        savedSyllabi.unshift(data);
        localStorage.setItem('academic_syllabi', JSON.stringify(savedSyllabi));
      } catch (err) {
        alert("Ошибка генерации: " + err.message);
      } finally {
        loader.classList.add('hidden');
      }
    });
  }

  function renderSyllabusHTML(data) {
    const t = i18n[currentLang];
    return `
      <div class="card" style="margin-top: 16px; border-top: 3px solid var(--primary, #0284c7);">
        <h2>🎓 ${data.course_title}</h2>
        <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">
          ${t.level_label}: ${data.academic_level} | ${t.weeks_label}: ${data.weeks_count}
        </p>
        <p style="margin-top: 12px; line-height: 1.5;">${data.summary}</p>
        <hr style="margin: 16px 0; border: 0; border-top: 1px solid var(--border);">
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${data.schedule ? data.schedule.map(s => `
            <div style="background: var(--bg-main); padding: 12px; border-radius: 6px; border: 1px solid var(--border, #e2e8f0);">
              <strong style="color: var(--primary, #0284c7);">${t.week_str} ${s.week}: ${s.topic}</strong>
              <p style="margin: 4px 0; font-size: 13.5px;">${s.lecture}</p>
              <small style="color: var(--text-muted);">📚 ${s.reading}</small>
            </div>
          `).join('') : ''}
        </div>
      </div>
    `;
  }

  // 2. REGISTRY MODULE (Open / Close buttons)
  function renderRegistry() {
    const list = document.getElementById('syllabi-list');
    if (!list) return;

    if (savedSyllabi.length === 0) {
      list.innerHTML = `<li style="color: var(--text-muted); font-size: 14px;">${i18n[currentLang].no_courses}</li>`;
      return;
    }

    list.innerHTML = savedSyllabi.map(item => `
      <li class="card" style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="font-size: 16px;">${item.course_title}</strong>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${item.academic_level} • ${item.weeks_count} ${i18n[currentLang].weeks_label}</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-toggle" data-id="${item.id}" style="background: var(--primary, #0284c7); color: white; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-weight: 500; min-width: 80px;">
              ${i18n[currentLang].open_btn}
            </button>
            <button class="btn-delete" data-id="${item.id}" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">
              ${i18n[currentLang].delete_btn}
            </button>
          </div>
        </div>
        <div id="details-${item.id}" class="hidden" style="margin-top: 16px; border-top: 1px solid var(--border); padding-top: 8px;">
          ${renderSyllabusHTML(item)}
        </div>
      </li>
    `).join('');

    list.querySelectorAll('.btn-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const details = document.getElementById(`details-${id}`);
        if (!details) return;

        const isHidden = details.classList.contains('hidden');
        if (isHidden) {
          details.classList.remove('hidden');
          e.target.textContent = i18n[currentLang].close_btn;
          e.target.style.background = "#64748b";
        } else {
          details.classList.add('hidden');
          e.target.textContent = i18n[currentLang].open_btn;
          e.target.style.background = "var(--primary, #0284c7)";
        }
      });
    });

    list.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.target.getAttribute('data-id'));
        savedSyllabi = savedSyllabi.filter(s => s.id !== id);
        localStorage.setItem('academic_syllabi', JSON.stringify(savedSyllabi));
        renderRegistry();
      });
    });
  }

  // 3. ANALYTICS MODULE (Multilingual + Grid UI)
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      const status = document.getElementById('file-status');
      if (!file) return;

      if (file.type === "text/plain") {
        loadedFileText = await file.text();
        if (status) status.textContent = `Загружен TXT (${file.name})`;
      } else if (file.type === "application/pdf") {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let fullText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            fullText += content.items.map(item => item.str).join(" ") + "\n";
          }
          loadedFileText = fullText;
          if (status) status.textContent = `Загружен PDF (${file.name}, ${pdf.numPages} стр.)`;
        } catch (err) {
          alert("Ошибка чтения PDF: " + err.message);
        }
      }
    });
  }

  const btnAnalyze = document.getElementById('btn-analyze-text');
  if (btnAnalyze) {
    btnAnalyze.addEventListener('click', async () => {
      const manualText = document.getElementById('source-text-input').value.trim();
      const textToAnalyze = manualText || loadedFileText;

      if (!textToAnalyze) {
        alert("Загрузите файл или вставьте текст для анализа.");
        return;
      }

      const loader = document.getElementById('analytics-loader');
      const output = document.getElementById('analytics-output');
      loader.classList.remove('hidden');
      output.classList.add('hidden');

      const t = i18n[currentLang];

      const prompt = `Проведи аналитический разбор текста. Все заголовки и текст пиши СТРОГО на языке: "${currentLang}".

СТРОГИЕ ПРАВИЛА ФОРМАТА (НЕ ИСПОЛЬЗУЙ МОНОТОННЫЕ ДЛИННЫЕ ПРЕДЛОЖЕНИЯ!):
1. Использовать СТРОГО следующие 8 названий разделов (на языке "${currentLang}"):
${t.sec1}
${t.sec2}
${t.sec3}
${t.sec4}
${t.sec5}
${t.sec6}
${t.sec7}
${t.sec8}

2. Для разделов с 1 по 7 пиши каждый пункт СТРОГО в 3 части через символ "|":
   Формат: [ITEM] Тег_Ключ | Короткий_Главный_Вывод (3-7 слов) | Подробности и доказательства из текста (1-2 коротких предложения).
   Пример: [ITEM] Methodological Dependency | Упор на вторичные источники | Исследование базируется на качественном обзоре литературы.

3. Для раздела 8 пиши в формате:
   [CITATION] Тема_Цитаты: "Текст цитаты (стр. Х)"

4. Без вводных и заключительных слов.

Текст: "${textToAnalyze.substring(0, 5000)}"`;

      try {
        const responseText = await callGemini(prompt);
        
        output.innerHTML = `
          <style>
            .analytics-dashboard {
              display: flex;
              flex-direction: column;
              gap: 24px;
              margin-top: 20px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .dashboard-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.04);
              overflow: hidden;
            }
            .dash-card-header {
              background: #0f172a;
              color: #ffffff;
              padding: 12px 20px;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              border-bottom: 2px solid #0284c7;
            }
            .dash-card-grid {
              padding: 16px;
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 14px;
              background: #f8fafc;
            }
            .grid-item-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 14px;
              display: flex;
              flex-direction: column;
              gap: 6px;
              box-shadow: 0 1px 2px rgba(0,0,0,0.02);
            }
            .item-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .dash-badge {
              font-size: 10px;
              font-weight: 800;
              padding: 3px 8px;
              border-radius: 4px;
              letter-spacing: 0.5px;
            }
            .badge-blue { background: #e0f2fe; color: #0369a1; }
            .badge-amber { background: #fef3c7; color: #b45309; }
            .badge-green { background: #dcfce7; color: #15803d; }

            .item-core-claim {
              font-size: 14px;
              font-weight: 700;
              color: #0f172a;
              line-height: 1.3;
            }
            .item-detail-text {
              font-size: 12.5px;
              color: #64748b;
              line-height: 1.5;
            }
            .quote-card {
              grid-column: 1 / -1;
              background: #ffffff;
              border-left: 4px solid #0284c7;
              border-radius: 6px;
              padding: 12px 16px;
              border-top: 1px solid #e2e8f0;
              border-right: 1px solid #e2e8f0;
              border-bottom: 1px solid #e2e8f0;
            }
            .quote-topic {
              font-size: 11px;
              font-weight: 700;
              color: #0284c7;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .quote-body {
              font-size: 13px;
              font-style: italic;
              color: #334155;
              line-height: 1.5;
            }
          </style>

          <div class="analytics-dashboard">
            ${parseAdvancedDashboardUI(responseText)}
          </div>`;
        output.classList.remove('hidden');
      } catch (err) {
        alert("Ошибка анализа: " + err.message);
      } finally {
        loader.classList.add('hidden');
      }
    });
  }

  // 4. TIME MANAGEMENT MODULE
  const btnCalc = document.getElementById('btn-calc');
  if (btnCalc) {
    btnCalc.addEventListener('click', () => {
      const pages = parseFloat(document.getElementById('calc-pages').value) || 0;
      const weeks = parseFloat(document.getElementById('calc-weeks').value) || 1;

      const readingHours = pages / 10;
      const totalHours = readingHours * 1.5;
      const hoursPerWeek = (totalHours / weeks).toFixed(1);
      const ects = (totalHours / 27).toFixed(1);

      let calcResult = document.getElementById('calc-result');
      if (!calcResult) {
        calcResult = document.createElement('div');
        calcResult.id = 'calc-result';
        calcResult.className = 'card';
        calcResult.style.marginTop = '16px';
        document.getElementById('tab-time').appendChild(calcResult);
      }

      const labels = {
        ru: { title: "Результаты расчета", total: "Всего часов работы:", perWeek: "Часов в неделю:", ects: "Ориентировочно ECTS:" },
        en: { title: "Workload Estimation", total: "Total Study Hours:", perWeek: "Hours per Week:", ects: "Estimated ECTS:" },
        kz: { title: "Есептеу нәтижесі", total: "Жалпы жұмыс сағаты:", perWeek: "Аптасына сағат:", ects: "Болжалды ECTS:" }
      }[currentLang];

      calcResult.innerHTML = `
        <h3>📊 ${labels.title}</h3>
        <p style="margin-top: 8px;"><strong>${labels.total}</strong> ~${Math.round(totalHours)} ч.</p>
        <p><strong>${labels.perWeek}</strong> ~${hoursPerWeek} ч./нед.</p>
        <p><strong>${labels.ects}</strong> ${ects} ECTS</p>
      `;
    });
  }
});
