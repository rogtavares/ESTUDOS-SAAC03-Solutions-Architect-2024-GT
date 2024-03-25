# Crie um par de chaves para usar

1. Inicie um ambiente AWS CloudShell
2. Execute o seguinte comando da AWS CLI para criar um par de chaves e fazer download localmente:

aws ec2 create-key-pair --key-name CloudShellKeyPair --query 'KeyMaterial' --output text > CloudShellKeyPair.pem

3. Modifique as permissões do arquivo:

chmod 400 CloudShellKeyPair.pem

4. Execute uma instância em uma sub-rede pública e outra em uma sub-rede privada
5. Modifique o ID da AMI, o nome da chave, o ID do grupo de segurança e o ID da sub-rede

aws ec2 run-instances --image-id ami-xxxxxxxxxxxx --count 1 --instance-type t2.micro --key-name CloudShellKeyPair.pem --security-group-ids sg-xxxxxxxxxxxx --subnet-id subnet- xxxxxxxxxxxx

aws ec2 run-instances --image-id ami-02396cdd13e9a1257 --count 1 --instance-type t2.micro --key-name CloudShellKeyPair --security-group-ids sg-0cf288022e7f030cf --subnet-id subnet-07d14305b58fa9e44

6. Conecte-se à instância na sub-rede pública (use o IP público)

ssh -A -i CloudShellKeyPair.pem ec2-user@<bastion-public-ip>

7. Conecte-se à instância na sub-rede privada a partir da instância na sub-rede pública (use o IP privado)

ssh ec2-user@<instance-private-ip>