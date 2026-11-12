import {describe,it,expect} from 'vitest'
import {cents,balance,cash,localDate,type Row} from '@/lib/clinic'
const title={id:'t',amount_cents:30000,direction:'receber'} as Row<'financial_titles'>
const payments=[{id:'s1',title_id:'t',amount_cents:10000,paid_at:'2026-11-12'},{id:'s2',title_id:'t',amount_cents:15000,paid_at:'2026-12-02'}] as Row<'settlements'>[]
const reversals=[{id:'r',settlement_id:'s1',amount_cents:3000,reversed_at:'2026-12-05'}] as Row<'reversals'>[]
describe('Clinic rules',()=>{
 it('stores exact monetary cents',()=>{expect(cents('100,01')).toBe(10001);expect(()=>cents('1.001')).toThrow()})
 it('subtracts multiple partial payments and restores reversed amounts',()=>{expect(balance(title,payments,reversals)).toBe(8000)})
 it('uses payment date not title or appointment date for monthly cash',()=>{expect(cash([title],payments,reversals,'2026-11')).toBe(10000);expect(cash([title],payments,reversals,'2026-12')).toBe(12000)})
 it('shows zero cash in an empty clinic',()=>{expect(cash([],[],[],'2026-11')).toBe(0)})
 it('uses Sao Paulo calendar date across UTC midnight',()=>{expect(localDate(new Date('2026-11-13T01:00:00Z'))).toBe('2026-11-12')})
})
