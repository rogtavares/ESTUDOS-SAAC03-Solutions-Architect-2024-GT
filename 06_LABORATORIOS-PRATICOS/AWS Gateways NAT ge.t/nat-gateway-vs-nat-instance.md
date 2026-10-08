## DETALHES DA TAREFA 

Detalhes da tarefa
Faça login no Console de gerenciamento da AWS.
Crie uma VPC.
Crie sub-redes públicas e privadas.
Crie um gateway de Internet
Crie uma tabela de rotas públicas e configure
Inicie uma instância EC2 na sub-rede pública.
Execute uma instância EC2 na sub-rede privada.
SSH em instância EC2 pública e privada e teste de conectividade com a Internet
Crie um gateway NAT
Atualizar tabela de rotas e configurar gateway NAT
Teste a conexão com a Internet da instância dentro da sub-rede privada
Validação do laboratório.

Os gateways NAT são gerenciados para você pela AWS.
Serviço NAT totalmente gerenciado que substitui a necessidade de instâncias NAT no EC2.
Deve ser criado em uma sub-rede pública.
Usa um endereço IP elástico para o IP público.
As instâncias privadas em sub-redes privadas devem ter uma rota para a instância NAT, geralmente o destino de rota padrão é 0.0.0.0/0.
Criado em uma AZ especificada com redundância nessa zona.
Para redundância multi-AZ, crie gateways NAT em cada AZ com rotas para sub-redes privadas usarem o gateway local.
Largura de banda de até 5 Gbps que pode escalar até 45 Gbps.
Não é possível usar um gateway NAT para acessar peering de VPC, VPN ou Direct Connect, portanto, inclua rotas específicas para aquelas em sua tabela de rotas.
Os gateways NAT estão altamente disponíveis em cada AZ em que são implantados.
Eles são preferidos pelas empresas.
Não há necessidade de corrigir.
Não associado a nenhum grupo de segurança.
Atribuído automaticamente um endereço IP público.
Lembre-se de atualizar as tabelas de rotas e apontar para o seu gateway.
Mais seguro (por exemplo, você não pode acessar com SSH e não há grupos de segurança para manter).
Não há necessidade de desativar as verificações de origem/destino.
Os gateways de Internet somente de saída operam em IPv6, enquanto os gateways NAT operam em IPv4.
O encaminhamento de porta não é suportado.
Não há suporte para o uso do gateway NAT como servidor host Bastion.
As métricas de tráfego não são suportadas.
A tabela abaixo destaca as principais diferenças entre os dois tipos de gateway:

Gateway NAT
Instância NAT
Gerenciou
Managed by AWS  Gerenciado pela AWS
Managed Gerenciou
Disponibilidade
Altamente disponível em uma AZ
Não altamente disponível (exigiria script)
Largura de banda
Até 45 GPS
Depende da largura de banda da instância EC2 selecionada
Manutenção
Gerenciado pela AWS
Gerenciado por você
Desempenho
Otimizado para NAT
AMI do Amazon Linux 2 configurada para executar NAT
IP Público
Elastic IP não pode ser desanexado
IP elástico que pode ser desanexado
Grupos de segurança
Não é possível associar-se a um grupo de segurança
Pode se associar a um grupo de segurança
Anfitrião Bastião
Não suportado
Pode ser usado como um host bastião



NAT significa Tradução de Endereço de Rede.
Um gateway NAT é um dispositivo usado para permitir que instâncias em uma sub-rede privada se conectem à Internet ou a outros serviços da AWS.
Impede que a Internet inicie conexões com as instâncias presentes na sub-rede privada.
Ele encaminha o tráfego da instância na sub-rede privada para a Internet ou outros serviços da AWS e, em seguida, envia a resposta de volta às instâncias.
Altera o endereço IP das instâncias pelo endereço do dispositivo NAT quando o tráfego vai para a Internet.
Temos 2 tipos de dispositivos NAT:
Instância NAT
Gateway NAT
A instância NAT usa AMIs do Amazon Linux.
O limite de instâncias NAT depende do limite de tipo de instância para a região.
A instância NAT não oferece suporte ao tráfego IPv6.
O uso do gateway NAT é cobrado do cliente por hora.
O NAT Gateway não suporta tráfego IPv6.
A AWS recomenda o uso do gateway NAT, pois eles fornecem melhor disponibilidade e largura de banda em instâncias NAT.
Diagrama de Arquitetura







