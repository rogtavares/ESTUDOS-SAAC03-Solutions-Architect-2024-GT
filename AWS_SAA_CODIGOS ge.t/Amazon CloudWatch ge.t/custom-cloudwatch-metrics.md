# Esses comandos podem ser executados usando AWS CloudShell

## Crie uma função IAM e um perfil de instância
1. Crie uma política IAM
   aws iam create-policy --policy-name "CloudWatch-Put-Metric-Data" --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Permitir ","Ação":["cloudwatch:PutMetricData"],"Recurso":"*"}]}'
2. Crie uma função do IAM que use o documento de política
   aws iam create-role --role-name "CloudWatch-Role" --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Permitir ","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
3. Anexe a política à função (atualizar ARN da política)
   aws iam attachment-role-policy --role-name "CloudWatch-Role" --policy-arn "arn:aws:iam::821711655051:policy/CloudWatch-Put-Metric-Data"
4. Crie um perfil de instância
   aws iam create-instance-profile --instance-profile-name "CloudWatch-Instance-Profile"
5. Adicione a função ao perfil da instância
   aws iam add-role-to-instance-profile --instance-profile-name "CloudWatch-Instance-Profile" --role-name "CloudWatch-Role"

## ## Iniciar uma instância EC2 
1. Crie um grupo de segurança
   aws ec2 create-security-group --group-name CustomMetricLab --description "SG temporário para o laboratório de métricas personalizadas"
2. Adicione uma regra para entrada SSH ao grupo de segurança
   aws ec2 autorize-security-group-ingress --nome do grupo CustomMetricLab --protocol tcp --port 22 --cidr 0.0.0.0/0
3. Instância de lançamento em US-EAST-1A
   aws ec2 run-instances --image-id ami-0aa7d40eeae50c9a9 --instance-type t2.micro --placement AvailabilityZone=us-east-1a --security-group-ids sg-0c6f4290d647e7813 --iam-instance-profile Nome= "Perfil de instância do CloudWatch"

# Execute os comandos restantes da instância EC2


## Instale o estresse
sudo amazon-linux-extras instalar epel -y
sudo yum instalar estresse-ng -y

## Configure um script de shell que use a API put-metric-data
1. Crie um script de shell chamado mem-usage.sh
   sudo nano mem-usage.sh
2. Adicione o seguinte código e salve:

#!/bin/bash

aws cloudwatch put-metric-data --region us-east-1 --namespace "Personalizado/Memória" --metric-name "MemUsage" --value "$(free | awk '/Mem/{printf("%d ", ($2-$7)/$2*100)}')" --unit "Porcentagem" --dimensions "Nome=InstanceId,Valor=$(curl -s http://169.254.169.254/latest/meta-data /id da instância)"

3. Torne o script executável
   sudo chmod +x mem-usage.sh
4. Adicione o script ao crontab, primeiro abra o crontab
   crontab -e
5. Em seguida, adicione a seguinte linha para executar o script a cada minuto
* * * * * /home/ec2-user/mem-usage.sh
6. Salve digitando o seguinte e pressionando Enter
   :qq

## Execute o utilitário stres para gerar carga
estresse-ng --vm 15 --vm-bytes 80% --vm-method todos --verify -t 60m -v

## Crie um alarme no CloudWatch
1. Crie um alarme baseado na métrica personalizada

GE TAVARES 

