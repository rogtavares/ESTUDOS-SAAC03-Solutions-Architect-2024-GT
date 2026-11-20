# AWS Emulator - a AWS no seu computador (sem conta AWS)

> Lançado em 11/11/2026. Fonte oficial: anúncio da AWS (What's New) e repositório https://github.com/aws/aws-emulator

## O que é

O **AWS Emulator** é um emulador local das APIs da AWS. A AWS CLI, os SDKs e os agentes de programação (ex.: Kiro, Claude Code)
falam com um endpoint HTTPS local, com as mesmas chamadas que usariam na nuvem. O código da aplicação não muda.

- **Sem custo adicional** e **sem conta AWS**: você só paga pelos recursos reais quando faz o deploy na AWS.
- Escrito em **Rust** (leve em CPU e memória) e gerado a partir dos **modelos de API (Smithy)** usados pelos SDKs, então
  requisições e erros têm o mesmo formato da AWS.
- Mantido por **agentes de IA** (Amazon Bedrock AgentCore, AWS CodePipeline e AWS CodeCommit), com um agente de segurança
  independente revisando as mudanças.
- Código-fonte público no GitHub.

## Ao final deste laboratório, você deverá ser capaz de:

- Instalar e iniciar o AWS Emulator
- Apontar a AWS CLI para o endpoint local usando variáveis de ambiente
- Criar um bucket S3 e uma tabela DynamoDB sem usar a sua conta AWS
- Entender as **limitações** (principalmente IAM) e quando **não** usar o emulador

## 1. Instalar

**Linux (Amazon Linux 2023)** - pacote RPM (no Debian/Ubuntu existe pacote `.deb`):

```bash
PKG=https://downloads.aws.com/aws-emulator/packages/aws-emulator/LTS/latest
sudo dnf install -y $PKG/aws-emulator-x86_64.rpm

aws-emulator -v
```

**macOS e Windows** - roda em contêiner **Docker**. Não existe imagem pronta: você constrói a imagem a partir do Dockerfile
resumido na documentação do AWS Emulator.

## 2. Iniciar

```bash
aws-emulator
```

- Serve **HTTPS em 127.0.0.1:9297** (só a sua máquina acessa) e grava o log em linhas JSON.
- A cada início ele gera **credenciais novas**, um arquivo de configuração e um certificado em `~/.aws/emulator/9297/`.
- Os IDs de chave de acesso começam com `EMULATOR` (não se confundem com chaves reais) e ele **rejeita** requisições
  assinadas com qualquer outra chave.
- Usa **uma única conta**: `000000000000`.

## 3. Apontar a CLI para o emulador (em outro terminal)

```bash
export AWS_ENDPOINT_URL=https://127.0.0.1:9297
export AWS_SHARED_CREDENTIALS_FILE=~/.aws/emulator/9297/emulator_credentials
export AWS_CONFIG_FILE=~/.aws/emulator/9297/config
export AWS_EC2_METADATA_DISABLED=true
export AWS_DISABLE_HOST_PREFIX_INJECTION=true
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1

# remove qualquer credencial real que esteja no shell
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_PROFILE
```

Confirmar que o shell fala com o emulador:

```bash
curl --cacert ~/.aws/emulator/9297/ca.pem https://127.0.0.1:9297/__admin/health

aws sts get-caller-identity
```

O `Account` deve ser `000000000000`. Se aparecer a sua conta real, **pare**: o shell ainda está apontando para a AWS.

## 4. Amazon S3

```bash
aws s3 mb s3://local-getting-started
echo "hello from the emulator" > hello.txt
aws s3 cp hello.txt s3://local-getting-started/
aws s3 ls s3://local-getting-started/
```

## 5. Amazon DynamoDB

```bash
aws dynamodb create-table --table-name kiro-demo \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST

aws dynamodb put-item --table-name kiro-demo \
    --item '{"id": {"S": "item-1"}, "msg": {"S": "hello"}}'

aws dynamodb get-item --table-name kiro-demo --key '{"id": {"S": "item-1"}}'
```

## 6. Testar uma operação não suportada

Operações que o emulador ainda não implementa retornam **HTTP 501 (Not Implemented)**, então o teste falha na hora em vez de
dar um falso positivo. Experimente um serviço menos comum e observe o erro.

## Modo embutido (embedded) para testes

Para o **SDK da AWS para Rust**, existe o crate `aws-emulator-embedded` (em `[dev-dependencies]` do `Cargo.toml`). O emulador roda
**dentro do processo de teste**, e cada instância tem estado próprio (buckets, tabelas e filas não são compartilhados), então os
testes podem rodar em **paralelo**. No modo servidor, alguns SDKs (ex.: Java) precisam confiar no certificado do emulador.

## Limitações (pontos de atenção)

| Limitação | Por que importa |
|---|---|
| **Não avalia políticas IAM** nem políticas de recurso como a AWS | Um acesso negado na AWS pode **funcionar** no emulador. **Não use para testar segurança.** |
| Uma conta por emulador, **sem entre contas nem entre regiões** | Não serve para testar Organizations, replicação entre regiões etc. |
| Fidelidade varia por serviço | A AWS publica "k de n" testes de fidelidade aprovados por serviço (repositório `aws-emulator-evaluation-suite`) |
| Envia dados anônimos de uso e erro por padrão | Pode ser desativado |
| Requer assinatura SigV4 em cada requisição | Igual à AWS |

## Ligação com o SAA-C03

- **Custo:** testar localmente evita pagar recursos durante o desenvolvimento (mas o emulador não substitui o teste final na AWS).
- **Seguro:** responsabilidade compartilhada. Como o IAM não é avaliado, valide permissões e configurações de segurança **na AWS**.
- **Resiliente / Alto desempenho:** o emulador não representa Multi-AZ, latência nem limites de serviço reais.

## Limpeza

```bash
aws s3 rm s3://local-getting-started --recursive
aws s3 rb s3://local-getting-started
aws dynamodb delete-table --table-name kiro-demo
```

Para encerrar, pare o processo `aws-emulator` (Ctrl+C). Como o estado fica **em memória**, tudo some ao parar.

## Referências

- Anúncio: https://aws.amazon.com/about-aws/whats-new/2026/11/aws-emulator-now-available/
- Repositório: https://github.com/aws/aws-emulator
- Testes de fidelidade: repositório `aws-emulator-evaluation-suite` no GitHub
