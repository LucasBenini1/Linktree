# Linktree com React, TypeScript, Tailwind CSS e Firebase

Este projeto é uma aplicação de Linktree desenvolvida utilizando **React**, **TypeScript**, **Tailwind CSS** e **Firebase**. A aplicação possui funcionalidades de cadastro e exibição de links e redes sociais, além de uma página de autenticação para proteger as áreas administrativas.

## Funcionalidades

- **Página Home**: Exibe os links e redes sociais cadastradas. Esta página é pública e acessível para qualquer visitante.
- **Página de Admin**: Permite o cadastro e gerenciamento dos links que serão exibidos na página Home. Esta página é protegida por autenticação.
- **Página de Redes Sociais**: Permite o cadastro e gerenciamento dos links das redes sociais. Assim como a página de Admin, é protegida por autenticação.
- **Página de Login**: Acessível apenas para usuários cadastrados no banco de dados. Protege as páginas de Admin e Redes Sociais, garantindo que apenas usuários autenticados possam gerenciar os links.
- **Banco de Dados**: Os links e redes sociais cadastrados são armazenados no banco de dados do **Firebase** e exibidos dinamicamente na página Home.

## Tecnologias Utilizadas

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Firebase**

## Hospedagem

O site foi hospedado via **Vercel**.

## Créditos
Este projeto foi realizado juntamente ao curso de React + TypeScript do professor Matheus Fraga, na plataforma Udemy. Algumas funcionalidades adicionais foram adicionadas por Lucas Benini.
