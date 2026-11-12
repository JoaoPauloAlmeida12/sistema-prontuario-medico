# Etapa 1 — Correções críticas da Modulare

## Objetivo e preservação
Corrigir agenda, acesso e prontuário sem recriar o projeto, apagar ou substituir registros. Manter a identidade visual e as funções existentes, dividindo a implementação em passos verificáveis. Nenhuma assinatura, integração ou conformidade será simulada.

## Diagnóstico inicial
- O profissional do agendamento é hoje preenchido com a conta que está operando; falta seleção de médicos autorizados.
- O banco já bloqueia sobreposição de horários por profissional e preserva versões anteriores nas alterações de atendimentos. Manter essas proteções e testar concorrência real.
- Existe TOTP opcional e desafio no login, mas falta exigência nas operações e no acesso privado.
- O carregamento inicial traz conteúdo clínico e até 1.000 registros por entidade; a paginação atual ocorre na lista já carregada.
- O salvamento é manual; faltam autosalvamento, proteção ao sair e exportação integral.
- A verificação inicial de dados encontrou **zero** agendamentos com profissional não autorizado, vínculos duplicados, pacientes divergentes ou estados divergentes entre consulta e atendimento. Repetir essas verificações antes de aplicar restrições.

## Etapas de implementação

### 1. Agenda e integridade
- Seleção obrigatória de médico autorizado da mesma clínica, inclusive quando a recepção agenda ou bloqueia horários.
- Validação no banco da atribuição do profissional, preservando a restrição de sobreposição existente.
- Vinculação transacional entre consulta e atendimento: criar ou continuar um único atendimento por consulta; validar paciente e profissional; iniciar como “em atendimento” e finalizar como “realizado”. Impedir mudanças administrativas incompatíveis com um atendimento existente.
- Testar médico e recepção tentando reservar simultaneamente o mesmo intervalo: somente uma gravação poderá ser aceita.

### 2. Segundo fator e acesso
- Cadastro e confirmação de TOTP antes de liberar a clínica privada; exigir AAL2 nas operações protegidas e nas políticas de acesso aos registros e arquivos.
- A página de cadastro/desafio do segundo fator continua acessível sem AAL2 para evitar bloqueio circular. Não retorna conteúdo clínico.
- Reconfiguração com segundo fator atual verificado e novo fator confirmado antes da retirada do anterior. Recuperação por perda de dispositivo fica condicionada à verificação administrativa de identidade; recuperação de senha não remove nem contorna o segundo fator.
- Manter recepção sem acesso a texto clínico, documentos, versões, adendos e arquivos, mesmo por chamadas diretas.
- Centralizar leituras clínicas autorizadas em operações auditadas; impedir caminhos alternativos de leitura sem auditoria. Auditoria conterá somente autoria, identificadores, ação e horário, nunca texto clínico.

### 3. Prontuário seguro
- Extrair editor e controles relacionados em componentes menores sem alterar a aparência.
- Autosalvamento com estados “salvando”, “salvo”, “erro” e “conflito”; serializar gravações e usar versão esperada para impedir sobrescrita concorrente.
- Preservar o texto em memória em caso de falha, sem armazenamento clínico no navegador. Avisar ao fechar, trocar de página ou fechar o atendimento com alterações pendentes.
- Mostrar histórico com autoria, data, hora e versão. Manter finalizados imutáveis e correções por adendos.
- Finalização continua explicitamente distinta de assinatura digital verificável.

### 4. Consultas e exportação
- Substituir o carregamento global por consultas específicas por tela, com paginação, pesquisa e filtros no servidor; indicadores calculados no banco, não sobre páginas parciais.
- Buscar conteúdo clínico somente ao abrir um atendimento, histórico ou documento autorizado.
- Exportar por paciente um pacote com cadastro, consultas, atendimentos, versões, adendos, documentos e arquivos originais/anexos associados, com manifesto e auditoria. Falha ou ausência de arquivo impede declarar a exportação completa.
- Incluir suporte a anexos associados a paciente/atendimento, mantendo os originais atuais e seu vínculo documental.

### 5. Continuidade e relatório
- Documentar a política publicada: backup diário do banco, até aproximadamente 14 dias, sem arquivos de armazenamento e sem recuperação para horário arbitrário.
- A existência e os horários dos backups deste projeto precisam ser confirmados na página **More → Database → Manage → Backups** pelo responsável; não há ferramenta para consultar esse inventário.
- Preparar roteiro de exportação do banco e restauração em projeto separado, reconfiguração de acesso, recuperação separada dos arquivos e testes de leitura/integridade. Não restaurar a produção.
- Executar somente testes com contas e paciente fictícios em clínica de teste, sem excluir ou substituir registros existentes. Reportar testes aprovados, falhos, não executados e recursos pendentes.

## Plano de migração e impacto nos dados existentes
- Usar migrações pequenas, aditivas e identificadas: funções de validação, índices, operações auditadas, políticas mais restritas e estrutura de anexos quando necessária.
- Não remover tabelas, colunas, consultas, documentos, versões ou arquivos. Não reatribuir profissionais ou corrigir registros históricos silenciosamente.
- Se a nova inspeção encontrar vínculos incompatíveis, interromper a restrição correspondente e apresentar os casos por metadados antes de qualquer correção.
- **Impacto de acesso:** sessões atuais sem segundo fator serão bloqueadas para operações privadas e encaminhadas à confirmação/cadastro. Nenhum registro será perdido.
- **Impacto de integração:** leituras clínicas diretas anteriormente permitidas ao médico serão substituídas por operações autorizadas e auditadas; atualizar todos os caminhos da interface na mesma etapa.
- **Impacto de agenda:** novos agendamentos com recepcionista como profissional serão recusados; finalização e estados vinculados terão validação transacional.
- Políticas permanecerão restritivas durante todos os testes. Não criar exceção de acesso para contas de teste.

## Detalhes técnicos
- Manter TanStack Start e Lovable Cloud; chamadas privadas com autenticação e validação de AAL2 no servidor, além de RLS e políticas de arquivos.
- Preservar restrição de exclusão por intervalo; adicionar validações de papel/profissional e unicidade de atendimento vinculado após a inspeção dos dados.
- Para leitura auditada, usar funções de banco com autorização explícita, projeções específicas e acesso concedido somente a usuários autenticados; retirar o caminho de leitura clínica não auditada sem quebrar validações internas.
- Consultas paginadas com ordenação estável e contagens/agregações autorizadas. Exportação deve percorrer todas as páginas, sem limite silencioso de 1.000 registros.
- Testes de segurança usarão sessões AAL1/AAL2 reais com médico e recepção fictícios; testes de interface também confirmarão persistência após recarregamento.

## Critérios de aceitação
1. Recepção agenda para médico autorizado e não para si própria.
2. Reservas simultâneas conflitantes: uma aceita, outra recusada pelo banco.
3. Recepção não lê prontuário nem arquivos por interface ou API.
4. Sessão sem segundo fator obrigatório não acessa operações privadas.
5. Rascunho salvo automaticamente reaparece após recarga; conflito não sobrescreve texto.
6. Finalizado não aceita alteração indevida; adendo preserva original e autoria.
7. Exportação de paciente fictício inclui todas as versões e arquivos associados.
8. Nenhum resultado de backup/restauração será declarado aprovado sem evidência de teste concluído.

## Dependências externas e limites
O inventário real de backups e a restauração isolada aguardam informação do responsável e ambiente de destino. Integrações oficiais e verificação técnica/regulatória continuam fora desta correção. A entrega não será declarada apta para uso clínico real.