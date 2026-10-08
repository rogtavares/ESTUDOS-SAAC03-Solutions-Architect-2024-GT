# AWS KMS - criptografar e descriptografar dados

## Ao final deste laboratório, você deverá ser capaz de:

- Criar uma chave de criptografia (KMS key simétrica)
- Criar um bucket do Amazon S3 com logs do AWS CloudTrail
- Criptografar os dados de um bucket do Amazon S3 usando a chave (SSE-KMS)
- Monitorar o uso da chave com o CloudTrail
- Gerenciar quem administra e quem usa a chave (key policy)

## Preparar o ambiente

O AWS CloudShell já traz Python 3 e pip. Em outra máquina:

```bash
python3 -m pip install --user boto3
```

## Script Python: encrypt / decrypt

```python
import boto3

kms = boto3.client('kms', region_name='us-east-1')

# ID, ARN ou alias da sua KMS key (ex.: 'alias/lab-key')
key_id = 'arn:aws:kms:us-east-1:<ACCOUNT_ID>:key/<KEY_ID>'

plaintext = 'This is a secret message'

# Encrypt (limite de 4 KB de dados por chamada direta ao KMS)
response = kms.encrypt(
    KeyId=key_id,
    Plaintext=plaintext.encode('utf-8'),
    EncryptionAlgorithm='SYMMETRIC_DEFAULT'
)
ciphertext_blob = response['CiphertextBlob']

with open('encrypted_data', 'wb') as f:
    f.write(ciphertext_blob)
print('Encrypted data saved to "encrypted_data" file.')

# Decrypt (para chave simétrica o KeyId é opcional: vem embutido no ciphertext)
decrypt_response = kms.decrypt(CiphertextBlob=ciphertext_blob, KeyId=key_id)
decrypted_plaintext = decrypt_response['Plaintext'].decode('utf-8')

with open('decrypted_data.txt', 'w') as f:
    f.write(decrypted_plaintext)
print('Decrypted data saved to "decrypted_data.txt" file.')
```

## Key policy padrão (criada pelo console)

Troque `<ACCOUNT_ID>` e `<ROLE_NAME>`.

```json
{
  "Id": "key-consolepolicy-3",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::<ACCOUNT_ID>:root" },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "Allow access for Key Administrators",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>" },
      "Action": [
        "kms:Create*", "kms:Describe*", "kms:Enable*", "kms:List*", "kms:Put*",
        "kms:Update*", "kms:Revoke*", "kms:Disable*", "kms:Get*", "kms:Delete*",
        "kms:TagResource", "kms:UntagResource",
        "kms:ScheduleKeyDeletion", "kms:CancelKeyDeletion", "kms:RotateKeyOnDemand"
      ],
      "Resource": "*"
    },
    {
      "Sid": "Allow use of the key",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>" },
      "Action": [
        "kms:Encrypt", "kms:Decrypt", "kms:ReEncrypt*",
        "kms:GenerateDataKey*", "kms:DescribeKey"
      ],
      "Resource": "*"
    },
    {
      "Sid": "Allow attachment of persistent resources",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>" },
      "Action": ["kms:CreateGrant", "kms:ListGrants", "kms:RevokeGrant"],
      "Resource": "*",
      "Condition": { "Bool": { "kms:GrantIsForAWSResource": "true" } }
    }
  ]
}
```

## Dica de prova

- **Key policy** é obrigatória e é o controle principal; a instrução `:root` delega o acesso às políticas IAM da conta.
- Dados > 4 KB → **envelope encryption** (`GenerateDataKey`); é o que o S3 SSE-KMS faz.
- Muitas requisições SSE-KMS no S3 → throttling/custo do KMS → habilite **S3 Bucket Keys**.
- Chave **multi-Region** para replicar dados criptografados entre regiões; rotação automática de chaves gerenciadas pelo cliente é configurável (padrão anual).
- Toda chamada à chave fica registrada no **CloudTrail**.

## Limpeza e custos

Agende a exclusão da chave (7 a 30 dias de espera) e esvazie/apague o bucket e a trilha do CloudTrail.
