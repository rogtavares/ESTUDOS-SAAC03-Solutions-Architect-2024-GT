# Errata e atualizações das referências AWS (revisão out/2026)

Correções para os PDFs desta pasta. Veja também a [errata dos guias do exame](../01_GUIAS-DO-EXAME/ERRATA-ATUALIZACOES-2026.md),
que lista serviços descontinuados e renomeados citados em todo o material.

> Itens marcados com **(verificar)** mudaram recentemente: confirme na documentação oficial.

## 1. Infraestrutura global da AWS (números atuais)

Fonte oficial: [aws.amazon.com/about-aws/global-infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/) — consultada em 09/10/2026.

| Item | Material de 2023 | Texto de fev/2026 | **Atual (out/2026)** |
|---|---|---|---|
| Regiões | 25 | 38 | **39** |
| Zonas de Disponibilidade | 80 | 120 | **124** |
| Regiões anunciadas | — | 3 (Arábia Saudita, Chile, Nuvem Soberana Europeia) | **2 (Arábia Saudita, Chile)** |
| AZs anunciadas | — | 10 | **7** |
| Local Zones | — | — | 46 |
| Wavelength Zones | — | — | 33 |
| Pontos de presença CloudFront | — | — | 750+ |
| Regional Edge Caches | — | — | 15 |

Texto atualizado para usar no material:

> A Nuvem AWS abrange **124 Zonas de Disponibilidade em 39 Regiões geográficas**, com planos anunciados para mais
> **7 Zonas de Disponibilidade e 2 Regiões da AWS, no Reino da Arábia Saudita e no Chile**. (Atualizado em out/2026.)

- A **AWS European Sovereign Cloud** saiu da lista de "anunciadas" porque foi **lançada em janeiro/2026**
  (primeira região em Brandenburg, Alemanha, código `eusc-de-east-1`, partição separada `aws-eusc`).
- **Arábia Saudita:** previsão de lançamento em dez/2026. **Chile:** previsão para o fim de 2026, com 3 AZs.
- Esses números mudam a cada lançamento: **na prova não se cobra a contagem**, e sim os conceitos
  (Região x AZ x Local Zone x Wavelength x Edge Location x Outposts).

## 2. Serviços encerrados ou fechados para novos clientes (referência geral)

O antigo `3_BARSA AWS v4 2023.pdf` (tradução do whitepaper "Visão geral da AWS" de 2023) foi **removido** do
repositório em out/2026 por estar desatualizado; continua disponível no histórico do Git.
Para a lista atual de serviços, use [aws.amazon.com/products](https://aws.amazon.com/products/).

Serviços que aparecem em materiais antigos e **já foram encerrados ou fechados para novos clientes**:

| Serviço | Situação |
|---|---|
| Amazon Honeycode | Encerrado (fev/2024) |
| Amazon WorkLink | Encerrado (abr/2023) |
| Amazon Sumerian | Encerrado (fev/2023) |
| Amazon Lumberyard | Substituído pelo Open 3D Engine (O3DE) |
| AWS DeepLens | Encerrado (jan/2024) |
| AWS DeepComposer | Encerrado (set/2025) |
| Amazon Nimble Studio | Encerrado (jun/2024) |
| Amazon Elastic Inference | Encerrado (abr/2024) |
| AWS RoboMaker | Encerrado (set/2025) |
| AWS CodeStar | Encerrado (jul/2024) |
| Amazon WorkDocs | Encerrado (abr/2025) |
| Amazon Chime (aplicativo) | Encerrado (fev/2026); o Chime SDK continua |
| AWS OpsWorks | Encerrado (mai/2024) |
| Amazon QLDB | Encerrado (jul/2025) |
| AWS Snowmobile / Snowcone | Encerrados (2024) |
| AWS Server Migration Service / CloudEndure | Substituídos pelo **AWS Application Migration Service (MGN)** |
| AWS Cloud9, Amazon CloudSearch, AWS Data Pipeline, Amazon Forecast | Fechados para novos clientes (jul/2024) |
| AWS IoT Analytics | Encerrado (dez/2025) **(verificar)** |
| AWS IoT Events | Encerrado em 2026 **(verificar)** |
| AWS IoT 1-Click | Encerrado (dez/2024) **(verificar)** |
| Amazon Lookout for Vision / for Metrics | Encerrados (out/2025) |
| Amazon Lookout for Equipment | Fim do suporte em out/2026 **(verificar)** |
| Amazon Monitron | Fechado para novos clientes **(verificar)** |
| AWS App Mesh | Fim do suporte em 30/09/2026 → use **Amazon ECS Service Connect** ou **VPC Lattice** |
| AWS Elemental MediaStore | Encerrado (nov/2025) **(verificar)** |
| Amazon Elastic Transcoder | Encerrado (nov/2025) → **AWS Elemental MediaConvert** |
| Amazon Pinpoint | Fim do suporte em out/2026 **(verificar)** → **AWS End User Messaging** |
| AWS Proton, Amazon Fraud Detector | Fechados para novos clientes **(verificar)** |
| AWS Application Cost Profiler | Encerrado **(verificar)** |
| AWS CodeCommit | Foi fechado para novos clientes em 2024 e **voltou a aceitar novos clientes** **(verificar)** |

Nomes desatualizados em materiais antigos: *Kinesis Data Analytics* → **Managed Service for Apache Flink**;
*Kinesis Data Firehose* → **Amazon Data Firehose**; *Elasticsearch* → **OpenSearch**;
*CloudWatch Events* → **EventBridge**; *AWS Single Sign-On* → **IAM Identity Center**;
*Personal Health Dashboard* → **AWS Health Dashboard**; *Amazon Inspector Classic* → **Amazon Inspector** (nova versão).

Serviços novos que valem estudo: **Amazon Bedrock**, **Amazon Q**, **VPC Lattice**, **S3 Express One Zone**,
**EC2 Instance Connect Endpoint**, **Verified Access** e **IAM Identity Center**.

## 3. 4_LINKS TODOS SERVIÇOS-CATEGORIAS AWS

Os links da tabela da seção 2 levam a páginas encerradas ou arquivadas. Remova ou marque esses serviços.
Também estão encerrados: **Amazon Honeycode** e **AWS Panorama** (mai/2026, **verificar**).

## 4. 7.01_Well-Architected Framework

O conteúdo dos 6 pilares está correto. Ajustes:

- Título: "Well **Architectured**" → **Well-Architected**.
- "Podemos iniciar uma revisão baseada nos **5** pilares" → **6** pilares (Sustentabilidade entrou em dez/2021).
- Segurança: "base de identidade de **string**" → base de identidade **forte** (*strong identity foundation*).
- "Controles de **detetive**" → controles **de detecção** (*detective controls*).
- Eficiência de desempenho: "**Bola de neve**" → **AWS Snowball**; o nome do pilar é *Performance Efficiency*.
- Resposta a incidentes: *CloudWatch Events* → **Amazon EventBridge**.
- Proteção de infraestrutura/dados: incluir **GuardDuty**, **Security Hub**, **Macie** e **Secrets Manager**.
- Confiabilidade: incluir **AWS Backup**, **Elastic Disaster Recovery** e **AWS Resilience Hub**.
- Custos: *Reserved Instance Reporting* → incluir **Savings Plans**, **Compute Optimizer** e **Cost Optimization Hub**.
- Sustentabilidade: os princípios de design são 6: entender o impacto; definir metas; **maximizar a utilização**;
  adotar hardware/software mais eficientes; **usar serviços gerenciados**; **reduzir o impacto downstream**.
- Princípio geral "Simule aplicativos pilotos" → **"Melhore por meio de game days"** (*improve through game days*).
- Ferramenta: **AWS Well-Architected Tool** permite também *lenses* (Serverless, SaaS, Financial Services,
  Generative AI etc.).

## 5. 6_RAMP-UP GUIDES (Architect 2024 e Serviços Financeiros)

São de dez/2023. Os cursos citados ainda existem no **AWS Skill Builder**, mas alguns nomes e durações mudaram.
Baixe a versão mais recente em [aws.amazon.com/training/ramp-up-guides](https://aws.amazon.com/training/ramp-up-guides/).
