import {useState, useEffect, useRef} from "react";
import {useNavigate, useLocation, Outlet, Link} from "react-router-dom";
import {Head} from "vite-react-ssg";
import "./styles.css";
import {HOME, HOW, CORTEX, RETAIL, REALESTATE, COMPANY, CONTACT} from "./pageContent.js";

/* ---- design tokens + helpers (carried from prior build) ---- */
var T="#414BF5", ION_H="#2F38D6", CY="#19D3E0", MG="#E63DCB", I3="#8E97F8", I7="#232BAA", SL="#5A6275", WN="#FFB020";
var BG="#0B0D14", B2="#181C28", B3="#272D3B", TX="#E7EAF1", MT="#5A6275", DM="#3C4354", BD="rgba(140,160,200,0.07)", N3="#AEB5C6";
var MW=1280; // page container max-width
var hd={fontFamily:"'IBM Plex Sans',system-ui,sans-serif",letterSpacing:"-.03em"};
var bn={display:"inline-flex",alignItems:"center",gap:6,padding:"12px 24px",background:T,color:"#fff",fontWeight:600,fontSize:14,border:"none",borderRadius:6,cursor:"pointer",fontFamily:"inherit"};
var b2={display:"inline-flex",alignItems:"center",gap:6,padding:"12px 24px",background:"transparent",color:TX,fontWeight:500,fontSize:14,border:"1px solid rgba(140,160,200,.15)",borderRadius:6,cursor:"pointer",fontFamily:"inherit"};
function Sc(p){return <section style={{borderTop:p.bt?"1px solid "+BD:"none",background:p.bg||"transparent"}}><div style={{maxWidth:MW,margin:"0 auto",padding:"96px 40px"}}>{p.children}</div></section>}
function Tg(p){return <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:3,color:p.c||T,marginBottom:12,fontWeight:500,fontFamily:"'IBM Plex Mono',monospace"}}>{p.children}</div>}
function Brand(p){var s=p.size,mk=p.mark||s,gp=(p.gap!=null?p.gap:10);return <div style={{display:"flex",alignItems:"center",gap:gp}}><img src={p.animated?"/sevyn8-mark-animated.svg":"/sevyn8-mark.svg"} alt="" style={{height:mk,width:"auto",display:"block"}} /><span style={{fontFamily:"'IBM Plex Sans',system-ui,sans-serif",fontWeight:600,color:TX,letterSpacing:"-.01em",fontSize:s*.6}}>Sevyn8</span></div>}
function Rv(p){var r=useRef(null),v=useState(false);useEffect(function(){var el=r.current;if(!el)return;var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){v[1](true);o.disconnect()}},{threshold:0.08});o.observe(el);return function(){o.disconnect()}},[]);return <div ref={r} style={{opacity:v[0]?1:0,transform:v[0]?"none":"translateY(24px)",transition:"all .7s cubic-bezier(.22,1,.36,1) "+(p.d||0)+"s"}}>{p.children}</div>}
var mono={fontFamily:"'IBM Plex Mono',monospace"};

var SITE="https://sevyn8.com";
var CAL="https://calendly.com/amit-sevyn8/30min";
var OGIMG=SITE+"/og-image.png";

var META={
  home:{p:"/",t:"SEVYN8 \u00b7 Physical AI, without the robots",d:"SEVYN8's edge intelligence system runs on the devices you already have, acts on what they sense, and earns the metrics your business is chasing."},
  how:{p:"/how-it-earns",t:"How it earns \u00b7 SEVYN8",d:"The loop behind SEVYN8: Know, Decide, Act, Earn. Your devices sense the floor, Cortex AI calls the move, your hardware acts, and the outcome is measured against a control."},
  cortex:{p:"/cortex-ai",t:"Cortex AI, the engine \u00b7 SEVYN8",d:"Cortex AI is one edge intelligence engine that runs on any device and any silicon, turning what your sensors see into the action your hardware takes, in the moment."},
  retail:{p:"/retail",t:"Retail \u00b7 SEVYN8",d:"Fuller shelves, smarter layouts, more revenue per visit. SEVYN8 senses the shelf, decides price and placement, acts on ESLs and screens, and earns the margin."},
  realestate:{p:"/real-estate",t:"Real estate \u00b7 SEVYN8",d:"Lower operating cost, lower carbon, higher NOI. SEVYN8 senses occupancy and footfall, decides the operational move, acts on building systems, and earns on cost and carbon."},
  company:{p:"/company",t:"Company \u00b7 SEVYN8",d:"SEVYN8 builds physical AI for the physical world: an edge intelligence system that sits between the sensing hardware you already run and the actuation hardware that acts on it."},
  contact:{p:"/contact",t:"Discuss a pilot \u00b7 SEVYN8",d:"Talk to SEVYN8 about a pilot. Book a 30-minute call and see how the loop earns on your store floor or in your building."},
  privacy:{p:"/privacy",t:"Privacy \u00b7 SEVYN8",d:"How SEVYN8 handles data across its website: consent-gated analytics, contact-form submissions, and your rights under India's DPDP Act 2023 and the GDPR."},
  terms:{p:"/terms",t:"Terms \u00b7 SEVYN8",d:"The terms that govern use of the SEVYN8 website. Informational only; commercial engagements are covered by separate signed agreements."}
};
var LD_ORG={"@context":"https://schema.org","@type":"Organization",name:"SEVYN8",legalName:"SEVYN8 Private Limited",url:SITE,logo:SITE+"/sevyn8-mark.svg",description:"Physical AI for the physical world. SEVYN8 turns what your sensors see into the action your hardware takes, and measures the outcome.",address:{"@type":"PostalAddress",addressLocality:"New Delhi",addressCountry:"IN"}};
var LD_CORTEX={"@context":"https://schema.org","@type":"SoftwareApplication",name:"Cortex AI",applicationCategory:"BusinessApplication",operatingSystem:"On-device / edge",url:SITE+"/cortex-ai",description:"Cortex AI is SEVYN8's edge intelligence engine: it senses, decides, and acts on-device, then measures the outcome against a control.",publisher:{"@type":"Organization",name:"SEVYN8",url:SITE}};

var GA_ID="G-NLE0C6SFFJ";
var TITLE_BY_PATH={};Object.keys(META).forEach(function(k){TITLE_BY_PATH[META[k].p]=META[k].t});
function titleFor(path){return TITLE_BY_PATH[path]||(typeof document!=="undefined"?document.title:"Sevyn8")}
function gtagPush(){window.dataLayer.push(arguments)}
function bootGtag(){if(window.__sv8boot)return;window.__sv8boot=true;window.dataLayer=window.dataLayer||[];gtagPush("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});gtagPush("js",new Date());var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(s)}
function activateGA(){if(window.__sv8ga)return;window.__sv8ga=true;gtagPush("consent","update",{analytics_storage:"granted"});gtagPush("config",GA_ID,{send_page_view:false})}
function ConsentBanner(p){return <div role="dialog" aria-label="Cookie consent" style={{position:"fixed",left:0,right:0,bottom:0,zIndex:1000,background:"rgba(24,28,40,.97)",backdropFilter:"blur(12px)",borderTop:"1px solid "+BD,padding:"16px 20px"}}>
  <div style={{maxWidth:MW,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
    <p style={{fontSize:13.5,lineHeight:1.6,color:N3,margin:0,flex:1,minWidth:240,maxWidth:680}}>We use privacy-first analytics to understand how this site is used. Nothing is collected until you accept. Read our <Link to="/privacy" style={{color:CY,textDecoration:"underline"}}>Privacy Policy</Link>.</p>
    <div style={{display:"flex",gap:10,flexShrink:0}}>
      <button onClick={p.reject} style={{padding:"10px 20px",background:"transparent",color:N3,fontWeight:500,fontSize:14,border:"1px solid "+BD,borderRadius:6,cursor:"pointer",fontFamily:"inherit"}}>Reject</button>
      <button onClick={p.accept} style={{...bn,padding:"10px 22px"}}>Accept</button>
    </div>
  </div>
</div>}
function Analytics(){
  var loc=useLocation();var st=useState(false),mounted=st[0];var c2=useState(null),consent=c2[0];var a2=useState(false),active=a2[0];
  useEffect(function(){st[1](true);bootGtag();var v=null;try{v=localStorage.getItem("sv8-consent")}catch(e){}c2[1](v);if(v==="granted"){activateGA();a2[1](true)}},[]);
  useEffect(function(){if(!active)return;gtagPush("event","page_view",{page_path:loc.pathname,page_title:titleFor(loc.pathname),page_location:SITE+loc.pathname})},[loc.pathname,active]);
  function accept(){try{localStorage.setItem("sv8-consent","granted")}catch(e){}activateGA();a2[1](true);c2[1]("granted")}
  function reject(){try{localStorage.setItem("sv8-consent","denied")}catch(e){}c2[1]("denied")}
  if(!mounted||consent!==null)return null;
  return <ConsentBanner accept={accept} reject={reject} />;
}
function PageHead(p){var m=p.m;return <Head><title>{m.t}</title><meta name="description" content={m.d} /><link rel="canonical" href={SITE+m.p} /><meta property="og:title" content={m.t} /><meta property="og:description" content={m.d} /><meta property="og:type" content="website" /><meta property="og:url" content={SITE+m.p} /><meta property="og:site_name" content="SEVYN8" /><meta property="og:image" content={OGIMG} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={m.t} /><meta name="twitter:description" content={m.d} /><meta name="twitter:image" content={OGIMG} /></Head>}

/* ---- legal pages (carried verbatim) ---- */
var PRIVACY_HTML = `<p class="leyebrow">Legal</p>
<h1>Privacy Policy</h1>
<p class="lmeta">Last updated 15 June 2026</p>
<p>This policy explains what limited data the Sevyn8 website (sevyn8.com) collects, why, and the choices you have. Privacy is a design principle for us, not an afterthought.</p>
<p class="leyebrow">Who we are</p>
<h2>The data controller.</h2>
<p>This website is operated by <strong>Sevyn8 Private Limited</strong>, New Delhi, India ("Sevyn8", "we", "us"). For any privacy question, contact <a href="mailto:rahul@sevyn8.com">rahul@sevyn8.com</a>.</p>
<p class="leyebrow">Important scope</p>
<h2>This policy covers the website, not the product.</h2>
<p>Sevyn8 Cortex runs <strong>on-device, at the edge</strong>. Any data captured or processed by deployed Sevyn8 products stays on customer infrastructure and is governed by the <strong>separate commercial agreement</strong> for that deployment, not by this website policy. This document is solely about your use of sevyn8.com.</p>
<p class="leyebrow">What we collect</p>
<h2>Two things, both minimal.</h2>
<p><strong>Analytics, only with your consent.</strong> If you accept analytics in the cookie banner, we use Google Analytics 4 to understand aggregate usage: pages viewed, approximate region, and device/browser type. Storage is denied by default and nothing is sent until you accept. If you reject or ignore the banner, no analytics cookies are set and no analytics data is collected.</p>
<p><strong>Contact-form submissions.</strong> If you send a message via the contact page, the details you provide (such as name, email, organisation, and message) <strong>trigger an email to us only</strong>. They are not stored in any CRM, database, or third-party system, we simply receive the email and reply.</p>
<p>We do not sell personal data and do not use it for advertising. Ad-related storage is denied at all times.</p>
<p class="leyebrow">How &amp; why</p>
<h2>Purpose and legal bases.</h2>
<p>Analytics data is used in aggregate to measure how the site performs and to improve it. Contact details are used only to reply to your enquiry and progress any conversation you start.</p>
<p>Our legal bases are your <strong>consent</strong> for analytics, and our <strong>legitimate interest</strong> (and taking steps at your request prior to any agreement) in responding to enquiries you initiate.</p>
<p class="leyebrow">Cookies &amp; consent</p>
<h2>Denied by default.</h2>
<p>We load analytics under Google Consent Mode v2 with <code>analytics_storage</code> and <code>ad_storage</code> set to <em>denied</em> until you choose otherwise. Your choice is stored locally in your browser so you are not asked again. You can change it any time by clearing this site's storage, which brings the banner back.</p>
<p class="leyebrow">Processors</p>
<h2>Who processes data for us.</h2>
<ul><li><strong>Google</strong> (Google Analytics), processes analytics data on our behalf when you consent, subject to Google's terms and privacy practices.</li><li><strong>Vercel</strong>, hosts the website and processes the standard request/server logs needed to serve and secure it.</li></ul>
<p class="leyebrow">Retention</p>
<h2>How long we keep it.</h2>
<p>Analytics data is retained for the period configured in Google Analytics (by default up to 14 months), then deleted or anonymised. Contact emails are kept only as long as needed to handle your enquiry and any resulting relationship, after which they are deleted.</p>
<p class="leyebrow">International transfers</p>
<h2>Where data may go.</h2>
<p>Our processors (Google, Vercel) may process data on infrastructure outside India or your country. Where data is transferred internationally, it remains subject to appropriate safeguards and the processor's commitments.</p>
<p class="leyebrow">Your rights</p>
<h2>You're in control.</h2>
<ul><li><strong>Access</strong>, ask what personal data we hold about you.</li><li><strong>Correction</strong>, ask us to correct inaccurate data.</li><li><strong>Erasure</strong>, ask us to delete your data.</li><li><strong>Withdraw consent</strong>, turn off analytics any time, with no effect on prior lawful processing.</li></ul>
<p>These rights reflect India's <strong>Digital Personal Data Protection Act, 2023</strong> and, for visitors in the EU/EEA and the UK, the <strong>GDPR</strong>. To exercise any of them, email <a href="mailto:rahul@sevyn8.com">rahul@sevyn8.com</a>.</p>
<p class="leyebrow">Children</p>
<h2>Not directed at children.</h2>
<p>This website is intended for businesses and professional audiences. We do not knowingly collect personal data from children. If you believe a child has provided data, contact us and we will delete it.</p>
<p class="leyebrow">Security</p>
<h2>How we protect it.</h2>
<p>We apply reasonable technical and organisational measures appropriate to a marketing website and the limited data it handles. No method of transmission or storage is perfectly secure, but we minimise what we collect in the first place.</p>
<p class="leyebrow">Changes &amp; contact</p>
<h2>Staying current.</h2>
<p>We may update this policy from time to time; the "last updated" date above reflects the current version. Questions about this policy or your data? Email <a href="mailto:rahul@sevyn8.com">rahul@sevyn8.com</a>.</p>`;

var TERMS_HTML = `<p class="leyebrow">Legal</p>
<h1>Terms of Use</h1>
<p class="lmeta">Last updated 15 June 2026</p>
<p>These terms govern your use of the Sevyn8 website at sevyn8.com, operated by <strong>Sevyn8 Private Limited</strong>, New Delhi, India ("Sevyn8", "we", "us").</p>
<p class="leyebrow">Acceptance</p>
<h2>By using the site, you agree.</h2>
<p>By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the site.</p>
<p class="leyebrow">What this site is</p>
<h2>An informational marketing site, not the product.</h2>
<p>This website is an informational and marketing resource about Sevyn8 and its Cortex platform. It is <strong>not the product itself</strong> and provides no access to deployed Sevyn8 systems. Information here is general and may change without notice.</p>
<p class="leyebrow">Acceptable use</p>
<h2>Permitted and prohibited.</h2>
<p>You may view and share this site for lawful, informational purposes. You must not:</p>
<ul><li>attempt to disrupt, attack, or gain unauthorised access to the site or its infrastructure;</li><li>scrape, copy, or reuse content other than as permitted by law or with our written consent;</li><li>misrepresent your affiliation with Sevyn8 or use the site to mislead others;</li><li>use the site in violation of any applicable law.</li></ul>
<p class="leyebrow">Intellectual property</p>
<h2>All rights reserved.</h2>
<p>The content of this site, the <strong>Sevyn8</strong> name and marks, and <strong>Cortex</strong> are the property of Sevyn8 Private Limited and are protected by applicable intellectual-property laws. All rights reserved. No licence to any trademark, logo, or content is granted except as expressly stated in writing.</p>
<p class="leyebrow">Disclaimer</p>
<h2>Provided "as is".</h2>
<p>This website and its content are provided <strong>"as is" and "as available"</strong>, without warranties of any kind, express or implied, including fitness for a particular purpose, accuracy, or non-infringement. We do not warrant that the site will be uninterrupted or error-free.</p>
<p class="leyebrow">Liability</p>
<h2>Limitation of liability.</h2>
<p>To the maximum extent permitted by law, Sevyn8 is not liable for any indirect, incidental, special, or consequential damages, or any loss arising from your use of (or inability to use) this website.</p>
<p class="leyebrow">Third-party links</p>
<h2>We don't control them.</h2>
<p>The site may link to third-party websites or services. We are not responsible for their content, practices, or availability, and links do not imply endorsement.</p>
<p class="leyebrow">Commercial engagements</p>
<h2>Governed by separate agreements.</h2>
<p>Any proof of concept, pilot, evaluation, licensing, or other commercial engagement with Sevyn8 is governed by a <strong>separate signed agreement</strong> between the parties, not by these Terms. Nothing on this website constitutes an offer, warranty, or contractual commitment.</p>
<p class="leyebrow">Changes</p>
<h2>We may update these terms.</h2>
<p>We may revise these Terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the revised Terms. The "last updated" date above reflects the current version.</p>
<p class="leyebrow">Governing law</p>
<h2>India · courts of New Delhi.</h2>
<p>These Terms are governed by the laws of India, and the courts of New Delhi have exclusive jurisdiction over any dispute arising from them or from your use of this website.</p>
<p class="leyebrow">Contact</p>
<h2>Questions?</h2>
<p>Questions about these Terms? Email <a href="mailto:rahul@sevyn8.com">rahul@sevyn8.com</a>.</p>`;

function LegalPage(p){return <div className="page active"><div className="legal" dangerouslySetInnerHTML={{__html:p.html}} /></div>;}
function PgPrivacy(){return <><PageHead m={META.privacy} /><LegalPage html={PRIVACY_HTML} /></>;}
function PgTerms(){return <><PageHead m={META.terms} /><LegalPage html={TERMS_HTML} /></>;}

/* ---- brand mark (animated convergence lockup) ---- */
var LKPATHS=[
  "M50 50 C28 28 28 12 50 12 C72 12 72 28 50 50 C28 72 28 88 50 88 C72 88 72 72 50 50 Z",
  "M50 50 C30.5 30.5 30.5 16.5 50 16.5 C69.5 16.5 69.5 30.5 50 50 C30.5 69.5 30.5 83.5 50 83.5 C69.5 83.5 69.5 69.5 50 50 Z",
  "M50 50 C33 33 33 21 50 21 C67 21 67 33 50 50 C33 67 33 79 50 79 C67 79 67 67 50 50 Z",
  "M50 50 C35.5 35.5 35.5 25.5 50 25.5 C64.5 25.5 64.5 35.5 50 50 C35.5 64.5 35.5 74.5 50 74.5 C64.5 74.5 64.5 64.5 50 50 Z",
  "M50 50 C38 38 38 30 50 30 C62 30 62 38 50 50 C38 62 38 70 50 70 C62 70 62 62 50 50 Z",
  "M50 50 C40.5 40.5 40.5 34.5 50 34.5 C59.5 34.5 59.5 40.5 50 50 C40.5 59.5 40.5 65.5 50 65.5 C59.5 65.5 59.5 59.5 50 50 Z"
];
function GradientDef(){return <svg width="0" height="0" style={{position:"absolute"}} aria-hidden="true"><defs><linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#19D3E0"/><stop offset="0.5" stopColor="#414BF5"/><stop offset="1" stopColor="#E63DCB"/></linearGradient></defs></svg>;}
function S8Lock(p){var od=p&&p.onDark;return <svg className={"s8lock"+(od?" on-dark":"")} viewBox="0 0 360 120" aria-label="SEVYN8"><g className="lk-track" transform="translate(8,10)">{LKPATHS.map(function(d,i){return <path key={i} d={d}/>;})}</g><g className="lk-comet" transform="translate(8,10)">{LKPATHS.map(function(d,i){return <path key={i} pathLength="100" d={d}/>;})}</g><circle className="lk-core" cx="58" cy="60" r="3.2"/><text className="lk-wm" x="132" y="78">SEVYN8</text></svg>;}
function ThemeToggle(){
  var s=useState(false),dark=s[0],setDark=s[1];
  useEffect(function(){try{setDark(document.documentElement.getAttribute("data-theme")==="dark");}catch(e){}},[]);
  function toggle(){var d=document.documentElement;var isDark=d.getAttribute("data-theme")==="dark";if(isDark){d.removeAttribute("data-theme");}else{d.setAttribute("data-theme","dark");}try{localStorage.setItem("s8theme",isDark?"light":"dark");}catch(e){}setDark(!isDark);}
  return <button className="theme-toggle" id="themeToggle" onClick={toggle} aria-label="Toggle dark mode" title="Toggle light and dark">
    <svg className="ico ico-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3.2a6.6 6.6 0 0 0 9.8 9.6z" fill="currentColor"/></svg>
    <svg className="ico ico-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.4" fill="currentColor"/><g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="2.6" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.4"/><line x1="2.6" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.4" y2="12"/><line x1="5.4" y1="5.4" x2="7.1" y2="7.1"/><line x1="16.9" y1="16.9" x2="18.6" y2="18.6"/><line x1="5.4" y1="18.6" x2="7.1" y2="16.9"/><line x1="16.9" y1="7.1" x2="18.6" y2="5.4"/></g></svg>
  </button>;
}
function Nav(){return <nav className="nav">
  <Link className="brand" to="/"><S8Lock/></Link>
  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/how-it-earns">How it earns</Link>
    <Link to="/cortex-ai">Cortex AI</Link>
    <div className="drop"><button aria-haspopup="true">Industries <span aria-hidden="true">&#9662;</span></button><div className="drop-menu"><Link to="/retail">Retail <span className="tag-live">live</span></Link><Link to="/real-estate">Real estate <span className="tag-live">live</span></Link></div></div>
    <Link to="/company">Company</Link>
  </div>
  <div className="nav-right">
    <ThemeToggle/>
    <a className="nav-cta" href={CAL} target="_blank" rel="noopener">Discuss a pilot</a>
  </div>
</nav>;}
function Ft(){return <footer>
  <div className="wrap">
    <div className="cols">
      <div>
        <Link className="brand" to="/" style={{display:"flex",alignItems:"center"}}><S8Lock onDark/></Link>
        <p style={{color:"#8f99ad",marginTop:14,fontSize:14,maxWidth:300}}>Physical AI, without the robots. Where sensing becomes earning.</p>
      </div>
      <div><h5>Product</h5><Link to="/how-it-earns">How it earns</Link><Link to="/cortex-ai">Cortex AI</Link><Link to="/retail">Retail</Link><Link to="/real-estate">Real estate</Link></div>
      <div><h5>Company</h5><Link to="/company">Our story</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
    </div>
    <div className="fine"><span>&copy; 2026 SEVYN8 Private Limited, New Delhi.</span><span>Where sensing becomes earning.</span></div>
  </div>
</footer>;}
function Page(p){return <div className="page active" dangerouslySetInnerHTML={{__html:p.html}} />;}

/* ---- ported behaviors (flow, stepper, story cycle, silicon wave) ---- */
function wireBehaviors(){
  var timers=[];
  (function(){
    var flow=document.getElementById("flowwrap"); if(!flow) return;
    var scen=[
      {ev:"A customer waits in an unattended aisle",k:"Sees a customer waiting, no staff near",d:"Works out who is free and nearest",a:"The nearest associate is sent over",e:"a sale that won't walk out"},
      {ev:"A whole floor sits empty after hours",k:"Occupancy on level 3 drops to zero",d:"Sets back HVAC and lighting to match",a:"Building systems dial themselves down",e:"energy and carbon you don't spend"}
    ];
    var fEvent=document.getElementById("fEvent"),fEarn=document.getElementById("fEarn"),fEarnT=document.getElementById("fEarnT"),fKnowP=document.getElementById("fKnowP"),fDecideP=document.getElementById("fDecideP"),fActP=document.getElementById("fActP");
    var fKnow=document.getElementById("fKnow"),fDecide=document.getElementById("fDecide"),fAct=document.getElementById("fAct"),fDown=document.getElementById("fDown"),fUp=document.getElementById("fUp");
    var all=[fEvent,fEarn,fKnow,fDecide,fAct,fDown,fUp];
    function setScen(x){var s2=scen[x];fEvent.textContent=s2.ev;fKnowP.textContent=s2.k;fDecideP.textContent=s2.d;fActP.textContent=s2.a;fEarnT.textContent=s2.e;}
    var si=0,beat=0;
    function fstep(){
      if(beat===0){all.forEach(function(el){el.classList.remove("on");});setScen(si);fEvent.classList.add("on");}
      else if(beat===1){fDown.classList.add("on");fKnow.classList.add("on");}
      else if(beat===2){fDecide.classList.add("on");}
      else if(beat===3){fAct.classList.add("on");}
      else if(beat===4){fUp.classList.add("on");fEarn.classList.add("on");}
      beat++;if(beat>5){beat=0;si=(si+1)%scen.length;}
    }
    if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){setScen(0);all.forEach(function(el){el.classList.add("on");});}
    else{setScen(0);fstep();timers.push(setInterval(fstep,1250));}
  })();
  (function(){
    var snodes=document.querySelectorAll(".snode"); if(!snodes.length) return;
    var tracks=document.querySelectorAll(".strack"); var sdH=document.getElementById("sd-h"),sdP=document.getElementById("sd-p");
    var det=[
      ["Know","Cortex AI reads what your cameras and sensors already see, in real time. Not a chart, the live state of the floor."],
      ["Decide","It turns that live state into a specific call, priced to your goals and guardrails, in the moment it matters."],
      ["Act","The call is pushed to the hardware that acts: shelf labels reprice, screens change, building systems adjust, staff get the pick."],
      ["Earn","The outcome is measured against a control and banked, and it retrains the next loop."]
    ];
    var j=0;
    function sstep(){snodes.forEach(function(n,k){n.classList.toggle("active",k===j);});tracks.forEach(function(t,k){t.classList.toggle("on",k<j);});if(sdH)sdH.textContent=det[j][0];if(sdP)sdP.textContent=det[j][1];j=(j+1)%snodes.length;}
    sstep();timers.push(setInterval(sstep,2200));
  })();
  (function(){
    document.querySelectorAll(".story").forEach(function(story){
      var steps=story.querySelectorAll(".step"); if(!steps.length) return;
      var r=0; function rstep(){steps.forEach(function(el,k){el.classList.toggle("active",k===r);});r=(r+1)%steps.length;}
      rstep();timers.push(setInterval(rstep,2400));
    });
  })();
  (function(){
    var htiles=document.querySelectorAll(".htile"); if(!htiles.length) return;
    var h=0; function hwave(){htiles.forEach(function(t,k){t.classList.toggle("on",k===h);});h=(h+1)%htiles.length;} hwave();timers.push(setInterval(hwave,780));
  })();
  return function(){timers.forEach(function(t){clearInterval(t);});};
}

function Shell(){
  var loc=useLocation();var nav=useNavigate();
  useEffect(function(){if(typeof window!=="undefined")window.scrollTo({top:0,behavior:"instant"});},[loc.pathname]);
  useEffect(function(){
    function onClick(e){
      if(e.defaultPrevented) return;
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0) return;
      var a=e.target.closest?e.target.closest('a[href^="/"]'):null;
      if(!a) return;
      if(a.target==="_blank"||a.hasAttribute("download")) return;
      var href=a.getAttribute("href");
      if(!href||href.charAt(0)!=="/") return;
      e.preventDefault();nav(href);window.scrollTo({top:0,behavior:"instant"});
    }
    document.addEventListener("click",onClick);
    return function(){document.removeEventListener("click",onClick);};
  },[nav]);
  useEffect(function(){var cleanup=wireBehaviors();return cleanup;},[loc.pathname]);
  return <>
    <GradientDef/>
    <Head><script type="application/ld+json">{JSON.stringify(LD_ORG)}</script></Head>
    <Analytics/>
    <Nav/>
    <main key={loc.pathname}><Outlet/></main>
    <Ft/>
  </>;
}

function PgHome(){return <><PageHead m={META.home} /><Page html={HOME} /></>;}
function PgHow(){return <><PageHead m={META.how} /><Page html={HOW} /></>;}
function PgCortex(){return <><PageHead m={META.cortex} /><Head><script type="application/ld+json">{JSON.stringify(LD_CORTEX)}</script></Head><Page html={CORTEX} /></>;}
function PgRetail(){return <><PageHead m={META.retail} /><Page html={RETAIL} /></>;}
function PgRealEstate(){return <><PageHead m={META.realestate} /><Page html={REALESTATE} /></>;}
function PgCompany(){return <><PageHead m={META.company} /><Page html={COMPANY} /></>;}
function PgContact(){return <><PageHead m={META.contact} /><Page html={CONTACT} /></>;}


export var routes=[{path:"/",element:<Shell />,children:[
  {index:true,element:<PgHome />},
  {path:"how-it-earns",element:<PgHow />},
  {path:"cortex-ai",element:<PgCortex />},
  {path:"retail",element:<PgRetail />},
  {path:"real-estate",element:<PgRealEstate />},
  {path:"company",element:<PgCompany />},
  {path:"contact",element:<PgContact />},
  {path:"privacy",element:<PgPrivacy />},
  {path:"terms",element:<PgTerms />}
]}];
