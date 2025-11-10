export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#D9D9D9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500 space-y-2 text-sm">
          <p id="contact" className="font-semibold text-[#222222]">Instituto de Ciências Exatas e Tecnologia</p>
          <p>Universidade Federal do Amazonas</p>
          <p>Av. Nossa Senhora do Rosário, 3863 - Bairro Tiradentes, Itacoatiara</p>
          <p className="pt-4">
          <a
              href="https://manual-os.rennan-alves.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors">Ajuda e Documentação</a></p>
        </div>
      </div>
    </footer>
  );
}