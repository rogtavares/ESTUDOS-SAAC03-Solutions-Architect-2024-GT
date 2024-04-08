# Configurações  do Amazon CloudFront

1. Configure buckets do Amazon S3:
- Crie dois buckets S3 para os arquivos (por exemplo, 'pdf-bucket' e 'jpg-bucket')
- Faça upload de arquivos PDF de amostra para o 'pdf-bucket' e imagens JPG para o 'jpg-bucket'
- Crie um bucket para o site estático

2. Para o site estático:
- Habilitar acesso público
- Configurar como um site estático
- Adicione o index.html (quando estiver pronto)

3. Configure o Amazon CloudFront:
- Crie uma nova distribuição do CloudFront
- Adicione o site estático como origem (use o endpoint do site)
- Desativar cache
- Adicione mais 2 origens para os buckets contendo os arquivos e crie/configure o OAC
- Defina as configurações de comportamento do cache para cada origem com base no tipo de arquivo (PDF ou JPG) e no acesso padrão ao site estático