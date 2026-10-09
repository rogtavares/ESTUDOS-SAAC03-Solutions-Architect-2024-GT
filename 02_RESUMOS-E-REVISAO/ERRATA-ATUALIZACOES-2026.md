# Errata e atualizações dos resumos (revisão out/2026)

Correções para os resumos autorais desta pasta. Para serviços descontinuados e renomeados em geral, veja a
[errata dos guias](../01_GUIAS-DO-EXAME/ERRATA-ATUALIZACOES-2026.md) e a
[errata das referências](../03_REFERENCIAS-AWS/ERRATA-ATUALIZACOES-2026.md).

> Os resumos de terceiros (Neal Davis / Digital Cloud Training "Exam Cram" e Whizlabs "Whizcards") foram
> **removidos** em out/2026: estavam desatualizados e são material protegido por direitos autorais, que não deve
> ser redistribuído em repositório público. Use as versões atuais diretamente nas fontes:
> [digitalcloud.training](https://digitalcloud.training) e [whizlabs.com](https://www.whizlabs.com).

## 0.0_PALAVRAS-CHAVE SAA-C03 - DICAS RÁPIDAS

| No PDF | Correção |
|---|---|
| Finalidade da auditoria → **AWS KMS** | Auditoria de chamadas de API → **AWS CloudTrail**. (O KMS registra o *uso das chaves* no CloudTrail; "chave com trilha de auditoria" → KMS.) |
| Gerencie dados detalhados → **AWS Data Lake** | Não existe serviço "AWS Data Lake": use **AWS Lake Formation** (governança do data lake no S3). |
| **Prefira o Global Accelerator ao CloudFront** | Regra errada. **CloudFront** → HTTP/HTTPS, conteúdo em cache. **Global Accelerator** → TCP/UDP não HTTP, **IPs estáticos (anycast)**, failover regional rápido. |
| Elegível para HIPAA/PCI → **ElastiCache** | Muitos serviços são elegíveis. O que a prova associa: **ElastiCache (Redis/Valkey) com criptografia + AUTH** para dados sensíveis em cache. |
| Minimize a latência de inicialização → **Instantâneos** | Depende do serviço: Lambda → **SnapStart / Provisioned Concurrency**; EC2 → **Golden AMI, Warm Pools, Hibernação**; EBS → **Fast Snapshot Restore**. |
| Dados hierárquicos → **DynamoDB** | Relacionamentos complexos / grafos → **Amazon Neptune**. DynamoDB modela hierarquias simples via *sort key*. |
| Servidor na memória → **R5 EC2** | Família **R** (gerações atuais R7i/R8g); muita memória (SAP HANA) → família **X** / *High Memory*. |
| Armazenamento de longo prazo → **Glacier/Deep Glacier** | Classes do S3: **Glacier Instant Retrieval**, **Glacier Flexible Retrieval**, **Glacier Deep Archive** (mais barato, recuperação em até 12–48 h). |
| AES-256 → **SSE-S3** | Correto. Desde jan/2023 o S3 **criptografa todos os objetos novos por padrão** com SSE-S3. |
| Acesse arquivos simultaneamente → **EFS/S3** | Linux → **EFS**; Windows/SMB → **FSx for Windows File Server**; HPC → **FSx for Lustre**. |
| Tolerante a falhas → "concorra com a réplica de leitura..." | Tradução quebrada. Leia: **Multi-AZ** para alta disponibilidade; **réplica de leitura** pode ser **promovida** em caso de desastre (inclusive em outra região). |
| Quase em tempo real → **família Kinesis** | Correto. Nomes atuais: **Kinesis Data Streams**, **Amazon Data Firehose**, **Managed Service for Apache Flink**. |
| Banco de dados para IoT → **DynamoDB** | Correto; para séries temporais → **Amazon Timestream** (verificar disponibilidade para novos clientes). |

**WAF x Shield x GuardDuty x Inspector x Trusted Advisor** (as descrições do PDF estão imprecisas):

| Serviço | O que faz de verdade |
|---|---|
| AWS WAF | Firewall de camada 7 (SQLi, XSS, bots, rate limit) em CloudFront, ALB, API Gateway, AppSync, Cognito. |
| AWS Shield | Proteção DDoS (Standard grátis; Advanced com SRT e proteção de custos). |
| Amazon GuardDuty | **Detecção de ameaças** (não de vulnerabilidades) a partir de CloudTrail, VPC Flow Logs e DNS logs, além de proteção para S3, EKS, RDS, Lambda, malware e runtime. |
| Amazon Inspector | **Varredura de vulnerabilidades (CVEs)** e exposição de rede em **EC2, imagens ECR e Lambda**, não "verificações OWASP". |
| AWS Trusted Advisor | Verificações de boas práticas: **custo, desempenho, segurança, tolerância a falhas, limites de serviço e excelência operacional**. |
| Amazon Macie | Descobre **dados sensíveis (PII)** no **S3**. |

Outros ajustes: "Reknogition" → **Rekognition**; "in28minutos" → **in28minutes**; o link da *towardsaws* é do
**SAA-C02** (exame antigo); "Kinesis Firehose" → **Amazon Data Firehose**; ElastiCache agora suporta **Valkey**
(além de Redis OSS e Memcached); traduções de nomes: "Consultor confiável" → **Trusted Advisor**,
"Configuração AWS" → **AWS Config**, "Gateway de API" → **API Gateway**.

## 11_MP2 GE SAA-C03

Serviços que precisam ser removidos ou marcados:

| Item no PDF | Situação |
|---|---|
| 5.7 Amazon QLDB | **Encerrado** (jul/2025) |
| 6.3 Amazon Pinpoint | Fim do suporte em out/2026 **(verificar)** → AWS End User Messaging |
| 6.4 Amazon Elastic Transcoder | **Encerrado** (nov/2025) → AWS Elemental MediaConvert |
| 7.2 Amazon Forecast | Fechado para novos clientes (jul/2024) → SageMaker Canvas |
| 7.3 Amazon Fraud Detector | Fechado para novos clientes **(verificar)** |
| 8.18 AWS Personal Health Dashboard | Renomeado para **AWS Health Dashboard** |
| 8.19 AWS Proton | Fechado para novos clientes **(verificar)** |
| 4.8 AWS para VMware | VMware Cloud on AWS não é mais revendido pela AWS; veja **Amazon Elastic VMware Service (EVS)** **(verificar)** |
| 13 Cloud9 | Fechado para novos clientes (jul/2024) |
| 13 CodeStar | **Encerrado** (jul/2024) |
| 13 CodeCommit | Fechado em 2024 e voltou a aceitar novos clientes **(verificar)** |
| 5.9 Amazon Timestream | Timestream for LiveAnalytics: verificar disponibilidade; **Timestream for InfluxDB** segue ativo |

Correções de conteúdo:

- **AWS SAM pipeline:** os comandos `sam pipeline build` e `sam pipeline deploy` **não existem**. O correto é
  `sam pipeline bootstrap` (cria recursos por estágio) → `sam pipeline init` (gera a configuração do pipeline),
  e depois `sam build` / `sam deploy` (ou o próprio CodePipeline gerado executa).
- **5.4 ElastiCache:** compatível com **Valkey, Redis OSS e Memcached** (não só Redis); há a opção **ElastiCache Serverless**.
- **12.3 S3 SRR/CRR:** a replicação copia apenas objetos **novos**; para os existentes use **S3 Batch Replication**.
- **3.5 AWS Billing Conductor:** serve para **faturamento personalizado / showback e chargeback** (revendedores e
  grupos internos), não "provedores de software".
- **11.19** "SSOO Centro de Identidade" → **AWS IAM Identity Center** (antigo AWS SSO).
- **1.4** "Haddop" → **Hadoop**.
- Numeração: há dois itens **4.0** e dois **4.1** (AWS Batch e Contêineres); renumere.

Faltam na seção **7.0 Machine Learning**: **Amazon Bedrock** (modelos de IA generativa via API),
**Amazon Q** (assistente de IA) e **SageMaker AI**. Faltam em **4.1 Contêineres**: **Amazon ECS** e **App Runner**.
