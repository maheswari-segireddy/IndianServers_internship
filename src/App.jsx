import { useState, useRef, useEffect, useCallback } from "react";

/* ─── CONSTANTS ──────────────────────────────────────────────── */
const EMERGENCY_KW = [
  "chest pain","heart attack","stroke","can't breathe","cannot breathe",
  "difficulty breathing","severe bleeding","unconscious","overdose",
  "suicidal","severe allergic","anaphylaxis","seizure","choking",
  "severe head injury","paralysis","poisoning","not breathing","fainted",
  "unconscious","sudden numbness","sudden confusion","blurred vision suddenly"
];

const SYSTEM_PROMPT = `You are MediAssist AI — a compassionate, knowledgeable medical assistant chatbot designed for educational and preliminary health guidance.

IDENTITY & TONE:
- Speak warmly, clearly, and without jargon
- Be empathetic, never alarmist (except for true emergencies)
- Use bullet points and short paragraphs for readability
- Always validate the user's concern before providing information

ABSOLUTE RULES:
1. ALWAYS include a disclaimer that you are an AI for educational/preliminary support only — NOT a substitute for a qualified doctor
2. For ANY emergency symptoms (chest pain, difficulty breathing, stroke signs, severe bleeding, unconsciousness, overdose, anaphylaxis, seizure, etc.) → IMMEDIATELY respond with "🚨 EMERGENCY:" at the start and urge calling 112 or local emergency services
3. NEVER definitively diagnose. Use: "this could suggest...", "may be associated with...", "a doctor would typically evaluate..."
4. For uploaded images/reports → describe general observations only; stress professional evaluation
5. Protect privacy — never repeat sensitive personal details back

RESPONSE FORMAT:
- Start with a brief empathetic acknowledgement
- Use clear headings with emojis
- End every response with: "⚕️ Disclaimer: I'm an AI assistant providing educational guidance only. Please consult a qualified healthcare professional for diagnosis and treatment."
- If emergency: Begin entire response with "🚨 EMERGENCY: [brief instruction to call 112/emergency services immediately]"

SCOPE: symptom explanation, medication info, report summarization, general wellness guidance, triage escalation`;

/* ─── HELPERS ────────────────────────────────────────────────── */
const isEmergency = t => EMERGENCY_KW.some(k => t.toLowerCase().includes(k));
const fmt = d => d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
const uid = () => Math.random().toString(36).slice(2);

/* ─── SUB-COMPONENTS ─────────────────────────────────────────── */
function Dot({ color="#e53e3e", size=8, delay=0 }) {
  return (
    <span style={{
      display:"inline-block", width:size, height:size, borderRadius:"50%",
      background:color,
      animation:`medBounce 1.2s ease-in-out ${delay}s infinite`
    }}/>
  );
}

function Pill({ color="#e53e3e", bg="#fff5f5", children, style={} }) {
  return (
    <span style={{
      background:bg, color, borderRadius:20, padding:"3px 10px",
      fontSize:11, fontWeight:600, border:`1px solid ${color}22`, ...style
    }}>{children}</span>
  );
}

function Avatar({ label, bg="#e53e3e", size=36 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%", background:bg,
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#fff", fontSize:size*0.38, fontWeight:700, flexShrink:0
    }}>{label}</div>
  );
}

function EmergencyCard() {
  return (
    <div style={{
      background:"linear-gradient(135deg,#fff5f5,#ffe4e4)",
      border:"2px solid #fc8181", borderRadius:14, padding:"14px 18px",
      margin:"6px 0", display:"flex", gap:12, alignItems:"flex-start",
      animation:"medFadeIn .3s ease"
    }}>
      <div style={{fontSize:28,lineHeight:1}}>🚨</div>
      <div>
        <p style={{margin:0,fontWeight:800,color:"#c53030",fontSize:15,letterSpacing:-.2}}>
          EMERGENCY DETECTED
        </p>
        <p style={{margin:"5px 0 0",color:"#742a2a",fontSize:13,lineHeight:1.5}}>
          Symptoms you described may need <strong>immediate emergency care</strong>.
          Call <strong style={{fontSize:16}}>112</strong> (India) or your local emergency number <strong>right now</strong>.
          Do not wait for an online response.
        </p>
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          {["🇮🇳 India: 112","🚑 Ambulance: 108","☎ AIIMS: 011-26588500"].map(s=>(
            <Pill key={s} color="#c53030" bg="#fff5f5">{s}</Pill>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  const user = msg.role==="user";
  return (
    <div style={{
      display:"flex", flexDirection:user?"row-reverse":"row",
      gap:10, marginBottom:18, alignItems:"flex-start",
      animation:"medFadeIn .3s ease"
    }}>
      <Avatar label={user?"You":"M"} bg={user?"#2d3748":"#e53e3e"}/>
      <div style={{maxWidth:"74%",display:"flex",flexDirection:"column",gap:5}}>
        {msg.emergency && !user && <EmergencyCard/>}
        {msg.imagePreview && (
          <div style={{
            background:"#fff8f8",border:"1.5px solid #fed7d7",
            borderRadius:12,padding:8,marginBottom:4
          }}>
            <img src={msg.imagePreview} alt="uploaded"
              style={{width:"100%",maxWidth:220,maxHeight:160,objectFit:"cover",borderRadius:8,display:"block"}}/>
            <p style={{margin:"6px 0 0",fontSize:11,color:"#c53030",fontWeight:600}}>
              📎 Medical image submitted for analysis
            </p>
          </div>
        )}
        {msg.docName && (
          <div style={{
            background:"#fff8f8",border:"1.5px solid #fed7d7",
            borderRadius:10,padding:"8px 12px",display:"flex",gap:8,alignItems:"center"
          }}>
            <span style={{fontSize:22}}>📋</span>
            <div>
              <p style={{margin:0,fontSize:13,fontWeight:600,color:"#c53030"}}>{msg.docName}</p>
              <p style={{margin:0,fontSize:11,color:"#718096"}}>Medical document attached</p>
            </div>
          </div>
        )}
        <div style={{
          background:user?"#2d3748":"#fff",
          color:user?"#f7fafc":"#1a202c",
          border:user?"none":"1px solid #e2e8f0",
          borderRadius:user?"18px 4px 18px 18px":"4px 18px 18px 18px",
          padding:"11px 15px", fontSize:14, lineHeight:1.65,
          whiteSpace:"pre-wrap", wordBreak:"break-word",
          boxShadow:user?"none":"0 1px 4px rgba(0,0,0,.06)"
        }}>{msg.content}</div>
        <span style={{fontSize:11,color:"#a0aec0",alignSelf:user?"flex-end":"flex-start",marginTop:2}}>
          {fmt(msg.ts)}
        </span>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:18}}>
      <Avatar label="M" bg="#e53e3e"/>
      <div style={{
        background:"#fff",border:"1px solid #e2e8f0",
        borderRadius:"4px 18px 18px 18px",padding:"14px 18px",
        display:"flex",gap:6,alignItems:"center",
        boxShadow:"0 1px 4px rgba(0,0,0,.06)"
      }}>
        {[0,.2,.4].map(d=><Dot key={d} delay={d}/>)}
      </div>
    </div>
  );
}

/* ─── SCREENS ─────────────────────────────────────────────────── */
function Dashboard({ onNav, stats }) {
  const cards = [
    { icon:"💬", label:"Symptom Chat", desc:"Describe symptoms, get guidance", tab:"chat", color:"#e53e3e", bg:"#fff5f5" },
    { icon:"🔬", label:"Image Analysis", desc:"Upload skin, X-ray, or report images", tab:"image", color:"#3182ce", bg:"#ebf8ff" },
    { icon:"📋", label:"Report Summary", desc:"Paste or upload medical reports", tab:"report", color:"#38a169", bg:"#f0fff4" },
    { icon:"💊", label:"Medicine Info", desc:"Drug details, side effects, dosing", tab:"medicine", color:"#d69e2e", bg:"#fffff0" },
    { icon:"🚨", label:"Emergency Guide", desc:"Red-flag symptoms & emergency contacts", tab:"emergency", color:"#e53e3e", bg:"#fff5f5" },
    { icon:"❓", label:"Health FAQ", desc:"Common health questions answered", tab:"faq", color:"#805ad5", bg:"#faf5ff" },
  ];

  return (
    <div style={{padding:"28px 28px 20px",height:"100%",overflowY:"auto"}}>
      {/* Hero */}
      <div style={{
        background:"linear-gradient(135deg,#c53030 0%,#e53e3e 40%,#fc8181 100%)",
        borderRadius:20,padding:"28px 32px",marginBottom:24,color:"#fff",position:"relative",overflow:"hidden"
      }}>
        <div style={{position:"absolute",right:-20,top:-20,fontSize:120,opacity:.1,lineHeight:1}}>🏥</div>
        <Pill color="#fff" bg="rgba(255,255,255,.2)" style={{marginBottom:12,display:"inline-block"}}>
          Healthcare + Vision + Safety
        </Pill>
        <h1 style={{margin:"0 0 8px",fontSize:26,fontWeight:800,letterSpacing:-.5}}>
          MediAssist AI Bot
        </h1>
        <p style={{margin:"0 0 16px",fontSize:14,opacity:.9,lineHeight:1.5,maxWidth:440}}>
          A responsible medical assistant powered by Claude AI. Get symptom guidance,
          analyze medical images, summarize reports, and more — safely and privately.
        </p>
        <div style={{
          background:"rgba(255,255,255,.15)",borderRadius:10,
          padding:"10px 14px",display:"inline-flex",gap:8,alignItems:"center",
          fontSize:13,border:"1px solid rgba(255,255,255,.3)"
        }}>
          ⚠️ <strong>Educational Use Only</strong> — Not a substitute for professional medical care
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:24}}>
        {[
          {label:"Queries Answered",val:stats.queries,icon:"💬"},
          {label:"Images Analyzed",val:stats.images,icon:"🔬"},
          {label:"Reports Summarized",val:stats.reports,icon:"📋"},
          {label:"Emergency Alerts",val:stats.alerts,icon:"🚨"},
        ].map(s=>(
          <div key={s.label} style={{
            background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,
            padding:"16px",textAlign:"center"
          }}>
            <div style={{fontSize:24,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:22,fontWeight:800,color:"#1a202c"}}>{s.val}</div>
            <div style={{fontSize:11,color:"#718096",marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <h2 style={{margin:"0 0 14px",fontSize:16,fontWeight:700,color:"#1a202c"}}>
        🔧 What can I help you with?
      </h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:24}}>
        {cards.map(c=>(
          <button key={c.tab} onClick={()=>onNav(c.tab)} style={{
            background:"#fff",border:`1.5px solid ${c.color}33`,
            borderRadius:14,padding:"18px 16px",cursor:"pointer",
            textAlign:"left",transition:"all .2s",
            ":hover":{transform:"translateY(-2px)"}
          }}
          onMouseEnter={e=>{e.currentTarget.style.background=c.bg;e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.transform="none";}}>
            <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
            <div style={{fontWeight:700,fontSize:14,color:"#1a202c",marginBottom:4}}>{c.label}</div>
            <div style={{fontSize:12,color:"#718096",lineHeight:1.4}}>{c.desc}</div>
            <div style={{marginTop:10,color:c.color,fontSize:12,fontWeight:600}}>Open →</div>
          </button>
        ))}
      </div>

      {/* Model info */}
      <div style={{
        background:"#f7fafc",border:"1px solid #e2e8f0",borderRadius:14,padding:"18px 20px"
      }}>
        <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:700,color:"#1a202c"}}>
          ⚙️ Model & API Approach
        </h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {k:"AI Model",v:"Claude claude-sonnet-4-20250514 (Anthropic)"},
            {k:"Vision",v:"Claude Multimodal — image + text analysis"},
            {k:"Safety",v:"System-prompt constraints + emergency detection"},
            {k:"Privacy",v:"No data stored — session only processing"},
          ].map(({k,v})=>(
            <div key={k} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e2e8f0"}}>
              <p style={{margin:0,fontSize:11,color:"#a0aec0",fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>{k}</p>
              <p style={{margin:"4px 0 0",fontSize:13,color:"#2d3748",fontWeight:500}}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ messages, onSend, loading, onImageUpload, uploadedFile, onClearFile, tab }) {
  const [input, setInput] = useState("");
  const fileRef = useRef();
  const bottomRef = useRef();
  const taRef = useRef();

  const starters = {
    chat:["I have a headache and fever","My throat is sore","I've had a cough for 3 days","What are signs of diabetes?","How do I manage high BP?"],
    image:["Analyze this skin image","What does this X-ray show?","Explain findings in this scan","Is this rash concerning?"],
    report:["Summarize my blood test report","What do these values mean?","Explain my CBC results","What is high creatinine?"],
    medicine:["What is Paracetamol used for?","Side effects of Metformin","Can I take Ibuprofen daily?","What is Azithromycin?"],
  };

  const placeholder = {
    chat:"Describe your symptoms here… e.g. 'I have chest tightness and shortness of breath'",
    image:"Describe what you'd like to know about the image…",
    report:"Paste your report text or ask about uploaded report…",
    medicine:"Ask about a medication, dosage, interactions…",
  }[tab]||"Type your health question…";

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"})},[messages,loading]);

  const send = () => {
    const t = input.trim();
    if(!t && !uploadedFile) return;
    onSend(t);
    setInput("");
    if(taRef.current){taRef.current.style.height="auto";}
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {/* Quick starters */}
      {messages.length<=1 && (
        <div style={{padding:"12px 16px 0",display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
          {(starters[tab]||starters.chat).map(q=>(
            <button key={q} onClick={()=>onSend(q)} style={{
              background:"#fff5f5",border:"1px solid #fed7d7",borderRadius:20,
              padding:"6px 13px",fontSize:12,color:"#c53030",cursor:"pointer",
              transition:"background .15s"
            }}
            onMouseEnter={e=>e.target.style.background="#fed7d7"}
            onMouseLeave={e=>e.target.style.background="#fff5f5"}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 8px"}}>
        {messages.map(m=><MessageBubble key={m.id} msg={m}/>)}
        {loading && <TypingBubble/>}
        <div ref={bottomRef}/>
      </div>

      {/* File preview */}
      {uploadedFile && (
        <div style={{
          margin:"0 16px 8px",background:"#fff5f5",border:"1.5px solid #fed7d7",
          borderRadius:10,padding:"10px 14px",display:"flex",gap:10,alignItems:"center",flexShrink:0
        }}>
          {uploadedFile.type?.startsWith("image/")
            ? <img src={uploadedFile.preview} alt="" style={{width:48,height:48,objectFit:"cover",borderRadius:6}}/>
            : <span style={{fontSize:28}}>📋</span>}
          <div style={{flex:1,minWidth:0}}>
            <p style={{margin:0,fontSize:13,fontWeight:700,color:"#c53030",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{uploadedFile.name}</p>
            <p style={{margin:0,fontSize:11,color:"#718096"}}>{uploadedFile.type?.startsWith("image/")?"Image ready for visual analysis":"Document ready for text analysis"}</p>
          </div>
          <button onClick={onClearFile} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#a0aec0",padding:4}}>✕</button>
        </div>
      )}

      {/* Input */}
      <div style={{
        background:"#fff",borderTop:"1px solid #e2e8f0",
        padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-end",flexShrink:0
      }}>
        <input type="file" ref={fileRef} accept="image/*,.pdf,.txt,.doc,.docx" style={{display:"none"}}
          onChange={e=>onImageUpload(e.target.files[0])}/>
        <button onClick={()=>fileRef.current?.click()} title="Attach image or document" style={{
          background:"transparent",border:"1.5px solid #e2e8f0",
          borderRadius:10,width:42,height:42,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:18,flexShrink:0,transition:"all .15s"
        }}
        onMouseEnter={e=>{e.currentTarget.style.background="#fff5f5";e.currentTarget.style.borderColor="#fed7d7";}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#e2e8f0";}}>
          📎
        </button>

        <div style={{
          flex:1,background:"#f7fafc",border:"1.5px solid #e2e8f0",
          borderRadius:12,padding:"8px 14px",display:"flex",alignItems:"flex-end",
          transition:"border-color .2s"
        }}
        onFocusCapture={e=>e.currentTarget.style.borderColor="#fc8181"}
        onBlurCapture={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
          <textarea ref={taRef} value={input}
            onChange={e=>{setInput(e.target.value);e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,120)+"px";}}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder={placeholder} rows={1}
            style={{
              width:"100%",background:"transparent",border:"none",resize:"none",
              fontSize:14,color:"#1a202c",lineHeight:1.5,fontFamily:"inherit",
              maxHeight:120,overflowY:"auto",outline:"none"
            }}/>
        </div>

        <button onClick={send} disabled={loading||(!input.trim()&&!uploadedFile)} style={{
          background: loading||(!input.trim()&&!uploadedFile)?"#e2e8f0":"#e53e3e",
          border:"none",borderRadius:10,width:42,height:42,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:18,flexShrink:0,transition:"all .2s",color:"#fff"
        }}>➤</button>
      </div>
    </div>
  );
}

function EmergencyScreen() {
  const reds = [
    {icon:"❤️",title:"Heart Attack Signs",sxs:["Chest pain or tightness","Pain radiating to arm or jaw","Shortness of breath","Sweating, nausea","Dizziness"]},
    {icon:"🧠",title:"Stroke Signs (FAST)",sxs:["F — Face drooping","A — Arm weakness","S — Speech difficulty","T — Time to call 112","Sudden severe headache"]},
    {icon:"🫁",title:"Breathing Emergency",sxs:["Cannot breathe or very fast breathing","Blue lips or fingertips","Choking (unable to speak)","Severe asthma attack","Anaphylaxis / severe allergy"]},
    {icon:"🩸",title:"Severe Bleeding",sxs:["Uncontrolled bleeding","Internal bleeding suspected","Blood in vomit or stool","Coughing up blood","Severe trauma or injury"]},
    {icon:"🧪",title:"Poisoning / Overdose",sxs:["Accidental drug or chemical ingestion","Unconscious after substance use","Suspected food poisoning severe","Snake or animal bite","Skin/eye chemical exposure"]},
    {icon:"⚡",title:"Neurological Emergency",sxs:["Seizure lasting >5 mins","Loss of consciousness","Sudden confusion or disorientation","Severe head injury","Sudden vision loss"]},
  ];

  const contacts = [
    {label:"National Emergency",num:"112",color:"#e53e3e"},
    {label:"Ambulance",num:"108",color:"#3182ce"},
    {label:"Police",num:"100",color:"#2d3748"},
    {label:"Fire",num:"101",color:"#d69e2e"},
    {label:"Disaster Mgmt",num:"1078",color:"#38a169"},
    {label:"Women Helpline",num:"1091",color:"#805ad5"},
  ];

  return (
    <div style={{padding:"20px",height:"100%",overflowY:"auto"}}>
      <div style={{
        background:"linear-gradient(135deg,#742a2a,#c53030)",
        borderRadius:16,padding:"20px 24px",marginBottom:20,color:"#fff"
      }}>
        <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:800}}>🚨 Emergency Guide</h2>
        <p style={{margin:0,fontSize:13,opacity:.9}}>
          If you or someone nearby has any of these symptoms — <strong>DO NOT WAIT</strong>. Call emergency services immediately.
        </p>
      </div>

      <div style={{
        background:"#fff",border:"2px solid #e53e3e",borderRadius:14,
        padding:"16px 20px",marginBottom:20
      }}>
        <p style={{margin:"0 0 12px",fontWeight:700,color:"#c53030",fontSize:15}}>📞 Emergency Contacts — India</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10}}>
          {contacts.map(c=>(
            <div key={c.num} style={{
              background:"#f7fafc",borderRadius:10,padding:"12px",
              textAlign:"center",border:`1.5px solid ${c.color}33`
            }}>
              <p style={{margin:0,fontSize:22,fontWeight:800,color:c.color}}>{c.num}</p>
              <p style={{margin:"3px 0 0",fontSize:11,color:"#718096"}}>{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#1a202c"}}>🔴 Red-Flag Symptoms — Seek Immediate Help</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12}}>
        {reds.map(r=>(
          <div key={r.title} style={{
            background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:"16px 18px"
          }}>
            <p style={{margin:"0 0 10px",fontWeight:700,fontSize:14,color:"#1a202c"}}>
              {r.icon} {r.title}
            </p>
            {r.sxs.map(s=>(
              <div key={s} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#e53e3e",flexShrink:0}}/>
                <span style={{fontSize:13,color:"#4a5568"}}>{s}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        background:"#fffff0",border:"1px solid #d69e2e",borderRadius:14,
        padding:"14px 18px",marginTop:20
      }}>
        <p style={{margin:"0 0 8px",fontWeight:700,color:"#744210",fontSize:14}}>
          ⚠️ While waiting for emergency services:
        </p>
        {["Stay calm and keep the person still","Do not give food or water unless instructed","If unconscious and not breathing, start CPR if trained","Keep them warm with a blanket","Send someone to guide the ambulance to your location","Stay on the line with emergency services"].map(s=>(
          <div key={s} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:5}}>
            <span style={{color:"#d69e2e",fontWeight:700,marginTop:1}}>✓</span>
            <span style={{fontSize:13,color:"#744210"}}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQScreen({ onAsk }) {
  const faqs = [
    {q:"What is a normal blood pressure range?",a:"Normal BP is below 120/80 mmHg. 120-129/<80 is elevated. 130-139/80-89 is Stage 1 hypertension. 140+/90+ is Stage 2."},
    {q:"What are normal blood sugar levels?",a:"Fasting: 70-99 mg/dL (normal), 100-125 (prediabetes), 126+ (diabetes). Post-meal (2hr): <140 normal, 140-199 prediabetes, 200+ diabetes."},
    {q:"When should I go to the ER?",a:"Go immediately for: chest pain, stroke signs, difficulty breathing, severe bleeding, loss of consciousness, poisoning, severe head injury, or anaphylaxis."},
    {q:"What does a CBC blood test check?",a:"Complete Blood Count checks: RBC (red cells), WBC (white cells), Hemoglobin, Hematocrit, Platelets. Detects anemia, infection, blood disorders."},
    {q:"How do I manage a fever at home?",a:"Rest and hydrate well. Take paracetamol (as directed). Use a cool damp cloth. Seek care if fever >103°F / 39.4°C, lasts >3 days, or with rash/stiff neck."},
    {q:"What are signs of dehydration?",a:"Dark urine, dry mouth, dizziness, fatigue, decreased urination, headache. Severe: sunken eyes, rapid heartbeat, confusion — seek emergency help."},
    {q:"How long should a cough last?",a:"Acute cough: <3 weeks (usually infection). Subacute: 3-8 weeks. Chronic: >8 weeks. See a doctor if coughing blood, severe chest pain, or with weight loss."},
    {q:"What is a normal heart rate?",a:"Adults: 60-100 bpm at rest. Athletes may have 40-60 bpm. >100 bpm (tachycardia) or <60 bpm (bradycardia) — consult a doctor if symptomatic."},
  ];
  const [open, setOpen] = useState(null);

  return (
    <div style={{padding:"20px",height:"100%",overflowY:"auto"}}>
      <div style={{
        background:"linear-gradient(135deg,#553c9a,#805ad5)",
        borderRadius:16,padding:"20px 24px",marginBottom:20,color:"#fff"
      }}>
        <h2 style={{margin:"0 0 6px",fontSize:20,fontWeight:800}}>❓ Health FAQ</h2>
        <p style={{margin:0,fontSize:13,opacity:.9}}>Common health questions with clear, patient-friendly answers.</p>
      </div>

      {faqs.map((f,i)=>(
        <div key={i} style={{
          background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,
          marginBottom:10,overflow:"hidden"
        }}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{
            width:"100%",background:"transparent",border:"none",
            padding:"14px 18px",textAlign:"left",cursor:"pointer",
            display:"flex",justifyContent:"space-between",alignItems:"center",
            gap:12
          }}>
            <span style={{fontSize:14,fontWeight:600,color:"#1a202c"}}>{f.q}</span>
            <span style={{fontSize:18,color:"#a0aec0",flexShrink:0,transition:"transform .2s",
              transform:open===i?"rotate(180deg)":"none"}}>▾</span>
          </button>
          {open===i && (
            <div style={{padding:"0 18px 16px",borderTop:"1px solid #f0f0f0"}}>
              <p style={{margin:"12px 0 10px",fontSize:13,color:"#4a5568",lineHeight:1.6}}>{f.a}</p>
              <button onClick={()=>onAsk(f.q)} style={{
                background:"#faf5ff",border:"1px solid #d6bcfa",borderRadius:20,
                padding:"5px 14px",fontSize:12,color:"#6b46c1",cursor:"pointer"
              }}>
                Ask MediAssist AI about this ↗
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PrivacyModal({ onClose }) {
  return (
    <div style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,.55)",
      display:"flex",alignItems:"center",justifyContent:"center",
      zIndex:9999,padding:20,animation:"medFadeIn .2s ease"
    }}>
      <div style={{
        background:"#fff",borderRadius:18,padding:"28px 32px",
        maxWidth:480,width:"100%",maxHeight:"85vh",overflowY:"auto"
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#1a202c"}}>🔒 Privacy Notice</h2>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#a0aec0"}}>✕</button>
        </div>
        {[
          {icon:"🛡️",t:"Data Protection",d:"Your conversations are not stored on any server. Each session is fully isolated and cleared when you close the app."},
          {icon:"🏥",t:"Medical Images & Reports",d:"Any images or documents you upload are processed in real-time only for analysis. They are never saved, logged, or shared with third parties."},
          {icon:"⚠️",t:"Educational Purpose Only",d:"MediAssist AI is for educational and preliminary support only. It does not constitute medical advice, diagnosis, or treatment by a licensed professional."},
          {icon:"👤",t:"Anonymity Recommended",d:"Please avoid sharing full name, national ID numbers, exact address, or other highly personal identifying information in chat."},
          {icon:"🤖",t:"AI Processing",d:"Your queries are processed by Anthropic's Claude AI model. Anthropic's privacy policy applies to AI inference. No data is retained beyond the session."},
          {icon:"🔐",t:"Your Consent",d:"By using MediAssist AI, you acknowledge its educational nature and consent to AI-assisted processing of your health queries for the duration of this session."},
        ].map(({icon,t,d})=>(
          <div key={t} style={{display:"flex",gap:14,marginBottom:18}}>
            <span style={{fontSize:22,flexShrink:0}}>{icon}</span>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:14,color:"#2d3748"}}>{t}</p>
              <p style={{margin:"4px 0 0",fontSize:13,color:"#718096",lineHeight:1.5}}>{d}</p>
            </div>
          </div>
        ))}
        <button onClick={onClose} style={{
          width:"100%",background:"#e53e3e",color:"#fff",border:"none",
          borderRadius:12,padding:"13px 0",fontSize:15,fontWeight:700,
          cursor:"pointer",marginTop:8
        }}>Got it — Continue Safely</button>
      </div>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState("home");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [sideOpen, setSideOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({queries:0,images:0,reports:0,alerts:0});

  const initMsg = {
    id:uid(), role:"assistant", ts:new Date(), emergency:false,
    content:`Hello! I'm **MediAssist AI** 👋

I'm here to provide educational health guidance — including symptom information, medical image analysis, report summaries, and medication details.

⚕️ **Important:** I am an AI assistant for educational/preliminary support only. I am NOT a substitute for a qualified doctor. Always consult a healthcare professional for diagnosis and treatment.

How can I help you today? You can:
• Describe your symptoms
• Upload a medical image or report (📎)
• Ask about medications
• Use the quick questions below`
  };

  const [chatMsgs, setChatMsgs] = useState([initMsg]);
  const [imgMsgs, setImgMsgs]   = useState([{...initMsg,id:uid(),content:"Upload a medical image (skin photo, X-ray scan, eye image, etc.) and I'll provide general educational observations.\n\n📎 Use the attachment button below to upload an image, then describe what you'd like to know.\n\n⚕️ Disclaimer: AI image analysis is for educational purposes only. A licensed physician must interpret any medical imagery."}]);
  const [repMsgs, setRepMsgs]   = useState([{...initMsg,id:uid(),content:"Paste your lab report, blood test results, or medical document text below — or attach a file — and I'll explain it in simple, patient-friendly language.\n\n⚕️ Disclaimer: Report explanations are educational only. Your doctor is the authority on your results."}]);
  const [medMsgs, setMedMsgs]   = useState([{...initMsg,id:uid(),content:"Ask me about any medication: what it's used for, common side effects, dosing guidance, interactions to watch for, and more.\n\n⚕️ Disclaimer: Medication information is educational. Always follow your doctor's prescription and the official drug label."}]);

  const getMsgs = t => ({ chat:chatMsgs, image:imgMsgs, report:repMsgs, medicine:medMsgs })[t];
  const setMsgs = t => ({ chat:setChatMsgs, image:setImgMsgs, report:setRepMsgs, medicine:setMedMsgs })[t];

  const activeTab = ["chat","image","report","medicine"].includes(tab) ? tab : null;

  const handleUpload = (file) => {
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target.result.split(",")[1];
      setUploadedFile({
        name: file.name, type: file.type,
        base64, preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = useCallback(async (text) => {
    if(!activeTab) return;
    const emerg = isEmergency(text||"");
    const f = uploadedFile;

    const userMsg = {
      id:uid(), role:"user", ts:new Date(), emergency:false,
      content: text||(f?"(Attached file for analysis)":""),
      imagePreview: f?.preview||null,
      docName: f&&!f.type?.startsWith("image/") ? f.name : null,
    };

    const setM = setMsgs(activeTab);
    const getM = getMsgs(activeTab);
    const history = [...getM, userMsg];
    setM(history);
    setUploadedFile(null);
    setLoading(true);

    // update stats
    setStats(s=>({
      ...s,
      queries: s.queries+1,
      images: f?.type?.startsWith("image/") ? s.images+1 : s.images,
      reports: activeTab==="report" ? s.reports+1 : s.reports,
      alerts: emerg ? s.alerts+1 : s.alerts,
    }));

    try {
      const apiMsgs = history.map((m,i)=>{
        if(m.role==="user"){
          const content=[];
          if(i===history.length-1 && f?.base64 && f?.type?.startsWith("image/")){
            content.push({type:"image",source:{type:"base64",media_type:f.type,data:f.base64}});
          }
          const txt = m.content||(f?"Please analyze the attached medical file.":"");
          if(txt) content.push({type:"text",text:txt});
          return {role:"user",content:content.length===1&&content[0].type==="text"?txt:content};
        }
        return {role:"assistant",content:m.content};
      });

      const sysAddons = {
        image:"\n\nThe user is asking about a medical image. Provide general visual observations only. Emphasize professional evaluation is required.",
        report:"\n\nThe user is sharing a medical report or lab results. Explain values in plain language. Do not provide clinical diagnosis.",
        medicine:"\n\nThe user is asking about medication. Provide factual drug information including uses, side effects, interactions. Always advise following doctor's prescription.",
      };

      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: SYSTEM_PROMPT + (sysAddons[activeTab]||""),
          messages:apiMsgs
        })
      });

      const data = await res.json();
      const reply = data.content?.find(b=>b.type==="text")?.text
        || "I'm sorry, I couldn't generate a response. Please try again.";

      setM(prev=>[...prev,{
        id:uid(), role:"assistant", ts:new Date(),
        emergency:emerg, content:reply
      }]);
    } catch(e) {
      setM(prev=>[...prev,{
        id:uid(), role:"assistant", ts:new Date(), emergency:false,
        content:"⚠️ Connection error. Please check your network and try again."
      }]);
    } finally {
      setLoading(false);
    }
  },[activeTab,uploadedFile,chatMsgs,imgMsgs,repMsgs,medMsgs]);

  const handleFAQAsk = (q) => { setTab("chat"); setTimeout(()=>handleSend(q),100); };

  const navItems = [
    {id:"home",icon:"🏠",label:"Dashboard"},
    {id:"chat",icon:"💬",label:"Symptom Chat"},
    {id:"image",icon:"🔬",label:"Image Analysis"},
    {id:"report",icon:"📋",label:"Report Summary"},
    {id:"medicine",icon:"💊",label:"Medicine Info"},
    {id:"emergency",icon:"🚨",label:"Emergency Guide"},
    {id:"faq",icon:"❓",label:"Health FAQ"},
  ];

  const tabTitles = {
    home:"Dashboard",chat:"Symptom Chat",image:"Medical Image Analysis",
    report:"Report & Lab Summary",medicine:"Medication Information",
    emergency:"Emergency Guide",faq:"Health FAQ"
  };

  return (
    <div style={{
      display:"flex",height:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",
      background:"#f7fafc",overflow:"hidden"
    }}>
      <style>{`
        @keyframes medBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
        @keyframes medFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:10px}
        textarea{outline:none;font-family:inherit}
      `}</style>

      {/* SIDEBAR */}
      {sideOpen && (
        <div style={{
          width:230,background:"#fff",borderRight:"1px solid #e2e8f0",
          display:"flex",flexDirection:"column",flexShrink:0
        }}>
          {/* Logo */}
          <div style={{padding:"20px 18px 16px",borderBottom:"1px solid #f0f0f0"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{
                width:38,height:38,background:"linear-gradient(135deg,#e53e3e,#fc8181)",
                borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20
              }}>🏥</div>
              <div>
                <p style={{margin:0,fontWeight:800,fontSize:14,color:"#1a202c",letterSpacing:-.3}}>MediAssist AI</p>
                <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#68d391"}}/>
                  <span style={{fontSize:11,color:"#68d391",fontWeight:600}}>Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div style={{flex:1,padding:"12px 10px",overflowY:"auto"}}>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{
                display:"flex",alignItems:"center",gap:10,width:"100%",
                background:tab===n.id?"#fff5f5":"transparent",
                border:"none",borderRadius:10,padding:"10px 12px",
                cursor:"pointer",fontSize:13,color:tab===n.id?"#c53030":"#4a5568",
                fontWeight:tab===n.id?700:400,textAlign:"left",marginBottom:2,
                transition:"all .15s",borderLeft:tab===n.id?"3px solid #e53e3e":"3px solid transparent"
              }}>
                <span style={{fontSize:16,flexShrink:0}}>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </div>

          {/* Bottom */}
          <div style={{padding:"10px",borderTop:"1px solid #f0f0f0"}}>
            <button onClick={()=>setShowPrivacy(true)} style={{
              display:"flex",alignItems:"center",gap:8,width:"100%",
              background:"transparent",border:"none",borderRadius:10,padding:"9px 12px",
              cursor:"pointer",fontSize:12,color:"#718096",textAlign:"left"
            }}>🔒 Privacy Notice</button>
            <button onClick={()=>{
              setChatMsgs([initMsg]);setImgMsgs([{...initMsg,id:uid()}]);
              setRepMsgs([{...initMsg,id:uid()}]);setMedMsgs([{...initMsg,id:uid()}]);
            }} style={{
              display:"flex",alignItems:"center",gap:8,width:"100%",
              background:"transparent",border:"none",borderRadius:10,padding:"9px 12px",
              cursor:"pointer",fontSize:12,color:"#718096",textAlign:"left"
            }}>🗑️ Clear All Chats</button>
            <div style={{
              background:"#fff5f5",borderRadius:10,padding:"10px 12px",marginTop:8
            }}>
              <p style={{margin:0,fontSize:11,color:"#c53030",fontWeight:700}}>⚠️ Disclaimer</p>
              <p style={{margin:"3px 0 0",fontSize:10,color:"#742a2a",lineHeight:1.4}}>
                For education only. Not a substitute for professional medical care. Always consult a qualified doctor.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0,overflow:"hidden"}}>
        {/* Header */}
        <div style={{
          background:"#fff",borderBottom:"1px solid #e2e8f0",
          padding:"12px 20px",display:"flex",alignItems:"center",gap:12,flexShrink:0
        }}>
          <button onClick={()=>setSideOpen(s=>!s)} style={{
            background:"transparent",border:"1px solid #e2e8f0",cursor:"pointer",
            borderRadius:8,padding:"7px 10px",fontSize:16,color:"#4a5568"
          }}>☰</button>
          <div style={{flex:1}}>
            <p style={{margin:0,fontWeight:800,fontSize:16,color:"#1a202c"}}>
              {tabTitles[tab]}
            </p>
            <p style={{margin:0,fontSize:11,color:"#a0aec0"}}>
              Powered by Claude AI • Healthcare + Vision + Safety
            </p>
          </div>
          <Pill color="#c53030" bg="#fff5f5">🔒 Private Session</Pill>
          <Pill color="#2d7d46" bg="#f0fff4">🤖 Claude AI</Pill>
        </div>

        {/* Content */}
        <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          {tab==="home" && <Dashboard onNav={setTab} stats={stats}/>}
          {tab==="emergency" && <EmergencyScreen/>}
          {tab==="faq" && <FAQScreen onAsk={handleFAQAsk}/>}
          {activeTab && (
            <ChatScreen
              tab={activeTab}
              messages={getMsgs(activeTab)}
              onSend={handleSend}
              loading={loading}
              onImageUpload={handleUpload}
              uploadedFile={uploadedFile}
              onClearFile={()=>setUploadedFile(null)}
            />
          )}
        </div>

        {/* Footer */}
        <div style={{
          background:"#fff",borderTop:"1px solid #f0f0f0",
          padding:"7px 20px",textAlign:"center",flexShrink:0
        }}>
          <p style={{margin:0,fontSize:11,color:"#a0aec0"}}>
            MediAssist AI • Educational & Preliminary Support Only • Not a substitute for professional medical care •
            <button onClick={()=>setShowPrivacy(true)} style={{background:"none",border:"none",cursor:"pointer",color:"#c53030",fontSize:11,padding:"0 4px"}}>Privacy</button>
          </p>
        </div>
      </div>

      {showPrivacy && <PrivacyModal onClose={()=>setShowPrivacy(false)}/>}
    </div>
  );
}
