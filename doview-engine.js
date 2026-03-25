// DoView Engine V1.0.3 E3 2026-03-25
// DoView® Planning — Dr Paul Duignan — doviewplanning.org
// Engine file: place on GitHub Pages or in a Claude skill folder
// Usage: <script src="doview-engine.js"></script> then DoView.init({...})

const DoView = (function() {

const CSS = `
:root{--orange:#F5A623;--od:#d4880a;--text:#1e293b;--text2:#64748b;--bg:#f8fafc;--bdr:#e2e8f0;--white:#fff}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;background:var(--bg);color:var(--text);font-size:13px;display:flex;flex-direction:column;min-height:100vh}
.hdr{background:var(--orange);padding:11px 20px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.hdr-title{color:#fff;font-weight:700;font-size:15px}
.hdr-brand{color:rgba(255,255,255,0.65);font-size:10px}
.tab-bar{background:#fff;border-bottom:1px solid var(--bdr);overflow-x:auto;white-space:nowrap;flex-shrink:0}
.tab-bar::-webkit-scrollbar{height:3px}.tab-bar::-webkit-scrollbar-track{background:#f1f5f9}.tab-bar::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}
.tabs{display:inline-flex;padding:0 16px;gap:0}
.tab{padding:9px 16px;font-size:11.5px;font-weight:500;cursor:pointer;border-bottom:3px solid transparent;color:var(--text2);white-space:nowrap;transition:color 0.15s,border-color 0.15s;user-select:none}
.tab:hover{color:var(--text)}
.tab.active{color:var(--text);font-weight:600}
.main-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden}
.main{padding:20px;flex:1;overflow-y:auto}
.ov-final{border:2px solid var(--od);background:#fff8ed;border-radius:12px;padding:18px 28px;max-width:460px;margin:0 auto 18px;cursor:pointer;text-align:center;transition:box-shadow 0.15s}
.ov-final:hover{box-shadow:0 4px 16px rgba(245,166,35,0.25)}
.ov-final h3{color:var(--od);font-size:15px;font-weight:700;margin-bottom:5px}
.ov-final p{color:var(--text2);font-size:11.5px}
.ov-divider{border:none;border-top:1px solid var(--bdr);margin:16px 0}
.sp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.sp-tile{border-radius:10px;padding:15px 15px 28px;cursor:pointer;position:relative;transition:transform 0.15s,box-shadow 0.15s;min-height:86px}
.sp-tile:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,0.1)}
.sp-tile h4{font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--text)}
.sp-tile p{font-size:11px;color:var(--text2);line-height:1.4}
.drill-tri{position:absolute;bottom:8px;right:8px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #F5A623;opacity:0.7}
.ov-hint{text-align:center;color:var(--text2);font-size:11px;margin-top:18px;font-style:italic}
.back-btn{display:inline-flex;align-items:center;gap:5px;background:none;border:1px solid var(--bdr);border-radius:6px;padding:6px 13px;cursor:pointer;font-size:11.5px;color:var(--text2);margin-bottom:16px;transition:background 0.15s}
.back-btn:hover{background:var(--bdr)}
.board-scroll{overflow-x:auto;padding-bottom:4px}
.ttw{display:flex;align-items:stretch;min-width:max-content;gap:0}
.sidebar{width:26px;flex-shrink:0;background:var(--orange);border:1px solid var(--od);display:flex;align-items:center;justify-content:center;border-radius:4px}
.sidebar span{writing-mode:vertical-rl;transform:rotate(180deg);color:#fff;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase}
.cols-row{display:flex;align-items:center;flex:1;padding:0 8px}
.col-wrap{display:flex;flex-direction:column;flex-shrink:0;align-self:flex-start}
.col-h{font-size:9.5px;font-weight:600;text-transform:uppercase;color:var(--text2);letter-spacing:0.5px;margin-bottom:8px;text-align:center;min-height:28px;display:flex;align-items:flex-end;justify-content:center;padding:0 4px;width:160px}
.col-h.last-col{color:var(--od)}
.col-boxes{display:flex;flex-direction:column;gap:8px;align-items:stretch}
.col-arrow{width:24px;flex-shrink:0;display:flex;justify-content:center}
.box{border-radius:7px;padding:7px 9px 7px 34px;cursor:pointer;position:relative;width:160px;min-height:62px;border:1px solid;transition:box-shadow 0.15s,opacity 0.2s;overflow:hidden}
.box:hover{box-shadow:0 2px 8px rgba(0,0,0,0.12)}
.box.last-col{font-weight:700}
.box.grey-state{opacity:0.6}
.box-txt{font-size:11px;line-height:1.45;color:var(--text);display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}
.box.last-col .box-txt{color:var(--od)}
.tl-dot{position:absolute;top:6px;right:6px;width:9px;height:9px;border-radius:50%}
.edit-lbl{position:absolute;top:17px;right:4px;font-size:7.5px;color:var(--text2);opacity:0.8}
.pri-badge{position:absolute;left:5px;top:50%;transform:translateY(-50%);width:20px;height:20px;border-radius:4px;background:#f1f5f9;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:700}
.box-drill{position:absolute;bottom:3px;right:3px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid #F5A623;opacity:0.7}
.fo-list{max-width:580px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.fo-box{border-radius:8px;padding:13px 15px 13px 40px;cursor:pointer;position:relative;background:#fff8ed;border:1px solid #fde68a;transition:box-shadow 0.15s}
.fo-box:hover{box-shadow:0 2px 10px rgba(245,166,35,0.2)}
.fo-box .box-txt{font-weight:700;color:var(--od);font-size:12px}
.ep{background:#fff;border:1px solid var(--bdr);border-radius:12px;padding:15px 18px;margin:0 0 12px}
.ep-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
.ep-title{font-weight:600;font-size:12.5px;max-width:80%;line-height:1.4}
.ep-close{background:none;border:none;cursor:pointer;font-size:17px;color:var(--text2);padding:0 4px;line-height:1;flex-shrink:0}
.ep-entries{margin-bottom:10px;font-size:12px;line-height:1.6}
.ep-row{display:flex;align-items:flex-start;gap:5px;margin-bottom:3px;flex-wrap:wrap}
.ep-lbl{font-weight:600;color:var(--text2);flex-shrink:0;font-size:11px}
.ep-lbl.note-lbl{color:#6366f1}
.ep-txt{min-width:0}
.ep-txt a{color:var(--od);word-break:break-all}.ep-txt a:hover{text-decoration:underline}
.ep-edit{background:none;border:none;cursor:pointer;font-size:12px;color:var(--text2);padding:0 3px;flex-shrink:0}
.ep-controls{display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap}
.ep-cl{font-size:10.5px;color:var(--text2)}
.tl-dots-row{display:flex;gap:7px}
.tl-dot-btn{width:22px;height:22px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform 0.1s,border-color 0.1s;flex-shrink:0}
.tl-dot-btn.dot-active{border-color:var(--text);transform:scale(1.15)}
.pri-row{display:flex;gap:5px;flex-wrap:wrap}
.pri-btn{width:32px;height:25px;border-radius:5px;border:1px solid var(--bdr);background:none;cursor:pointer;font-size:10.5px;font-weight:700;transition:border-color 0.1s}
.pri-btn.pri-active{border:2px solid var(--text)}
.ep-add{display:flex;gap:7px;margin-bottom:8px;align-items:center;flex-wrap:wrap}
.pill{padding:5px 11px;border-radius:20px;border:1px solid var(--bdr);background:none;cursor:pointer;font-size:11px;font-weight:500;transition:all 0.15s}
.pill.pill-sf{background:#dbeafe;border-color:#93c5fd;color:#1e40af}
.pill.pill-nt{background:#ede9fe;border-color:#a5b4fc;color:#4338ca}
.pill.pill-ai{background:#fff8ed;border-color:var(--orange);color:var(--od)}
.ep-ta{width:100%;border:1px solid var(--bdr);border-radius:7px;padding:7px 10px;font-size:12px;font-family:inherit;resize:vertical;min-height:58px;transition:border-color 0.15s}
.ep-ta:focus{outline:none;border-color:var(--orange)}
.ep-acts{display:flex;gap:8px;margin-top:7px}
.save-btn{background:var(--orange);color:#fff;border:none;border-radius:6px;padding:7px 18px;font-size:12px;font-weight:600;cursor:pointer;transition:background 0.15s}
.save-btn:hover{background:var(--od)}
.save-btn:disabled{opacity:0.55;cursor:not-allowed}
.ctrl-bar{padding:10px 18px;background:#fff;border-top:1px solid var(--bdr);display:flex;align-items:center;gap:9px;flex-wrap:wrap;flex-shrink:0;position:sticky;bottom:0;z-index:100}
.cbtn{padding:6px 14px;border-radius:20px;font-size:11.5px;font-weight:500;cursor:pointer;border:1px solid;transition:all 0.15s;white-space:nowrap}
.cbtn-or{background:var(--orange);color:#fff;border-color:var(--od)}.cbtn-or:hover{background:var(--od)}
.cbtn-dk{background:#1e293b;color:#fff;border-color:#0f172a}.cbtn-dk:hover{background:#374151}
.cbtn-ol{background:none;color:var(--text);border-color:var(--bdr)}.cbtn-ol:hover{background:var(--bg)}
.status-bar{margin-left:auto;font-size:11px;color:var(--text2)}
.src-link{cursor:pointer;text-decoration:underline}.src-link:hover{color:var(--text)}
.attr{text-align:center;padding:10px 20px;font-size:10.5px;color:var(--text2);border-top:1px solid var(--bdr);background:#fff;flex-shrink:0}
.attr a{color:var(--od);text-decoration:none}.attr a:hover{text-decoration:underline}
.attr-or{color:var(--orange)!important}
.modal-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:2000;align-items:center;justify-content:center;padding:20px}
.modal-ov.open{display:flex}
.modal-box{background:#fff;border-radius:16px;padding:24px;max-width:600px;width:100%;max-height:82vh;overflow-y:auto}
.modal-box h3{font-size:15px;font-weight:700;margin-bottom:12px}
.modal-close{background:var(--orange);color:#fff;border:none;border-radius:7px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:600;margin-top:14px}
.warn-txt{font-size:11.5px;color:var(--text2);background:#fef9c3;border:1px solid #fde68a;border-radius:6px;padding:8px 10px;margin-bottom:12px}
.src-list{list-style:none;padding:0}
.src-list li{padding:6px 0;border-bottom:1px solid var(--bdr);font-size:12px}
.src-list li:last-child{border-bottom:none}
.src-list a{color:var(--od);word-break:break-all}
.upd-ta{width:100%;border:1px solid var(--bdr);border-radius:7px;padding:10px;font-size:11px;font-family:monospace;resize:vertical;height:240px;background:#f8fafc}
.copy-btn{background:#1e293b;color:#fff;border:none;border-radius:7px;padding:7px 16px;cursor:pointer;font-size:12px;font-weight:600;margin-top:10px}
.copy-btn.copied{background:#22c55e}
.chat-fab{position:fixed;bottom:68px;right:22px;background:linear-gradient(135deg,#F5A623,#e09000);color:#fff;font-weight:600;font-size:13px;padding:11px 19px;border-radius:24px;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(245,166,35,0.4);z-index:1000;transition:transform 0.15s,box-shadow 0.15s}
.chat-fab:hover{transform:scale(1.06);box-shadow:0 6px 18px rgba(245,166,35,0.5)}
.chat-panel{position:fixed;bottom:128px;right:22px;width:420px;max-width:calc(100vw - 44px);height:520px;max-height:calc(100vh - 155px);background:#fff;border:1px solid var(--bdr);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:1001;display:none;flex-direction:column;overflow:hidden}
.chat-panel.open{display:flex}
.chat-hdr{background:linear-gradient(135deg,#F5A623,#e09000);padding:13px 15px;display:flex;justify-content:space-between;align-items:center}
.chat-hdr-l h4{color:#fff;font-size:14px;font-weight:700}
.chat-hdr-l small{color:rgba(255,255,255,0.85);font-size:10.5px}
.chat-hdr-r{display:flex;gap:6px}
.chat-hbtn{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,0.25);border:none;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;color:#fff}
.chat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px}
.chat-m{max-width:86%;padding:9px 11px;border-radius:10px;font-size:11.5px;line-height:1.5}
.chat-m.user{align-self:flex-end;background:#fff8ed;border:1px solid #fde68a}
.chat-m.asst{align-self:flex-start;background:#f1f5f9;border:1px solid #e2e8f0}
.chat-m.sys{align-self:center;color:var(--text2);font-size:10.5px;font-style:italic}
.chat-in-area{padding:11px;border-top:1px solid var(--bdr);display:flex;gap:7px}
.chat-in{flex:1;border:1px solid var(--bdr);border-radius:7px;padding:7px 9px;font-size:11.5px;font-family:inherit;resize:none}
.chat-in:focus{outline:none;border-color:var(--orange)}
.chat-send{background:var(--orange);color:#fff;border:none;border-radius:7px;padding:7px 12px;cursor:pointer;font-size:12px;font-weight:600}
.chat-settings-pane{flex:1;overflow-y:auto;padding:14px;display:none;flex-direction:column;gap:11px}
.chat-settings-pane.open{display:flex}
.set-fld{display:flex;flex-direction:column;gap:3px}
.set-fld label{font-size:10.5px;font-weight:600;color:var(--text2)}
.set-fld input{border:1px solid var(--bdr);border-radius:6px;padding:6px 9px;font-size:11.5px}
.set-save{background:var(--orange);color:#fff;border:none;border-radius:7px;padding:7px 15px;cursor:pointer;font-size:12px;font-weight:600}
.set-back{color:var(--orange);font-size:11.5px;cursor:pointer;text-decoration:underline}
.disclaim{font-size:10px;color:var(--text2);background:#f1f5f9;border-radius:5px;padding:7px;line-height:1.5;font-style:italic}
.help-txt{font-size:11px;color:var(--text2);line-height:1.5}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
.pulsing{animation:pulse 0.9s infinite}
`;

function buildHTML(TITLE) {
return `
<div class="hdr"><div class="hdr-title">${TITLE}</div><div class="hdr-brand">DoView® Board</div></div>
<div class="tab-bar"><div class="tabs" id="tabBar"></div></div>
<div class="main-wrap"><div class="main" id="main"><div id="board"></div><div id="epWrap" style="display:none;padding:0"></div></div></div>
<div class="ctrl-bar">
  <button class="cbtn cbtn-dk" id="dlBtn" onclick="downloadBoard()">📥 Download Board</button>
  <button class="cbtn cbtn-ol" onclick="openUpdateModal()">📋 Update Claude main chat about board</button>
  <div class="status-bar"><span class="src-link" onclick="openSources()">Sources</span><span id="statTxt"> · 0/0 complete · 0 yellow · 0 blockers</span></div>
</div>
<div class="attr">
  DoView® Planning — Dr Paul Duignan — <a href="https://doviewplanning.org" target="_blank">doviewplanning.org</a> ·
  <a href="#" class="attr-or" onclick="openInfoDev();return false">Info for developers</a> ·
  <a href="#" class="attr-or" onclick="openAck();return false">Acknowledgements</a>
</div>
<div class="modal-ov" id="srcModal"><div class="modal-box"><div class="warn-txt">⚠️ Sources AI generated, may not work, and click at your own risk.</div><h3>📚 Sources</h3><ul class="src-list" id="srcList"></ul><button class="modal-close" onclick="closeModal('srcModal')">Close</button></div></div>
<div class="modal-ov" id="infoModal"><div class="modal-box"><h3>Info for developers</h3><p style="font-size:12.5px;line-height:1.7;color:var(--text2)">DoView Boards are part of the <a href="https://doviewplanning.org" target="_blank">DoViewPlanning.org</a> methodology. Developers are encouraged to implement DoView Boards within any app, platform or system, just with acknowledgment (for details see <a href="https://doviewplanning.org/trademarkuse" target="_blank">DoViewPlanning.org/trademarkuse</a>). If you want help doing so, please contact us on the <a href="https://doviewplanning.org" target="_blank">DoViewPlanning.org</a> website where you can also see projects we would like to collaborate with developers on <a href="https://doviewplanning.org/collaborate" target="_blank">DoViewPlanning.org/collaborate</a>.<br><br>If you do want to implement DoView Boards in any setting, please look at the specifications for DoView Boards, which are at <a href="https://doviewplanning.org/doviewboards" target="_blank">DoViewPlanning.org/doviewboards</a>. DoViews are drawn to a specific standard to ensure that they are fit for purpose. Please follow this basic standard for how DoView Boards are structured and presented and then you can innovate on top of this. If you do put DoView Boards into any app, platform or system if you are able, let us know.</p><button class="modal-close" onclick="closeModal('infoModal')">Close</button></div></div>
<div class="modal-ov" id="ackModal"><div class="modal-box"><h3>Acknowledgements</h3><p style="font-size:12.5px;line-height:1.7;color:var(--text2)">DoView Planning methodology, outcomes theory and DoView Boards were developed by Dr Paul Duignan, software engineering of the DoView legacy app by Richard Procter and earlier management by Jennifer Parker. Involvement of Dr Matthew Duignan and others.</p><button class="modal-close" onclick="closeModal('ackModal')">Close</button></div></div>
<div class="modal-ov" id="updModal"><div class="modal-box"><h3>📋 Board State for Claude</h3><textarea class="upd-ta" id="updTa" readonly></textarea><br><button class="copy-btn" id="cpyBtn" onclick="copyState()">Select All and Copy</button><button class="modal-close" style="margin-left:8px" onclick="closeModal('updModal')">Close</button></div></div>
<button class="chat-fab" onclick="toggleChat()">Chat with board</button>
<div class="chat-panel" id="chatPanel">
  <div class="chat-hdr"><div class="chat-hdr-l"><h4>Chat with board</h4><small id="chatStatus">Connecting...</small></div><div class="chat-hdr-r"><button class="chat-hbtn" id="undoBtn" onclick="doUndo()" title="Undo" style="display:none;font-size:12px">↩</button><button class="chat-hbtn" onclick="toggleChatSettings()" title="Settings">⚙️</button><button class="chat-hbtn" onclick="toggleChat()" title="Close">✕</button></div></div>
  <div class="chat-msgs" id="chatMsgs"></div>
  <div id="chatInputArea" class="chat-in-area"><textarea class="chat-in" id="chatIn" rows="2" placeholder="Ask about your board..."></textarea><button class="chat-send" onclick="sendChat()">Send</button></div>
  <div class="chat-settings-pane" id="chatSettingsPane">
    <strong style="font-size:13px">⚙️ AI Connection Settings</strong>
    <div class="set-fld"><label>API Endpoint</label><input id="setEP" type="text" placeholder="https://api.openai.com/v1/chat/completions"></div>
    <div class="set-fld"><label>API Key</label><input id="setKey" type="password" placeholder="sk-..."></div>
    <div class="set-fld"><label>Model</label><input id="setModel" type="text" placeholder="gpt-4o"></div>
    <label style="font-size:11px;display:flex;gap:6px;align-items:center"><input type="checkbox" id="rememberAI"> Remember these settings</label>
    <div class="help-txt">Paste your provider's chat completions endpoint and API key. Most providers (OpenAI, OpenRouter, Groq, Together, Ollama) use the same format.<br><br>Not sure? OpenRouter works from browsers and gives access to Claude, GPT, Gemini, Llama, and more through one endpoint.</div>
    <div class="disclaim">Note: Doing this will expose your board to the AI you connect it to. Make sure you trust the AI. The developers of DoView Boards do not accept any responsibility for risks arising from how you use this DoView Board.</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="set-save" onclick="saveChatSettings()">Save Settings</button><button class="set-save" style="background:#475569" onclick="testChatConn()">Test Connection</button></div>
    <div id="connTestResult" style="font-size:11px;color:var(--text2)"></div>
    <div class="set-back" onclick="toggleChatSettings()">← Back to chat</div>
  </div>
</div>`;
}

// ─── GLOBALS (set by init) ───
let TITLE, SLUG, SP, FO_DATA, B={}, DEPS={}, currentPage='overview', openBox=null, entryMode='sofar', editingType=null;
let sources=[], chatMsgs=[], claudeConnected=false, aiSettings={}, chatSettingsOpen=false, undoStack=[], pendingStructural=[];
const MAX_UNDO=20;
const PRI_COLORS={A:'#dc2626',B:'#ea580c',C:'#ca8a04',D:'#2563eb',E:'#4f46e5',BAU:'#94a3b8'};
const STRUCTURAL_CMDS=['addBox','removeBox','renameBox','addColumn','removeColumn','renameColumn','addSubpage','removeSubpage','addFinalOutcome','removeFinalOutcome'];

// ─── CORE ───
function buildInitialState(){SP.forEach(sp=>{sp.cols.forEach((col,ci)=>{col.boxes.forEach((label,bi)=>{B[`${sp.id}-c${ci}-b${bi}`]={label,light:ci===0?'yellow':'grey',entries:[],priority:'',hasSubpage:false};});});});FO_DATA.forEach((label,i)=>{B[`final-b${i}`]={label,light:'grey',entries:[],priority:'',hasSubpage:false};});}
function buildDepsMap(){DEPS={};SP.forEach(sp=>{sp.cols.forEach((col,ci)=>{if(ci===0)return;col.boxes.forEach((_,bi)=>{const k=`${sp.id}-c${ci}-b${bi}`;DEPS[k]=sp.cols[ci-1].boxes.map((_,pbi)=>`${sp.id}-c${ci-1}-b${pbi}`);});});});}
function cascade(){let changed=true,iter=0;while(changed&&iter++<20){changed=false;SP.forEach(sp=>{sp.cols.forEach((col,ci)=>{if(ci===0)return;col.boxes.forEach((_,bi)=>{const k=`${sp.id}-c${ci}-b${bi}`;const box=B[k];if(!box||box.light!=='grey')return;const deps=DEPS[k]||[];if(!deps.length)return;const anyRed=deps.some(dk=>B[dk]?.light==='red');const allGreen=deps.every(dk=>B[dk]?.light==='green');if(!anyRed&&allGreen){box.light='yellow';changed=true;}});});});}const subKeys=Object.keys(B).filter(k=>!k.startsWith('final-'));const pct=subKeys.length?subKeys.filter(k=>B[k].light==='green').length/subKeys.length:0;FO_DATA.forEach((_,i)=>{const b=B[`final-b${i}`];if(b&&b.light==='grey'&&pct>=0.6)b.light='yellow';});}
function saveState(){try{const cleanB={};Object.entries(B).forEach(([k,v])=>{cleanB[k]={label:v.label,light:v.light,entries:[...v.entries],priority:v.priority,hasSubpage:v.hasSubpage};});const state={B:cleanB,SP:JSON.parse(JSON.stringify(SP)),FO:[...FO_DATA]};localStorage.setItem(`doview-${SLUG}-v1`,JSON.stringify(state));}catch(e){}}

// ─── LINKIFY ───
function linkify(text){return text.replace(/(https?:\/\/[^\s<>"')\]]+)/g,'<a href="$1" target="_blank" style="color:var(--od);word-break:break-all">$1</a>');}

// ─── RENDER ───
function tlColor(l){return{yellow:'#F5C518',green:'#2ECC71',red:'#E74C3C',grey:'#94A3B8'}[l]||'#94A3B8';}
function priColor(p){return PRI_COLORS[p]||'';}
function boxHTML(key,boxData,isLast,spColor){const{label,light,entries,priority,hasSubpage}=boxData;const hasSofar=entries.some(e=>e.type==='sofar');const editLbl=light==='green'&&hasSofar?'<span class="edit-lbl">edit</span>':'';const priTxt=priority||'';const priBadge=`<div class="pri-badge" style="${priTxt?`color:${priColor(priTxt)};font-size:${priTxt==='BAU'?'7.5':'9.5'}px`:''}">${priTxt}</div>`;const drillHTML=hasSubpage?'<div class="box-drill"></div>':'';const greyClass=light==='grey'?' grey-state':'';const lastClass=isLast?' last-col':'';return `<div class="box${lastClass}${greyClass}" style="background:${spColor.bg};border-color:${spColor.bdr}" onclick="clickBox('${key}')" id="bx-${key}">${priBadge}<div class="tl-dot" id="tl-${key}" style="background:${tlColor(light)}"></div>${editLbl}<div class="box-txt">${label}</div>${drillHTML}</div>`;}
function renderTabBar(){const pages=[{id:'overview',label:'Overview',tc:null},{id:'final',label:'Final Outcomes',tc:null},...SP.map(s=>({id:s.id,label:s.label,tc:s.color.tab}))];document.getElementById('tabBar').innerHTML=pages.map(p=>{const a=currentPage===p.id;const bc=a?(p.tc||'#F5A623'):'transparent';const bg=a&&p.tc?p.tc+'33':'transparent';return `<div class="tab ${a?'active':''}" style="border-bottom-color:${bc};background:${bg}" onclick="navTo('${p.id}')">${p.label}</div>`;}).join('');}
function navTo(id){currentPage=id;openBox=null;editingType=null;document.getElementById('epWrap').style.display='none';render();}
function renderOverview(){const foG=FO_DATA.filter((_,i)=>B[`final-b${i}`]&&B[`final-b${i}`].light==='green').length;return `<div class="ov-final" onclick="navTo('final')"><h3>Final Outcomes</h3><p>The high-level outcomes — click to explore</p><div style="font-size:10.5px;color:var(--od);margin-top:6px">${foG}/${FO_DATA.length} complete</div></div><hr class="ov-divider"><div class="sp-grid">${SP.map(sp=>{const ks=Object.keys(B).filter(k=>k.startsWith(sp.id+'-'));const g=ks.filter(k=>B[k].light==='green').length;const y=ks.filter(k=>B[k].light==='yellow').length;return `<div class="sp-tile" style="background:${sp.color.bg};border:1px solid ${sp.color.bdr}" onclick="navTo('${sp.id}')"><h4>${sp.label}</h4><p>${g}/${ks.length} complete · ${y} to act on</p><div class="drill-tri"></div></div>`;}).join('')}</div><p class="ov-hint">Click a subpage tile to view its This→Then causal logic · Click Final Outcomes to see end goals</p>`;}
function renderFinalOutcomes(){return `<h3 style="font-size:14px;font-weight:700;color:var(--od);margin-bottom:16px;text-align:center">Final Outcomes</h3><div class="fo-list">${FO_DATA.map((label,i)=>{const k=`final-b${i}`,b=B[k];if(!b)return '';const pb=b.priority?`<div class="pri-badge" style="color:${priColor(b.priority)};font-size:${b.priority==='BAU'?'7.5':'9.5'}px">${b.priority}</div>`:'<div class="pri-badge"></div>';return `<div class="fo-box" onclick="clickBox('${k}')" id="bx-${k}">${pb}<div class="tl-dot" id="tl-${k}" style="background:${tlColor(b.light)}"></div><div class="box-txt">${label}</div></div>`;}).join('')}</div>`;}
function renderSubpage(pid){const sp=SP.find(s=>s.id===pid);if(!sp)return '';const nc=sp.cols.length;const cols=sp.cols.map((col,ci)=>{const isLast=ci===nc-1;const boxes=col.boxes.map((_,bi)=>{const k=`${sp.id}-c${ci}-b${bi}`;return B[k]?boxHTML(k,B[k],isLast,sp.color):'';}).join('');return `<div class="col-wrap"><div class="col-h ${isLast?'last-col':''}">${col.h}</div><div class="col-boxes">${boxes}</div></div>`;});let inner='';cols.forEach((col,i)=>{inner+=col;if(i<cols.length-1)inner+=`<div class="col-arrow"><svg width="10" height="18" viewBox="0 0 10 18"><polygon points="0,0 10,9 0,18" fill="${sp.color.bdr}" opacity="0.45"/></svg></div>`;});return `<button class="back-btn" onclick="navTo('overview')">← Back to Overview</button><div class="board-scroll"><div class="ttw"><div class="sidebar"><span>This</span></div><div class="cols-row">${inner}</div><div class="sidebar"><span>Then</span></div></div></div>`;}
function render(){renderTabBar();const b=document.getElementById('board');if(currentPage==='overview')b.innerHTML=renderOverview();else if(currentPage==='final')b.innerHTML=renderFinalOutcomes();else b.innerHTML=renderSubpage(currentPage);updateStatus();if(openBox)renderEntryPanel();else document.getElementById('epWrap').style.display='none';}
function updateStatus(){const a=Object.keys(B);const g=a.filter(k=>B[k].light==='green').length;const y=a.filter(k=>B[k].light==='yellow').length;const r=a.filter(k=>B[k].light==='red').length;document.getElementById('statTxt').textContent=` · ${g}/${a.length} complete · ${y} yellow · ${r} blockers`;}

// ─── ENTRY PANEL ───
function clickBox(key){if(openBox===key){closeEntry();return;}openBox=key;entryMode='sofar';editingType=null;renderEntryPanel();}
function closeEntry(){openBox=null;editingType=null;document.getElementById('epWrap').style.display='none';}
function renderEntryPanel(){const key=openBox;if(!key||!B[key])return;const box=B[key];const ep=document.getElementById('epWrap');ep.style.display='block';const sf=box.entries.filter(e=>e.type==='sofar').map(e=>e.text),nt=box.entries.filter(e=>e.type==='note').map(e=>e.text);const sfR=sf.length?`<div class="ep-row"><span class="ep-lbl">So far:</span><span class="ep-txt">${sf.map(t=>linkify(t)).join(' | ')}</span><button class="ep-edit" onclick="editEntries('sofar')">✎</button></div>`:'';const ntR=nt.length?`<div class="ep-row"><span class="ep-lbl note-lbl">Notes:</span><span class="ep-txt">${nt.map(t=>linkify(t)).join(' | ')}</span><button class="ep-edit" onclick="editEntries('notes')">✎</button></div>`:'';const tls=['green','yellow','red','grey'].map(t=>`<div class="tl-dot-btn ${box.light===t?'dot-active':''}" style="background:${tlColor(t)}" onclick="setTL('${key}','${t}')"></div>`).join('');const pris=['A','B','C','D','E','BAU'].map(p=>`<button class="pri-btn ${box.priority===p?'pri-active':''}" style="color:${priColor(p)};font-size:${p==='BAU'?'8':'10.5'}px" onclick="setPri('${key}','${p}')">${p}</button>`).join('');const mc={sofar:'pill-sf',notes:'pill-nt',chat:'pill-ai'};ep.innerHTML=`<div class="ep"><div class="ep-hdr"><div class="ep-title">${box.label}</div><button class="ep-close" onclick="closeEntry()">✕</button></div><div class="ep-entries">${sfR}${ntR}</div><div class="ep-controls"><span class="ep-cl">Status:</span><div class="tl-dots-row">${tls}</div><span class="ep-cl" style="margin-left:6px">Priority:</span><div class="pri-row">${pris}</div></div><div class="ep-add"><button class="${entryMode==='sofar'?'pill '+mc.sofar:'pill'}" onclick="setMode('sofar')">So far</button><button class="${entryMode==='notes'?'pill '+mc.notes:'pill'}" onclick="setMode('notes')">My notes</button><button class="${entryMode==='chat'?'pill '+mc.chat:'pill'}" onclick="openAIChatBox('${key}')">Chat with board</button></div><textarea class="ep-ta" id="epTa" placeholder="${entryMode==='sofar'?'What has been done so far...':'Add a note...'}" onkeydown="if(event.ctrlKey&&event.key==='Enter')saveEntry()"></textarea><div class="ep-acts"><button class="save-btn" id="saveBtn" onclick="saveEntry()">Save ↵</button></div></div>`;}
function setMode(mode){editingType=null;const ta=document.getElementById('epTa');const ct=ta?ta.value.trim():'';if(ct&&mode!==entryMode)doSaveEntry(ct,entryMode);entryMode=mode;renderEntryPanel();setTimeout(()=>{const t=document.getElementById('epTa');if(t)t.focus();},50);}
function editEntries(type){editingType=type==='sofar'?'sofar':'note';entryMode=type==='sofar'?'sofar':'notes';const box=B[openBox];const entries=box.entries.filter(e=>e.type===(type==='sofar'?'sofar':'note')).map(e=>e.text);renderEntryPanel();setTimeout(()=>{const ta=document.getElementById('epTa');if(ta){ta.value=entries.join(' | ');ta.focus();}},50);}
function setTL(key,state){B[key].light=state;cascade();saveState();render();}
function setPri(key,pri){B[key].priority=B[key].priority===pri?'':pri;saveState();render();}
async function saveEntry(){const ta=document.getElementById('epTa');if(!ta)return;const text=ta.value.trim();if(!text)return;await doSaveEntry(text,entryMode);ta.value='';editingType=null;entryMode='sofar';renderEntryPanel();}
async function doSaveEntry(text,mode){const key=openBox;if(!key||!B[key])return;const box=B[key];const saveBtn=document.getElementById('saveBtn');if(mode==='sofar'){const parts=text.split('|').map(s=>s.trim()).filter(Boolean);if(editingType==='sofar'){box.entries=box.entries.filter(e=>e.type!=='sofar');}parts.forEach(p=>box.entries.push({type:'sofar',text:p}));editingType=null;if(saveBtn)saveBtn.disabled=true;const tlDot=document.getElementById(`tl-${key}`);if(tlDot)tlDot.classList.add('pulsing');const intent=await classifyText(text);if(tlDot)tlDot.classList.remove('pulsing');if(saveBtn)saveBtn.disabled=false;if(intent==='blocker')box.light='red';else if(intent==='defer'){}else{if(box.light!=='green')box.light='green';}cascade();}else if(mode==='notes'){const parts=text.split('|').map(s=>s.trim()).filter(Boolean);if(editingType==='note'){box.entries=box.entries.filter(e=>e.type!=='note');}parts.forEach(p=>box.entries.push({type:'note',text:p}));editingType=null;}saveState();render();}

// ─── CLASSIFY ───
async function classifyText(text){const lo=text.toLowerCase().trim();if(/\b(not yet|later|leave|defer|hold off|come back|closer to|will do later|for later|at the moment|not sure|unsure|don't know yet|check later|wait|postpone|pending|tbd|yellow|keep yellow|stay yellow|make yellow|leave yellow|leave this|do this later|haven't done|have not done|can't do yet|cannot do yet)\b/.test(lo))return 'defer';if(/\b(problem|issue|blocked|blocker|can't|cannot|won't work|stuck|risk|danger|concern|obstacle|stopping|prevents|failed|fail|broken|error)\b/.test(lo))return 'blocker';try{const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:20,system:'Classify the text as exactly one word: defer, blocker, or green. defer=user wants to postpone/come back later. blocker=user flagging a problem or risk. green=actual information, facts, confirmations. Reply with ONLY that one word.',messages:[{role:'user',content:text}]})});if(r.ok){const d=await r.json();const res=d.content?.[0]?.text?.trim().toLowerCase();if(['defer','blocker','green'].includes(res))return res;}}catch(e){}return 'green';}

// ─── UNDO ───
function takeSnapshot(){const snap={B:JSON.parse(JSON.stringify(B)),SP:JSON.parse(JSON.stringify(SP)),FO:JSON.parse(JSON.stringify(FO_DATA)),DEPS:JSON.parse(JSON.stringify(DEPS))};undoStack.push(snap);if(undoStack.length>MAX_UNDO)undoStack.shift();updateUndoBtn();}
function doUndo(){if(!undoStack.length)return;const snap=undoStack.pop();B=snap.B;SP.length=0;snap.SP.forEach(s=>SP.push(s));FO_DATA.length=0;snap.FO.forEach(f=>FO_DATA.push(f));DEPS=snap.DEPS;cascade();saveState();render();updateUndoBtn();addChatMsg('system','Undone.');}
function updateUndoBtn(){const btn=document.getElementById('undoBtn');if(btn)btn.style.display=undoStack.length?'flex':'none';}

// ─── COMMAND PARSER — CRITICAL: Do not modify, replace, or "improve" this function ───
function parseActions(text){const actions=[];const clean=text.replace(/\[ACTION:(.*?)\]/g,(_,m)=>{actions.push(m.split(':'));return '';});return {clean:clean.trim(),actions};}

function execAction(parts){const cmd=parts[0];
  if(cmd==='setLight'&&parts.length>=3){const k=parts[1],c=parts[2];if(B[k])B[k].light=c;cascade();saveState();render();}
  else if(cmd==='setAllLights'&&parts.length>=2){const c=parts[1];Object.keys(B).forEach(k=>B[k].light=c);cascade();saveState();render();}
  else if(cmd==='setSubpageLights'&&parts.length>=3){const spId=parts[1],c=parts[2];Object.keys(B).filter(k=>k.startsWith(spId+'-')).forEach(k=>B[k].light=c);cascade();saveState();render();}
  else if(cmd==='addSofar'&&parts.length>=3){const k=parts[1],txt=parts.slice(2).join(':');if(B[k])B[k].entries.push({type:'sofar',text:txt});saveState();render();}
  else if(cmd==='addNote'&&parts.length>=3){const k=parts[1],txt=parts.slice(2).join(':');if(B[k])B[k].entries.push({type:'note',text:txt});saveState();render();}
  else if(cmd==='setPriority'&&parts.length>=3){const k=parts[1],p=parts[2];if(B[k])B[k].priority=p;saveState();render();}
  else if(cmd==='clearEntries'&&parts.length>=3){const k=parts[1],t=parts[2];if(B[k]){if(t==='all')B[k].entries=[];else B[k].entries=B[k].entries.filter(e=>e.type!==(t==='sofar'?'sofar':'note'));}saveState();render();}
  else if(cmd==='addBox'&&parts.length>=4){const spId=parts[1],ci=parseInt(parts[2]),label=parts.slice(3).join(':');const sp=SP.find(s=>s.id===spId);if(sp&&sp.cols[ci]){sp.cols[ci].boxes.push(label);const bi=sp.cols[ci].boxes.length-1;const k=`${spId}-c${ci}-b${bi}`;B[k]={label,light:ci===0?'yellow':'grey',entries:[],priority:'',hasSubpage:false};buildDepsMap();cascade();saveState();render();}}
  else if(cmd==='removeBox'&&parts.length>=2){const k=parts[1];const m=k.match(/^(p\d+)-c(\d+)-b(\d+)$/);if(m){const spId=m[1],ci=parseInt(m[2]),bi=parseInt(m[3]);const sp=SP.find(s=>s.id===spId);if(sp&&sp.cols[ci]&&sp.cols[ci].boxes[bi]!==undefined){sp.cols[ci].boxes.splice(bi,1);delete B[k];rebuildBoxKeys(spId);buildDepsMap();cascade();saveState();render();}}}
  else if(cmd==='renameBox'&&parts.length>=3){const k=parts[1],nl=parts.slice(2).join(':');if(B[k]){B[k].label=nl;const m=k.match(/^(p\d+)-c(\d+)-b(\d+)$/);if(m){const sp=SP.find(s=>s.id===m[1]);if(sp&&sp.cols[parseInt(m[2])])sp.cols[parseInt(m[2])].boxes[parseInt(m[3])]=nl;}saveState();render();}}
  else if(cmd==='addColumn'&&parts.length>=4){const spId=parts[1],ci=parseInt(parts[2]),h=parts.slice(3).join(':');const sp=SP.find(s=>s.id===spId);if(sp){sp.cols.splice(ci,0,{h,boxes:[]});rebuildBoxKeys(spId);buildDepsMap();cascade();saveState();render();}}
  else if(cmd==='removeColumn'&&parts.length>=3){const spId=parts[1],ci=parseInt(parts[2]);const sp=SP.find(s=>s.id===spId);if(sp&&sp.cols[ci]){sp.cols.splice(ci,1);rebuildBoxKeys(spId);buildDepsMap();cascade();saveState();render();}}
  else if(cmd==='renameColumn'&&parts.length>=4){const spId=parts[1],ci=parseInt(parts[2]),nh=parts.slice(3).join(':');const sp=SP.find(s=>s.id===spId);if(sp&&sp.cols[ci]){sp.cols[ci].h=nh;saveState();render();}}
  else if(cmd==='addSubpage'&&parts.length>=5){const label=parts[1],bg=parts[2],bdr=parts[3],tab=parts[4];const id='p'+(SP.length+1);SP.push({id,label,color:{bg,bdr,tab},cols:[{h:'First Stage',boxes:[]}]});buildDepsMap();saveState();render();}
  else if(cmd==='removeSubpage'&&parts.length>=2){const spId=parts[1];const idx=SP.findIndex(s=>s.id===spId);if(idx>=0){Object.keys(B).filter(k=>k.startsWith(spId+'-')).forEach(k=>delete B[k]);SP.splice(idx,1);buildDepsMap();cascade();saveState();render();if(currentPage===spId)navTo('overview');}}
  else if(cmd==='addFinalOutcome'&&parts.length>=2){const label=parts.slice(1).join(':');FO_DATA.push(label);const i=FO_DATA.length-1;B[`final-b${i}`]={label,light:'grey',entries:[],priority:'',hasSubpage:false};saveState();render();}
  else if(cmd==='removeFinalOutcome'&&parts.length>=2){const i=parseInt(parts[1]);if(i>=0&&i<FO_DATA.length){FO_DATA.splice(i,1);delete B[`final-b${i}`];rebuildFinalKeys();saveState();render();}}
}

function rebuildBoxKeys(spId){const sp=SP.find(s=>s.id===spId);if(!sp)return;const oldB={};Object.keys(B).filter(k=>k.startsWith(spId+'-')).forEach(k=>{oldB[k]=B[k];delete B[k];});sp.cols.forEach((col,ci)=>{col.boxes.forEach((label,bi)=>{const k=`${spId}-c${ci}-b${bi}`;const old=oldB[k];B[k]=old||{label,light:ci===0?'yellow':'grey',entries:[],priority:'',hasSubpage:false};B[k].label=label;});});}
function rebuildFinalKeys(){const oldB={};Object.keys(B).filter(k=>k.startsWith('final-')).forEach(k=>{oldB[k]=B[k];delete B[k];});FO_DATA.forEach((label,i)=>{const k=`final-b${i}`;const old=oldB[k];B[k]=old||{label,light:'grey',entries:[],priority:'',hasSubpage:false};B[k].label=label;});}

function processAIResponse(fullText){const{clean,actions}=parseActions(fullText);if(!actions.length)return clean;const stateActions=actions.filter(a=>!STRUCTURAL_CMDS.includes(a[0]));const structActions=actions.filter(a=>STRUCTURAL_CMDS.includes(a[0]));if(stateActions.length||structActions.length)takeSnapshot();stateActions.forEach(a=>execAction(a));if(structActions.length){pendingStructural=structActions;const descs=structActions.map(a=>a.join(' → ')).join(', ');showConfirmation(descs);}return clean;}
function showConfirmation(desc){const msgs=document.getElementById('chatMsgs');const div=document.createElement('div');div.className='chat-m sys';div.innerHTML=`⚠️ Structural change: ${desc}<br><button onclick="confirmStructural(true)" style="background:#22c55e;color:#fff;border:none;border-radius:5px;padding:4px 12px;margin:5px 4px 0 0;cursor:pointer;font-size:11px;font-weight:600">OK</button><button onclick="confirmStructural(false)" style="background:#ef4444;color:#fff;border:none;border-radius:5px;padding:4px 12px;margin:5px 0 0;cursor:pointer;font-size:11px;font-weight:600">Cancel</button>`;msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;}
function confirmStructural(ok){if(ok){pendingStructural.forEach(a=>execAction(a));}else{doUndo();}pendingStructural=[];addChatMsg('system',ok?'Changes applied.':'Changes cancelled.');}

// ─── SOURCES & MODALS ───
function openSources(){const list=document.getElementById('srcList');if(!sources.length)list.innerHTML='<li style="color:var(--text2);font-style:italic">No sources added yet.</li>';else list.innerHTML=sources.map(s=>`<li>${s.title} — <a href="${s.url}" target="_blank">${s.url}</a></li>`).join('');openModal('srcModal');}
function addSource(title,url){sources.push({title,url});try{localStorage.setItem('doview_sources',JSON.stringify(sources));}catch(e){}}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function openInfoDev(){openModal('infoModal');}
function openAck(){openModal('ackModal');}
function openUpdateModal(){const nonGrey=Object.entries(B).filter(([_,v])=>v.light!=='grey');const green=nonGrey.filter(([_,v])=>v.light==='green').length;const yellow=nonGrey.filter(([_,v])=>v.light==='yellow').length;const red=nonGrey.filter(([_,v])=>v.light==='red').length;const total=Object.keys(B).length;let txt=`DOVIEW-STATE: ${TITLE}\nSummary: ${green}/${total} green · ${yellow} yellow · ${red} red\n---\n`;nonGrey.forEach(([k,v])=>{const entryTxt=v.entries.length?' | '+v.entries.map(e=>`[${e.type}] ${e.text}`).join(' | '):'';const priTxt=v.priority?` | Pri:${v.priority}`:'';txt+=`${k} | ${v.light}${priTxt} | ${v.label}${entryTxt}\n`;});txt+='---\nClaude: acknowledge with "Got it — board updated." only, unless user asks something else.';document.getElementById('updTa').value=txt;document.getElementById('cpyBtn').textContent='Select All and Copy';document.getElementById('cpyBtn').className='copy-btn';openModal('updModal');}
function copyState(){const ta=document.getElementById('updTa');ta.select();document.execCommand('copy');const btn=document.getElementById('cpyBtn');btn.textContent='✓ Copied!';btn.className='copy-btn copied';setTimeout(()=>{btn.textContent='Select All and Copy';btn.className='copy-btn';},2000);}

// ─── DOWNLOAD ───
function downloadBoard(){const cleanB={};Object.entries(B).forEach(([k,v])=>{cleanB[k]={label:v.label,light:v.light,entries:[...v.entries],priority:v.priority,hasSubpage:v.hasSubpage};});const fullState={B:cleanB,SP:JSON.parse(JSON.stringify(SP)),FO:[...FO_DATA]};const stateJson=JSON.stringify(fullState);let src=document.documentElement.outerHTML;src=src.replace(/let EMBEDDED_STATE = null;/,`let EMBEDDED_STATE = ${stateJson};`);src=src.replace(/let EMBEDDED_STATE = \{.*?\};/s,`let EMBEDDED_STATE = ${stateJson};`);const blob=new Blob(['<!DOCTYPE html>\n'+src],{type:'text/html'});const url=URL.createObjectURL(blob);const a=document.createElement('a');const d=new Date();const ds=`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;a.href=url;a.download=`${SLUG}_backup_${ds}.html`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);const btn=document.getElementById('dlBtn');btn.textContent='✓ Downloaded!';btn.style.background='#22c55e';setTimeout(()=>{btn.textContent='📥 Download Board';btn.style.background='';},2000);}

// ─── CHAT ───
function toggleChat(){const panel=document.getElementById('chatPanel');panel.classList.toggle('open');if(panel.classList.contains('open')&&!chatMsgs.length)addChatMsg('system','Hi! I can help you with your DoView. Ask me anything about the board, progress, or next steps. I can also make changes — try "turn all lights red" or "add a box to column 1". Type "undo" to revert.');}
function toggleChatSettings(){chatSettingsOpen=!chatSettingsOpen;document.getElementById('chatSettingsPane').classList.toggle('open',chatSettingsOpen);document.getElementById('chatMsgs').style.display=chatSettingsOpen?'none':'';document.getElementById('chatInputArea').style.display=chatSettingsOpen?'none':'';if(chatSettingsOpen&&aiSettings.endpoint){document.getElementById('setEP').value=aiSettings.endpoint||'';document.getElementById('setModel').value=aiSettings.model||'';}}
function addChatMsg(role,text){chatMsgs.push({role,text});const msgs=document.getElementById('chatMsgs');if(!msgs)return;const div=document.createElement('div');div.className=`chat-m ${role}`;div.innerHTML=renderMd(text);msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;}
function renderMd(text){return linkify(text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>')).replace(/\n/g,'<br>');}

function buildBoardStatePrompt(){let s=`You are a helpful assistant with full awareness of this DoView board: "${TITLE}".\n\nCurrent board state:\n`;SP.forEach(sp=>{s+=`\n[${sp.label} (id:${sp.id})]\n`;sp.cols.forEach((col,ci)=>{s+=`  Column ${ci+1}: "${col.h}"\n`;col.boxes.forEach((_,bi)=>{const k=`${sp.id}-c${ci}-b${bi}`;const b=B[k];if(!b)return;const pri=b.priority?` [Pri:${b.priority}]`:'';const sf=b.entries.filter(e=>e.type==='sofar').map(e=>e.text).join('; ');s+=`    ${k} | ${b.light.toUpperCase()}${pri}: ${b.label}${sf?' — '+sf:''}\n`;});});});s+=`\nFinal Outcomes:\n`;FO_DATA.forEach((label,i)=>{const b=B[`final-b${i}`];if(!b)return;s+=`  final-b${i} | ${b.light.toUpperCase()}: ${label}\n`;});s+=`\nYou can modify the board by including action commands in your response. Commands use the format [ACTION:command:arg1:arg2:...] on their own line.\nIMPORTANT: When talking to the user, refer to columns as Column 1, Column 2, etc. (1-based). In ACTION commands, use 0-based COLUMN_INDEX (Column 1 = index 0, Column 2 = index 1, etc.).\nIMPORTANT: Always include ACTION tags directly in your response for any board changes. The JavaScript will automatically show a confirmation dialog for structural changes — do NOT ask for permission in plain text instead of including the ACTION tags.\n\nAvailable commands:\nState changes (execute immediately):\n  [ACTION:setLight:BOX_ID:COLOR] — set traffic light (green/yellow/red/grey)\n  [ACTION:setAllLights:COLOR] — set ALL boxes to a colour\n  [ACTION:setSubpageLights:SUBPAGE_ID:COLOR] — set all boxes on a subpage\n  [ACTION:addSofar:BOX_ID:TEXT] — append a So far entry\n  [ACTION:addNote:BOX_ID:TEXT] — append a Notes entry\n  [ACTION:setPriority:BOX_ID:PRIORITY] — set priority (A/B/C/D/E/BAU or empty to clear)\n  [ACTION:clearEntries:BOX_ID:TYPE] — clear entries (sofar/note/all)\n\nStructural changes (user confirms before executing — include the ACTION tags and the system handles confirmation):\n  [ACTION:addBox:SUBPAGE_ID:COLUMN_INDEX:LABEL]\n  [ACTION:removeBox:BOX_ID]\n  [ACTION:renameBox:BOX_ID:NEW_LABEL]\n  [ACTION:addColumn:SUBPAGE_ID:COLUMN_INDEX:HEADING]\n  [ACTION:removeColumn:SUBPAGE_ID:COLUMN_INDEX]\n  [ACTION:renameColumn:SUBPAGE_ID:COLUMN_INDEX:NEW_HEADING]\n  [ACTION:addSubpage:LABEL:BG_COLOR:BORDER_COLOR:TAB_COLOR]\n  [ACTION:removeSubpage:SUBPAGE_ID]\n  [ACTION:addFinalOutcome:LABEL]\n  [ACTION:removeFinalOutcome:INDEX]\n\nRules: Always explain what you are doing in natural language. Only use box IDs that exist in the board state above. Include ACTION tags alongside your explanation — never describe changes without including the tags.`;return s;}

async function sendChat(){const inp=document.getElementById('chatIn');const msg=inp.value.trim();if(!msg)return;inp.value='';if(msg.toLowerCase()==='undo'){doUndo();return;}addChatMsg('user',msg);const history=chatMsgs.slice(-20).filter(m=>m.role!=='system').map(m=>({role:m.role==='asst'?'assistant':m.role,content:m.text}));const sysPmt=buildBoardStatePrompt();
  if(claudeConnected){try{const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1200,system:sysPmt,messages:history,tools:[{type:'web_search_20250305',name:'web_search'}]})});if(r.ok){const d=await r.json();const raw=d.content.filter(b=>b.type==='text').map(b=>b.text).join('\n').replace(/]*>|<\/antml:cite>/g,'');if(raw){const clean=processAIResponse(raw);if(clean){addChatMsg('asst',clean);chatMsgs[chatMsgs.length-1].role='asst';}}}else addChatMsg('system','Unable to get a response. Please try again.');}catch(e){addChatMsg('system','Connection error. Please check your network.');}}
  else if(aiSettings.endpoint&&aiSettings.key){try{const r=await fetch(aiSettings.endpoint,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${aiSettings.key}`},body:JSON.stringify({model:aiSettings.model||'gpt-4o',messages:[{role:'system',content:sysPmt},...history],max_tokens:1200})});if(r.ok){const d=await r.json();const raw=d.choices?.[0]?.message?.content||'';if(raw){const clean=processAIResponse(raw);if(clean){addChatMsg('asst',clean);chatMsgs[chatMsgs.length-1].role='asst';}}}else addChatMsg('system','API error. Check your settings.');}catch(e){addChatMsg('system','Connection error. Check settings.');}}
  else addChatMsg('system','No AI connected. Click ⚙️ to configure an API endpoint, or use this board within Claude.ai for automatic connection.');}

function openAIChatBox(key){entryMode='chat';if(!document.getElementById('chatPanel').classList.contains('open'))toggleChat();const inp=document.getElementById('chatIn');if(inp){inp.value=`[About: ${B[key].label}] `;inp.focus();}}
function saveChatSettings(){aiSettings={endpoint:document.getElementById('setEP').value.trim(),key:document.getElementById('setKey').value.trim(),model:document.getElementById('setModel').value.trim()||'gpt-4o'};if(document.getElementById('rememberAI').checked)localStorage.setItem('doview_ai_settings',JSON.stringify(aiSettings));claudeConnected=false;document.getElementById('chatStatus').textContent=aiSettings.endpoint?'✓ Connected':'Click ⚙️ to connect an AI';toggleChatSettings();}
async function testChatConn(){const ep=document.getElementById('setEP').value.trim();const key=document.getElementById('setKey').value.trim();const model=document.getElementById('setModel').value.trim()||'gpt-4o';const res=document.getElementById('connTestResult');res.textContent='Testing...';try{const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},body:JSON.stringify({model,messages:[{role:'user',content:'hi'}],max_tokens:10})});res.textContent=r.ok?'✓ Connected successfully!':`Error: ${r.status} ${r.statusText}`;res.style.color=r.ok?'#22c55e':'#ef4444';}catch(e){res.textContent='Connection failed: '+e.message;res.style.color='#ef4444';}}
async function probeConnection(){try{const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:5,messages:[{role:'user',content:'hi'}]})});if(r.status===200){claudeConnected=true;document.getElementById('chatStatus').textContent='Connected via Claude';}else{document.getElementById('chatStatus').textContent=aiSettings.endpoint?'✓ Connected':'Click ⚙️ to connect an AI';}}catch(e){document.getElementById('chatStatus').textContent=aiSettings.endpoint?'✓ Connected':'Click ⚙️ to connect an AI';}}

// ─── EXPOSE GLOBALS ───
window.navTo=navTo;window.clickBox=clickBox;window.closeEntry=closeEntry;window.setMode=setMode;window.editEntries=editEntries;window.setTL=setTL;window.setPri=setPri;window.saveEntry=saveEntry;window.openSources=openSources;window.openModal=openModal;window.closeModal=closeModal;window.openInfoDev=openInfoDev;window.openAck=openAck;window.openUpdateModal=openUpdateModal;window.copyState=copyState;window.downloadBoard=downloadBoard;window.toggleChat=toggleChat;window.toggleChatSettings=toggleChatSettings;window.sendChat=sendChat;window.openAIChatBox=openAIChatBox;window.saveChatSettings=saveChatSettings;window.testChatConn=testChatConn;window.confirmStructural=confirmStructural;window.doUndo=doUndo;

// ─── INIT ENTRY POINT ───
function init(config) {
  TITLE = config.title || 'DoView Board';
  SLUG = config.slug || 'doview_board';
  SP = config.subpages || [];
  FO_DATA = config.finalOutcomes || [];
  sources = config.sources || [];
  const savedState = config.savedState || null;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // Set page title
  document.title = TITLE;

  // Inject HTML
  document.body.innerHTML = buildHTML(TITLE);

  // Build state
  buildInitialState();
  buildDepsMap();

  // Apply saved state if provided
  if (savedState) {
    if (savedState.B && savedState.SP) {
      SP.length = 0; savedState.SP.forEach(s => SP.push(s));
      FO_DATA.length = 0; (savedState.FO || []).forEach(f => FO_DATA.push(f));
      B = {}; buildInitialState(); buildDepsMap();
      Object.entries(savedState.B).forEach(([k, v]) => { if (B[k]) Object.assign(B[k], v); else B[k] = v; });
    } else {
      Object.entries(savedState).forEach(([k, v]) => { if (B[k]) Object.assign(B[k], v); });
    }
  } else {
    // Try localStorage
    try {
      const saved = localStorage.getItem(`doview-${SLUG}-v1`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.B && parsed.SP) {
          SP.length = 0; parsed.SP.forEach(s => SP.push(s));
          FO_DATA.length = 0; (parsed.FO || []).forEach(f => FO_DATA.push(f));
          B = {}; buildInitialState(); buildDepsMap();
          Object.entries(parsed.B).forEach(([k, v]) => { if (B[k]) Object.assign(B[k], v); else B[k] = v; });
        } else {
          Object.entries(parsed).forEach(([k, v]) => { if (B[k]) Object.assign(B[k], v); });
        }
      }
    } catch (e) {}
  }

  cascade();
  render();

  // Load settings
  try { const s = localStorage.getItem('doview_ai_settings'); if (s) aiSettings = JSON.parse(s); } catch (e) {}
  try { const s = localStorage.getItem('doview_sources'); if (s) sources = JSON.parse(s); } catch (e) {}
  probeConnection();
  updateUndoBtn();
  document.getElementById('chatIn').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } });

  // Close modals on backdrop click
  document.querySelectorAll('.modal-ov').forEach(m => { m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); }); });
}

return { init };
})();
