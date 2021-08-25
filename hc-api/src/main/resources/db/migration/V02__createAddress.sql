CREATE TABLE address(
id SERIAL PRIMARY KEY NOT NULL,
customer_id BIGINT NOT NULL,
logradouro VARCHAR NOT NULL,
numero INT NOT NULL,
complemento VARCHAR,
bairro VARCHAR NOT NULL,
cep VARCHAR NOT NULL,
cidade VARCHAR NOT NULL,
estado VARCHAR NOT NULL,
FOREIGN KEY (customer_id) REFERENCES customer(id));


INSERT INTO address (customer_id, logradouro, numero,complemento, bairro, cep, cidade, estado ) 
       values(1, 'Rua das Couves', '123', 'próximo ao campo de futebol','Tucumã', '69919-688', 'Rio Branco', 'AC');
INSERT INTO address (customer_id, logradouro, numero,complemento, bairro, cep, cidade, estado ) 
       values(1, 'Rua Guanabara', '123', 'próximo ao Shopping','Jardim America', '76989-000', 'Xapuri', 'AC');
INSERT INTO address (customer_id, logradouro, numero,complemento, bairro, cep, cidade, estado ) 
       values(2, 'Rua Estação', '123', 'BR 101','Aeroporto', '69919688', 'Porto Velho', 'RS');

