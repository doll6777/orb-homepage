(() => {
  'use strict';
  const data = window.OMOKI_DATA;
  const matching = window.OMOKI_MATCHING;
  const main = document.querySelector('#main');
  const sharing = window.OMOKI_SHARING;
  const icons = () => window.lucide?.createIcons();
  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad = value => String(value).padStart(2, '0');
  const hasAnswer = id => Object.hasOwn(state.answers, id);
  const art = {1:'01-cosmos.png',2:'02-sunflower.png',3:'03-cactus.png',4:'04-ivy.png'};
  const topics = {
    outward:'생각을 모으는 순간', information:'처음 만나는 업무 앞에서',
    decision:'하나의 답을 골라야 할 때', structure:'나만의 업무 리듬',
    novelty:'익숙한 일, 새로운 방법', uncertainty:'아직 답을 모르는 순간',
    social:'함께 일하는 우리', persistence:'생각보다 오래 걸리는 일'
  };
  const pairLabels = ['완전 A예요','A 쪽에 가까워요','둘 다 비슷해요','B 쪽에 가까워요','완전 B예요'];
  const frequencyLabels = ['전혀 없었어요','거의 없었어요','가끔 있었어요','자주 있었어요','거의 늘 그랬어요'];
  // Interleave topics within each block without changing the authored item wording.
  const questions = [data.dimensions.slice(0,4), data.dimensions.slice(4)].flatMap(block =>
    [0,1,2].flatMap(item => block.map(d => data.questions.filter(q => q.dimension === d.id)[item]))
  );
  const state = {index:0,answers:{},group:'all',search:'',selectionSource:'sample',tieChoice:null};
  const completed = () => questions.every(q=>hasAnswer(q.id));
  const answerSignature = () => JSON.stringify([matching.version,...data.questions.map(q=>state.answers[q.id])]);
  const editorial = window.OMOKI_STORIES;
  const relationships = window.OMOKI_RELATIONSHIPS;


  // Remove the previous preview's saved responses; new responses live only in memory.
  try { sessionStorage.removeItem('orb-omoki-preview-v02'); } catch { /* Storage may be disabled. */ }

  function restartQuiz() {
    state.answers={};state.index=0;state.tieChoice=null;state.selectionSource='sample';
    navigate('#quiz');
  }
  function openQuiz() {
    if(completed()) restartQuiz();
    else navigate('#quiz');
  }
  function toast(message) {
    const el = document.querySelector('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'),3500);
  }
  function artHTML(id, portrait = false) {
    const type=data.types.find(t=>t.id===id);
    if (!type) return '';
    if (!portrait && art[id]) return `<div class="character-crop"><img src="./assets/${art[id]}" alt="${escape(type.plant)}형 오목이의 직장생활 일러스트" /></div>`;
    // The generated atlas has individually measured row bounds, not equal row heights.
    const rows=[[0,220],[220,210],[430,220],[650,213],[863,224],[1087,245]];
    const row=Math.floor((id-1)/5), col=(id-1)%5;
    const [top,height]=rows[row];
    return `<span class="character-portrait" style="aspect-ratio:229/${height}"><img src="./omoki-atlas-v1.png" alt="${escape(type.plant)}형 ${escape(type.title)} 오목이" style="width:500%;left:${-col*100}%;top:${-top/height*100}%" /></span>`;
  }
  function navigate(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  }
  function focusHeading() {
    const heading = main.querySelector('h1');
    if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
  }
  function setActive(view) {
    document.querySelectorAll('[data-view]').forEach(button => {
      if (button.dataset.view === view) button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    });
    document.querySelector('[data-view=result]').textContent=completed()?'내 결과':'결과 예시';
    document.querySelector('[data-view=quiz]').textContent='문항 체험';
  }
  function progressHTML() {
    return `<div class="progress-region"><span><b>${pad(state.index+1)}</b> / 24</span><div class="progress-track" role="progressbar" aria-label="문항 진행" aria-valuenow="${state.index+1}" aria-valuemin="0" aria-valuemax="24"><div class="progress-fill" style="width:${(state.index+1)/24*100}%"></div></div></div>`;
  }
  function renderQuiz() {
    setActive('quiz');
    const q = questions[state.index];
    const paired = !!q.a;
    const scale = paired ? pairLabels : frequencyLabels;
    const answered = hasAnswer(q.id);
    const current = state.answers[q.id];
    const companionId = state.index < 6 ? 1 : state.index < 12 ? 4 : state.index < 18 ? 2 : 3;
    main.innerHTML = `<section class="quiz-shell enter" aria-labelledby="question-title">
      <div class="quiz-top"><div class="step-label"><strong>CHAPTER ${state.index<12?'01':'02'}</strong><span>${state.index<12?'일하는 나의 방식':'회사에서 자주 있는 일'}</span></div>${progressHTML()}</div>
      <div class="quiz-layout">
        <div class="question-panel">
          <div class="eyebrow">${topics[q.dimension]}</div>
          <h1 id="question-title" class="question-heading">${escape(q.text)}</h1>
          <p class="question-note">${paired?'최근 4주 동안, 나는 어느 쪽에 더 가까웠나요?':'최근 4주 동안, 얼마나 자주 그랬나요?'}</p>
          <div class="answer-anchors"><div class="anchor"><span class="anchor-label">${paired?'A':'거의 없었다면'}</span><p>${escape(paired?q.a:'내게는 드문 일이에요.')}</p></div><div class="anchor"><span class="anchor-label">${paired?'B':'자주 있었다면'}</span><p>${escape(paired?q.b:'내게 익숙한 일이에요.')}</p></div></div>
          <div class="answer-scale" role="radiogroup" aria-labelledby="question-title">${scale.map((label,value)=>`<label class="answer-choice" title="${label}"><input type="radio" name="answer" value="${value}" aria-label="${label}" ${answered && current===value?'checked':''} /><span class="answer-circle">${icon('check')}</span></label>`).join('')}</div>
          <div class="scale-labels" aria-hidden="true"><span>${paired?'A에 가까워요':'전혀 없었어요'}</span><span>${paired?'중간':'가끔 있었어요'}</span><span>${paired?'B에 가까워요':'거의 늘 그랬어요'}</span></div>
          <button type="button" class="skip-answer" id="skip-answer" aria-pressed="${answered&&current===null}">겪어본 적 없거나 잘 모르겠어요</button>
          <div class="question-actions"><button type="button" class="icon-button" id="previous" title="이전 문항" aria-label="이전 문항" ${state.index===0?'disabled':''}>${icon('arrow-left')}</button><button type="button" class="primary-button" id="next" ${!answered?'disabled':''}><span>${state.index===23?'나의 오목이 보기':'다음으로'}</span>${icon('arrow-right')}</button></div>
        </div>
        <aside class="companion"><div class="companion-top"><span>OFFICE MOMENTS</span></div>${artHTML(companionId)}</aside>
      </div>
      <div class="quiz-bottom"><span>${icon('lock-keyhole')}응답은 외부로 전송하지 않아요.</span><button class="text-button" id="restart">처음부터 다시</button></div>
    </section>`;
    main.querySelectorAll('input[name=answer]').forEach(input=>input.addEventListener('change',()=>{
      state.answers[q.id]=Number(input.value);state.tieChoice=null;
      document.querySelector('#next').disabled=false;
      document.querySelector('#skip-answer').setAttribute('aria-pressed','false');
    }));
    document.querySelector('#skip-answer').addEventListener('click',()=>{
      state.answers[q.id]=null;state.tieChoice=null;
      main.querySelectorAll('input[name=answer]').forEach(input=>input.checked=false);
      document.querySelector('#next').disabled=false;
      document.querySelector('#skip-answer').setAttribute('aria-pressed','true');
    });
    document.querySelector('#previous').addEventListener('click',()=>{if(state.index>0){state.index--;renderQuiz();icons();focusHeading();}});
    document.querySelector('#next').addEventListener('click',()=>{
      if(!hasAnswer(q.id))return;
      if(state.index===23)navigate('#my-result');
      else{state.index++;renderQuiz();icons();focusHeading();}
    });
    document.querySelector('#restart').addEventListener('click',()=>document.querySelector('#restart-dialog').showModal());
  }

  function resultDescription(d) {
    const qs=data.questions.filter(q=>q.dimension===d.id);
    const values=qs.map(q=>state.answers[q.id]);
    const valid=values.filter(value=>typeof value==='number');
    if(valid.length<3)return {text:'이 항목은 해석을 보류했어요.',note:`3문항 중 ${valid.length}문항에 구체적인 답변이 있어요.`};
    if(d.format==='paired'){
      const average=valid.reduce((a,b)=>a+b,0)/3;
      return {text:average===2?'두 방식이 비슷하게 나타났어요.':`답변은 ‘${average<2?d.left:d.right}’ 쪽에 가까웠어요.`,note:'세 문항의 선택을 묶은 설명이며, 고정된 성격을 뜻하지 않아요.'};
    }
    const counts=frequencyLabels.map((label,value)=>({label,count:valid.filter(v=>v===value).length}));
    const highest=Math.max(...counts.map(c=>c.count));
    const modes=counts.filter(c=>c.count===highest);
    return {text:modes.length===1?`‘${modes[0].label}’를 ${modes[0].count}번 골랐어요.`:'세 상황에서 서로 다른 빈도를 골랐어요.',note:'빈도 응답 그대로의 요약이에요. 높고 낮은 성격 등급이 아닙니다.'};
  }
  function renderMyResult() {
    const result=matching.match(state.answers,data);
    if(result.status==='incomplete'){
      state.index=questions.findIndex(q=>result.unanswered.includes(q.id));navigate('#quiz');return;
    }
    if(result.status==='insufficient'){
      setActive('result');
      main.innerHTML=`<section class="page-shell enter"><div class="page-intro"><div><div class="eyebrow">아직 연결하지 않은 이야기</div><h1>답변을 조금 더<br>들려줄 수 있나요?</h1><p>‘판단하기 어려움’이 많아 임의의 오목이를 정하지 않았어요. 각 장에서 최소 3항목씩, 총 6항목의 답변이 필요해요. 한 항목은 3문항으로 구성돼요.</p></div></div><div class="summary-action"><button class="primary-button" id="fill-answers">넘긴 문항 돌아보기 ${icon('arrow-right')}</button></div><button class="text-button" id="view-summary">내 응답 보기</button></section>`;
      document.querySelector('#fill-answers').addEventListener('click',()=>{state.index=questions.findIndex(q=>state.answers[q.id]===null);navigate('#quiz');});
      document.querySelector('#view-summary').addEventListener('click',()=>navigate('#summary'));return;
    }
    const choice=state.tieChoice;
    if(result.status==='matched') {renderResult(result.typeId,result);return;}
    if(choice && choice.signature===answerSignature() && result.candidates.includes(choice.id)) {renderResult(choice.id,{...result,typeId:choice.id,confirmed:true});return;}
    setActive('result');
    main.innerHTML=`<section class="page-shell enter"><div class="page-intro"><div><div class="eyebrow">내 응답과 가까운 오목이</div><h1>${result.candidates.length}가지 이야기가<br>같은 순위로 나왔어요.</h1><p>동점인 캐릭터 중 더 익숙한 장면 하나만 골라주세요. 처음부터 다시 답할 필요는 없어요.</p></div></div><div class="match-candidates">${result.candidates.map(id=>{const t=data.types.find(t=>t.id===id);return `<button type="button" class="match-candidate" data-confirm="${id}">${artHTML(id,true)}<span class="eyebrow">${escape(t.plant)}형</span><strong>${escape(t.title)}</strong><p>${escape(editorial[t.id].quote)}</p><span class="candidate-action">이 이야기가 더 가까워요 ${icon('arrow-right')}</span></button>`;}).join('')}</div><p class="gallery-footnote">응답과 창작 캐릭터 설정을 연결한 임시 매칭이에요. 심리검사·의학적 진단이 아닙니다.</p></section>`;
    main.querySelectorAll('[data-confirm]').forEach(button=>button.addEventListener('click',()=>{state.tieChoice={id:Number(button.dataset.confirm),signature:answerSignature()};navigate('#my-result');}));
  }

  function renderSummary() {
    const missing=questions.findIndex(q=>!hasAnswer(q.id));
    if(missing!==-1){state.index=missing;navigate('#quiz');return;}
    setActive('quiz');
    main.innerHTML=`<section class="page-shell enter"><div class="page-intro"><div><div class="eyebrow">나의 24가지 대답</div><h1>내가 고른,<br>나의 업무 리듬.</h1><p>사람은 한 단어보다 넓으니까.<br>최근의 나를 여덟 가지 장면으로 돌아봤어요.</p></div><button class="text-button" id="review-answers">응답 다시 살펴보기</button></div><div class="profile-list">${data.dimensions.map(d=>{
      const desc=resultDescription(d);
      return `<div class="profile-row"><div class="profile-label">${escape(d.name)}</div><div class="profile-answer">${escape(desc.text)}</div><p class="profile-explanation">${escape(desc.note)}</p><details class="answer-detail"><summary>내가 고른 답</summary>${data.questions.filter(q=>q.dimension===d.id).map(q=>`<p>${escape(q.text)}<b>${state.answers[q.id]===null?'해당 경험 없음 / 판단 어려움':escape((q.a?pairLabels:frequencyLabels)[state.answers[q.id]])}</b></p>`).join('')}</details></div>`;
    }).join('')}</div><p class="summary-footnote">이 응답 요약은 MBTI·TCI 검사 결과가 아닙니다. 캐릭터 매칭은 이 답변들과 30가지 창작 설정을 비교하는 임시 규칙을 사용해요.</p><div class="summary-action"><button class="primary-button" id="choose-character">나의 오목이 결과 보기 ${icon('arrow-right')}</button></div></section>`;
    document.querySelector('#review-answers').addEventListener('click',()=>{state.index=0;navigate('#quiz');});
    document.querySelector('#choose-character').addEventListener('click',()=>navigate('#my-result'));
  }
  function renderGallery() {
    setActive('gallery');
    main.innerHTML=`<section class="page-shell enter"><div class="page-intro"><div><div class="eyebrow">각자의 속도로 자라는 우리</div><h1>당신과 닮은 오목이는?</h1><p>한 번쯤 내 이야기 같았던 장면.<br>마음이 가는 캐릭터를 만나보세요.</p></div><div class="gallery-return">${completed()?`<button class="primary-button" id="show-my-result">내 오목이 결과 보기 ${icon('arrow-right')}</button>`:'' }<button class="text-button" id="back-to-quiz">문항으로 돌아가기</button></div></div><div class="gallery-controls"><label class="group-select"><span>둘러보기</span><select id="group-filter" aria-label="캐릭터 계열">${[{id:'all',name:'모든 오목이 · 30'},...data.groups].map(g=>`<option value="${g.id}" ${state.group===g.id?'selected':''}>${escape(g.name)}</option>`).join('')}</select></label><label class="search-box">${icon('search')}<input id="type-search" type="search" placeholder="이름으로 찾아보기" aria-label="캐릭터 검색" value="${escape(state.search)}" /></label></div><div id="type-grid" class="type-grid"></div><p class="gallery-footnote">30가지 창작 캐릭터 이야기입니다. 직접 선택해 이야기를 살펴보는 화면이며, 설문 점수에 따른 자동 분류가 아닙니다.</p></section>`;
    renderTypeGrid();
    document.querySelector('#group-filter').addEventListener('change',event=>{state.group=event.target.value;renderTypeGrid();icons();});
    document.querySelector('#type-search').addEventListener('input',event=>{state.search=event.target.value;renderTypeGrid();icons();});
    document.querySelector('#back-to-quiz').textContent=completed()?'다시 테스트하기':'문항으로 돌아가기';
    document.querySelector('#back-to-quiz').addEventListener('click',openQuiz);
    document.querySelector('#show-my-result')?.addEventListener('click',()=>navigate('#my-result'));
  }
  function renderTypeGrid() {
    const filtered=data.types.filter(t=>(state.group==='all'||state.group===t.group)&&`${t.plant} ${t.title} ${editorial[t.id].quote}`.includes(state.search.trim()));
    document.querySelector('#type-grid').innerHTML=filtered.length?filtered.map(t=>`<button type="button" class="type-card" data-type="${t.id}" aria-label="${escape(t.plant)}형 ${escape(t.title)} 이야기 보기"><span class="type-card-top"><span>${pad(t.id)} / ${escape(data.groups.find(g=>g.id===t.group).name)}</span>${icon('arrow-up-right')}</span><span class="type-thumbnail">${artHTML(t.id,true)}</span><strong>${escape(t.plant)}형</strong><span class="type-name">${escape(t.title)}</span><p>${escape(editorial[t.id].quote)}</p></button>`).join(''):'<p class="gallery-empty">찾는 오목이가 없어요. 다른 이름으로 찾아볼까요?</p>';
    main.querySelectorAll('[data-type]').forEach(button=>button.addEventListener('click',()=>{state.selectionSource='choice';navigate(`#result/${button.dataset.type}`);}));
  }
  function relationshipsHTML(id) {
    const labels={good:'잘 맞는 오목이',tension:'티격태격하는 오목이'};
    return `<section class="relationships" aria-labelledby="relationships-title"><div class="eyebrow">같은 팀에서 만난다면</div><h2 id="relationships-title">우리 둘이 옆자리에 앉으면?</h2><div class="relationship-grid">${['good','tension'].map(kind=>{
      const pair=relationships[kind].find(pair=>pair.types.includes(id));
      const otherId=pair.types.find(typeId=>typeId!==id);
      const other=data.types.find(type=>type.id===otherId);
      return `<div class="relationship-group" data-relationship="${kind}"><h3>${icon(kind==='good'?'handshake':'messages-square')}${labels[kind]}</h3><button type="button" class="relationship-link" data-related-type="${otherId}" aria-label="${escape(other.plant)}형 ${escape(other.title)} 이야기 보기"><span class="relationship-art">${artHTML(otherId,true)}</span><span class="relationship-name"><strong>${escape(other.plant)}형</strong><span>${escape(other.title)}</span></span>${icon('arrow-right')}</button><p class="relationship-scene">${escape(pair.scene)}</p></div>`;
    }).join('')}</div><p class="relationship-note">캐릭터 설정으로 상상한 동료 조합이에요. 실제 관계를 판단하는 궁합 검사는 아니에요.</p></section>`;
  }
  function renderResult(id, match = null) {
    const type=data.types.find(t=>t.id===id);
    if(!type){navigate('#gallery');return;}
    setActive('result');
    const custom=editorial[id];
    const quote=custom.quote;
    const split=type.title.lastIndexOf('오 ');
    const heading=split>=0?`${escape(type.title.slice(0,split))}<br><em>${escape(type.title.slice(split))}</em>`:escape(type.title);
    const notice=match
      ? '답변으로 만난 창작 캐릭터예요. 심리검사·의학적 진단은 아닙니다.'
      : `${state.selectionSource==='choice'?'직접 선택한 캐릭터':'캐릭터 결과 예시'} · 나의 자동 매칭 결과와는 별개입니다.`;
    main.innerHTML=`<article class="page-shell enter" data-result-id="${id}" data-result-source="${match?'matched':'example'}">
      <div class="sample-notice">${icon('info')}<span>${notice}</span></div>
      <div class="result-lead">
        <div class="result-heading">
          <div class="eyebrow">${match?'나의 오목이':'TYPE '+pad(type.id)} · ${escape(type.plant)}형</div>
          <h1>${heading}</h1><p class="result-quote">${escape(quote)}</p>
          <div class="result-tags"><span>#${escape(type.plant)}형</span><span>#${escape(data.groups.find(g=>g.id===type.group).name.replace('·',''))}</span><span>#직장인오목이</span></div>
        </div>
        <figure class="result-art">${artHTML(id,true)}<figcaption>ORB OFFICE MOMENTS / ${pad(id)}</figcaption></figure>
      </div>
      ${match?`<details class="matching-note"><summary>이 오목이는 어떻게 연결됐나요?</summary><p>답변을 여덟 항목으로 묶어 평균을 내고, 30가지 창작 캐릭터 설정과 비교했어요. 반영된 항목의 비중은 같아요. 이 설정과 배정 규칙은 검증된 성격 척도가 아닌 임시 편집 기준입니다. 아래 장면은 공감을 위한 이야기이며, 실제 행동을 모두 확인했다는 뜻은 아닙니다.</p>${match.missingAxes.length?`<p>답변이 부족한 ${match.missingAxes.length}개 항목은 비교에서 제외했어요.</p>`:''}${match.confirmed?'<p>같은 순위의 캐릭터 중 직접 선택한 이야기를 보여드려요.</p>':''}</details>`:''}
      <dl class="result-dialogue"><div><dt>입 밖으로는</dt><dd>“${escape(custom.spoken)}”</dd></div><div><dt>머릿속에서는</dt><dd>${escape(custom.thought)}</dd></div></dl>
      <div class="story-grid">
        <section class="story-block"><span class="section-index">01 / 같이 일하면 알게 되는 것</span><h2>${escape(custom.strengthTitle)}</h2><p>${escape(custom.strength)}</p></section>
        <section class="story-block"><span class="section-index">02 / 근데 가끔 이러고 있음</span><h2>${escape(custom.frictionTitle)}</h2><p>${escape(custom.friction)}</p></section>
      </div>
      <section class="practice-band"><div class="eyebrow">오늘 써먹을 한마디</div><div><h2>“${escape(custom.say)}”</h2><p>${escape(custom.tip)}</p></div></section>
      ${relationshipsHTML(id)}
      <div class="result-actions">
        <button class="primary-button kakao-button" id="share-kakao" aria-haspopup="dialog">${icon('message-circle')}카카오톡 공유하기</button>
        <button class="secondary-button" id="copy-result">${icon('copy')}결과 문구 복사</button>
        <button class="secondary-button" id="retake-quiz">${icon('rotate-ccw')}${completed()?'다시 테스트하기':'나도 테스트하기'}</button>
      </div>
      <div class="result-secondary-actions">
        <button class="secondary-button" id="browse-types">다른 오목이 만나보기 ${icon('arrow-right')}</button>
        ${match?'<button class="secondary-button" id="my-answers">내 응답 보기</button>':''}
        ${!match&&completed()?`<button class="secondary-button" id="back-to-my-result">${icon('arrow-left')}내 오목이로 돌아가기</button>`:''}
        <button class="text-button" id="return-questions">${match?'응답 수정하기':'문항 체험하기'}</button>
      </div>
    </article>`;
    document.querySelector('#copy-result').addEventListener('click',()=>copyText(sharing.copyText(id)));
    document.querySelector('#share-kakao').addEventListener('click',()=>openShare(id));
    document.querySelector('#retake-quiz').addEventListener('click',()=>{
      if(completed() || Object.keys(state.answers).length===0) restartQuiz();
      else openQuiz();
    });
    document.querySelector('#browse-types').addEventListener('click',()=>navigate('#gallery'));
    document.querySelector('#my-answers')?.addEventListener('click',()=>navigate('#summary'));
    document.querySelector('#back-to-my-result')?.addEventListener('click',()=>navigate('#my-result'));
    main.querySelectorAll('[data-related-type]').forEach(button=>button.addEventListener('click',()=>{state.selectionSource='choice';navigate(`#result/${button.dataset.relatedType}`);}));
    document.querySelector('#return-questions').addEventListener('click',()=>{if(match)state.index=0;navigate('#quiz');});
  }
  let shareRequest=0;
  async function openShare(id) {
    const dialog=document.querySelector('#share-dialog');
    const status=document.querySelector('#share-status');
    const send=document.querySelector('#share-send');
    const type=data.types.find(type=>type.id===id);
    const request=++shareRequest;
    document.querySelector('#share-preview').innerHTML=`${artHTML(id,true)}<div><strong>${escape(type.plant)}형, ${escape(type.title)}</strong><p>${escape(editorial[id].quote)}</p></div>`;
    send.hidden=true;send.disabled=true;
    document.querySelector('#share-copy').onclick=async()=>{
      const copied=await copyText(sharing.copyText(id));
      if(request===shareRequest && dialog.open)status.textContent=copied?'결과 문구를 복사했어요. 원하는 대화방에 붙여넣어 주세요.':'문구를 복사하지 못했어요. 브라우저의 복사 권한을 확인해 주세요.';
    };
    const problem=sharing.problem();
    status.textContent=problem==='local-preview'
      ?'카카오톡 공유는 테스트를 공개한 뒤 사용할 수 있어요. 지금은 결과 문구를 복사할 수 있어요.'
      :problem?'카카오톡 공유 연결을 준비 중이에요. 지금은 결과 문구를 복사할 수 있어요.'
      :'카카오톡 공유를 준비하고 있어요.';
    dialog.showModal();
    icons();
    if(problem)return;
    send.hidden=false;
    send.onclick=async()=>{
      send.disabled=true;
      try {
        // This call stays inside a fresh click, after the SDK has loaded.
        await sharing.send(id);
        if(request===shareRequest && dialog.open)status.textContent='공유창이 열리면 받을 친구를 선택해 주세요. 열리지 않으면 팝업 허용 설정을 확인해 주세요.';
      } catch {
        if(request===shareRequest && dialog.open)status.textContent='공유창을 열지 못했어요. 다시 시도하거나 결과 문구를 복사해 주세요.';
      } finally {if(request===shareRequest)send.disabled=false;}
    };
    try {
      await sharing.prepare();
      if(request!==shareRequest || !dialog.open)return;
      send.disabled=false;
      status.textContent='유형 이름과 이야기를 공유해요. 문항별 답변은 보내지 않아요.';
    } catch {
      if(request!==shareRequest || !dialog.open)return;
      send.hidden=true;
      status.textContent='카카오톡 연결을 불러오지 못했어요. 창을 닫고 다시 시도하거나 결과 문구를 복사해 주세요.';
    }
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); toast('문구를 복사했어요.'); return true; }
    catch {
      const focused=document.activeElement;
      const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.opacity='0';
      (document.querySelector('dialog[open]')||document.body).append(field);field.select();
      let copied=false;try{copied=document.execCommand('copy');}catch{copied=false;}field.remove();
      focused?.focus({preventScroll:true});
      toast(copied?'문구를 복사했어요.':'브라우저에서 복사를 허용하지 않았어요.');
      return copied;
    }
  }
  function render() {
    document.querySelector('#share-dialog').close();
    const hash=location.hash||'#quiz';
    if(hash==='#my-result')renderMyResult();
    else if(hash==='#gallery')renderGallery();
    else if(hash.startsWith('#result/'))renderResult(Number(hash.split('/')[1]));
    else if(hash==='#summary')renderSummary();
    else renderQuiz();
    icons();window.scrollTo({top:0,behavior:'instant'});focusHeading();
  }
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
    state.selectionSource='sample';
    if(button.dataset.view==='quiz'){openQuiz();return;}
    navigate(button.dataset.view==='result'?(completed()?'#my-result':'#result/1'):`#${button.dataset.view}`);
  }));
  document.querySelector('.wordmark').addEventListener('click',event=>{event.preventDefault();openQuiz();});
  document.querySelector('#close-share').addEventListener('click',()=>document.querySelector('#share-dialog').close());
  document.querySelector('#share-dialog').addEventListener('close',()=>{shareRequest++;});
  document.querySelector('#cancel-restart').addEventListener('click',()=>document.querySelector('#restart-dialog').close());
  document.querySelector('#confirm-restart').addEventListener('click',()=>{
    document.querySelector('#restart-dialog').close();restartQuiz();toast('이전 답변을 지웠어요. 처음부터 다시!');
  });
  window.addEventListener('hashchange',render);
  render();
})();
