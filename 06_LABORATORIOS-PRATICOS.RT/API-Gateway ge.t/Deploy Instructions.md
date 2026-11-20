# API Gateway (HTTP API) + Lambda + frontend no S3

> **Dica de prova:** em produção prefira bucket S3 privado + **CloudFront com OAC** em vez de site estático público.

# CloudFormation Stack

Vá para a página principal do CloudFormation
Clique em Criar pilha (Create stack)
Escolha o arquivo de modelo de upload
Selecione o arquivo YAML da unidade local
Opcional - abra o template no **Infrastructure Composer** para visualizar a pilha (substituiu o antigo CloudFormation Designer)
Clique em Próximo
Confirme e clique em Criar pilha
Criação de pilha em andamento
Pilha criada

# S3 Bucket

Crie um bucket S3 chamado "items-frontend-static-hosting" (use o mesmo nome em todo o lab; nomes de bucket são globais, acrescente um sufixo se já existir). O URL deste bucket deve ser especificado na configuração do CORS da API de back-end para origens permitidas. E mais tarde na configuração CORS do próprio bucket. Escolha a região apropriada e **desative o Block Public Access** deste bucket (necessário para site estático público)
Ative a hospedagem de sites estáticos neste bucket
Marque Ativar, hospedar site estático. E especifique index.html como documento de índice

Editar política de bucket: use o código a seguir. Certifique-se de que o nome do bucket esteja especificado corretamente e salve

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::items-frontend-static-hosting/*"
        }
    ]
}

Edite a configuração do CORS do bucket. Use o código a seguir e salve
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]

# API Gateway Configuration

Vá para a seção API Gateway para verificar a API criada como parte da pilha CF. API de itens é criada
É necessário copiar o Invoke URL para ser configurado na configuração do frontend
Precisa modificar quatro coisas: Rotas, Integrações, Estágios, CORS e depois Deploy
Clique em **Stages** na navegação à esquerda. Em seguida, clique em Criar
Nome do novo estágio (stage): "prod". Clique em Criar na parte inferior
Vá para Integrações
Guia Gerenciar Integrações. Existe uma integração padrão, mas clicamos em Criar para criar uma nova
Especifique o tipo de integração, a região AWS e a função Lambda. Esta função Lambda também é criada como parte da pilha CF. Clique em Criar na parte inferior
A nova integração está pronta. Observe o ID de integração
Agora crie 6 rotas: /items (OPTIONS, GET, PUT) e /items/{id} (OPTIONS, DELETE, GET)
    GET /items
    PUT /items
    GET /items/{id}
    DELETE /items/{id}
    OPTIONS /items
    OPTIONS /items/{id}


Anexe a NOVA integração à função Lambda a cada uma das 6 rotas. Clique em Rota. Em seguida, clique em Anexar integração.
Selecione o ID de integração correspondente à integração correta. Clique em Anexar integração
Repita para todas as 6 rotas
Configurar o CORS. Todos os 6 campos devem ser configurados:

    A URL do bucket (região N. Virginia) é: https://YOURBUCKETNAME.s3.amazonaws.com
    "Access-Control-Allow-Origin" deve ser preenchido depois de criar o bucket, pois o nome dele faz parte da URL. Clique em Salvar.

Agora clique em Implantar no canto superior direito e selecione Prod Stage para implantação

* Invoke URL: 

* Integration ID: 

# client-side code

# Instale o Node.js LTS (20.x ou 22.x) no computador local

> O projeto original foi feito para Node.js 12 (fim de vida). Se `npm install` falhar em versões novas, tente `npm install --legacy-peer-deps`.

URL de invocação deve ser configurado na configuração do frontend (frontend path: client\src\config.ts)
Por exemplo, se a Invoke URL da API for "https://0zf6cghiv8.execute-api.us-east-1.amazonaws.com/prod", o apiId é a primeira parte depois de "https://", ou seja, 0zf6cghiv8

Em um prompt de comando, vá para a pasta do cliente e instale todas as dependências executando “npm install”
Agora execute “npm run build” para criar uma compilação de produção na subpasta “build”
Faça upload do conteúdo da subpasta de compilação do aplicativo cliente front-end no bucket na guia Objetos
Em "build" existe a pasta "static" que possui três subpastas "css", "js" e "media". Certifique-se de que a estrutura adequada seja criada no S3 e que os arquivos sejam carregados nas respectivas pastas na máquina local
Depois que todo o upload estiver concluído. abra index.html na raiz do bucket S3. Dentro dele mostra um URL HTTPS. Use isso para acessar o aplicativo frontend.

O aplicativo frontend, por padrão, abre uma página de painel que mostra o link Itens onde, na parte superior, um formulário permite adicionar novos itens especificando um ID, nome e preço exclusivos. E abaixo disso uma grade mostra os itens que foram adicionados. Os itens podem ser excluídos. Mas não pode ser atualizado.

## Limpeza

Esvazie e apague o bucket S3 e exclua a pilha do CloudFormation (remove a API, a Lambda e a tabela).

## Custos
**Ao executar os laboratórios em sua própria conta da AWS,
você é responsável pelos custos de quaisquer recursos criados. Siga as etapas de limpeza para cada laboratório concluído.**

GE TAVARES 