# 🌤️ Weather App - 

Aplikasi cuaca modern dengan desain yang clean dan aesthetic, menampilkan kondisi cuaca terkini dan prediksi 5 hari ke depan.

![Weather App Preview]

https://dainty-chaja-11fd77.netlify.app/

## ✨ Fitur

-  **Cuaca Terkini** - Temperatur, kelembaban, kecepatan angin, dan visibility
-  **Prediksi 5 Hari** - Forecast cuaca dengan temperatur maksimal dan minimal
-  **Deteksi Lokasi** - Otomatis mendeteksi lokasi pengguna
-  **Pencarian Kota** - Cari cuaca berdasarkan nama kota
-  **Responsive Design** - Optimal di desktop, tablet, dan mobile
-  **Desain Modern** - Interface yang clean dan aesthetic
-  **Fast Loading** - Performa yang cepat dan smooth
-  **Mode Demo** - Bisa dijalankan tanpa API key untuk testing

## 🚀 Demo

Aplikasi ini bisa langsung dijalankan dalam mode demo tanpa perlu API key. Mode demo menampilkan data simulasi untuk testing interface.

## 🛠️ Teknologi

- **HTML5** - Struktur semantic dan modern
- **CSS3** - Styling dengan Flexbox, Grid, dan animations
- **JavaScript ES6+** - Logic aplikasi dengan async/await
- **OpenWeatherMap API** - Data cuaca real-time
- **Font Awesome** - Icons yang modern
- **Google Fonts** - Typography dengan Inter font

## 📦 Instalasi

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/Hafizhvito/weather-app.git
   cd weather-app
   ```

2. **Dapatkan API Key dari OpenWeatherMap:**
   - Daftar di [OpenWeatherMap](https://openweathermap.org/api)
   - Dapatkan API key gratis
   - Copy API key Anda

3. **Konfigurasi API Key:**
   - Buka file `script.js`
   - Ganti `YOUR_OPENWEATHERMAP_API_KEY` dengan API key Anda:
   ```javascript
   this.API_KEY = 'your_actual_api_key_here';
   ```

4. **Jalankan aplikasi:**
   - Buka `index.html` di browser
   - Atau gunakan live server untuk development

## 📁 Struktur File

```
weather-app/
├── 📄 index.html          # HTML structure
├── 📄 style.css           # CSS styling dan animations
├── 📄 script.js           # JavaScript logic

```

## 🎯 Cara Penggunaan

### Pencarian Manual
1. Ketik nama kota di kolom pencarian
2. Tekan Enter atau klik tombol search
3. Lihat informasi cuaca terkini dan forecast

### Deteksi Lokasi Otomatis
1. Klik tombol "Gunakan Lokasi Saya"
2. Izinkan akses lokasi di browser
3. Aplikasi akan menampilkan cuaca untuk lokasi Anda

## 🎨 Fitur Desain

- **Modern Gradient Background** - Gradasi warna yang menarik
- **Glassmorphism Effect** - Efek glass dengan backdrop blur
- **Smooth Animations** - Transisi yang halus dan natural
- **Responsive Grid** - Layout yang adaptif di semua device
- **Interactive Elements** - Hover effects dan micro-interactions
- **Clean Typography** - Inter font untuk readability optimal

## 📱 Responsive Design

Aplikasi ini dioptimalkan untuk berbagai ukuran layar:

- **Desktop** (1200px+) - Grid layout dengan 4 kolom
- **Tablet** (768px - 1199px) - Grid layout dengan 2 kolom
- **Mobile** (< 768px) - Single column layout
- **Small Mobile** (< 480px) - Kompak dengan spacing minimal

## 🔧 Kustomisasi

### Mengubah Tema Warna
Edit variabel CSS di `style.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #667eea;
  --text-primary: #333;
}
```

### Menambah Bahasa
Modifikasi array `days` dan `months` di `script.js`:
```javascript
const days = ['Sunday', 'Monday', ...]; // English
const months = ['January', 'February', ...]; // English
```

### Mengubah Default Location
Edit fungsi `loadDefaultWeather()` di `script.js`:
```javascript
const weatherData = await this.fetchWeatherByCity('YourCity');
```

## 🌟 Fitur Mendatang

- [ ] Dark/Light mode toggle
- [ ] Weather notifications
- [ ] Favorite cities
- [ ] Weather charts dan graphs
- [ ] Offline support dengan Service Worker
- [ ] Multi-language support
- [ ] Weather alerts dan warnings

## 🤝 Kontribusi

Kontribusi sangat welcome! Silakan:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Hafizh Vito Pratomo**

- GitHub: [@Hafizhvito](https://github.com/Hafizhvito)
- Email: hafizhvito2@gmail.com

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) untuk API cuaca
- [Font Awesome](https://fontawesome.com/) untuk icons
- [Google Fonts](https://fonts.google.com/) untuk typography
- Inspirasi desain dari berbagai weather apps modern

---

⭐ Jangan lupa star repository ini jika bermanfaat!

### Desktop View
*Interface desktop dengan layout grid yang luas*

### Mobile View  
*Interface mobile yang responsive dan touch-friendly*

### Dark Mode (Coming Soon)
*Mode gelap untuk penggunaan malam hari*
