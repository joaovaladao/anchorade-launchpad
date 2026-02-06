

## Anchorade - Estrutura Inicial do Projeto

### 📋 Visão Geral
Criar apenas a **estrutura de pastas** e um **README inicial** para o marketplace Anchorade, sem implementação de código funcional.

---

### 📁 Estrutura de Pastas Proposta

```
src/
├── components/
│   ├── ui/              # Componentes base (já existentes)
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

### 📄 README Inicial

O README incluirá:
- **Descrição do projeto**: Marketplace local focado em proximidade geográfica
- **Funcionalidades planejadas**: Lista das features principais
- **Stack tecnológica**: React, TypeScript, Tailwind, Supabase
- **Estrutura do projeto**: Explicação da organização de pastas
- **Como rodar localmente**: Instruções de setup
- **Roadmap**: Fases de desenvolvimento planejadas
- **Contribuição**: Guia para contribuidores (se aplicável)

---

### 🎯 O que será criado

1. **Pastas vazias** organizadas seguindo a estrutura acima
2. **Arquivos `.gitkeep`** para manter as pastas no Git
3. **README.md** atualizado com toda a documentação inicial do projeto

---

### ⏭️ Próximos Passos (após esta fase)

1. Configuração do Supabase (banco de dados e autenticação)
2. Implementação do sistema de autenticação
3. CRUD de produtos com localização
4. Busca por proximidade geográfica
5. Dashboard do vendedor

