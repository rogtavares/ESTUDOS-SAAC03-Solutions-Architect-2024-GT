# Métricas personalizadas no Amazon CloudWatch (uso de memória)

> O EC2 **não** envia uso de memória ao CloudWatch por padrão (só CPU, rede, disco e status).
> Para memória/disco do SO é preciso uma **métrica personalizada**: via `put-metric-data`
> (este lab) ou, na prática recomendada, via **CloudWatch Agent**. Tema frequente na prova.

Os comandos abaixo podem ser executados no **AWS CloudShell** (região `us-east-1`).

## 1. Criar política, função IAM e perfil de instância

```bash
# 1. Política que permite publicar métricas
aws iam create-policy --policy-name "CloudWatch-Put-Metric-Data" \
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["cloudwatch:PutMetricData"],"Resource":"*"}]}'

# 2. Função IAM que pode ser assumida pelo EC2
aws iam create-role --role-name "CloudWatch-Role" \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

# 3. Anexar a política à função (troque <ACCOUNT_ID>)
aws iam attach-role-policy --role-name "CloudWatch-Role" \
  --policy-arn "arn:aws:iam::<ACCOUNT_ID>:policy/CloudWatch-Put-Metric-Data"

# 4. Perfil de instância + função
aws iam create-instance-profile --instance-profile-name "CloudWatch-Instance-Profile"
aws iam add-role-to-instance-profile --instance-profile-name "CloudWatch-Instance-Profile" --role-name "CloudWatch-Role"
```

## 2. Iniciar uma instância EC2

```bash
# 1. Grupo de segurança
aws ec2 create-security-group --group-name CustomMetricLab --description "SG temporario para o lab de metricas personalizadas"

# 2. Liberar SSH (em produção, restrinja ao seu IP ou use Session Manager / EC2 Instance Connect)
aws ec2 authorize-security-group-ingress --group-name CustomMetricLab --protocol tcp --port 22 --cidr 0.0.0.0/0

# 3. AMI mais recente do Amazon Linux 2023 (via SSM Parameter Store - evita AMI fixa/desatualizada)
AMI=$(aws ssm get-parameter --name /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 --query Parameter.Value --output text)

# 4. Lançar em us-east-1a (troque <SG_ID>)
aws ec2 run-instances --image-id "$AMI" --instance-type t3.micro \
  --placement AvailabilityZone=us-east-1a --security-group-ids <SG_ID> \
  --iam-instance-profile Name="CloudWatch-Instance-Profile"
```

## 3. Comandos executados **dentro** da instância EC2

### Instalar o stress-ng (Amazon Linux 2023)

```bash
sudo dnf install -y stress-ng
```

### Script que publica a métrica com `put-metric-data`

Crie `/home/ec2-user/mem-usage.sh`:

```bash
#!/bin/bash
# IMDSv2 (obrigatório por padrão no Amazon Linux 2023)
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
INSTANCE_ID=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
MEM_USED=$(free | awk '/Mem/{printf("%d", ($2-$7)/$2*100)}')

aws cloudwatch put-metric-data --region us-east-1 \
  --namespace "Custom/Memory" --metric-name "MemUsage" \
  --value "$MEM_USED" --unit "Percent" \
  --dimensions "InstanceId=$INSTANCE_ID"
```

```bash
chmod +x /home/ec2-user/mem-usage.sh

# Agendar a cada minuto (AL2023 não traz cron por padrão)
sudo dnf install -y cronie && sudo systemctl enable --now crond
crontab -e
# adicione a linha:
* * * * * /home/ec2-user/mem-usage.sh
# salve no vi com  :wq
```

### Gerar carga de memória

```bash
stress-ng --vm 15 --vm-bytes 80% --vm-method all --verify -t 60m -v
```

## 4. Criar alarme no CloudWatch

No console: **CloudWatch → Alarms → Create alarm → Custom/Memory → MemUsage**,
condição por exemplo `> 70%` por 1 período de 1 minuto, com ação de notificação via SNS.

## Dica de prova

| Precisa de... | Solução |
|---|---|
| Memória / espaço em disco do SO | **CloudWatch Agent** (métrica personalizada) |
| Logs da aplicação no EC2 | **CloudWatch Agent** → CloudWatch Logs |
| Métricas de alta resolução (< 1 min) | `put-metric-data` com `--storage-resolution 1` |

## Limpeza e custos

**Ao executar os laboratórios em sua própria conta da AWS, você é responsável pelos custos dos recursos criados.**
Encerre a instância, apague o alarme, o grupo de segurança, o perfil de instância, a função e a política.

GE TAVARES
