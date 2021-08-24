CREATE TABLE customer(
id SERIAL PRIMARY KEY NOT NULL,
nome VARCHAR NOT NULL,
cpf VARCHAR NOT NULL,
datanascimento date NOT NULL
);

INSERT INTO customer (nome, cpf, datanascimento) values('Tenclar Valus da Silva', '12345678900', '1980-7-6');
INSERT INTO customer (nome, cpf, datanascimento) values('Rhauer Valus da Silva',  '36215948701', '1986-1-8');
INSERT INTO customer (nome, cpf, datanascimento) values('Saimon Valus da Silva', '12345678930', '1982-4-22');