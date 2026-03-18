// State-specific late payment penalty calculator
// Based on Prompt Payment Acts & commercial late payment laws per state

export interface StatePenaltyRules {
  state: string
  stateName: string
  annualRate: number          // Annual interest rate (decimal, e.g., 0.18 = 18%)
  flatFee: number             // Flat late fee per invoice ($)
  graceDays: number           // Days after due date before penalties begin
  maxRate: number             // Maximum annual rate cap
  statute: string             // Specific statute citation
  statuteUrl: string          // URL to statute text
  notes: string               // Additional state-specific notes
  compounding: 'simple' | 'monthly' | 'daily'
}

// All 50 states + DC — based on state Prompt Payment Acts and commercial debt laws
export const STATE_RULES: Record<string, StatePenaltyRules> = {
  AL: { state: 'AL', stateName: 'Alabama', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.08, statute: 'Ala. Code § 8-8-1', statuteUrl: 'https://law.justia.com/codes/alabama/title-8/chapter-8/', notes: 'Legal rate 6%; contract rate up to 8%', compounding: 'simple' },
  AK: { state: 'AK', stateName: 'Alaska', annualRate: 0.105, flatFee: 0, graceDays: 30, maxRate: 0.105, statute: 'Alaska Stat. § 45.45.010', statuteUrl: 'https://law.justia.com/codes/alaska/title-45/chapter-45.45/', notes: 'Legal rate 10.5% per annum', compounding: 'simple' },
  AZ: { state: 'AZ', stateName: 'Arizona', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.18, statute: 'A.R.S. § 44-1201', statuteUrl: 'https://www.azleg.gov/ars/44/01201.htm', notes: 'Legal rate 10%; by agreement up to 18% (or any rate for business loans)', compounding: 'simple' },
  AR: { state: 'AR', stateName: 'Arkansas', annualRate: 0.05, flatFee: 0, graceDays: 30, maxRate: 0.17, statute: 'Ark. Code § 4-57-104', statuteUrl: 'https://law.justia.com/codes/arkansas/title-4/subtitle-3/chapter-57/', notes: 'Constitutional 5% max; contracts 17% max', compounding: 'simple' },
  CA: { state: 'CA', stateName: 'California', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.10, statute: 'Cal. Civ. Code § 3289', statuteUrl: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=3289', notes: 'Prejudgment interest 10% per annum on contracts with specific sum', compounding: 'simple' },
  CO: { state: 'CO', stateName: 'Colorado', annualRate: 0.08, flatFee: 0, graceDays: 30, maxRate: 0.45, statute: 'C.R.S. § 5-12-101', statuteUrl: 'https://law.justia.com/codes/colorado/title-5/interest-and-usury/article-12/', notes: 'Legal rate 8%; by agreement up to 45%', compounding: 'simple' },
  CT: { state: 'CT', stateName: 'Connecticut', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'Conn. Gen. Stat. § 37-1', statuteUrl: 'https://law.justia.com/codes/connecticut/title-37/chapter-673/', notes: 'Legal rate 10%; general usury limit 12%', compounding: 'simple' },
  DE: { state: 'DE', stateName: 'Delaware', annualRate: 0.05, flatFee: 0, graceDays: 30, maxRate: 0.05, statute: '6 Del. C. § 2301', statuteUrl: 'https://delcode.delaware.gov/title6/c023/', notes: 'Legal rate 5% over Fed discount rate; no usury limit for businesses', compounding: 'simple' },
  DC: { state: 'DC', stateName: 'District of Columbia', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.24, statute: 'D.C. Code § 28-3302', statuteUrl: 'https://code.dccouncil.gov/us/dc/council/code/sections/28-3302', notes: 'Legal rate 6%; by agreement up to 24%', compounding: 'simple' },
  FL: { state: 'FL', stateName: 'Florida', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.18, statute: 'Fla. Stat. § 55.03', statuteUrl: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0055-0099/0055/Sections/0055.03.html', notes: 'Legal rate set quarterly; general limit 18%; B2B contracts can exceed', compounding: 'simple' },
  GA: { state: 'GA', stateName: 'Georgia', annualRate: 0.07, flatFee: 0, graceDays: 30, maxRate: 0.18, statute: 'O.C.G.A. § 7-4-2', statuteUrl: 'https://law.justia.com/codes/georgia/title-7/chapter-4/article-1/', notes: 'Legal rate 7%; by agreement up to 5%/month (60%) for business >$3K', compounding: 'simple' },
  HI: { state: 'HI', stateName: 'Hawaii', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'HRS § 478-2', statuteUrl: 'https://law.justia.com/codes/hawaii/division-2/title-26/chapter-478/', notes: 'Legal rate 10%; usury limit 12%', compounding: 'simple' },
  ID: { state: 'ID', stateName: 'Idaho', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'Idaho Code § 28-22-104', statuteUrl: 'https://legislature.idaho.gov/statutesrules/idstat/Title28/T28CH22/', notes: 'Legal rate 12% where no agreement', compounding: 'simple' },
  IL: { state: 'IL', stateName: 'Illinois', annualRate: 0.05, flatFee: 0, graceDays: 30, maxRate: 0.09, statute: '815 ILCS 205/2', statuteUrl: 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2235', notes: 'Legal rate 5%; by agreement up to 9%', compounding: 'simple' },
  IN: { state: 'IN', stateName: 'Indiana', annualRate: 0.08, flatFee: 0, graceDays: 30, maxRate: 0.21, statute: 'Ind. Code § 24-4.6-1-102', statuteUrl: 'https://law.justia.com/codes/indiana/title-24/article-4.6/', notes: 'Legal rate 8%; loans up to 21%', compounding: 'simple' },
  IA: { state: 'IA', stateName: 'Iowa', annualRate: 0.05, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'Iowa Code § 535.2', statuteUrl: 'https://www.legis.iowa.gov/law/iowaCode/sections?codeChapter=535', notes: 'Legal rate 5%; by agreement max based on Fed rate + 5%', compounding: 'simple' },
  KS: { state: 'KS', stateName: 'Kansas', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.15, statute: 'K.S.A. § 16-201', statuteUrl: 'https://www.ksrevisor.org/statutes/chapters/ch16/016_002_0001.html', notes: 'Legal rate 10%; by agreement up to 15%', compounding: 'simple' },
  KY: { state: 'KY', stateName: 'Kentucky', annualRate: 0.08, flatFee: 0, graceDays: 30, maxRate: 0.19, statute: 'KRS § 360.010', statuteUrl: 'https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=35600', notes: 'Legal rate 8%; by agreement up to 19% (4% above Fed discount)', compounding: 'simple' },
  LA: { state: 'LA', stateName: 'Louisiana', annualRate: 0.07, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'La. R.S. § 9:3500', statuteUrl: 'https://law.justia.com/codes/louisiana/revised-statutes/title-9/rs-9-3500/', notes: 'Legal rate varies (judicial interest rate); max 12%', compounding: 'simple' },
  ME: { state: 'ME', stateName: 'Maine', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.06, statute: '14 M.R.S. § 1602', statuteUrl: 'https://legislature.maine.gov/statutes/14/title14sec1602.html', notes: 'Rate set annually by Treasurer; no general usury law for businesses', compounding: 'simple' },
  MD: { state: 'MD', stateName: 'Maryland', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.24, statute: 'Md. Code Com. Law § 12-102', statuteUrl: 'https://law.justia.com/codes/maryland/commercial-law/title-12/', notes: 'Legal rate 6%; by agreement up to 24%', compounding: 'simple' },
  MA: { state: 'MA', stateName: 'Massachusetts', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.20, statute: 'M.G.L. c. 231 § 6C', statuteUrl: 'https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleII/Chapter231/Section6C', notes: 'Prejudgment interest 12%; criminal usury at 20%', compounding: 'simple' },
  MI: { state: 'MI', stateName: 'Michigan', annualRate: 0.05, flatFee: 0, graceDays: 30, maxRate: 0.25, statute: 'MCL § 438.31', statuteUrl: 'https://www.legislature.mi.gov/(S(lxcmv3rbhkq2qpuqwrz0xr5t))/mileg.aspx?page=getObject&objectName=mcl-438-31', notes: 'Legal rate 5%; by agreement up to 25% (7% above T-bill for business)', compounding: 'simple' },
  MN: { state: 'MN', stateName: 'Minnesota', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.08, statute: 'Minn. Stat. § 334.01', statuteUrl: 'https://www.revisor.mn.gov/statutes/cite/334.01', notes: 'Legal rate 6%; by agreement up to 8%', compounding: 'simple' },
  MS: { state: 'MS', stateName: 'Mississippi', annualRate: 0.08, flatFee: 0, graceDays: 30, maxRate: 0.10, statute: 'Miss. Code § 75-17-1', statuteUrl: 'https://law.justia.com/codes/mississippi/title-75/chapter-17/', notes: 'Legal rate 8%; by agreement up to 10% (or higher for business loans >$2K)', compounding: 'simple' },
  MO: { state: 'MO', stateName: 'Missouri', annualRate: 0.09, flatFee: 0, graceDays: 30, maxRate: 0.10, statute: 'RSMo § 408.020', statuteUrl: 'https://revisor.mo.gov/main/OneSection.aspx?section=408.020', notes: 'Legal rate 9%; by agreement up to 10%', compounding: 'simple' },
  MT: { state: 'MT', stateName: 'Montana', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.15, statute: 'MCA § 31-1-106', statuteUrl: 'https://leg.mt.gov/bills/mca/title_0310/chapter_0010/part_0010/section_0060/0310-0010-0010-0060.html', notes: 'Legal rate 10%; by agreement up to 15%', compounding: 'simple' },
  NE: { state: 'NE', stateName: 'Nebraska', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.16, statute: 'Neb. Rev. Stat. § 45-104', statuteUrl: 'https://nebraskalegislature.gov/laws/statutes.php?statute=45-104', notes: 'Legal rate 12%; by agreement up to 16%', compounding: 'simple' },
  NV: { state: 'NV', stateName: 'Nevada', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.18, statute: 'NRS § 99.040', statuteUrl: 'https://www.leg.state.nv.us/nrs/nrs-099.html', notes: 'Prime + 2% (legal); by agreement not to exceed rate allowed by law', compounding: 'simple' },
  NH: { state: 'NH', stateName: 'New Hampshire', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.10, statute: 'RSA § 336:1', statuteUrl: 'http://www.gencourt.state.nh.us/rsa/html/XXXI/336/336-1.htm', notes: 'Legal rate 10%; no general usury limit', compounding: 'simple' },
  NJ: { state: 'NJ', stateName: 'New Jersey', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.30, statute: 'N.J.S.A. § 31:1-1', statuteUrl: 'https://law.justia.com/codes/new-jersey/title-31/section-31-1-1/', notes: 'Legal rate 6%; by agreement up to 30% for commercial', compounding: 'simple' },
  NM: { state: 'NM', stateName: 'New Mexico', annualRate: 0.15, flatFee: 0, graceDays: 30, maxRate: 0.15, statute: 'NMSA § 56-8-3', statuteUrl: 'https://law.justia.com/codes/new-mexico/chapter-56/article-8/', notes: 'Legal rate 15%', compounding: 'simple' },
  NY: { state: 'NY', stateName: 'New York', annualRate: 0.09, flatFee: 0, graceDays: 30, maxRate: 0.16, statute: 'N.Y. CPLR § 5004', statuteUrl: 'https://www.nysenate.gov/legislation/laws/CVP/5004', notes: 'Legal rate 9%; civil usury limit 16%; criminal usury 25%', compounding: 'simple' },
  NC: { state: 'NC', stateName: 'North Carolina', annualRate: 0.08, flatFee: 0, graceDays: 30, maxRate: 0.08, statute: 'N.C.G.S. § 24-1', statuteUrl: 'https://www.ncleg.gov/EnactedLegislation/Statutes/PDF/BySection/Chapter_24/GS_24-1.pdf', notes: 'Legal rate 8%; same as max unless statutory exception', compounding: 'simple' },
  ND: { state: 'ND', stateName: 'North Dakota', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.055, statute: 'N.D.C.C. § 47-14-05', statuteUrl: 'https://www.ndlegis.gov/cencode/t47c14.pdf', notes: 'Legal rate 6%; by agreement max 5.5% above 6-month T-bill', compounding: 'simple' },
  OH: { state: 'OH', stateName: 'Ohio', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.08, statute: 'ORC § 1343.01', statuteUrl: 'https://codes.ohio.gov/ohio-revised-code/section-1343.01', notes: 'Legal rate set by Tax Commissioner; usury limit 8%', compounding: 'simple' },
  OK: { state: 'OK', stateName: 'Oklahoma', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.10, statute: '15 O.S. § 266', statuteUrl: 'https://law.justia.com/codes/oklahoma/title-15/section-15-266/', notes: 'Legal rate 6%; by agreement up to 10% (or higher for business over $100K)', compounding: 'simple' },
  OR: { state: 'OR', stateName: 'Oregon', annualRate: 0.09, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'ORS § 82.010', statuteUrl: 'https://www.oregonlegislature.gov/bills_laws/ors/ors082.html', notes: 'Legal rate 9%; by agreement up to 12% (higher for business)', compounding: 'simple' },
  PA: { state: 'PA', stateName: 'Pennsylvania', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.06, statute: '41 P.S. § 202', statuteUrl: 'https://www.legis.state.pa.us/cfdocs/legis/LI/consCheck.cfm?txtType=HTM&ttl=41&div=0&chpt=2&sctn=2&subsctn=0', notes: 'Legal rate 6%; no usury limit for business loans', compounding: 'simple' },
  RI: { state: 'RI', stateName: 'Rhode Island', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.21, statute: 'R.I.G.L. § 6-26-1', statuteUrl: 'http://webserver.rilegislature.gov/Statutes/TITLE6/6-26/6-26-1.htm', notes: 'Legal rate 12%; by agreement up to 21%', compounding: 'simple' },
  SC: { state: 'SC', stateName: 'South Carolina', annualRate: 0.085, flatFee: 0, graceDays: 30, maxRate: 0.085, statute: 'S.C. Code § 34-31-20', statuteUrl: 'https://law.justia.com/codes/south-carolina/title-34/chapter-31/', notes: 'Legal rate 8.75%; higher by agreement', compounding: 'simple' },
  SD: { state: 'SD', stateName: 'South Dakota', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'SDCL § 54-3-4', statuteUrl: 'https://sdlegislature.gov/Statutes/Codified_Laws/DisplayStatute.aspx?Type=Statute&Statute=54-3-4', notes: 'Legal rate 12%; no usury cap (federally chartered banks exempt)', compounding: 'simple' },
  TN: { state: 'TN', stateName: 'Tennessee', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.24, statute: 'Tenn. Code § 47-14-103', statuteUrl: 'https://law.justia.com/codes/tennessee/title-47/chapter-14/', notes: 'Legal rate 10%; formula-based max (~24%)', compounding: 'simple' },
  TX: { state: 'TX', stateName: 'Texas', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.18, statute: 'Tex. Fin. Code § 302.001', statuteUrl: 'https://statutes.capitol.texas.gov/Docs/FI/htm/FI.302.htm', notes: 'Legal rate 6%; by agreement up to 18% (28% for commercial >$250K)', compounding: 'simple' },
  UT: { state: 'UT', stateName: 'Utah', annualRate: 0.10, flatFee: 0, graceDays: 30, maxRate: 0.10, statute: 'Utah Code § 15-1-1', statuteUrl: 'https://le.utah.gov/xcode/Title15/Chapter1/15-1-S1.html', notes: 'Legal rate 10%; no usury limit for commercial transactions', compounding: 'simple' },
  VT: { state: 'VT', stateName: 'Vermont', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: '9 V.S.A. § 41a', statuteUrl: 'https://legislature.vermont.gov/statutes/section/09/004/00041a', notes: 'Legal rate 12%; same as judgment rate', compounding: 'simple' },
  VA: { state: 'VA', stateName: 'Virginia', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'Va. Code § 6.2-301', statuteUrl: 'https://law.lis.virginia.gov/vacode/title6.2/chapter3/section6.2-301/', notes: 'Legal rate 6%; by agreement up to 12% (or higher for business)', compounding: 'simple' },
  WA: { state: 'WA', stateName: 'Washington', annualRate: 0.12, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'RCW § 19.52.010', statuteUrl: 'https://app.leg.wa.gov/RCW/default.aspx?cite=19.52.010', notes: 'Legal rate 12%; higher by agreement for commercial', compounding: 'simple' },
  WV: { state: 'WV', stateName: 'West Virginia', annualRate: 0.06, flatFee: 0, graceDays: 30, maxRate: 0.08, statute: 'W.Va. Code § 47-6-5', statuteUrl: 'https://www.wvlegislature.gov/WVCODE/Code.cfm?chap=47&art=6', notes: 'Legal rate 6%; by agreement up to 8%', compounding: 'simple' },
  WI: { state: 'WI', stateName: 'Wisconsin', annualRate: 0.05, flatFee: 0, graceDays: 30, maxRate: 0.12, statute: 'Wis. Stat. § 138.04', statuteUrl: 'https://docs.legis.wisconsin.gov/statutes/statutes/138/04', notes: 'Legal rate 5%; by agreement up to 12%', compounding: 'simple' },
  WY: { state: 'WY', stateName: 'Wyoming', annualRate: 0.07, flatFee: 0, graceDays: 30, maxRate: 0.07, statute: 'Wyo. Stat. § 40-14-106', statuteUrl: 'https://law.justia.com/codes/wyoming/title-40/chapter-14/', notes: 'Legal rate 7%; no usury cap', compounding: 'simple' },
}

export interface PenaltyCalculation {
  originalAmount: number
  daysLate: number
  graceDays: number
  effectiveDaysLate: number  // after grace period
  dailyRate: number
  accruedInterest: number
  flatFee: number
  totalPenalty: number
  totalOwed: number
  statute: string
  stateName: string
  annualRate: number
  dailyAccrual: number       // how much is added per day RIGHT NOW
}

export function calculatePenalty(
  invoiceAmount: number,
  dueDate: string,       // ISO date
  state: string,         // 2-letter code
  asOfDate?: string      // ISO date, defaults to now
): PenaltyCalculation {
  const rules = STATE_RULES[state.toUpperCase()]
  if (!rules) throw new Error(`Unknown state: ${state}`)

  const due = new Date(dueDate)
  const now = asOfDate ? new Date(asOfDate) : new Date()
  const diffMs = now.getTime() - due.getTime()
  const daysLate = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
  const effectiveDaysLate = Math.max(0, daysLate - rules.graceDays)

  const dailyRate = rules.annualRate / 365
  let accruedInterest = 0

  if (rules.compounding === 'simple') {
    accruedInterest = invoiceAmount * dailyRate * effectiveDaysLate
  } else if (rules.compounding === 'monthly') {
    const months = Math.floor(effectiveDaysLate / 30)
    const remainingDays = effectiveDaysLate % 30
    const monthlyRate = rules.annualRate / 12
    accruedInterest = invoiceAmount * ((1 + monthlyRate) ** months - 1)
    accruedInterest += (invoiceAmount + accruedInterest) * dailyRate * remainingDays
  } else {
    // daily compounding
    accruedInterest = invoiceAmount * ((1 + dailyRate) ** effectiveDaysLate - 1)
  }

  accruedInterest = Math.round(accruedInterest * 100) / 100
  const dailyAccrual = Math.round(invoiceAmount * dailyRate * 100) / 100

  return {
    originalAmount: invoiceAmount,
    daysLate,
    graceDays: rules.graceDays,
    effectiveDaysLate,
    dailyRate,
    accruedInterest,
    flatFee: rules.flatFee,
    totalPenalty: accruedInterest + rules.flatFee,
    totalOwed: invoiceAmount + accruedInterest + rules.flatFee,
    statute: rules.statute,
    stateName: rules.stateName,
    annualRate: rules.annualRate,
    dailyAccrual,
  }
}

// Generate escalation level based on days late
export type EscalationLevel = 'friendly' | 'formal' | 'final' | 'collections'

export function getEscalationLevel(daysLate: number): EscalationLevel {
  if (daysLate <= 15) return 'friendly'
  if (daysLate <= 45) return 'formal'
  if (daysLate <= 90) return 'final'
  return 'collections'
}

export function getEscalationConfig(level: EscalationLevel) {
  const configs = {
    friendly: {
      label: 'Friendly Reminder',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '📩',
      tone: 'This is a friendly reminder that payment is overdue.',
    },
    formal: {
      label: 'Formal Demand',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      icon: '⚠️',
      tone: 'This is a formal demand for payment under applicable state law.',
    },
    final: {
      label: 'Final Notice',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '🚨',
      tone: 'This is your final notice before escalation to collections.',
    },
    collections: {
      label: 'Pre-Collections',
      color: 'text-red-800',
      bg: 'bg-red-100',
      border: 'border-red-300',
      icon: '⚖️',
      tone: 'This matter is being prepared for referral to a collections agency and/or legal counsel.',
    },
  }
  return configs[level]
}

export function generateDemandLetter(
  creditorName: string,
  creditorAddress: string,
  debtorName: string,
  debtorAddress: string,
  invoiceNumber: string,
  invoiceDate: string,
  dueDate: string,
  amount: number,
  state: string,
  description: string,
): string {
  const calc = calculatePenalty(amount, dueDate, state)
  const rules = STATE_RULES[state.toUpperCase()]
  const level = getEscalationLevel(calc.daysLate)
  const config = getEscalationConfig(level)
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return `
${config.icon} ${config.label.toUpperCase()}

${today}

FROM:
${creditorName}
${creditorAddress}

TO:
${debtorName}
${debtorAddress}

RE: Past Due Invoice #${invoiceNumber} — DEMAND FOR PAYMENT

Dear ${debtorName},

${config.tone}

INVOICE DETAILS:
• Invoice Number: ${invoiceNumber}
• Invoice Date: ${invoiceDate}
• Original Due Date: ${new Date(dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
• Description: ${description}
• Original Amount: $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}

PENALTY CALCULATION (per ${rules.statute} — ${rules.stateName}):
• Days Past Due: ${calc.daysLate} days
• Applicable Interest Rate: ${(rules.annualRate * 100).toFixed(1)}% per annum
• Accrued Interest: $${calc.accruedInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
• Daily Accrual: $${calc.dailyAccrual.toLocaleString('en-US', { minimumFractionDigits: 2 })} per day

TOTAL AMOUNT DUE: $${calc.totalOwed.toLocaleString('en-US', { minimumFractionDigits: 2 })}

This amount increases by $${calc.dailyAccrual.toLocaleString('en-US', { minimumFractionDigits: 2 })} for each additional day of non-payment, pursuant to ${rules.statute}.

${level === 'friendly' ? `Please remit payment within 10 business days to avoid further action and additional interest charges.` : ''}${level === 'formal' ? `Under ${rules.statute}, you are legally obligated to pay interest at ${(rules.annualRate * 100).toFixed(1)}% per annum on this outstanding commercial debt. Failure to remit payment within 10 business days will result in further escalation, including potential referral to collections and/or legal counsel.` : ''}${level === 'final' ? `THIS IS YOUR FINAL NOTICE. Failure to pay within 5 business days will result in immediate referral to a collections agency. Additional costs including attorney fees and court costs may be added to your balance. Under ${rules.statute}, the interest rate of ${(rules.annualRate * 100).toFixed(1)}% per annum will continue to accrue until the debt is satisfied in full.` : ''}${level === 'collections' ? `This matter is being prepared for referral to a licensed collections agency and legal counsel for recovery. You may also be responsible for all costs of collection, including attorney fees and court costs where permitted by law. Under ${rules.statute}, interest at ${(rules.annualRate * 100).toFixed(1)}% per annum continues to accrue. This is not a threat — it is a statement of intent to pursue all legal remedies available.` : ''}

Sincerely,
${creditorName}

---
This demand letter was generated by LatePay (henry-latepay.vercel.app)
Penalty calculated per ${rules.statute} — ${rules.stateName} late payment law.
Interest rate: ${(rules.annualRate * 100).toFixed(1)}% per annum (${rules.notes}).
`.trim()
}

export const US_STATES = Object.entries(STATE_RULES).map(([code, r]) => ({
  code,
  name: r.stateName,
  rate: r.annualRate,
})).sort((a, b) => a.name.localeCompare(b.name))
