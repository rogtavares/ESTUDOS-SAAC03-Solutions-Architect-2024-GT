# LABORATÓRIOS PRÁTICOS (LAB GE.T Hands-On)

Os estudos com metodologia **"Hands-On"** ("mão na massa" ou "aprender fazendo").

Os laboratórios práticos do AWS Certified Solutions Architect – Associate são a melhor maneira de obter uma base
sólida e se aprofundar na infraestrutura: ajudam a distinguir a teoria dos cenários do mundo real.

## Índice

| Serviço | Laboratório | Domínio SAA-C03 |
|---|---|---|
| Amazon EC2 | [Bastion host](Amazon%20EC2%20ge.t/bastion-host-commands.md) | Seguro |
| Amazon EC2 | [User data e metadados (IMDSv2)](Amazon%20EC2%20ge.t/user-data-metadata.md) | Seguro / Resiliente |
| VPC | [NAT Gateway x NAT Instance](AWS%20Gateways%20NAT%20ge.t/nat-gateway-vs-nat-instance.md) | Resiliente / Custo |
| AWS IAM | [Introdução ao IAM](AWS%20IAM%20ge.t/introducao-iam.md) | Seguro |
| AWS KMS | [Criptografar e descriptografar dados](AWS%20KMS%20ge.t/encrypt-decrypt-data.md) | Seguro |
| AWS Organizations | [SCP: negar acesso a uma role](Organizations%20ge.t/DenyAccessToASpecificRole.json) · [Switch Roles](Organizations%20ge.t/Switch%20Roles.txt) | Seguro |
| Amazon CloudWatch | [Métricas personalizadas](Amazon%20CloudWatch%20ge.t/custom-cloudwatch-metrics.md) | Alto desempenho |
| AWS CloudTrail | [Lambda para evento StopInstances](CloudTrail%20ge.t/LogEC2StopInstance.mjs) | Seguro |
| Amazon CloudFront | [Cache e behaviors com várias origens](AWS%20CloudFront%20ge.t/cloudfront-cache-and-behavior.md) | Alto desempenho |
| Amazon API Gateway | [API + Lambda + frontend S3](API-Gateway%20ge.t/Deploy%20Instructions.md) | Resiliente |
| Amazon Athena | [Consultar logs do ALB](Athena%20ge.t/Querying%20Application%20Load%20Balancer%20Logs.md) | Custo / Desempenho |

> `amazon-bedrock-workshop/` é um clone local do workshop oficial da AWS e **não** é versionado neste repositório
> (veja `.gitignore`). Original: https://github.com/aws-samples/amazon-bedrock-workshop

## Antes de começar

- Use o **nível gratuito (Free Tier)** e configure um **AWS Budget** com alerta para evitar surpresas.
- Ao concluir cada laboratório, **apague todos os recursos** criados.
- Prefira o **AWS CloudShell**: já vem com AWS CLI e credenciais.

Recursos em português:
- Tutoriais práticos: https://aws.amazon.com/pt/getting-started/hands-on
- Documentação: https://docs.aws.amazon.com/pt_br
