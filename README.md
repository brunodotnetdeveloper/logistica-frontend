# Frontend do Projeto LoremIpsumLogistica

## Descrição

Este projeto é a parte frontend de um sistema de gerenciamento de clientes e endereços. Ele utiliza Angular com Angular Material para criar uma interface amigável. O sistema permite visualizar e gerenciar detalhes dos clientes, incluindo a adição, edição e exclusão de endereços.

## Requisitos

Antes de começar, certifique-se de que você tem o [Node.js](https://nodejs.org/) e o [Angular CLI](https://angular.io/cli) instalados em sua máquina.

## Instalação

1. **Clone o repositório:**

   git clone https://github.com/brunodotnetdeveloper/logistica-frontend.git

2. **Navegue para o diretório do projeto:**
   cd logistica-frontend

3. **Instale as dependências do projeto:**
   npm install

## Configuração da API

O frontend se comunica com uma API backend. Para garantir que a aplicação funcione corretamente, você deve apontar a URL da API no serviço Angular.

**1. Abra o arquivo de configuração do serviço:**

O arquivo de configuração do serviço é geralmente localizado em src/app/services/client.service.ts ou similar.

2. **Atualize a URL base da API:**

Encontre a variável baseUrl e atualize-a com a URL da sua API. Por exemplo:
private baseUrl = 'http://localhost:7102/api/clients';

Certifique-se de que a porta e o endpoint estão corretos de acordo com a configuração do seu backend.

## Executando o Projeto

1. **Inicie o servidor de desenvolvimento Angular:**
    ng serve

2. **Acesse a aplicação:**
    Abra seu navegador e vá para http://localhost:4200.

## Estrutura do Projeto
src/app/components/ - Contém os componentes do projeto.

src/app/services/ - Contém os serviços que fazem a comunicação com a API backend.

src/app/models/ - Contém as interfaces e modelos de dados.

src/assets/ - Contém arquivos estáticos, como imagens e estilos.


