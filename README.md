# health-company
Lista -  de Clientes

![Alt text](.github/lista.png?raw=true "Title")

Cadastro -  de Clientes

![Alt text](.github/cadasto.png?raw=true "Title")

### 🔽 Requisitos
1. Ter o NodeJs e Yarn instalado
2. Ter banco de dados PostgreSQL em execução , pode ser com docker criar container do banco de dados
3. comando gerar container posgre: docker run --name postgresdb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
4. docker start postgresdb
5. docker exec -it postgresdb psql -U postgres
6. CREATE DATABASE gspdb


###  hc-api: Iniciando com o backend
1. ``download sts-tools, api spring boot``
2. ``abrir arquivo pom.xml para instalar as bibliotecas dependentes do projeto maven  ``
3. ``configurar o arquivo application.properties para acesso banco de dados ``
4. ``flywaydb fará migration base de dados``
5. ``iniciar projeto no STS-tools``
6. ``Ter iniciado o projeto hc-api: <a target="_blank" href="https://github.com/tenclar/health-company/tree/main/hc-api">https://github.com/tenclar/health-company/hc-api </a>``

### 💻 hc-web: Iniciando com o Front-End
1. ``cd hc-web``
2. ``yarn``
3. ``yarn dev``

