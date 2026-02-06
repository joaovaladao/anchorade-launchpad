# 🏪 Anchorade

**Marketplace local focado em proximidade geográfica**

Anchorade é um marketplace de produtos físicos com foco em itens locais — alimentos, artesanato, suprimentos — onde compradores encontram vendedores próximos através de busca por localização.

---

## ✨ Funcionalidades Planejadas

### Para Compradores
- 🔍 Busca de produtos por proximidade geográfica
- 📍 Filtros por categoria, preço e distância
- 🗺️ Visualização em mapa dos vendedores próximos
- ⭐ Avaliações e reviews de produtos e vendedores
- 🛒 Carrinho de compras e histórico de pedidos

### Para Vendedores
- 📦 Cadastro e gerenciamento de produtos
- 📊 Dashboard com métricas de vendas
- 📍 Configuração de área de atuação/entrega
- 💬 Sistema de mensagens com compradores

### Sistema
- 🔐 Autenticação segura (email/senha, OAuth)
- 💳 Integração com gateway de pagamentos
- 📱 Design responsivo (mobile-first)

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | React 18 + TypeScript |
| **Estilização** | Tailwind CSS + shadcn/ui |
| **Roteamento** | React Router v6 |
| **Estado** | TanStack Query + React Context |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **Mapas** | Leaflet / Mapbox (a definir) |
| **Pagamentos** | Stripe (a definir) |

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── layout/          # Header, Footer, Sidebar, Navigation
│   ├── auth/            # Componentes de autenticação
│   ├── products/        # Cards, listagens, formulários de produtos
│   ├── vendors/         # Perfil e componentes de vendedores
│   ├── search/          # Busca e filtros
│   └── map/             # Componentes de mapa/localização
├── pages/
│   ├── auth/            # Login, Registro, Recuperar senha
│   ├── products/        # Listagem, Detalhes, Cadastro
│   ├── vendors/         # Perfil público, Dashboard do vendedor
│   └── user/            # Configurações, Meus pedidos
├── hooks/               # Hooks customizados
├── lib/                 # Utilitários e helpers
├── types/               # Definições TypeScript
├── contexts/            # Contexts React (auth, cart, location)
└── services/            # Integrações com API/Supabase
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+ 
- npm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/anchorade.git

# Entre na pasta do projeto
cd anchorade

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`

---

## 📋 Roadmap

### Fase 1 - Fundação ✅
- [x] Estrutura de pastas
- [x] Documentação inicial

### Fase 2 - Autenticação
- [ ] Configuração do Supabase
- [ ] Login/Registro de usuários
- [ ] Perfil do usuário

### Fase 3 - Produtos
- [ ] CRUD de produtos
- [ ] Upload de imagens
- [ ] Categorização

### Fase 4 - Geolocalização
- [ ] Integração com API de mapas
- [ ] Busca por proximidade
- [ ] Área de atuação do vendedor

### Fase 5 - Transações
- [ ] Carrinho de compras
- [ ] Integração com pagamentos
- [ ] Sistema de pedidos

### Fase 6 - Social
- [ ] Avaliações e reviews
- [ ] Sistema de mensagens
- [ ] Notificações

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

Tem alguma dúvida ou sugestão? Abra uma [issue](https://github.com/seu-usuario/anchorade/issues) no repositório.

---

<p align="center">
  Feito com ❤️ para conectar comunidades locais
</p>
