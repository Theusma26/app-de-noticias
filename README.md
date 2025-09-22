<div align="center">
   <p>
     <img src="https://cdn-icons-png.flaticon.com/512/463/463897.png" alt="Imagem do aplicativo" width="300"/>
   </p>
   <h1>
      App de Notícias
   </h1>
   <h4>
     Este é um aplicativo de notícias que permite acompanhar as últimas notícias em tempo real, filtrar por categorias, buscar por temas específicos e salvar suas notícias favoritas.
   </h4>
</div>

## Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/):** Framework para criar interfaces móveis usando React. Permite desenvolvimento baseado em componentes, multiplataforma, com UI declarativa, suporte completo a APIs nativas e integração profunda com o Expo para navegação e funcionalidades nativas.

- **[Expo](https://expo.dev/):** Plataforma open-source para construir aplicativos nativos universais (Android, iOS e web) usando JavaScript/TypeScript e React Native. Possui roteamento baseado em arquivos via Expo Router, atualização rápida (fast refresh), módulos nativos para câmera, mapas e notificações, atualizações over-the-air (EAS) e deploy simplificado de aplicativos.

- **[Axios](https://axios-http.com/):** Cliente HTTP para realizar requisições às APIs.
  
- **[Expo Router](https://expo.github.io/router/docs/):** Sistema de roteamento baseado em arquivos para apps React Native, que simplifica a navegação ao seguir a estrutura de pastas do projeto. Ele é construído sobre o React Navigation, mas elimina a necessidade de configuração manual de stacks, tabs e drawers, tornando a organização e manutenção das rotas mais intuitiva.

- **[NativeWind](https://www.nativewind.dev/):** Biblioteca que leva o Tailwind CSS para React Native e Expo, permitindo estilizar componentes móveis usando classes utilitárias, promovendo design rápido, consistente e responsivo.

- **[React Query (TanStack)](https://tanstack.com/query/latest):** Gerenciamento de estado e cache de dados assíncronos.

- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript com tipagem estática, oferecendo anotações de tipo, interfaces, enums, generics e ferramentas avançadas. Melhora a detecção de erros, qualidade do código e escalabilidade, ideal para projetos robustos e de fácil manutenção.

## Funcionalidades

- **Exibição das notícias mais recentes:** O aplicativo permite visualizar as notícias mais recentes disponíveis.
- **Pesquisa de notícias:** Possui uma funcionalidade de busca para encontrar notícias específicas.
- **Filtragem por categorias:** Os usuários podem filtrar as notícias por diferentes categorias, facilitando a navegação.
- **Favoritos:** É possível adicionar notícias aos favoritos para leitura posterior.

## Configuração do Projeto Localmente

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados na sua máquina:

- **Git**  
- **Node.js**  
- **npm (Node Package Manager)**  

---

### Clonando o Repositório

```bash
git clone https://github.com/Theusma26/app-de-noticias.git
cd app-de-noticias
```

### Instalação

Instale as dependências do projeto utilizando o npm:

```bash
npm install
```

### Configuração das Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto e adicione o seguinte conteúdo:

```bash
EXPO_PUBLIC_API_KEY=
```

Substitua o valor acima pela sua chave da News API. Você pode obtê-la se cadastrando em https://newsapi.org/

### Executando o Projeto

```bash
npx expo start
```

Abra o aplicativo Expo Go no seu celular e escaneie o QR code para visualizar o projeto

## Decisões Técnicas

Neste projeto, busquei aplicar boas práticas e padrões de projeto sempre que possível. Para isso:

- Criei **componentes reutilizáveis** para telas de erro, loading e listas.  
- Utilizei **Context** para monitorar a conexão com a internet, permitindo que essa informação seja acessada de forma centralizada em qualquer parte da aplicação.  
- Adotei **enums** para valores fixos, evitando comparações diretas com strings.  
- Desenvolvi **hooks personalizados** com o objetivo de facilitar e padronizar a manipulação e o consumo de dados.  
- Usei **interfaces TypeScript** para garantir tipagem consistente dos dados.  
- Implementei **mock data** para criar a lista de categorias.  
- Organizei o projeto em pastas como **service**, para integração com a NewsAPI, e **utils**, para reutilização de funções e lógicas comuns.  
- Protegi dados sensíveis utilizando o arquivo **.env**.  
- Adotei o **NativeWind** para tornar a estilização mais ágil e moderna.  
- Busquei deixar o **layout com aparência moderna**, combinando funcionalidade e design clean.




## Autor

![Imagem de perfi](https://avatars.githubusercontent.com/u/176949465?s=96&v=4)

Matheus Rodrigues 🚀  
Feito com ❤️ por Matheus Rodrigues 👋🏽 Entre em contato!

[![Matheus Rodrigues](https://img.shields.io/badge/Matheus%20Rodrigues-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/theusmaoliver/)
[![Email](https://img.shields.io/badge/matheusrodriguesoliveira273@gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:matheusrodriguesoliveira273@gmail.com)

