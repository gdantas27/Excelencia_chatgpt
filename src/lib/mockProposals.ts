export const mockProposals = [
  {
    id: '1',
    title: 'Instalação de Hidrômetro',
    description: 'Instalação de novo hidrômetro com medição digital',
    value: 2800,
    status: 'pending', // 'accepted', 'rejected'
    createdAt: new Date('2024-03-10'),
    expiresAt: new Date('2024-04-10'),
    technician: 'Maria Oliveira',
    items: [
      { description: 'Hidrômetro Digital', quantity: 1, unitPrice: 2000 },
      { description: 'Instalação', quantity: 1, unitPrice: 800 },
    ],
  },
];
