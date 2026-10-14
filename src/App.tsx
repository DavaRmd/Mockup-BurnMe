import { useEffect, useState } from "react";

type Screen = "login" | "redeem" | "home" | "loading" | "result" | "error";

const screens: { id: Screen; number: string; label: string }[] = [
  { id: "login", number: "01", label: "Login" },
  { id: "redeem", number: "02", label: "Voucher" },
  { id: "home", number: "03", label: "Order" },
  { id: "loading", number: "04", label: "Masak" },
  { id: "result", number: "05", label: "Struk" },
  { id: "error", number: "06", label: "Error" },
];

const loadingMessages = [
  "Mesin kasir ATS lagi nyoba nge-scan layout CV lu, nyangkut di tabel nggak nih...",
  "Chef lagi nyocokin bahan CV lu sama syarat loker Backend Developer...",
  "Nemu klaim “mampu bekerja di bawah tekanan”, lagi dicari buktinya di panci...",
  "Ngitung berapa detik HRD bakal nguap baca paragraf summary lu...",
];

function Icon({
  name,
  size = 18,
  className = "",
}: {
  name: "ticket" | "flame" | "file" | "lock" | "alert" | "copy" | "check" | "arrow";
  size?: number;
  className?: string;
}) {
  const paths = {
    ticket: <><path d="M3 7.5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5Z" /><path d="M13 6v2m0 3v2m0 3v2" /></>,
    flame: <path d="M12.5 3.5c.4 3-1.8 4.1-1.8 6.3 0 1.1.8 1.9 1.8 1.9 1.6 0 2.5-1.4 2.2-3.4 2 1.6 3.3 3.7 3.3 6a6 6 0 0 1-12 0c0-3.5 2-6.5 5.1-9.1-.1 2.2.4 3.3 1.4 4.1" />,
    file: <><path d="M6 2.5h8l4 4V21H6z" /><path d="M14 2.5v4h4M9 12h6M9 16h6" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    alert: <><path d="M12 3 2.5 20h19z" /><path d="M12 9v5m0 3v.1" /></>,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3" /></>,
    check: <path d="m4 12 5 5L20 6" />,
    arrow: <path d="m15 18-6-6 6-6" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="logo-mark">B!</div>
      <div className="leading-none">
        <div className="text-[18px] font-extrabold tracking-[-0.04em] text-white">BURNME</div>
        <div className="mono mt-1 text-[8px] tracking-[0.08em] text-zinc-500">KITCHEN & CV ROASTERY</div>
      </div>
    </div>
  );
}

function Header({ tokens, onNavigate }: { tokens: number; onNavigate: (s: Screen) => void }) {
  return (
    <header className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
      <button onClick={() => onNavigate("home")} className="text-left"><Brand /></button>
      <button onClick={() => onNavigate("redeem")} className="token-pill">
        <Icon name="ticket" size={15} />
        <span>{tokens} TOKEN</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[12px] text-black">+</span>
      </button>
    </header>
  );
}

function Paper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`paper rounded-[14px] ${className}`}>{children}</section>;
}

function Button({ children, onClick, secondary = false, className = "" }: { children: React.ReactNode; onClick?: () => void; secondary?: boolean; className?: string }) {
  return <button onClick={onClick} className={`${secondary ? "button-secondary" : "button-burn"} ${className}`}>{children}</button>;
}

function Login({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <Paper className="p-6 text-center">
      <div className="receipt-dash mono pb-2 text-[9px] tracking-[0.14em] text-zinc-500">EST. 2026 • JAKARTA, ID • MEJA #01</div>
      <div className="py-5">
        <div className="inline-flex items-center gap-1.5 rounded border-2 border-black bg-orange-600 px-3 py-1 mono text-[10px] font-extrabold text-white shadow-[2px_2px_0_#000]">
          <Icon name="flame" size={13} /> DAPUR AUDIT CV PALING JUJUR
        </div>
        <h1 className="mt-2 text-[40px] font-extrabold leading-none tracking-[-0.06em]">BURNME.</h1>
        <p className="mono mt-2 text-[10px] text-zinc-600">“Upload CV lu. Get burned. Dikasih resep benerinnya.”</p>
      </div>
      <div className="aged-card mono mb-5 space-y-2.5 text-left text-[10px]">
        <div className="flex justify-between border-b border-zinc-400 pb-2 font-extrabold">
          <span>PAKET KOMPLIT ROAST CV</span><span className="text-rose-600">1 KUPON</span>
        </div>
        {["Scan Keramahan Mesin ATS", "Uji Kecocokan Loker Tujuan", "Bedah Kalimat & Angka Dampak", "Roast Pedas + Resep Perbaikan"].map((item, i) => (
          <div key={item} className="flex items-center justify-between gap-2"><span>0{i + 1}. {item}</span><span className="font-bold text-emerald-700">[TERMASUK]</span></div>
        ))}
      </div>
      <Button onClick={() => onNavigate("home")} className="flex w-full items-center justify-center gap-2.5 py-3.5 text-sm">
        <span className="rounded border border-black bg-white px-2 py-0.5 mono text-xs font-black text-black">G</span>
        MASUK DENGAN GOOGLE
      </Button>
      <p className="mt-4 flex items-start justify-center gap-1.5 mono text-[9px] leading-relaxed text-zinc-500">
        <Icon name="lock" size={12} className="mt-0.5 shrink-0" /> File CV & teks loker diproses di memori dan tidak disimpan.
      </p>
    </Paper>
  );
}

function Redeem({ onNavigate, onRedeem }: { onNavigate: (s: Screen) => void; onRedeem: () => void }) {
  const [redeemed, setRedeemed] = useState(false);
  return (
    <Paper className="space-y-4 p-5">
      <div className="receipt-dash flex items-center justify-between pb-3">
        <div><span className="mono text-[9px] text-zinc-500">LOKET KUPON DAPUR</span><h2 className="text-xl font-extrabold">Klaim Voucher Token</h2></div>
        <Icon name="ticket" size={28} className="text-orange-600" />
      </div>
      <p className="text-xs leading-relaxed text-zinc-700">Satu token dipakai buat <strong>1x porsi roast CV komplit</strong> sampai keluar struk hasil. Masukkan kode promo di bawah ini:</p>
      <label className="block">
        <span className="mono text-[10px] font-bold">KODE VOUCHER PROMO *</span>
        <input defaultValue="BURN-TEMAN" className="field mt-1.5 uppercase tracking-wider" />
      </label>
      {redeemed && <p className="flex items-center gap-1.5 mono text-[10px] font-semibold text-emerald-700"><Icon name="check" size={13} /> Mantap! +5 Token berhasil ditambah.</p>}
      <Button onClick={() => { setRedeemed(true); onRedeem(); }} className="w-full py-3 mono text-xs">[ TUKARKAN KUPON SEKARANG ]</Button>
      <div className="rounded-lg border border-zinc-400 bg-[#f2ece1] p-3 mono text-[9px] leading-relaxed text-zinc-600"><strong>INFO KUPON:</strong> Kalau token lu 0, tunggu pembagian kode gelombang berikutnya. Token gagal pakai nggak bakal hangus.</div>
      <button onClick={() => onNavigate("home")} className="flex w-full items-center justify-center gap-1 py-1 mono text-[10px] font-bold underline"><Icon name="arrow" size={12} /> Kembali ke Meja Order</button>
    </Paper>
  );
}

function Home({ onCook }: { onCook: () => void }) {
  return (
    <Paper className="space-y-4 p-5">
      <div className="receipt-double flex items-start justify-between pb-3">
        <div><div className="mono text-[9px] font-bold text-rose-600">● ORDER TICKET #CV-2026</div><h1 className="text-[19px] font-extrabold">Tulis Pesanan Roast Lu</h1></div>
        <div className="text-right mono text-[8px] leading-relaxed text-zinc-500">HARGA: 1 TOKEN<br />MAX: 3 HAL PDF</div>
      </div>
      <div className="step-label">STEP 01 // MAU NGELAMAR JADI APA?</div>
      <label className="block text-[11px] font-bold">Posisi / Role yang Diincar <span className="text-rose-600">* (Wajib)</span><input defaultValue="Backend Developer" className="field mt-1" /></label>
      <label className="block text-[11px] font-bold">Syarat / Deskripsi Loker <span className="font-normal text-zinc-500">(Opsional)</span><textarea defaultValue="Menguasai Python/Go, REST API, PostgreSQL, Docker, dan terbiasa dengan Git workflow." rows={3} className="field mt-1 resize-none font-normal" /></label>
      <div className="receipt-dash" />
      <div className="step-label">STEP 02 // TARUH BAHAN BAKU CV (.PDF)</div>
      <div className="rounded-lg border-2 border-dashed border-zinc-900 bg-[#f2ece1] p-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded border border-emerald-700 bg-emerald-100 px-3 py-1 mono text-[9px] font-bold text-emerald-800"><Icon name="file" size={13} /> CV_Dava_Final_Revisi3.pdf</div>
        <p className="my-2 mono text-[9px] text-zinc-600">PDF • 420 KB • 2 halaman • Maksimal 5 MB</p>
        <Button secondary className="px-4 py-1.5 mono text-[9px]">Ganti File PDF...</Button>
      </div>
      <Button onClick={onCook} className="flex w-full items-center justify-center gap-2 py-3.5 text-xs"><Icon name="flame" size={16} /> MASUKKAN KE PEMANGGANG (1 TOKEN)</Button>
      <div className="flex items-center justify-center gap-1 mono text-[9px] text-zinc-500"><Icon name="lock" size={11} /> File langsung dihapus sehabis dimasak.</div>
    </Paper>
  );
}

function Loading({ onCancel }: { onCancel: () => void }) {
  const [message, setMessage] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setMessage((v) => (v + 1) % loadingMessages.length), 1800);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <Paper className="space-y-5 p-6 text-center">
      <div className="receipt-dash pb-2 mono text-[10px] font-bold tracking-widest text-rose-600">● DAPUR SEDANG MEMANGGANG ●</div>
      <div className="relative mx-auto my-2 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-zinc-300 border-t-orange-600" />
        <Icon name="flame" size={28} className="text-orange-600" />
      </div>
      <div className="flex min-h-24 flex-col justify-center rounded-lg border-2 border-zinc-900 bg-[#f2ece1] p-4">
        <span className="mono mb-1 text-[8px] text-zinc-500">STATUS PANCI SAAT INI:</span>
        <p className="mono text-[10px] font-bold leading-relaxed">“{loadingMessages[message]}”</p>
      </div>
      <div className="mono text-[9px] leading-relaxed text-zinc-600">Estimasi matang: 10–30 detik<br /><strong className="text-emerald-700">Kalau gagal atau batal, token lu nggak dipotong.</strong></div>
      <Button secondary onClick={onCancel} className="w-full py-2.5 mono text-[10px]">[ BATALKAN PESANAN ]</Button>
    </Paper>
  );
}

const scores = [
  ["Kesiapan Mesin ATS", 62, "bg-amber-500", "text-amber-600"],
  ["Kecocokan Loker", 48, "bg-rose-600", "text-rose-600"],
  ["Kualitas Penulisan", 72, "bg-emerald-600", "text-emerald-700"],
  ["Bukti & Angka Dampak", 30, "bg-rose-600", "text-rose-600"],
  ["Kadar Buzzword (Tinggi=Buruk)", 80, "bg-rose-600", "text-rose-600"],
] as const;

const roasts = [
  ["FORMAT & MESIN ATS", "Lu bikin bar persentase ‘Python 85%’ pakai grafik warna-warni. Mesin ATS nggak punya mata buat ngukur panjang kotak lu bro!", "Hapus grafik skill bar dan layout 2 kolom. Ganti jadi teks lurus 1 kolom supaya langsung ke-indeks parser ATS."],
  ["KECOCOKAN LOKER BACKEND", "Ngelamar Backend Developer yang butuh Docker & PostgreSQL, tapi halaman pertama malah cerita jadi Koordinator Konsumsi.", "Pangkas pengalaman non-teknis. Naikin seksi Project Teknis dan tonjolin REST API + database yang pernah lu bangun."],
  ["CARA PENULISAN & ANGKA", "Summary bilang ‘pekerja keras’, tapi deskripsi magang cuma ‘membantu tim membuat fitur backend’. Itu CV apa absen?", "Pakai kata kerja aktif + angka terukur: Mengembangkan 8 endpoint REST API yang mempercepat waktu muat sebesar 35%."],
];

function Result({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(false);
  return (
    <div className="space-y-4">
      <Paper className="space-y-4 p-5">
        <div className="receipt-double pb-3 text-center">
          <div className="mono text-sm font-extrabold tracking-widest">*** BURNME KITCHEN ***</div>
          <div className="mono text-[9px] text-zinc-600">STRUK AUDIT ATS, LOKER & ROAST CV</div>
          <div className="mono text-[8px] text-zinc-500">14 OKT 2026 • CHEF GEMINI • LUNAS 1 TOKEN</div>
        </div>
        <div className="receipt-dash space-y-1 pb-3 mono text-[9px]">
          <div className="flex justify-between"><span className="text-zinc-500">POSISI TUJUAN</span><strong>BACKEND DEVELOPER</strong></div>
          <div className="flex justify-between"><span className="text-zinc-500">ACUAN LOKER</span><strong className="text-emerald-700">SYARAT SPESIFIK</strong></div>
        </div>
        <div className="receipt-dash space-y-2.5 pb-4">
          <div className="flex justify-between border-b border-zinc-300 pb-1 mono text-[9px] font-bold text-zinc-500"><span>ITEM AUDIT CV</span><span>NILAI</span></div>
          {scores.map(([label, score, bar, color], i) => (
            <div key={label}>
              <div className="mb-1 flex justify-between mono text-[9px] font-bold"><span>0{i + 1}. {label}</span><span className={color}>{score} / 100</span></div>
              <div className="h-2 overflow-hidden rounded-sm border border-zinc-800 bg-zinc-300"><div className={`h-full ${bar}`} style={{ width: `${score}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="receipt-double space-y-2 pb-4">
          <div className="mono text-[9px] font-extrabold">BUMBU / KEYWORD YANG BELUM ADA:</div>
          <div className="flex flex-wrap gap-1.5">{["Docker", "PostgreSQL", "Unit Testing", "CI/CD"].map((item) => <span key={item} className="keyword">+ {item}</span>)}</div>
        </div>
        <div className="rounded-lg border-2 border-zinc-900 bg-[#f2ece1] p-4 text-center">
          <div className="mono text-[9px] font-bold text-zinc-600">TOTAL TINGKAT KEGOSONGAN CV</div>
          <div className="mono my-1 text-5xl font-extrabold tracking-tight">68<span className="text-xl text-zinc-500">/100</span></div>
          <span className="stamp">MULAI GOSONG — RAWAN DI-SKIP ATS</span>
          <p className="mt-3 text-xs font-extrabold italic">“CV Rasa Brosur Kampus, Nggak Nyambung Sama Backend!”</p>
        </div>
      </Paper>
      <div className="px-1 mono text-[10px] font-extrabold tracking-wider text-orange-400">CATATAN PEDAS CHEF & RESEP BENERINNYA (3)</div>
      {roasts.map(([title, roast, fix], i) => (
        <Paper key={title} className="overflow-hidden">
          <div className="border-l-[6px] border-rose-600 p-4"><div className="mono text-[9px] font-extrabold text-rose-600">[ROAST #0{i + 1} // {title}]</div><p className="mt-1 text-xs font-bold leading-relaxed">“{roast}”</p></div>
          <div className="border-l-[6px] border-l-emerald-600 border-t-2 border-dashed border-zinc-400 bg-[#e6f4ea] p-4"><div className="mono text-[9px] font-extrabold text-emerald-800">RESEP BENERINNYA:</div><p className="mt-1 text-[10px] font-medium leading-relaxed">{fix}</p></div>
        </Paper>
      ))}
      <Paper className="p-4">
        <div className="receipt-dash pb-2 mono text-[10px] font-extrabold">3 LANGKAH PALING PRIORITAS</div>
        <ol className="mt-3 space-y-2 text-[10px] font-semibold">
          {["Ubah layout CV jadi 1 kolom standar tanpa skill bar atau tabel.", "Masukkan keyword PostgreSQL, Docker, dan REST API ke project.", "Tambahkan minimal satu angka dampak di tiap pengalaman."].map((item, i) => <li key={item} className="flex gap-2"><span className="number-chip">0{i + 1}</span><span>{item}</span></li>)}
        </ol>
      </Paper>
      <div className="kitchen-card rounded-xl p-4 text-center">
        {feedback ? <p className="mono text-[10px] text-zinc-300">Makasih! Masukan lu udah dicatat dapur.</p> : <><p className="mono text-[10px] text-zinc-300">Gimana racikan roast Chef barusan?</p><div className="mt-3 flex justify-center gap-2"><button onClick={() => setFeedback(true)} className="feedback-btn">Ngena & Ngebantu</button><button onClick={() => setFeedback(true)} className="feedback-btn">Kurang Pedas</button></div></>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button secondary onClick={() => { setCopied(true); window.setTimeout(() => setCopied(false), 1800); }} className="flex items-center justify-center gap-1.5 py-3 mono text-[9px]">{copied ? <Icon name="check" size={13} /> : <Icon name="copy" size={13} />}{copied ? "TEKS TERSALIN" : "COPY TEKS STRUK"}</Button>
        <Button onClick={() => onNavigate("home")} className="flex items-center justify-center gap-1.5 py-3 mono text-[9px]"><Icon name="flame" size={13} /> ROAST CV LAIN</Button>
      </div>
    </div>
  );
}

function ErrorScreen({ tokens, onNavigate }: { tokens: number; onNavigate: (s: Screen) => void }) {
  return (
    <Paper className="space-y-4 p-6 text-center">
      <div className="receipt-dash pb-2 mono text-[10px] font-extrabold text-rose-600">ORDER DIBATALKAN (ERROR #422)</div>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600"><Icon name="alert" size={34} /></div>
      <h2 className="text-xl font-extrabold">“Waduh, Ini Bukan CV Bro!”</h2>
      <p className="text-xs leading-relaxed text-zinc-700">File PDF yang lu kasih kelihatan kayak <strong>tagihan listrik atau resep masakan</strong>, bukan CV yang bisa diaudit Chef BurnMe.</p>
      <div className="rounded-lg border-2 border-emerald-700 bg-[#e6f4ea] p-3 mono text-[10px] font-bold text-emerald-900">TENANG: Token lu utuh ({tokens} Token), nggak kepotong!</div>
      <Button onClick={() => onNavigate("home")} className="w-full py-3 mono text-[9px]">[ BALIK KE MEJA ORDER & GANTI PDF ]</Button>
    </Paper>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("result");
  const [tokens, setTokens] = useState(3);
  const [cookingTimer, setCookingTimer] = useState<number | null>(null);

  useEffect(() => () => { if (cookingTimer) window.clearTimeout(cookingTimer); }, [cookingTimer]);

  const navigate = (target: Screen) => {
    if (cookingTimer) window.clearTimeout(cookingTimer);
    setCookingTimer(null);
    setScreen(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cook = () => {
    setScreen("loading");
    const timer = window.setTimeout(() => {
      setTokens((value) => Math.max(0, value - 1));
      setScreen("result");
      setCookingTimer(null);
    }, 3600);
    setCookingTimer(timer);
  };

  return (
    <main className="min-h-screen bg-[#141413] text-zinc-100">
      <aside className="nav-shell">
        <div className="nav-inner">
          <div className="hidden lg:block"><Brand /><p className="mt-5 max-w-[210px] text-xs leading-relaxed text-zinc-500">Interactive mobile UI mockup<br />Editable React layers • 6 screens</p></div>
          <div className="lg:mt-10">
            <div className="mb-2 flex items-center justify-between"><span className="mono text-[9px] tracking-widest text-zinc-500">PREVIEW LAYAR</span><span className="mono text-[9px] font-bold text-amber-400">{tokens} TOKEN</span></div>
            <nav className="nav-list">
              {screens.map((item) => <button key={item.id} onClick={() => navigate(item.id)} className={`nav-item ${screen === item.id ? "active" : ""}`}><span>{item.number}</span><strong>{item.label}</strong></button>)}
            </nav>
          </div>
          <div className="mt-auto hidden border-t border-zinc-800 pt-4 lg:block"><div className="mono text-[9px] leading-relaxed text-zinc-600">BURNME® UI CONCEPT<br />MOBILE • 390 PX</div></div>
        </div>
      </aside>
      <div className="content-shell">
        <div className="phone-label"><span>SCREEN / {screen.toUpperCase()}</span><span>390 × AUTO</span></div>
        <div className="phone-frame">
          {screen !== "login" && <Header tokens={tokens} onNavigate={navigate} />}
          {screen === "login" && <Login onNavigate={navigate} />}
          {screen === "redeem" && <Redeem onNavigate={navigate} onRedeem={() => setTokens((v) => v + 5)} />}
          {screen === "home" && <Home onCook={cook} />}
          {screen === "loading" && <Loading onCancel={() => navigate("home")} />}
          {screen === "result" && <Result onNavigate={navigate} />}
          {screen === "error" && <ErrorScreen tokens={tokens} onNavigate={navigate} />}
        </div>
      </div>
    </main>
  );
}
