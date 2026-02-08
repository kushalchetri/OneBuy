import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getRandomPrice = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
};

export const seedDatabase = async () => {
    try {
        const count = await Product.countDocuments();

        if (count > 0) {
            console.log('Database already seeded. Skipping...');
            return;
        }

        const assetsPath = path.join(__dirname, '../../frontend/public/assets');
        const categories = ['clothes', 'electronics', 'shoes'];
        const products = [];

        for (const category of categories) {
            const categoryPath = path.join(assetsPath, category);

            if (fs.existsSync(categoryPath)) {
                const files = fs.readdirSync(categoryPath);

                files.forEach(file => {
                    const productName = file.replace(/\.[^/.]+$/, '');

                    products.push({
                        name: productName,
                        price: getRandomPrice(),
                        image: `/assets/${category}/${file}`
                    });
                });
            }
        }

        if (products.length > 0) {
            await Product.insertMany(products);
            console.log(`✓ Database seeded with ${products.length} products`);
        } else {
            console.log('No products found to seed');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
