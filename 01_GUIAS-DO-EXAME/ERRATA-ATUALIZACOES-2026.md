# Errata e atualizações dos guias (revisão out/2026)

Os PDFs desta pasta foram escritos entre 2023 e 2024. Desde então a AWS **descontinuou, renomeou ou mudou**
vários serviços e limites. Esta errata lista o que corrigir ao estudar por eles.

> Itens marcados com **(verificar)** mudaram recentemente: confirme na documentação oficial antes da prova.
> Confirme também, na [página oficial do exame](https://aws.amazon.com/certification/certified-solutions-architect-associate/),
> se o código vigente ainda é **SAA-C03** e baixe a versão mais recente do guia.

## 1. Serviços descontinuados ou fechados para novos clientes

| Serviço citado nos PDFs | Situação | Use / estude no lugar |
|---|---|---|
| Amazon QLDB | Fim do suporte em 31/07/2025 | Amazon Aurora PostgreSQL (com auditoria) |
| AWS Snowmobile | Aposentado (2024) | Snowball Edge, DataSync, Direct Connect |
| AWS Snowcone | Descontinuado (nov/2024) | DataSync, Snowball Edge |
| AWS OpsWorks | Fim de vida em 26/05/2024 | Systems Manager, CloudFormation |
| AWS Server Migration Service (SMS) / CloudEndure Migration | Descontinuados | **AWS Application Migration Service (MGN)** |
| EC2-Classic / ClassicLink | Aposentados (2022) | VPC (todas as contas) |
| S3 Select / Glacier Select | Fechados para novos clientes (jul/2024) | Athena, S3 Object Lambda, filtragem no cliente |
| AWS Data Pipeline | Fechado para novos clientes (jul/2024) | AWS Glue, Step Functions, MWAA |
| Amazon Forecast | Fechado para novos clientes (jul/2024) | SageMaker Canvas |
| Amazon Elastic Transcoder | Descontinuado (nov/2025) | AWS Elemental MediaConvert |
| Amazon Pinpoint | Fim do suporte em out/2026 (verificar) | AWS End User Messaging, Amazon Connect |
| Amazon Chime (aplicativo) | Encerrado em fev/2026 (o Chime SDK continua) | Chime SDK |
| Amazon Fraud Detector, AWS Proton | Fechados para novos clientes (verificar) | — |
| Amazon S3 Glacier (serviço de *vaults*) | Fechado para novas contas (verificar) | **Classes de armazenamento Glacier do S3** + S3 Object Lock |

## 2. Serviços renomeados

| Nome antigo (nos PDFs) | Nome atual |
|---|---|
| AWS Single Sign-On (AWS SSO) | **AWS IAM Identity Center** |
| Amazon Elasticsearch Service | **Amazon OpenSearch Service** |
| Amazon CloudWatch Events | **Amazon EventBridge** |
| Kinesis Data Analytics | **Amazon Managed Service for Apache Flink** |
| Kinesis Data Firehose | **Amazon Data Firehose** |
| CloudFront Origin Access Identity (OAI) | **Origin Access Control (OAC)** — OAI é legado |
| ELB *connection draining* | **Deregistration delay** (ALB/NLB) |
| CloudFormation Designer | **AWS Infrastructure Composer** |
| AWS Shield "DRP" | **Shield Response Team (SRT)** |

## 3. Correções por arquivo

### 0.0_ESTUDOS SAA-C03 GE TAVARES v3

- "Pé de Feijão Elástico" → **Elastic Beanstalk** (nome de serviço não se traduz). "Rota 53" → **Route 53**.
- "URLs pré-chamados" → **URLs pré-assinadas** (*pre-signed URLs*).
- "Well Architectured" → **Well-Architected**; "AWS Truster Advisor" → **Trusted Advisor**; "OUTHER" → **OTHER**.
- Kinesis: atualizar nomes (Firehose / Managed Service for Apache Flink).
- Bancos de dados: "ElasticSearch" → **OpenSearch**; incluir **MemoryDB**, **DocumentDB** e **Keyspaces**.
- Remover da lista OpsWorks e Elastic Transcoder (descontinuados) e Snowmobile.

### 0.1_ANALISE DETALHADA DOS TOPICOS

- Seção "CUSTOS" na verdade trata de **computação** (Auto Scaling, HPC, placement groups): renomear.
- "RIs agendadas" (*Scheduled RIs*) **não existem mais**. Estude **Savings Plans** (Compute / EC2 Instance / SageMaker)
  e **On-Demand Capacity Reservations**.
- "PrivateLink x ClassicLink" → ClassicLink foi aposentado; compare **PrivateLink x VPC Peering x Transit Gateway**.
- "Origin Access Identity (OAI)" → **Origin Access Control (OAC)**.
- QLDB saiu da lista de bancos; VMware Cloud on AWS deixou de ser revendido pela AWS (2024).
- Correto e ainda válido: Lambda máx. 15 min; EFS só Linux (para Windows use **FSx for Windows File Server**).

### 0.2_PONTOS MAIS COBRADOS NA PROVA

- **Réplicas de leitura RDS:** até **15** para MySQL, MariaDB e PostgreSQL (não 5). Oracle e SQL Server: até 5. Aurora: até 15.
- **Custo de réplica:** replicação RDS **entre AZs na mesma região é gratuita**; entre regiões é cobrada.
  A dica "colocar réplicas na mesma AZ para economizar" está errada.
- **RDS Multi-AZ:** além do *standby* tradicional (não legível), existe o **Multi-AZ DB cluster**
  (2 *standbys* **legíveis**, failover mais rápido).
- Armazenamento RDS: "GP2 ou IO" → **gp3, io1/io2**.
- **Instâncias reservadas agendadas** e **Spot Block (1 a 6 h)** foram **descontinuados**: remover.
- **Dedicated Hosts** **não** exigem reserva de 3 anos: há sob demanda ou reserva de 1 ou 3 anos.
- **Spot:** a interrupção hoje ocorre principalmente por **capacidade** (aviso de 2 min); não se faz mais "lance" de preço.
  Estratégia de alocação recomendada: **price-capacity-optimized** (as citadas: lowestPrice, diversified, capacityOptimized).
- **Elastic IP / IPv4 público:** desde fev/2024 **todo IPv4 público é cobrado** (em uso ou não). Isso cai em questões de custo.
- **Free Tier:** mudou em 15/07/2025 (modelo de créditos para contas novas); "t2.micro é gratuito" vale só para contas antigas.
- **AMI criptografada pode ser copiada** (inclusive entre contas), desde que haja permissão na chave KMS; a afirmação
  "uma AMI criptografada não pode ser copiada" está incorreta.
- **Hibernação:** a lista de famílias (C3–C5, M3–M5, R3–R5) está desatualizada: hoje inclui gerações atuais (C6/C7, M6/M7,
  R6/R7, T3 etc.). SOs: Amazon Linux 2/**AL2023**, Windows, Ubuntu, RHEL. Limite de 60 dias **(verificar)**.
- **Placement group cluster:** largura de banda acima de 10 Gbps (depende da instância/ENA). Os demais limites
  (*spread*: 7 instâncias por AZ; *partition*: 7 partições por AZ) continuam corretos.
- Traduções: "grupos de canais / veiculações" → **grupos de posicionamento** (*placement groups*);
  "Acesso aos portos" → **portas**; "Oráculo / Servidor SQL" → **Oracle / SQL Server**.
- **Modos de compra:** além de On-Demand, Reserved, Spot e Dedicated → **Savings Plans** e **Capacity Reservations**.
- **WAF:** também protege **AppSync, Cognito User Pools, App Runner e Verified Access** (além de ALB, API Gateway, CloudFront).

### 1_GUIA (PORTUGUÊS) e 2_GUIA (INGLÊS)

São traduções do **guia oficial da AWS**. O PT é a versão mais antiga (cita AWS SSO, Server Migration Service,
CloudEndure); o EN já cita IAM Identity Center. Nos dois, o apêndice de "serviços no escopo" ainda lista serviços da
seção 1 desta errata (QLDB, Data Pipeline, Forecast, Elastic Transcoder, Pinpoint...).
→ **Baixe o guia oficial mais recente** na página do exame e substitua os dois PDFs.

### 3.1_ARQUITETANDO AWS SAA-C03 v2

Coletânea de links de artigos. Atualize as referências a: Elasticsearch, CloudWatch Events, Server Migration Service,
Kinesis Data Analytics e S3 Select (ver seções 1 e 2). Os links antigos podem redirecionar ou estar arquivados.

## 4. Temas novos que valem estudo

- **IMDSv2** obrigatório por padrão em novos lançamentos/AMIs (Amazon Linux 2023).
- **Amazon Linux 2** chegou ao fim do suporte (30/06/2026): use **Amazon Linux 2023**.
- **EC2 Instance Connect Endpoint** e **Session Manager** como alternativas ao bastion host.
- **S3 Express One Zone** (baixa latência, uma AZ) e **Mountpoint for Amazon S3**.
- **VPC Lattice** (conectividade serviço a serviço entre VPCs/contas).
- **Amazon Bedrock** e serviços de IA generativa (aparecem como "serviço gerenciado com caso de uso").
