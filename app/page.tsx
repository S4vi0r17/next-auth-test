'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const products = [
  {
    id: 1,
    name: 'Sony WH-1000XM5',
    price: 349.99,
    category: 'Auriculares',
    image: '/auriculares-premium.jpg',
  },
  {
    id: 2,
    name: 'MotoWatch 100',
    price: 199.99,
    category: 'Tecnología',
    image: '/motowatch-100.jpg',
  },
  {
    id: 3,
    name: 'iPhone 15 Pro',
    price: 1099.99,
    category: 'Smartphones',
    image: '/iphone-15-pro.jpg',
  },
  {
    id: 4,
    name: 'Asus Zenbook S16',
    price: 1200.99,
    category: 'Computadoras',
    image: '/asus-zenbook-s16.webp',
  },
  {
    id: 5,
    name: 'Galaxy Tab S10 Ultra',
    price: 799.99,
    category: 'Tablets',
    image: '/galaxy-tab-s10-ultra.avif',
  },
  {
    id: 6,
    name: 'Odyssey OLED G9',
    price: 999.99,
    category: 'Gaming',
    image: '/odyssey-oled-g9.webp',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Barra de búsqueda y ordenamiento */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div
            className="relative flex-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Ordenar por
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSortOrder('featured')}>
                  Destacados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('price-asc')}>
                  Precio: Menor a Mayor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('price-desc')}>
                  Precio: Mayor a Menor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('name-asc')}>
                  Nombre: A-Z
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('name-desc')}>
                  Nombre: Z-A
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>

        {/* Grid de productos */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence>
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 group"
              >
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Agregar al carrito
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje cuando no hay resultados */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
