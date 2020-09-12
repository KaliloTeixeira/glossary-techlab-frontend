***** REACT *****
    - Biblioteca utilizada para manipular a DOM 
    - Muito utilizada para SPA ( Single Page Application )
    - Baseado em componentes

    * Criando Projeto:
    - npm install create-react-app -g
    - create-react-app nome-do-projeto  //Aqui ele cria o projeto

    * Acessando a API:
    - Para acessar a api, vamos utilizar a Biblioteca Axios
    - npm install axios
        - criar pasta services - Pasta para arquivos que conectam com serviços externos
        - criar arquivo api.js
            - importar o axios e utilizar o .create()
            ...Veja o exemplo na pasta

    * Buscando dados na API
    - Os dados buscados na API devem ser armazenados em state
    Ex: 
        - Instanciando um state
        state = { products: [] }

        - Alterando o valor de um state - deve utilizar o .setState()
        this.setState({ products: response.data });

    * Navegação entre páginas:
        Para navegar entre páginas no react deve-se instalar a Biblioteca react-router-DOM
        - npm install react-router-dom
        
        - criar o arquivo routes.js
            - ver arquivo para mais detalhes
