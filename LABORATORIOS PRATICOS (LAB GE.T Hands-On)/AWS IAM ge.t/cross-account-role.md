# Crie uma função na conta de destino

1. Selecione 'outra conta' como entidade confiável
2. Insira o ID da conta e marque a caixa de seleção ‘Exigir ID externo’
3. Insira o ID externo
4. Anexe a seguinte política à função:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowBucketAccess",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::<bucket-name>",
                "arn:aws:s3:::<bucket-name>/*"
            ]
        }
    ]
}

# Assuma a função na conta de destino

1. Execute o seguinte comando para assumir a função usando a CLI

aws sts assume-role --role-arn arn:aws:iam::<target-account-id>:role/<role-name> --role-session-name mysession --external-id <external-id>

2. Configure as credenciais

aws configure set aws_access_key_id <access-key-id> --profile target-account
aws configure set aws_secret_access_key <secret-access-key> --profile target-account
aws configure set aws_session_token <session-token> --profile target-account

3. Execute comandos CLI no bucket

aws s3 ls s3://<bucket-name> --profile target-account

## Custos
**Ao executar os laboratórios em sua própria conta da AWS,
você é responsável pelos custos de quaisquer recursos criados. Siga as etapas de limpeza para cada laboratório concluído.**


