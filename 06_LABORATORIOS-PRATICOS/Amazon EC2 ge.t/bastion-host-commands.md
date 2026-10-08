# Bastion host (jump box) - acesso a instância em sub-rede privada

## 1. Criar um par de chaves

No **AWS CloudShell**:

```bash
aws ec2 create-key-pair --key-name CloudShellKeyPair --query 'KeyMaterial' --output text > CloudShellKeyPair.pem
chmod 400 CloudShellKeyPair.pem
```

## 2. Iniciar uma instância na sub-rede pública (bastion) e outra na sub-rede privada

Troque o ID da AMI, do grupo de segurança e da sub-rede. Em `--key-name` use o **nome** do par (sem `.pem`).

```bash
AMI=$(aws ssm get-parameter --name /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 --query Parameter.Value --output text)

# Bastion - sub-rede pública
aws ec2 run-instances --image-id "$AMI" --count 1 --instance-type t3.micro \
  --key-name CloudShellKeyPair --security-group-ids sg-xxxxxxxxxxxx --subnet-id subnet-PUBLICA \
  --associate-public-ip-address

# Instância privada - sub-rede privada
aws ec2 run-instances --image-id "$AMI" --count 1 --instance-type t3.micro \
  --key-name CloudShellKeyPair --security-group-ids sg-yyyyyyyyyyyy --subnet-id subnet-PRIVADA
```

Grupos de segurança:
- **Bastion**: entrada TCP 22 somente do seu IP.
- **Privada**: entrada TCP 22 somente do **SG do bastion** (referência por SG, não por CIDR).

## 3. Conectar

```bash
# Carrega a chave no agente SSH para poder repassá-la (-A = agent forwarding)
eval "$(ssh-agent -s)" && ssh-add CloudShellKeyPair.pem

# Bastion (IP público)
ssh -A ec2-user@<bastion-public-ip>

# A partir do bastion, a instância privada (IP privado)
ssh ec2-user@<instance-private-ip>
```

Alternativa sem agent forwarding: `ssh -J ec2-user@<bastion-public-ip> ec2-user@<instance-private-ip>`

## Dica de prova - alternativas modernas ao bastion

| Opção | Precisa de porta 22 / IP público? | Quando escolher |
|---|---|---|
| **Bastion host** | Sim (no bastion) | Cenários legados / exigência explícita de SSH |
| **AWS Systems Manager Session Manager** | Não | "Sem abrir portas de entrada", auditoria em CloudTrail/S3 |
| **EC2 Instance Connect Endpoint** | Não | SSH/RDP a instâncias privadas sem bastion nem IP público |

## Limpeza e custos

**Ao executar os laboratórios em sua própria conta da AWS, você é responsável pelos custos dos recursos criados.**
Encerre as duas instâncias e apague o par de chaves (`aws ec2 delete-key-pair --key-name CloudShellKeyPair`).
