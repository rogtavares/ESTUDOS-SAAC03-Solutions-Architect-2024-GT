# User data e metadados da instância (IMDS)

## User data: index.html com a zona de disponibilidade da instância

Executado **uma vez**, como root, na primeira inicialização (Amazon Linux 2023):

```bash
#!/bin/bash
dnf update -y
dnf install -y httpd
systemctl enable --now httpd
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
EC2AZ=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/placement/availability-zone)
echo "<center><h1>This Amazon EC2 instance is located in Availability Zone: $EC2AZ</h1></center>" > /var/www/html/index.html
```

## Consultar metadados da instância (IMDSv2)

O Amazon Linux 2023 e as novas contas usam **IMDSv2 obrigatório**: sem token, `curl` retorna `401`.

```bash
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
H="X-aws-ec2-metadata-token: $TOKEN"

curl -H "$H" http://169.254.169.254/latest/meta-data/
curl -H "$H" http://169.254.169.254/latest/meta-data/public-ipv4
curl -H "$H" http://169.254.169.254/latest/meta-data/placement/availability-zone
curl -H "$H" http://169.254.169.254/latest/meta-data/network/interfaces/macs/
curl -H "$H" http://169.254.169.254/latest/meta-data/ami-id
curl -H "$H" http://169.254.169.254/latest/meta-data/iam/security-credentials/
curl -H "$H" http://169.254.169.254/latest/user-data
```

## Dica de prova

- **User data** = script de bootstrap (roda na 1ª inicialização). **Metadata** = informações da instância (`169.254.169.254`).
- **IMDSv2** (baseado em sessão/token) protege contra ataques SSRF; é a resposta para "proteger o acesso aos metadados".
- Credenciais de uma **IAM role** anexada ficam em `meta-data/iam/security-credentials/` e são rotacionadas automaticamente.
