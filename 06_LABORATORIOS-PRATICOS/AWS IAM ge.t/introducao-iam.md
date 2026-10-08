# Introdução ao AWS Identity and Access Management (IAM)

Região AWS: **Global**

## O que é IAM?

- Serviço que controla **quem** está autenticado (*authentication*) e **o que** pode fazer (*authorization*) na AWS.
- Permite criar usuários, grupos, funções (*roles*) e políticas sem compartilhar as credenciais da conta.
- A primeira identidade é o **usuário root**: acesso total; proteja com MFA e não use no dia a dia.
- Elementos principais: usuários, grupos, funções, políticas e provedores de identidade.
- **Roles** não têm credenciais de longo prazo: quem as assume recebe credenciais temporárias do **AWS STS**.
- Pode ser usado pelo Console, AWS CLI e SDKs.
- Para pessoas, a AWS recomenda **IAM Identity Center** (SSO) em vez de usuários IAM com chaves de acesso.

## Detalhes da tarefa

1. Faça login no Console de gerenciamento da AWS.
2. Crie usuários IAM.
3. Crie grupos IAM e adicione os usuários.
4. Anexe políticas aos grupos (princípio do menor privilégio).
5. Validação do laboratório.

## Dica de prova

- Avaliação de políticas: **Deny explícito** > Allow explícito > Deny implícito (padrão).
- Acesso entre contas → **role** com *trust policy* para a outra conta (`sts:AssumeRole`).
- Aplicação no EC2/Lambda → **role** (nunca chaves de acesso no código).
- Limite máximo de permissões: **permissions boundary** (por identidade) ou **SCP** (por conta/OU no Organizations).
