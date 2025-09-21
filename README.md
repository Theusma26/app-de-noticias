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

- **[React Navigation](https://reactnavigation.org/):** Biblioteca para navegação entre telas.

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

- **TypeScript:** Adotado para adicionar tipagem estática ao projeto, melhorando a detecção de erros em tempo de desenvolvimento e qualidade.

- **NativeWind:** Usado para facilitar a estilização e agilizar o desenvolvimento, aproveitando minha familiaridade com Tailwind CSS.

- **React Query (TanStack):** Usado para gerenciar o estado assíncrono, escolhi essa biblioteca para implementar o infinite scroll e ajudar a gerenciar os dados que foram salvos no AsyncStorage.

- **Axios:** Escolhido como cliente HTTP para facilitar requisições à News API, incluindo suporte a interceptors e tratamento de erros.

- **News API:** Decidido como fonte de dados por fornecer acesso a notícias em tempo real de diversas fontes confiáveis, simples de integrar e com suporte a filtragem por categorias e pesquisa por palavras-chave.

## Autor

![Imagem de perfi](https://avatars.githubusercontent.com/u/176949465?s=96&v=4)

Matheus Rodrigues 🚀  
Feito com ❤️ por Matheus Rodrigues 👋🏽 Entre em contato!

[![Matheus Rodrigues](https://img.shields.io/badge/Matheus%20Rodrigues-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/theusmaoliver/)
[![Email](https://img.shields.io/badge/matheusrodriguesoliveira273@gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:matheusrodriguesoliveira273@gmail.com)

