import { useEffect } from 'react';

const GoogleMockLogin = () => {
  useEffect(() => {
    // Setting up the dark background
    document.body.style.backgroundColor = '#202124';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleAccountSelect = () => {
    // When an account is clicked, we just close the window
    // The parent window (Login/Register.jsx) is using setInterval to check if this popup is closed!
    window.close();
  };

  return (
    <div className="min-h-screen bg-[#202124] text-gray-200 flex flex-col items-center pt-8 px-6 font-sans">
      <div className="w-full max-w-[450px]">
        
        {/* Google Logo */}
        <div className="flex justify-center mb-6 mt-4">
          <svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
            </g>
          </svg>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-[32px] font-normal text-white mb-3 tracking-wide">Pilih akun</h1>
          <p className="text-gray-300 text-[16px]">
            Lanjutkan ke <span className="font-medium text-[#8ab4f8]">FinSmart</span>
          </p>
        </div>

        {/* Account List */}
        <div className="w-full border border-[#5f6368] rounded-[8px] overflow-hidden mb-6">
          
          {/* Account 1 */}
          <button 
            onClick={handleAccountSelect}
            className="w-full flex items-center p-3 sm:px-5 sm:py-3 hover:bg-[#3c4043] transition-colors border-b border-[#5f6368] text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#3e8c4b] text-white flex items-center justify-center font-medium mr-3 flex-shrink-0">
              R
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-sm font-medium text-white truncate">Raymond Berutu</div>
              <div className="text-xs text-gray-400 truncate">raymondberutu@gmail.com</div>
            </div>
          </button>

          {/* Account 2 */}
          <button 
            onClick={handleAccountSelect}
            className="w-full flex items-center p-3 sm:px-5 sm:py-3 hover:bg-[#3c4043] transition-colors border-b border-[#5f6368] text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#ab47bc] text-white flex items-center justify-center font-medium mr-3 flex-shrink-0">
              R
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-sm font-medium text-white truncate">RAYMOND ELROY BERUTU</div>
              <div className="text-xs text-gray-400 truncate">raymondberutu@student.ub.ac.id</div>
            </div>
          </button>

          {/* Use another account */}
          <button 
            onClick={handleAccountSelect}
            className="w-full flex items-center p-3 sm:px-5 sm:py-3 hover:bg-[#3c4043] transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full text-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
              <svg focusable="false" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
              </svg>
            </div>
            <div className="text-sm font-medium text-white">Gunakan akun lain</div>
          </button>

        </div>

        {/* Footer text */}
        <div className="text-[13px] text-gray-400 leading-relaxed mb-12">
          Sebelum menggunakan aplikasi ini, Anda dapat meninjau{' '}
          <a href="#" className="text-[#8ab4f8] hover:underline">Kebijakan Privasi</a> dan{' '}
          <a href="#" className="text-[#8ab4f8] hover:underline">Persyaratan Layanan</a> FinSmart.
        </div>

        {/* Bottom Footer */}
        <div className="flex justify-between items-center text-[12px] text-gray-400 absolute bottom-0 left-0 w-full p-6">
          <div>
            <select className="bg-transparent text-gray-400 outline-none border-none hover:bg-[#3c4043] p-1 rounded cursor-pointer appearance-none">
              <option value="id">Indonesia</option>
              <option value="en">English (United States)</option>
            </select>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:bg-[#3c4043] px-2 py-1 rounded transition-colors">Bantuan</a>
            <a href="#" className="hover:bg-[#3c4043] px-2 py-1 rounded transition-colors">Privasi</a>
            <a href="#" className="hover:bg-[#3c4043] px-2 py-1 rounded transition-colors">Persyaratan</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GoogleMockLogin;
