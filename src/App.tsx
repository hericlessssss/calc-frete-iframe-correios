import React, { useState, useEffect } from 'react';
import { Tractor, AlertCircle, CheckCircle2, Truck, ExternalLink } from 'lucide-react';

function App() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [isMobile, setIsMobile] = useState(false);
  const correiosUrl = "https://www2.correios.com.br/sistemas/precosPrazos/";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleIframeLoad = () => {
    setStatus('success');
  };

  const handleIframeError = () => {
    setStatus('error');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://i.imgur.com/PUkCRKA.png" 
                alt="AGROCAMPO Logo" 
                className="h-20 md:h-24 w-auto transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex items-center space-x-2 text-green-700">
              <Truck className="w-6 h-6" />
              <span className="hidden sm:inline font-semibold">Calculadora de Frete</span>
            </div>
          </div>
        </div>
      </header>

      {/* Status Bar - Only show on desktop */}
      {!isMobile && (
        <div className="bg-white border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-end gap-2">
              <span className="text-gray-600 text-sm">Status do Sistema:</span>
              <div className="flex items-center">
                {status === 'loading' && (
                  <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                )}
                {status === 'success' && (
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                )}
                {status === 'error' && (
                  <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    status === 'loading' ? 'text-yellow-500' :
                    status === 'success' ? 'text-green-500' :
                    'text-red-500'
                  }`}
                >
                  {status === 'loading' ? 'Carregando...' :
                   status === 'success' ? 'Sistema Funcional' :
                   'Erro ao Carregar'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg mt-4 overflow-hidden">
          {isMobile ? (
            <div className="p-8 text-center">
              <div className="mb-6">
                <Truck className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Calculadora de Frete
                </h2>
                <p className="text-gray-600 mb-6">
                  Para uma melhor experiência em dispositivos móveis, você será redirecionado para a calculadora oficial dos Correios.
                </p>
              </div>
              <a
                href={correiosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Acessar Calculadora
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Dica: A calculadora será aberta em uma nova aba do seu navegador.
                </p>
              </div>
            </div>
          ) : status === 'error' ? (
            <div className="p-8 text-center">
              <p className="text-red-600 font-medium mb-4">
                Não foi possível carregar a calculadora de fretes.
              </p>
              <a
                href={correiosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Acessar Site dos Correios
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          ) : (
            <iframe
              className="w-full border-0"
              style={{ height: 'calc(100vh - 140px)' }}
              src={correiosUrl}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Calculadora de Frete dos Correios"
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-sm">
            <p>© {new Date().getFullYear()} Agrocampo - Calculadora de Frete</p>
            <p className="text-green-200 text-xs mt-1">Em parceria com os Correios e Labora Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;