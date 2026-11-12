# Modulare — entrega inicial e verificação

## Correções críticas — 12/11/2026 (substitui as limitações iniciais abaixo quando indicado)
- Plano aprovado; migrações aditivas preservam registros existentes. Médicos autorizados selecionáveis pela recepção; validação no banco, vínculo único consulta/atendimento e sincronização dos estados.
- TOTP e AAL2 exigidos no painel, funções privadas e acesso por papel no banco/arquivos. Leitura de conteúdo por operações auditadas; leitura direta de colunas clínicas bloqueada inclusive para médico.
- Autosalvamento serializado após 900 ms, estado visível, conflito de versão, aviso ao fechar/navegar, texto não persistido apenas em memória. Finalizados imutáveis; adendos separados; finalização não é assinatura.
- Consultas específicas por tela com páginas de 50 registros e pesquisa de pacientes em páginas de 25; agregações financeiras globais no banco. Conteúdo clínico solicitado somente na abertura e exportação.
- Anexos por atendimento e ZIP integral por paciente com dados, versões, adendos, documentos, anexos e manifesto dos originais; download incompleto interrompe a exportação.

### Resultados da etapa crítica
- 8 testes automatizados passaram (regras financeiras/datas, rota pública, AAL2 e alterações não persistidas).
- 27 verificações de banco/API passaram: AAL1 bloqueado para ambos os papéis; verificação real de TOTP; cadastro administrativo; médico autorizado; exatamente uma reserva simultânea aceita; vínculos/estados; persistência e conflito; recepção bloqueada por leitura auditada e direta; médico sem desvio da auditoria; finalização imutável; arquivo privado; exportação; busca no servidor; eventos sem conteúdo clínico.
- Navegador com contas fictícias: exportação ZIP baixada e conteúdo/originais conferidos; autosalvamento e texto exato após recarga; recepção agenda para médico; AAL1 redirecionado ao segundo fator. Nenhum erro de execução observado. Demonstração sem excesso horizontal em 890×686 e 390×844.
- Falhas encontradas e corrigidas: ambiguidade SQL na exportação; seleção de paciente que se perdia durante atualização; formulário de adendo não atualizado imediatamente após finalização. Os testes principais de tela foram repetidos com sucesso. Algumas tentativas do roteiro falharam por seletores de campos/registro incorretos, ajustados sem alterar regras de acesso.
- Última compilação observada: sem erros. Três clínicas fictícias isoladas, contas e originais criados por este roteiro foram identificados e removidos; nenhum registro da clínica real removido.

### Pendências atuais
- Recuperação e reconfiguração de TOTP dependem de verificação administrativa de identidade: não há remoção automática nem conclusão ponta a ponta validada. Redefinir senha não elimina o segundo fator. Cadastro/desafio estão implementados; a inscrição TOTP foi exercitada pela API, não integralmente pela tela.
- Avisos de saída, erro/conflito na tela, histórico completo sob sucessivos autosalvamentos e volumes elevados ainda precisam de testes ampliados; conflitos e imutabilidade foram testados no banco.
- CSV financeiro existente exporta somente a página carregada; não constitui exportação financeira integral. A exportação clínica por paciente não usa a paginação da tela.
- Assinaturas e integrações oficiais, recebimento/conclusão de convite e recuperação por e-mail, revisão técnica/regulatória permanecem pendentes. Não há declaração de aptidão para uso clínico real.

### Backup e restauração isolada
A documentação do Lovable Cloud informa um snapshot diário da estrutura e dos dados, retenção de até aproximadamente 14 dias e ausência de recuperação para um instante arbitrário. Arquivos de armazenamento não são incluídos em snapshots nem na exportação do banco. O inventário real desta clínica não é acessível pelas ferramentas: frequência efetiva, quantidade e último timestamp UTC permanecem não verificados. O responsável deve conferir **More → Database → Manage → Backups** e informar o snapshot mais recente.

1. Preservar o estado atual por **More → Database → Manage → Settings → Export project data → Export data → Database → Export → Start export**; obter o arquivo pelo link enviado ou por Storage. Limites documentados: banco até 15 GB, arquivo até 5 GB, uma exportação a cada 24 horas; backend deve estar ativo.
2. Baixar os arquivos separadamente em **More → Storage**. A exportação do banco inclui contas e hashes de senha, mas não arquivos, código de funções, segredos ou configurações dos provedores de entrada.
3. Restaurar o export em um projeto separado controlado pelo responsável, reconfigurar provedores/chaves, repor arquivos e apontar uma cópia de teste da aplicação. Remix não é cópia dos dados. A página Backups restaura apenas o mesmo projeto, não um ambiente novo.
4. Testar entrada/TOTP, papéis, contagens, consulta vinculada, versão finalizada e adendos, pagamentos/estornos e recuperação dos originais; comparar exportação por paciente e registrar data UTC, evidências e resultados. Nenhuma restauração isolada foi executada nesta etapa.
5. Não usar **Restore to this backup** em produção para o ensaio: a ação é permanente, perde alterações posteriores ao snapshot, reverte também a estrutura e deixa o banco indisponível por alguns minutos. Exportar antes preserva o estado atual; após uma restauração, validar compatibilidade da aplicação e corrigir diferenças por nova migração.

## Registro histórico da entrega inicial

## Disponível
- Demonstração pública somente com dados fictícios em memória, sem gravação; clínica privada vazia em /painel.
- Entrada com e-mail/senha, convite inicial enviado pelo provedor, página de definição/recuperação de senha, saída com limpeza de cache.
- Médico e recepção em tabela protegida de permissões; nenhuma promoção de papel pelo cliente.
- Cadastro administrativo com identificação estável, pesquisa, filtro ativo/inativo, paginação da lista carregada e aviso de duplicidade. Inativação sem apagar histórico.
- Agenda com filtros dia/7 dias/mês, edição, bloqueios, modalidades, status e histórico administrativo de alterações. Conflitos por intervalos no banco, inclusive virada de dia.
- Atendimento vinculado ou explicitamente criado: texto livre/SOAP, salvamento manual persistente, controle de versão, revisão explícita e finalização imutável, adendos separados. Não existe estado assinado simulado.
- Documentos revisáveis, PDF marcado como rascunho e originais externos privados, com URL temporária de 60 segundos. Assinatura não verificada identificada.
- Títulos a receber/pagar, pagamentos parciais por data, estornos vinculados, cálculos em centavos, caixa por liquidação, filtro por mês e exportação CSV administrativa.
- Configuração editável da clínica, dados profissionais, serviços e política de guarda. Sem preços ou registros profissionais inventados.
- Auditoria de alterações com autoria e horário do banco, metadados sem texto clínico. Registro de acesso pela abertura de ficha, arquivo e exportação de documento.

## Evidências executadas em 12/11/2026
- 6 testes automatizados aprovados: rota inicial, centavos exatos, saldo com pagamentos parciais/estorno, caixa por datas distintas, zeros da base vazia, data America/Sao_Paulo na virada UTC.
- 19 verificações reais de banco/API aprovadas com médico e recepção fictícios em clínica separada: cadastro administrativo, leitura persistente, conflito na virada do dia, proibição de criar/ler conteúdo clínico pela recepção, rascunho/finalização/adendo, bloqueio de sobrescrita/exclusão, papel inalterado após tentativa de promoção, pagamentos/estornos/limites, upload médico, URL temporária médica, acesso a arquivo bloqueado à recepção e pacientes bloqueados a anônimos.
- Navegador: cadastro pela tela e leitura após recarga; consulta vinculada e salvamento de rascunho; reabertura com texto exato; saída e bloqueio de retorno à página privada.
- Desktop 1280×1800 e celular 390×844: página visível, sem excesso horizontal, sem erro de execução observado.
- Dados/contas de teste removidos; pacientes reais não importados. Base real confirmada vazia.
- Última compilação observada sem erros.

## Conta responsável e colaboradores
O convite para o e-mail informado foi aceito pelo serviço de e-mail; isso não confirma recebimento ou clique. O papel médico foi atribuído administrativamente ao ID exato dessa conta, não ao primeiro visitante. Defina a senha pelo convite; nunca compartilhe a senha.

Cadastros públicos e contas anônimas estão bloqueados; confirmação de e-mail permanece ativa e proteção contra senhas vazadas habilitada. Novos colaboradores: More → Users → Add user → Send invitation, usando e-mail individual. O convite não concede acesso à clínica: a associação de papel deve ser feita administrativamente por usuário com controle do projeto. Não existe ainda tela interna de gestão/convite de colaboradores.

## Limitações e pendências — não usar como prontuário oficial ainda
- Recuperação e definição de senha têm telas e chamadas reais, mas clique em e-mail e conclusão ponta a ponta pelo destinatário não foram testados.
- TOTP: inscrição e confirmação implementadas; desafio no login presente. Inscrição, recuperação de segundo fator e exigência de AAL2 em todas as operações ainda não testadas/implementadas integralmente. Não anunciar MFA obrigatório.
- Consulta de registros atualmente limitada a 1000 por entidade; paginação exibida é sobre a lista carregada. Antes de aumentar a base, implementar paginação real de consultas e agregações globais no banco.
- Dia/semana/mês são listas filtradas; ainda não há grade de calendário, disponibilidade recorrente nem múltiplos profissionais selecionáveis.
- Salvamento de rascunho é manual; não há autosalvamento. O conflito mantém o texto atual e impede sobrescrita silenciosa.
- Anexos clínicos por atendimento, modelos de documentos editáveis, prévia antes de salvar, parcelas, cancelamento de título e filtros por categoria ainda não completos.
- Acesso clínico direto pela API é autorizado pelo papel, mas auditoria de todas as leituras diretas não é abrangente. Finalização/adendo são auditados no banco; assinatura real não existe.
- Exportação integral do prontuário com originais ainda não implementada; PDF de documentos e CSV administrativo são fluxos distintos.
- Sem integrações oficiais para assinatura/prescrição regulada, mensagens, Pix/cartão, bancos ou nota fiscal. Sem simular envios, assinaturas ou processamento.
- Backup/restauração: nenhum teste de restauração real executado. É necessário ambiente de restauração separado e evidência de recuperação antes de uso oficial; política de backup do provedor não foi verificada.
- Revisão técnica, profissional e legal, política de guarda, acessos e operação de backup dependem de validação do responsável. Nenhuma certificação ou conformidade foi afirmada.
