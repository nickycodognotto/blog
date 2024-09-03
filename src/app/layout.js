// app/layout.js
import './globals.css';
import { Sacramento } from 'next/font/google';
import AuthProvider from "./providers/AuthProvider";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const sacramento = Sacramento({
  subsets: ['latin'], 
  weight: '400', // Sacramento só tem peso 400
});

export const metadata = {
  title: 'Doce Amargo',
  description: 'Blogizinho',
  icons: {
    icon: ['/favicon.ico']
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br"> 
      <body>
        <AuthProvider>
          <div className="container">
            <div className='wrapper'>
              <Navbar />
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
