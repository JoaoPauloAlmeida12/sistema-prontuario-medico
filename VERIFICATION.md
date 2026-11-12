# Modulare — entrega inicial e verificação

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
