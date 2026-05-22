import { useState } from "react";

const C = { bg:"#0A0B14",card:"#111320",accent:"#00D4FF",text:"#E2E8F0",muted:"#64748B",border:"rgba(0,212,255,0.15)",success:"#10B981" };
const TG_TOKEN="8739556192:AAHpG0Od1DeqaYkbVtTu1jD0I0WGnyG6T1w", TG_CHAT="583874846";
const sendTG=async(text)=>{try{await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:TG_CHAT,text,parse_mode:"HTML"})})}catch(e){}};

const T={ru:{tagline:"Автоматизация бизнеса в Кыргызстане",h1a:"Сайты и боты,",h1b:"которые продают 24/7",sub:"Telegram-боты, лендинги и CRM для малого бизнеса Бишкека. Быстро. Недорого. По делу.",cta:"Заказать проект",cta2:"Смотреть работы",services:"Услуги",servicesSub:"Выберите что нужно вашему бизнесу",portfolio:"Портфолио",portfolioSub:"Реальные проекты которые уже работают",prices:"Цены",pricesSub:"Честно. Без скрытых доплат.",contact:"Написать",contactSub:"Отвечу в Telegram за 1 час",name:"Ваше имя",phone:"Телефон или @telegram",what:"Что нужно сделать?",send:"Отправить заявку →",sent:"Заявка отправлена! Напишу скоро 🎉",from:"от",som:"сом",days:"дн.",order:"Заказать",hit:"ХИТ",nav_s:"Услуги",nav_p:"Работы",nav_pr:"Цены",nav_c:"Контакты",footer:"AK Studio · Бишкек 🇰🇬 · 2026",stats:[["3+","Проекта"],["5","Услуг"],["24/7","Поддержка"],["Бишкек","КР"]]},
ky:{tagline:"Кыргызстанда бизнес автоматизациясы",h1a:"Сайттар жана боттор,",h1b:"24/7 сатат",sub:"Бишкектеги кичи бизнес үчүн Telegram-боттор, лендингдер жана CRM. Тез. Арзан. Сапаттуу.",cta:"Заказ берүү",cta2:"Иштерди көрүү",services:"Кызматтар",servicesSub:"Бизнесиңиз үчүн тиктүү нерсе тандаңыз",portfolio:"Портфолио",portfolioSub:"Иштеп жаткан реалдуу долбоорлор",prices:"Баалар",pricesSub:"Чынчыл. Жашырын төлөмдөрсүз.",contact:"Жазуу",contactSub:"Telegram аркылуу 1 саатта жооп берем",name:"Атыңыз",phone:"Телефон же @telegram",what:"Эмне жасалышы керек?",send:"Арыз жөнөтүү →",sent:"Арыз жөнөтүлдү! Жакында жазам 🎉",from:"ден",som:"сом",days:"күн",order:"Заказ",hit:"ХИТ",nav_s:"Кызматтар",nav_p:"Иштер",nav_pr:"Баалар",nav_c:"Байланыш",footer:"AK Studio · Бишкек 🇰🇬 · 2026",stats:[["3+","Долбоор"],["5","Кызмат"],["24/7","Колдоо"],["Бишкек","КР"]]}};

const SERVICES=[
  {icon:"🤖",color:"#00D4FF",popular:true,ru:{title:"Telegram-бот для записи",desc:"Клиенты записываются сами 24/7. Вы получаете уведомление мгновенно."},ky:{title:"Жазылуу боту",desc:"Кардарлар өзүлөрү 24/7 жазылышат. Telegram'га дароо билдирүү."},price:8000,days:3},
  {icon:"🛍️",color:"#A855F7",ru:{title:"Telegram-магазин",desc:"Каталог товаров, корзина и заказы — всё в Telegram без сайта."},ky:{title:"Telegram-дүкөн",desc:"Товарлар, корзина, заказ — баары Telegram'да сайтсыз."},price:12000,days:5},
  {icon:"📢",color:"#F59E0B",ru:{title:"Бот рассылок",desc:"Автоматические акции и напоминания всем клиентам сразу."},ky:{title:"Жиберүү боту",desc:"Бардык кардарларга авто-акциялар жана эскертүүлөр."},price:6000,days:2},
  {icon:"🌐",color:"#10B981",ru:{title:"Лендинг / сайт",desc:"Красивый продающий сайт с формой заявки. Готов за 2-3 дня."},ky:{title:"Лендинг / сайт",desc:"Сулуу сатуучу сайт арыз формасы менен. 2-3 күндө даяр."},price:7000,days:3},
  {icon:"🖥️",color:"#F97316",ru:{title:"CRM-система",desc:"Полная система: сотрудники, клиенты, финансы, отчёты."},ky:{title:"CRM-система",desc:"Толук система: кызматкерлер, кардарлар, каржы, отчёттор."},price:35000,days:14},
];

const PORTFOLIO=[
  {icon:"🐼",color:"#6BB8E8",link:"akbilim-v2.vercel.app",ru:{title:"Ак Билим",tag:"CRM-система",desc:"Полная CRM для детского центра: 20+ педагогов, ученики, финансы, лиды."},ky:{title:"Ак Билим",tag:"CRM-система",desc:"Балдар борбору үчүн CRM: 20+ мугалим, окуучулар, каржы, лиддер."}},
  {icon:"💇",color:"#A855F7",ru:{title:"Салон красоты",tag:"Telegram-бот",desc:"Запись клиентов, напоминания и каталог услуг прямо в Telegram."},ky:{title:"Сулуулук салону",tag:"Telegram-бот",desc:"Кардарларды жаздыруу жана кызматтар каталогу Telegram'да."}},
  {icon:"🛒",color:"#10B981",ru:{title:"Магазин в Telegram",tag:"Telegram-магазин",desc:"Каталог, корзина и приём заказов без выхода из мессенджера."},ky:{title:"Telegram дүкөн",tag:"Telegram-дүкөн",desc:"Каталог жана заказдарды мессенджерден чыкпай кабыл алуу."}},
];

export default function App(){
  const [lang,setLang]=useState("ru");
  const [form,setForm]=useState({name:"",phone:"",what:""});
  const [sent,setSent]=useState(false);
  const [sending,setSending]=useState(false);
  const t=T[lang];
  const go=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const submit=async()=>{
    if(!form.name||!form.phone)return;
    setSending(true);
    await sendTG(`🆕 <b>Заявка AK Studio!</b>\n👤 ${form.name}\n📞 ${form.phone}\n💬 ${form.what||"—"}`);
    setSent(true);setSending(false);
  };
  const tag=(color)=>({background:color+"18",color,fontSize:11,fontWeight:700,padding:"4px 14px",borderRadius:20,border:`1px solid ${color}33`,display:"inline-block",marginBottom:12});
  const btn=(color,ol)=>({background:ol?"transparent":color,color:ol?color:"#0A0B14",border:`2px solid ${color}`,borderRadius:12,padding:"13px 28px",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"});
  const card=(color,pop)=>({background:C.card,border:`${pop?2:1}px solid ${pop?color:color+"22"}`,borderRadius:20,padding:24,position:"relative"});
  const inp={width:"100%",padding:"13px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:12,color:C.text,fontSize:14,fontFamily:"inherit",boxSizing:"border-box",outline:"none"};
  const sec={padding:"80px 40px",maxWidth:1100,margin:"0 auto"};
  const head=(color)=>(<div style={{textAlign:"center",marginBottom:48}}><div style={tag(color)}></div></div>);

  return(
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:C.bg,color:C.text,minHeight:"100vh"}}>

      <nav style={{background:"rgba(10,11,20,0.96)",borderBottom:`1px solid ${C.border}`,padding:"14px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100}}>
        <div style={{fontSize:20,fontWeight:900,color:C.accent,letterSpacing:2}}>AK STUDIO</div>
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          {[[t.nav_s,"services"],[t.nav_p,"portfolio"],[t.nav_pr,"prices"],[t.nav_c,"contact"]].map(([l,id])=>(
            <span key={id} onClick={()=>go(id)} style={{color:C.muted,fontSize:14,cursor:"pointer"}}>{l}</span>
          ))}
          <div style={{display:"flex",gap:4,background:"#111320",borderRadius:10,padding:4,border:`1px solid ${C.border}`}}>
            {["ru","ky"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{background:lang===l?C.accent:"transparent",color:lang===l?"#0A0B14":C.muted,border:"none",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{padding:"100px 40px 60px",maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
        <div style={tag(C.accent)}>✨ {t.tagline}</div>
        <h1 style={{fontSize:54,fontWeight:900,lineHeight:1.1,margin:"16px 0 20px",letterSpacing:-1}}>
          {t.h1a}<br/><span style={{color:C.accent}}>{t.h1b}</span>
        </h1>
        <p style={{fontSize:18,color:C.muted,maxWidth:540,margin:"0 auto 40px",lineHeight:1.7}}>{t.sub}</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>go("contact")} style={btn(C.accent,false)}>{t.cta} →</button>
          <button onClick={()=>go("portfolio")} style={btn(C.accent,true)}>{t.cta2}</button>
        </div>
        <div style={{display:"flex",gap:56,justifyContent:"center",marginTop:60,flexWrap:"wrap"}}>
          {t.stats.map(([num,label])=>(
            <div key={label} style={{textAlign:"center"}}>
              <div style={{fontSize:32,fontWeight:900,color:C.accent}}>{num}</div>
              <div style={{fontSize:13,color:C.muted}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="services" style={sec}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={tag("#A855F7")}>💼 {t.services}</div>
          <h2 style={{fontSize:32,fontWeight:900,margin:"8px 0 6px"}}>{t.servicesSub}</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {SERVICES.map((s,i)=>(
            <div key={i} style={card(s.color,s.popular)}>
              {s.popular&&<div style={{position:"absolute",top:-12,right:18,background:s.color,color:"#0A0B14",fontSize:11,fontWeight:900,padding:"3px 12px",borderRadius:20}}>{t.hit}</div>}
              <div style={{fontSize:36,marginBottom:12}}>{s.icon}</div>
              <div style={{fontWeight:800,fontSize:16,marginBottom:8}}>{s[lang].title}</div>
              <div style={{fontSize:13,color:C.muted,lineHeight:1.7,marginBottom:16}}>{s[lang].desc}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{color:s.color,fontWeight:900,fontSize:17}}>{t.from} {s.price.toLocaleString()} {t.som}</div>
                <div style={{...tag(s.color),margin:0,fontSize:10}}>⏱ {s.days} {t.days}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="portfolio" style={sec}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={tag(C.success)}>🏆 {t.portfolio}</div>
          <h2 style={{fontSize:32,fontWeight:900,margin:"8px 0 6px"}}>{t.portfolioSub}</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {PORTFOLIO.map((p,i)=>(
            <div key={i} style={card(p.color,false)}>
              <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                <div style={{fontSize:34,background:"#0A0B14",borderRadius:12,width:54,height:54,display:"flex",alignItems:"center",justifyContent:"center"}}>{p.icon}</div>
                <div>
                  <div style={{fontWeight:800,fontSize:15}}>{p[lang].title}</div>
                  <div style={{...tag(p.color),margin:"4px 0 0",fontSize:10,padding:"2px 10px"}}>{p[lang].tag}</div>
                </div>
              </div>
              <div style={{fontSize:13,color:C.muted,lineHeight:1.7,marginBottom:p.link?10:0}}>{p[lang].desc}</div>
              {p.link&&<a href={`https://${p.link}`} target="_blank" rel="noreferrer" style={{color:p.color,fontSize:13,fontWeight:700,textDecoration:"none"}}>🔗 {p.link}</a>}
            </div>
          ))}
        </div>
      </div>

      <div id="prices" style={sec}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={tag("#F59E0B")}>💰 {t.prices}</div>
          <h2 style={{fontSize:32,fontWeight:900,margin:"8px 0 6px"}}>{t.pricesSub}</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14}}>
          {SERVICES.map((s,i)=>(
            <div key={i} style={{...card(s.color,s.popular),textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
              <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>{s[lang].title}</div>
              <div style={{fontSize:24,fontWeight:900,color:s.color}}>{s.price.toLocaleString()}</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:12}}>{t.som} · {s.days} {t.days}</div>
              <button onClick={()=>go("contact")} style={{...btn(s.color,false),width:"100%",fontSize:12,padding:"9px 0"}}>{t.order}</button>
            </div>
          ))}
        </div>
      </div>

      <div id="contact" style={sec}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:28,padding:48,maxWidth:500,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={tag(C.accent)}>📩 {t.contact}</div>
            <h2 style={{fontSize:22,fontWeight:900,margin:"8px 0 4px"}}>{t.contactSub}</h2>
          </div>
          {sent?(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{fontSize:56,marginBottom:12}}>🎉</div>
              <div style={{fontWeight:700,color:C.accent,fontSize:16}}>{t.sent}</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder={t.name} style={inp}/>
              <input value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder={t.phone} style={inp}/>
              <textarea value={form.what} onChange={e=>setForm(p=>({...p,what:e.target.value}))} placeholder={t.what} rows={3} style={{...inp,resize:"vertical"}}/>
              <button onClick={submit} disabled={!form.name||!form.phone||sending} style={{...btn(C.accent,false),opacity:(!form.name||!form.phone)?0.5:1,cursor:(!form.name||!form.phone)?"not-allowed":"pointer"}}>
                {sending?"⏳...":t.send}
              </button>
            </div>
          )}
        </div>
      </div>

      <footer style={{textAlign:"center",padding:"28px 40px",borderTop:`1px solid ${C.border}`,color:C.muted,fontSize:13}}>
        <div style={{fontSize:18,fontWeight:900,color:C.accent,letterSpacing:2,marginBottom:4}}>AK STUDIO</div>
        <div>{t.footer}</div>
      </footer>
    </div>
  );
}
