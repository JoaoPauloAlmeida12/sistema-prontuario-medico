import {describe,it,expect} from 'vitest'
import {requireAal2,changedDraft} from '@/lib/clinic-security'
describe('Proteções críticas',()=>{
 it('blocks the protected operation without a second factor',()=>{expect(()=>requireAal2('aal1')).toThrow();expect(()=>requireAal2(undefined)).toThrow();expect(()=>requireAal2('aal2')).not.toThrow()})
 it('detects unpersisted clinical changes and clears only after persistence',()=>{expect(changedDraft({Subjetivo:'novo'},{Subjetivo:'anterior'})).toBe(true);expect(changedDraft({Subjetivo:'novo'},{Subjetivo:'novo'})).toBe(false)})
})