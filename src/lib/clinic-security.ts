export function requireAal2(aal: unknown) {
  if (aal !== 'aal2') throw new Error('Confirme o segundo fator para acessar a clínica.')
}
export function changedDraft(current: Record<string,string>, persisted: Record<string,string>) {
  return JSON.stringify(current) !== JSON.stringify(persisted)
}