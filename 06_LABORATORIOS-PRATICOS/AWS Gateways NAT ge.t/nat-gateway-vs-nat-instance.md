# NAT Gateway x NAT Instance

## Detalhes da tarefa

1. Faça login no Console de gerenciamento da AWS.
2. Crie uma VPC com sub-redes públicas e privadas.
3. Crie um Internet Gateway, uma tabela de rotas pública (`0.0.0.0/0 → IGW`) e associe às sub-redes públicas.
4. Inicie uma instância EC2 na sub-rede pública e outra na privada.
5. Acesse as instâncias e teste a conectividade com a Internet (a privada não deve sair).
6. Crie um **NAT Gateway na sub-rede pública** (com Elastic IP).
7. Na tabela de rotas privada adicione `0.0.0.0/0 → NAT Gateway`.
8. Teste novamente a Internet a partir da instância privada.

## Conceitos

- NAT = *Network Address Translation*: permite que instâncias em sub-rede privada iniciem conexões de saída
  (Internet ou serviços AWS) **sem** permitir conexões de entrada vindas da Internet.
- **NAT Gateway** é gerenciado pela AWS; fica em **uma AZ** com redundância dentro dela.
  Para alta disponibilidade multi-AZ: **um NAT Gateway por AZ** e cada sub-rede privada roteando para o da sua AZ.
- Largura de banda: começa em 5 Gbps e escala automaticamente até **100 Gbps**.
- **Public NAT Gateway** (sai para a Internet, usa Elastic IP) x **Private NAT Gateway** (VPC→VPC/on-premises, sem EIP).
- IPv6: para saída só de IPv6 use o **Egress-Only Internet Gateway**. O NAT Gateway suporta **NAT64** (com DNS64)
  para que cargas IPv6 acessem destinos IPv4.
- Não usa security groups (controle via NACL); não precisa desativar *source/destination check*.
- Não suporta *port forwarding* nem funciona como bastion host.
- Tem métricas no **CloudWatch** (bytes, pacotes, conexões, `ErrorPortAllocation`...).
- Cobrança por hora **e por GB processado** — tráfego para S3/DynamoDB deve usar **VPC Gateway Endpoint** (gratuito)
  para economizar.

## Comparativo

| | NAT Gateway | NAT Instance |
|---|---|---|
| Gerenciamento | AWS | Você (patches, AMI, failover) |
| Disponibilidade | Alta dentro da AZ | Requer scripts/ASG para failover |
| Largura de banda | Até 100 Gbps | Depende do tipo de instância |
| IP público | Elastic IP | Elastic IP ou IP público |
| Security groups | Não | Sim |
| Bastion host | Não | Pode ser usado |
| Port forwarding | Não | Sim (configuração manual) |
| Source/dest check | N/A | Precisa **desativar** |

**Na prova:** "gerenciado / alta disponibilidade / menos operação" → **NAT Gateway (um por AZ)**.
"Menor custo absoluto e aceita gerenciar" → NAT Instance.
