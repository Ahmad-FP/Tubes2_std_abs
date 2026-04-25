# Tugas Besar 2 IF2211 - DOM Tree Traversal

### Identitas Kelompok

Kelompok std_abs
|        Nama          |
|----------------------|
| Ega Luthfi Rais      |
| Ahmad Fauzan Putra   | 
| Muh. Hartawan Haidir | 

### Deskripsi Program

Program ini merupakan implementasi penelusuran pohon DOM dari dokumen HTML menggunakan algoritma BFS (Breadth First Search) dan DFS (Depth First Search). Pengguna dapat memasukkan URL atau potongan HTML, lalu menentukan CSS Selector dan algoritma yang ingin digunakan. Program akan melakukan parsing HTML menjadi pohon DOM, menelusuri pohon dengan algoritma yang dipilih, dan menampilkan elemen yang cocok beserta jalur traversal-nya pada visualisasi pohon.

### Penjelasan Algoritma

- **BFS (Breadth First Search)** menelusuri pohon DOM secara level demi level dimulai dari node root. Setiap node yang dikunjungi dimasukkan ke dalam queue, lalu anak-anaknya dimasukkan setelah node tersebut diproses. BFS menemukan elemen yang cocok dengan CSS Selector mulai dari yang paling dekat dengan root.

- **DFS (Depth First Search)** menelusuri pohon DOM secara mendalam dengan bantuan stack. Setiap node dikunjungi terlebih dahulu sebelum berpindah ke anak-anaknya. DFS akan masuk sedalam mungkin ke satu cabang sebelum kembali untuk menelusuri cabang berikutnya.

Kedua algoritma menghasilkan elemen yang sama untuk CSS Selector yang sama, namun berbeda dalam urutan kunjungan node.


### Requirements

- Docker dan Docker Compose
- (Opsional, opsi tanpa Docker) Rust 1.88+, Node.js 20+, dan npm


### Build

Menggunakan Docker Compose (cara yang direkomendasikan):

```bash
docker compose up --build -d
```

### Penggunaan

Setelah container berjalan, buka browser dan akses:

```
http://localhost:3000
```

Pada halaman aplikasi:
1. Masukkan URL atau potongan HTML pada panel input.
2. Tekan tombol **Scrape & Parse HTML** untuk membangun pohon DOM.
3. Pilih algoritma (BFS atau DFS), masukkan CSS Selector, dan tentukan jumlah hasil.
4. Tekan tombol **Run Traversal** untuk menelusuri pohon dan melihat elemen yang cocok.

Untuk menghentikan aplikasi:

```bash
docker compose down
```

