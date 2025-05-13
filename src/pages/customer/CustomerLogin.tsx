import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Key, User, ArrowRight, Sparkles, Building2, Phone, MapPin } from 'lucide-react';

export function CustomerLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'document' | 'email'>('document');
  const [document, setDocument] = useState('');
  const [customerCode, setCustomerCode] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Registration form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [personType, setPersonType] = useState<'pf' | 'pj'>('pf');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/customer');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    // For now, we'll just show a success message and switch back to login
    alert('Cadastro realizado com sucesso! Você receberá seu código de cliente por email.');
    setIsRegistering(false);
  };

  const useTestCredentials = () => {
    setLoginMethod('document');
    setDocument('123.456.789-00');
    setCustomerCode('CLI123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://excelenciasaneamento.com.br/wp-content/uploads/2020/08/Logo.jpg"
            alt="Excelência Saneamento"
            className="h-16 mx-auto mb-6 rounded-lg"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Portal do Cliente</h1>
          <p className="text-gray-400">
            {isRegistering ? 'Crie sua conta' : 'Acesse sua área exclusiva'}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          {isRegistering ? (
            // Registration Form
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPersonType('pf')}
                  className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                    personType === 'pf'
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Pessoa Física
                </button>
                <button
                  type="button"
                  onClick={() => setPersonType('pj')}
                  className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                    personType === 'pj'
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Pessoa Jurídica
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {personType === 'pf' ? 'Nome Completo' : 'Razão Social'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder={personType === 'pf' ? 'Seu nome completo' : 'Nome da empresa'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {personType === 'pf' ? 'CPF' : 'CNPJ'}
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder={personType === 'pf' ? 'Seu CPF' : 'CNPJ da empresa'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder="Seu email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder="Seu telefone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    placeholder="Seu endereço completo"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full button-gradient mt-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2"
              >
                Criar Conta
                <ArrowRight size={18} />
              </motion.button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium"
                >
                  Já possui uma conta? Faça login
                </button>
              </div>
            </form>
          ) : (
            // Login Form
            <>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setLoginMethod('document')}
                  className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                    loginMethod === 'document'
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  CPF/CNPJ
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                    loginMethod === 'email'
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Email
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {loginMethod === 'document' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF/CNPJ
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={document}
                          onChange={(e) => setDocument(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                          placeholder="Digite seu CPF ou CNPJ"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código do Cliente
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={customerCode}
                          onChange={(e) => setCustomerCode(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                          placeholder="Digite seu código de cliente"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        placeholder="Digite seu email"
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full button-gradient mt-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                >
                  Acessar Portal
                  <ArrowRight size={18} />
                </motion.button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <div className="space-y-2">
                  <button className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium">
                    Esqueceu suas credenciais?
                  </button>
                  <div>
                    <button
                      onClick={() => setIsRegistering(true)}
                      className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium"
                    >
                      Criar nova conta
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={useTestCredentials}
                    className="flex items-center gap-2 mx-auto px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                  >
                    <Sparkles size={16} />
                    Usar Credenciais de Teste
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}