# Modulare — etapas

## Correções críticas — etapa 1
- [x] Plano de migração e impactos aprovado; alterações aditivas aplicadas.
- [x] Agenda: médicos autorizados, conflitos simultâneos e vínculo consistente com atendimento.
- [x] Segurança: TOTP obrigatório, AAL2 e auditoria protegida.
- [ ] Recuperação/reconfiguração de TOTP — aguarda procedimento administrativo de identidade e validação real; não remover fatores automaticamente.
- [x] Prontuário: autosalvamento, avisos de alterações não persistidas, histórico e adendos.
- [x] Consultas paginadas no servidor e conteúdo clínico sob demanda.
- [x] Exportação integral por paciente com originais e auditoria.
- [x] Testes fictícios de interface, concorrência e chamadas diretas; relatório em VERIFICATION.md; dados isolados removidos.
- [ ] Backups: evidência da página de backups e restauração isolada — dependem de acesso ao inventário pelo responsável e ambiente separado.

- [x] Acesso privado por convite, perfis, telas de recuperação e saída; clique no e-mail pelo destinatário ainda não verificado.
- [x] Núcleo de pacientes persistentes e agenda com conflitos protegidos no banco.
- [x] Núcleo de atendimento: rascunhos manuais, revisão, versões imutáveis e adendos.
- [x] Núcleo de documentos privados, prévias PDF e originais externos não verificados.
- [x] Núcleo financeiro: títulos, liquidações parciais e estornos.
- [x] Painel, configurações e auditoria inicial.
- [x] Testes com contas fictícias em clínica separada; registros removidos. Evidências e limitações em VERIFICATION.md.
- [ ] Dependências externas: assinatura digital, mensagens, cobrança eletrônica e nota fiscal — aguardam serviços oficiais.
- [ ] Restauração real — aguarda ambiente separado de recuperação e política de backup verificada.
- [ ] Confirmação de convite/recuperação — aguarda conclusão pelo destinatário.