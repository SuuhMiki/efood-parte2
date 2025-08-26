export function maskCEP(v=''){
  return v.replace(/\D/g,'').slice(0,8).replace(/(\d{5})(\d)/,'$1-$2')
}
export function maskPhoneBR(v=''){
  const d = v.replace(/\D/g,'').slice(0,11)
  if(d.length <= 10){
    return d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').trim()
  }
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3').trim()
}
export function maskCardNumber(v=''){
  return v.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 ').trim()
}
export function maskExpiry(v=''){
  let s = v.replace(/\D/g,'').slice(0,4)
  if(s.length >= 3){
    s = s.replace(/(\d{2})(\d{1,2})/,'$1/$2')
  }
  return s
}
export function maskCVV(v=''){
  return v.replace(/\D/g,'').slice(0,4)
}

// Basic validators
export function isValidCEP(v=''){
  return /^\d{5}-\d{3}$/.test(v)
}
export function isValidPhone(v=''){
  return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v)
}
export function isValidExpiry(v=''){
  if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v)) return false
  // simple past-date check (MM/YY)
  const [mm, yy] = v.split('/').map(Number)
  const now = new Date()
  const year = 2000 + yy
  const exp = new Date(year, mm) // first day next month
  return exp > now
}
export function isValidCVV(v=''){
  return /^\d{3,4}$/.test(v)
}
export function isValidCardLuhn(v=''){
  const digits = v.replace(/\s+/g,'').split('').map(n=>parseInt(n,10))
  if(digits.length < 13) return false
  let sum = 0, alt = false
  for(let i = digits.length - 1; i >= 0; i--){
    let n = digits[i]
    if(alt){ n *= 2; if(n > 9) n -= 9 }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}
