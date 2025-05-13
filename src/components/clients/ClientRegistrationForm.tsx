import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Mail, Phone, MapPin, Plus, Trash2, Upload, Save, AlertCircle, Search, Home, FileText, Instagram, Facebook, MessageCircle, MessageCircle as Message, Globe, Users, Star, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { fetchAddressByCEP, brazilianStates, streetTypes, neighborhoodTypes } from '@/lib/utils';
import { Textarea } from '@/components/ui/Textarea';


interface Contact {
  id: string;
  type: 'email' | 'phone';
  value: string;
  isPrimary: boolean;
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'document' | 'other';
  file: File;
  shared: boolean;
}

interface PropertyInfo {
  rooms: number;
  area: number;
  notes: string;
  hasAirConditioning: boolean;
  hasDucts: boolean;
  hasWoodPanels: boolean;
  hasSuspendedCeiling: boolean;
  hasRaisedFloor: boolean;
  hasOtherFeatures: boolean;
  otherFeatures?: string;
  hasGarbageCollection: boolean;
  garbageCollectionDays?: number;
  hasStreams: boolean;
  hasWasteland: boolean;
  hasPets: boolean;
  hasSlopes: boolean;
  hasForest: boolean;
  hasOtherEnvironment: boolean;
  otherEnvironment?: string;
  totalArea: number;
}

interface BillingInfo {
  name: string;
  tradeName: string;
  personType: 'pf' | 'pj';
  document: string;
  rg?: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  streetType: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhoodType: string;
  neighborhood: string;
  cityCode: string;
  city: string;
  state: string;
  ddd: string;
  phone: string;
  email: string;
  isSimplesTaxation: boolean;
  hasRetention: boolean;
}

interface Branch {
  id: string;
  type: 'matriz' | 'filial';
  name: string;
  document: string;
  rg?: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  tradeName?: string;
  zipCode: string;
  streetType: string;
  street: string;
  number: string;
  complement: string;
  neighborhoodType: string;
  neighborhood: string;
  city: string;
  state: string;
  contacts: Contact[];
  documents: Document[];
  propertyInfo: PropertyInfo;
  billingInfo: BillingInfo;
  salesRestriction: 'not_informed' | 'none' | 'financial' | 'spc_serasa' | 'other';
  classification: 'AA' | 'A' | 'BB' | 'B' | 'CC' | 'C' | 'D' | 'E';
  loyaltyCard?: string;
  propertyActivity: 'COMMERCIAL' | 'HOSPITAL' | 'HOTEL' | 'CHURCH' | 'INDUSTRY' | 'SNACK_BAR' | 'STORE' | 'PUBLIC_AGENCY' | 'BAKERY' | 'GAS_STATION' | 'INN' | 'CITY_HALL' | 'RESIDENTIAL' | 'RESTAURANT' | 'BEAUTY_SALON' | 'SUPERMARKET' | 'VEHICLE';
  responsibleSeller?: string;
  satisfactionRating: number;
}

export function ClientRegistrationForm() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: crypto.randomUUID(),
      type: 'matriz',
      name: 'Matriz',
      document: '',
      tradeName: '',
      zipCode: '',
      streetType: '',
      street: '',
      number: '',
      complement: '',
      neighborhoodType: '',
      neighborhood: '',
      city: '',
      state: '',
      contacts: [],
      documents: [],
      propertyInfo: {
        rooms: 0,
        area: 0,
        notes: '',
        hasAirConditioning: false,
        hasDucts: false,
        hasWoodPanels: false,
        hasSuspendedCeiling: false,
        hasRaisedFloor: false,
        hasOtherFeatures: false,
        hasGarbageCollection: false,
        hasStreams: false,
        hasWasteland: false,
        hasPets: false,
        hasSlopes: false,
        hasForest: false,
        hasOtherEnvironment: false,
        totalArea: 0
      },
      billingInfo: {
        name: '',
        tradeName: '',
        personType: 'pf',
        document: '',
        streetType: '',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhoodType: '',
        neighborhood: '',
        cityCode: '',
        city: '',
        state: '',
        ddd: '',
        phone: '',
        email: '',
        isSimplesTaxation: false,
        hasRetention: false
      },
      salesRestriction: 'not_informed',
      classification: 'C',
      propertyActivity: 'RESIDENTIAL',
      satisfactionRating: 0
    }
  ]);

  const [showBillingInfo, setShowBillingInfo] = useState<Record<string, boolean>>({});
  const [selectedBranchForCopy, setSelectedBranchForCopy] = useState<string>('');

  const addBranch = () => {
    const newBranch: Branch = {
      ...branches[0],
      id: crypto.randomUUID(),
      type: 'filial',
      name: `Filial ${branches.filter(b => b.type === 'filial').length + 1}`,
      document: '',
      contacts: [],
      documents: []
    };
    setBranches([...branches, newBranch]);
  };

  const removeBranch = (id: string) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };

  const updateBranch = (id: string, updates: Partial<Branch>) => {
    setBranches(branches.map(branch => 
      branch.id === id ? { ...branch, ...updates } : branch
    ));
  };

  const handleCEPLookup = async (cep: string, branchId: string) => {
    const address = await fetchAddressByCEP(cep);
    if (address) {
      updateBranch(branchId, {
        street: address.logradouro,
        neighborhood: address.bairro,
        city: address.localidade,
        state: address.uf
      });
    }
  };

  const toggleBillingInfo = (branchId: string) => {
    setShowBillingInfo(prev => ({
      ...prev,
      [branchId]: !prev[branchId]
    }));
  };

  const copyBillingInfo = (targetBranchId: string, sourceBranchId: string) => {
    const sourceBranch = branches.find(b => b.id === sourceBranchId);
    if (sourceBranch) {
      updateBranch(targetBranchId, {
        billingInfo: { ...sourceBranch.billingInfo }
      });
    }
  };

  return (
    <form className="space-y-8">
      {branches.map((branch, index) => (
        <div key={branch.id} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Branch Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-brand-primary/10">
                {branch.type === 'matriz' ? (
                  <Building2 className="w-6 h-6 text-brand-primary" />
                ) : (
                  <Home className="w-6 h-6 text-brand-primary" />
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={branch.name}
                  onChange={(e) => updateBranch(branch.id, { name: e.target.value })}
                  className="text-xl font-bold text-gray-800 bg-transparent border-none focus:outline-none"
                  placeholder={branch.type === 'matriz' ? 'Nome da Matriz' : 'Nome da Filial'}
                />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">
                    Código: {crypto.randomUUID().split('-')[0].toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            {branch.type === 'filial' && (
              <button
                type="button"
                onClick={() => removeBranch(branch.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Basic Information */}
          <div className="space-y-4 border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Pessoa
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={branch.billingInfo.personType === 'pf'}
                      onChange={() => updateBranch(branch.id, {
                        billingInfo: { ...branch.billingInfo, personType: 'pf' }
                      })}
                      className="text-brand-primary"
                    />
                    <span>Pessoa Física</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={branch.billingInfo.personType === 'pj'}
                      onChange={() => updateBranch(branch.id, {
                        billingInfo: { ...branch.billingInfo, personType: 'pj' }
                      })}
                      className="text-brand-primary"
                    />
                    <span>Pessoa Jurídica</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {branch.billingInfo.personType === 'pf' ? 'CPF' : 'CNPJ'}
                </label>
                <Input
                  value={branch.document}
                  onChange={(e) => updateBranch(branch.id, { document: e.target.value })}
                />
              </div>

              {branch.billingInfo.personType === 'pf' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RG
                  </label>
                  <Input
                    value={branch.rg}
                    onChange={(e) => updateBranch(branch.id, { rg: e.target.value })}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inscrição Estadual
                    </label>
                    <Input
                      value={branch.stateRegistration}
                      onChange={(e) => updateBranch(branch.id, { stateRegistration: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inscrição Municipal
                    </label>
                    <Input
                      value={branch.municipalRegistration}
                      onChange={(e) => updateBranch(branch.id, { municipalRegistration: e.target.value })}
                    />
                  </div>
                </>
              )}
            </div>

            {branch.billingInfo.personType === 'pj' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Fantasia
                </label>
                <Input
                  value={branch.tradeName}
                  onChange={(e) => updateBranch(branch.id, { tradeName: e.target.value })}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restrição a Venda
                </label>
                <Select
                  value={branch.salesRestriction}
                  onChange={(e) => updateBranch(branch.id, {
                    salesRestriction: e.target.value as Branch['salesRestriction']
                  })}
                >
                  <option value="not_informed">Não informado</option>
                  <option value="none">Sem restrição</option>
                  <option value="financial">Restrição financeira</option>
                  <option value="spc_serasa">Restrição SPC/Serasa</option>
                  <option value="other">Outras restrições</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classificação
                </label>
                <Select
                  value={branch.classification}
                  onChange={(e) => updateBranch(branch.id, {
                    classification: e.target.value as Branch['classification']
                  })}
                >
                  <option value="AA">AA</option>
                  <option value="A">A</option>
                  <option value="BB">BB</option>
                  <option value="B">B</option>
                  <option value="CC">CC</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cartão Fidelidade
                </label>
                <Input
                  value={branch.loyaltyCard}
                  onChange={(e) => updateBranch(branch.id, { loyaltyCard: e.target.value })}
                  placeholder="Número do cartão"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Atividade do Imóvel
                </label>
                <Select
                  value={branch.propertyActivity}
                  onChange={(e) => updateBranch(branch.id, {
                    propertyActivity: e.target.value as Branch['propertyActivity']
                  })}
                >
                  <option value="COMMERCIAL">Comercial</option>
                  <option value="HOSPITAL">Hospitalar</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="CHURCH">Igreja</option>
                  <option value="INDUSTRY">Indústria</option>
                  <option value="SNACK_BAR">Lanchonete</option>
                  <option value="STORE">Loja</option>
                  <option value="PUBLIC_AGENCY">Órgãos Públicos</option>
                  <option value="BAKERY">Panificadora</option>
                  <option value="GAS_STATION">Posto de Gasolina</option>
                  <option value="INN">Pousada</option>
                  <option value="CITY_HALL">Prefeitura</option>
                  <option value="RESIDENTIAL">Residencial</option>
                  <option value="RESTAURANT">Restaurante</option>
                  <option value="BEAUTY_SALON">Salão de Beleza</option>
                  <option value="SUPERMARKET">Supermercado</option>
                  <option value="VEHICLE">Veículo</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendedor Responsável
                </label>
                <Select
                  value={branch.responsibleSeller}
                  onChange={(e) => updateBranch(branch.id, { responsibleSeller: e.target.value })}
                >
                  <option value="">Selecione um vendedor</option>
                  <option value="1">João Silva</option>
                  <option value="2">Maria Santos</option>
                  <option value="3">Pedro Oliveira</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nível de Satisfação
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => updateBranch(branch.id, { satisfactionRating: rating })}
                    className="text-2xl"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= branch.satisfactionRating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Address and Property Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Endereço</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CEP
                </label>
                <div className="relative">
                  <Input
                    value={branch.zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      updateBranch(branch.id, { zipCode: value });
                      if (value.length === 8) {
                        handleCEPLookup(value, branch.id);
                      }
                    }}
                    maxLength={8}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Logradouro
                  </label>
                  <Select
                    value={branch.streetType}
                    onChange={(e) => updateBranch(branch.id, { streetType: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    {streetTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logradouro
                  </label>
                  <Input
                    value={branch.street}
                    onChange={(e) => updateBranch(branch.id, { street: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  <Input
                    value={branch.number}
                    onChange={(e) => updateBranch(branch.id, { number: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  <Input
                    value={branch.complement}
                    onChange={(e) => updateBranch(branch.id, { complement: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Bairro
                  </label>
                  <Select
                    value={branch.neighborhoodType}
                    onChange={(e) => updateBranch(branch.id, { neighborhoodType: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    {neighborhoodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro
                  </label>
                  <Input
                    value={branch.neighborhood}
                    onChange={(e) => updateBranch(branch.id, { neighborhood: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <Input
                    value={branch.city}
                    onChange={(e) => updateBranch(branch.id, { city: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <Select
                    value={branch.state}
                    onChange={(e) => updateBranch(branch.id, { state: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    {brazilianStates.map(state => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Informações do Imóvel</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade de Cômodos
                  </label>
                  <Input
                    type="number"
                    value={branch.propertyInfo.rooms}
                    onChange={(e) => updateBranch(branch.id, {
                      propertyInfo: {
                        ...branch.propertyInfo,
                        rooms: parseInt(e.target.value) || 0
                      }
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Área Total (m²)
                  </label>
                  <Input
                    type="number"
                    value={branch.propertyInfo.totalArea}
                    onChange={(e) => updateBranch(branch.id, {
                      propertyInfo: {
                        ...branch.propertyInfo,
                        totalArea: parseFloat(e.target.value) || 0
                      }
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Características</h4>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasAirConditioning}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasAirConditioning: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Ar condicionado central</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasDucts}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasDucts: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Dutos elétricos ou de Exaustão</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasWoodPanels}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasWoodPanels: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Painéis e revestimentos de madeira</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasSuspendedCeiling}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasSuspendedCeiling: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Teto rebaixado</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasRaisedFloor}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasRaisedFloor: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Piso suspenso</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasGarbageCollection}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasGarbageCollection: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Coleta de lixo</span>
                  </label>

                  {branch.propertyInfo.hasGarbageCollection && (
                    <div className="ml-6">
                      <label className="block text-sm text-gray-700 mb-1">
                        Dias por semana
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="7"
                        value={branch.propertyInfo.garbageCollectionDays || ''}
                        onChange={(e) => updateBranch(branch.id, {
                          propertyInfo: {
                            ...branch.propertyInfo,
                            garbageCollectionDays: parseInt(e.target.value) || 0
                          }
                        })}
                      />
                    </div>
                  )}

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasOtherFeatures}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasOtherFeatures: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Outros</span>
                  </label>

                  {branch.propertyInfo.hasOtherFeatures && (
                    <div className="ml-6">
                      <Input
                        placeholder="Especifique"
                        value={branch.propertyInfo.otherFeatures || ''}
                        onChange={(e) => updateBranch(branch.id, {
                          propertyInfo: {
                            ...branch.propertyInfo,
                            otherFeatures: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Ambiente</h4>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasStreams}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasStreams: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Riachos, canais ou alagados</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasWasteland}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasWasteland: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Terreno baldio</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasPets}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasPets: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Criação de animais domésticos</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasSlopes}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasSlopes: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Encostas</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasForest}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasForest: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Matas/florestas</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.propertyInfo.hasOtherEnvironment}
                      onChange={(e) => updateBranch(branch.id, {
                        propertyInfo: {
                          ...branch.propertyInfo,
                          hasOtherEnvironment: e.target.checked
                        }
                      })}
                      className="text-brand-primary rounded"
                    />
                    <span className="text-sm">Outros</span>
                  </label>

                  {branch.propertyInfo.hasOtherEnvironment && (
                    <div className="ml-6">
                      <Input
                        placeholder="Especifique"
                        value={branch.propertyInfo.otherEnvironment || ''}
                        onChange={(e) => updateBranch(branch.id, {
                          propertyInfo: {
                            ...branch.propertyInfo,
                            otherEnvironment: e.target.value
                          }
                        })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="space-y-4 border-b pb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Contatos</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const newContact: Contact = {
                      id: crypto.randomUUID(),
                      type: 'email',
                      value: '',
                      isPrimary: !branch.contacts.some(c => c.type === 'email')
                    };
                    updateBranch(branch.id, {
                      contacts: [...branch.contacts, newContact]
                    });
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newContact: Contact = {
                      id: crypto.randomUUID(),
                      type: 'phone',
                      value: '',
                      isPrimary: !branch.contacts.some(c => c.type === 'phone')
                    };
                    updateBranch(branch.id, {
                      contacts: [...branch.contacts, newContact]
                    });
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Telefone
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {branch.contacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      type={contact.type === 'email' ? 'email' : 'tel'}
                      value={contact.value}
                      onChange={(e) => {
                        const updatedContacts = branch.contacts.map(c =>
                          c.id === contact.id ? { ...c, value: e.target.value } : c
                        );
                        updateBranch(branch.id, { contacts: updatedContacts });
                      }}
                      placeholder={contact.type === 'email' ? 'Email' : 'Telefone'}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedContacts = branch.contacts.map(c =>
                        c.type === contact.type ? { ...c, isPrimary: c.id === contact.id } : c
                      );
                      updateBranch(branch.id, { contacts: updatedContacts });
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      contact.isPrimary
                        ? 'bg-brand-primary/10 text-brand-primary'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Principal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedContacts = branch.contacts.filter(c => c.id !== contact.id);
                      updateBranch(branch.id, { contacts: updatedContacts });
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Billing Information */}
          <div className="border-b pb-6">
            <button
              type="button"
              onClick={() => toggleBillingInfo(branch.id)}
              className="flex items-center gap-2 text-brand-primary hover:text-brand-primary/80"
            >
              {showBillingInfo[branch.id] ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
              <span>Dados para Envio de Boleto / NFS-e</span>
            </button>

            {showBillingInfo[branch.id] && (
              <div className="mt-4 space-y-6">
                <div className="flex items-center gap-4">
                  <Select
                    value={selectedBranchForCopy}
                    onChange={(e) => setSelectedBranchForCopy(e.target.value)}
                    className="w-64"
                  >
                    <option value="">Selecione uma filial para copiar dados</option>
                    {branches
                      .filter(b => b.id !== branch.id)
                      .map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))
                    }
                  </Select>

                  <button
                    type="button"
                    onClick={() => copyBillingInfo(branch.id, selectedBranchForCopy)}
                    disabled={!selectedBranchForCopy}
                    className="flex items-center gap-2 px-4 py-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg disabled:opacity-50"
                  >
                    <Copy className="w-5 h-5" />
                    <span>Copiar Dados</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">Informações Cadastrais</h4>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome/Razão Social
                      </label>
                      <Input
                        value={branch.billingInfo.name}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: { ...branch.billingInfo, name: e.target.value }
                        })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Fantasia
                      </label>
                      <Input
                        value={branch.billingInfo.tradeName}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: { ...branch.billingInfo, tradeName: e.target.value }
                        })}
                        required
                      />
                    </div>

                    {branch.billingInfo.personType === 'pf' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CPF
                          </label>
                          <Input
                            value={branch.billingInfo.document}
                            onChange={(e) => updateBranch(branch.id, {
                              billingInfo: { ...branch.billingInfo, document: e.target.value }
                            })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            RG
                          </label>
                          <Input
                            value={branch.billingInfo.rg}
                            onChange={(e) => updateBranch(branch.id, {
                              billingInfo: { ...branch.billingInfo, rg: e.target.value }
                            })}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CNPJ
                          </label>
                          <Input
                            value={branch.billingInfo.document}
                            onChange={(e) => updateBranch(branch.id, {
                              billingInfo: { ...branch.billingInfo, document: e.target.value }
                            })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Inscrição Estadual
                          </label>
                          <Input
                            value={branch.billingInfo.stateRegistration}
                            onChange={(e) => updateBranch(branch.id, {
                              billingInfo: { ...branch.billingInfo, stateRegistration: e.target.value }
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Inscrição Municipal
                          </label>
                          <Input
                            value={branch.billingInfo.municipalRegistration}
                            onChange={(e) => updateBranch(branch.id, {
                              billingInfo: { ...branch.billingInfo, municipalRegistration: e.target.value }
                            })}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">Endereço</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Logradouro
                        </label>
                        <Select
                          value={branch.billingInfo.streetType}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, streetType: e.target.value }
                          })}
                          required
                        >
                          <option value="">Selecione</option>
                          {streetTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CEP
                        </label>
                        <Input
                          value={branch.billingInfo.zipCode}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, zipCode: e.target.value }
                          })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logradouro
                      </label>
                      <Input
                        value={branch.billingInfo.street}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: { ...branch.billingInfo, street: e.target.value }
                        })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Número
                        </label>
                        <Input
                          value={branch.billingInfo.number}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, number: e.target.value }
                          })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Complemento
                        </label>
                        <Input
                          value={branch.billingInfo.complement}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, complement: e.target.value }
                          })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Bairro
                        </label>
                        <Select
                          value={branch.billingInfo.neighborhoodType}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, neighborhoodType: e.target.value }
                          })}
                          required
                        >
                          <option value="">Selecione</option>
                          {neighborhoodTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bairro
                        </label>
                        <Input
                          value={branch.billingInfo.neighborhood}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, neighborhood: e.target.value }
                          })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código da Cidade
                        </label>
                        <Input
                          value={branch.billingInfo.cityCode}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, cityCode: e.target.value }
                          })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade
                        </label>
                        <Input
                          value={branch.billingInfo.city}
                          onChange={(e) => updateBranch(branch.id, {
                            billingInfo: { ...branch.billingInfo, city: e.target.value }
                          })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <Select
                        value={branch.billingInfo.state}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: { ...branch.billingInfo, state: e.target.value }
                        })}
                        required
                      >
                        <option value="">Selecione</option>
                        {brazilianStates.map(state => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Contato para Cobrança</h4>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DDD
                      </label>
                      <Input
                        value={branch.billingInfo.ddd}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: { ...branch.billingInfo, ddd: e.target.value }
                        })}
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone de Cobrança
                      </label>
                      <Input
                        value={branch.billingInfo.phone}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: { ...branch.billingInfo, phone: e.target.value }
                        })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email para Boleto/Nota
                    </label>
                    <Input
                      type="email"
                      value={branch.billingInfo.email}
                      onChange={(e) => updateBranch(branch.id, {
                        billingInfo: { ...branch.billingInfo, email: e.target.value }
                      })}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Atenção: Apenas 1 endereço de e-mail permitido
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Outras Informações</h4>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={branch.billingInfo.isSimplesTaxation}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: {
                            ...branch.billingInfo,
                            isSimplesTaxation: e.target.checked
                          }
                        })}
                        className="text-brand-primary rounded"
                      />
                      <span className="text-sm">Simples Nacional</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={branch.billingInfo.hasRetention}
                        onChange={(e) => updateBranch(branch.id, {
                          billingInfo: {
                            ...branch.billingInfo,
                            hasRetention: e.target.checked
                          }
                        })}
                        className="text-brand-primary rounded"
                      />
                      <span className="text-sm">Retenção</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          

          {/* Upload Section */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold text-gray-800">Arquivos</h3>

  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
    <div className="flex flex-col items-center">
      <Upload className="w-8 h-8 text-gray-400 mb-2" />
      <p className="text-sm text-gray-500 mb-4">
        Arraste arquivos ou clique para fazer upload
      </p>
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          const newFiles: Document[] = files.map(file => ({
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type.startsWith('image') ? 'image' : 'document',
            file,
            shared: false,
            title: '',
            notes: ''
          }));
          updateBranch(branch.id, {
            documents: [...branch.documents, ...newFiles]
          });
        }}
        className="hidden"
        id={`file-upload-${branch.id}`}
      />
      <label
        htmlFor={`file-upload-${branch.id}`}
        className="px-4 py-2 bg-brand-primary/10 text-brand-primary font-medium rounded-lg hover:bg-brand-primary/20 transition-colors cursor-pointer"
      >
        Selecionar Arquivos
      </label>
    </div>
  </div>

  {branch.documents.length > 0 && (
  <div className="flex flex-col md:flex-row gap-8">
    {/* Documentos */}
    <div className="flex-1 space-y-4">
      <h4 className="text-md font-semibold text-gray-800 border-b pb-2">📄 Documentos</h4>
      {branch.documents.filter(doc => doc.type === 'document').length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum documento enviado.</p>
      ) : (
        branch.documents.filter(doc => doc.type === 'document').map((doc) => (
          <ArquivoCard key={doc.id} doc={doc} branchId={branch.id} updateBranch={updateBranch} />
        ))
      )}
    </div>

    {/* Imagens */}
    <div className="flex-1 space-y-4">
      <h4 className="text-md font-semibold text-gray-800 border-b pb-2">🖼️ Imagens</h4>
      {branch.documents.filter(doc => doc.type === 'image').length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma imagem enviada.</p>
      ) : (
        branch.documents.filter(doc => doc.type === 'image').map((doc) => (
          <ArquivoCard key={doc.id} doc={doc} branchId={branch.id} updateBranch={updateBranch} />
        ))
      )}
    </div>
  </div>
)}


</div>

        </div>
      ))}

      {/* Add Branch Button */}
      <button
        type="button"
        onClick={addBranch}
        className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:text-brand-primary hover:border-brand-primary/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Adicionar Filial
      </button>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="submit"
          className="button-gradient px-6 py-2 text-white font-medium rounded-lg flex items-center gap-2"
        >
          <Save size={20} />
          Salvar Cliente
        </button>
      </div>
    </form>
  );
}

function ArquivoCard({ doc, branchId, updateBranch }) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {doc.type === 'image' ? (
            <img
              src={URL.createObjectURL(doc.file)}
              alt={doc.name}
              className="w-10 h-10 object-cover rounded"
            />
          ) : (
            <FileText className="w-5 h-5 text-gray-400" />
          )}
          <span className="text-sm text-gray-700">{doc.name}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const updatedDocs = branch.documents.filter(d => d.id !== doc.id);
            updateBranch(branchId, { documents: updatedDocs });
          }}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <Input
        value={doc.title || ''}
        onChange={(e) => {
          const updatedDocs = branch.documents.map(d =>
            d.id === doc.id ? { ...d, title: e.target.value } : d
          );
          updateBranch(branchId, { documents: updatedDocs });
        }}
        placeholder="Título (opcional)"
      />

      <Textarea
        value={doc.notes || ''}
        onChange={(e) => {
          const updatedDocs = branch.documents.map(d =>
            d.id === doc.id ? { ...d, notes: e.target.value } : d
          );
          updateBranch(branchId, { documents: updatedDocs });
        }}
        placeholder="Observações (opcional)"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={doc.shared}
          onChange={(e) => {
            const updatedDocs = branch.documents.map(d =>
              d.id === doc.id ? { ...d, shared: e.target.checked } : d
            );
            updateBranch(branchId, { documents: updatedDocs });
          }}
          className="text-brand-primary rounded"
        />
        <span className="text-sm">Compartilhar com o Cliente</span>
      </label>
    </div>
  );
}
