
# CloudFormation Stack

Vá para a página principal do CloudFormation
Criar ARQUIVO CloudFormation
Escolha o arquivo de modelo de upload
Selecione o arquivo YAML da unidade local
Opcional - clique em Exibir no Designer se quiser ver o AWSstack no designer
Clique em Próximo
Confirme e clique em Criar pilha
Criação de pilha em andamento
Pilha criada

# S3 Bucket

Crie um bucket S3 chamado "item-frontend-static-hosting". O URL deste bucket deve ser especificado na configuração do CORS da API de back-end para origens permitidas. E mais tarde na configuração CORS do próprio bucket. Escolha a região apropriada e permita o acesso público
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
Clique em Palco na navegação à esquerda. Em seguida, clique em Criar
Novo nome artístico "prod". Clique em Criar na parte inferior
Vá para Integrações
Guia Gerenciar Integrações. Existe uma integração padrão, mas clicamos em Criar para criar uma nova
Especifique o tipo de integração, a região AWS e a função Lambda. Esta função Lambda também é criada como parte da pilha CF. Clique em Criar na parte inferior
A nova integração está pronta. Observe o ID de integração
Now need to create 6 routes: /items (OPTIONS, GET, PUT) and /items/{id} (OPTIONS, DELETE, GET)
    GET /items
    PUT /items
    GET /items/{id}
    DELETE(/items/{id}
    OPTIONS /items
    OPTIONS /items/{id}


Anexe a NOVA integração à função Lambda a cada uma das 6 rotas. Clique em Rota. Em seguida, clique em Anexar integração.
Selecione o ID de integração correspondente à integração correta. Clique em Anexar integração
Repita para todas as 6 rotas
Configurar o CORS. Todos os 6 campos devem ser configurados:

    The bucket URL (for N.Virgina buckets) should be: https://YOURBUCKETNAME.s3.amazonaws.com
    "Access-Control-Allow-Origin" has to be specified after creating the S3 bucket as its name is used in the URL. Click Save. 

Agora clique em Implantar no canto superior direito e selecione Prod Stage para implantação

* Invoke URL: 

* Integration ID: 

# client-side code

# Make sure Nodejs version 12.x is installed on local computer

URL de invocação deve ser configurado na configuração do frontend (frontend path: client\src\config.ts)
For example, if invoke URL for API is "https://0zf6cghiv8.execute-api.us-east-1.amazonaws.com/prod" then apiId is first part after "https://" i.e. 0zf6cghiv8

Em um prompt de comando, vá para a pasta do cliente e instale todas as dependências executando “npm install”
Agora execute “npm run build” para criar uma compilação de produção na subpasta “build”
Faça upload do conteúdo da subpasta de compilação do aplicativo cliente front-end no bucket na guia Objetos
Em "build" existe a pasta "static" que possui três subpastas "css", "js" e "media". Certifique-se de que a estrutura adequada seja criada no S3 e que os arquivos sejam carregados nas respectivas pastas na máquina local
Depois que todo o upload estiver concluído. abra index.html na raiz do bucket S3. Dentro dele mostra um URL HTTPS. Use isso para acessar o aplicativo frontend.

O aplicativo frontend, por padrão, abre uma página de painel que mostra o link Itens onde, na parte superior, um formulário permite adicionar novos itens especificando um ID, nome e preço exclusivos. E abaixo disso uma grade mostra os itens que foram adicionados. Os itens podem ser excluídos. Mas não pode ser atualizado.

depois desliga, o servicos 

GE TAVARES 