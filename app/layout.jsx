import "../styles/globals.css";

import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { AuthProvider } from "../context/AuthContext";

import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";

export const metadata = {
  title: "Loom & Leaf",
  description:
    "Loom & Leaf — A premium, immersive shopping experience for fashion, electronics, home & living, and beauty.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-1">
                  {children}
                </main>

                <Footer />
              </div>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}