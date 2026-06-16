const zlib = require('zlib');
const fs = require('fs');
const https = require('https');

const diagram = `classDiagram
    direction TB
    class User {
        -id : unsignedBigInteger
        -name : string
        -email : string
        -email_verified_at : timestamp
        -password : string
        -role : enum
        -remember_token : string
        -created_at : timestamp
        -updated_at : timestamp
        +umkm()
    }
    class Umkm {
        -id : unsignedBigInteger
        -user_id : unsignedBigInteger
        -nama_umkm : string
        -lokasi : string
        -jenis_usaha : string
        -pendapatan : decimal
        -created_at : timestamp
        -updated_at : timestamp
        +user()
        +transaksiQris()
        +creditScores()
    }
    class TransaksiQris {
        -id : unsignedBigInteger
        -umkm_id : unsignedBigInteger
        -tanggal : date
        -nominal : decimal
        -metode_pembayaran : string
        -status : string
        -created_at : timestamp
        -updated_at : timestamp
        +umkm()
    }
    class CreditScore {
        -id : unsignedBigInteger
        -umkm_id : unsignedBigInteger
        -score : int
        -kategori : string
        -status_kelayakan : string
        -created_at : timestamp
        -updated_at : timestamp
        +umkm()
    }
    class Artikel {
        -id : unsignedBigInteger
        -penulis_id : unsignedBigInteger
        -judul : string
        -gambar : string
        -isi : longText
        -created_at : timestamp
        -updated_at : timestamp
        +penulis()
    }
    class Notifikasi {
        -id : unsignedBigInteger
        -user_id : unsignedBigInteger
        -pesan : string
        -status : enum
        -created_at : timestamp
        -updated_at : timestamp
        +user()
    }
    User "1" --> "0..1" Umkm : hasOne
    User "1" --> "*" Artikel : hasMany
    User "1" --> "*" Notifikasi : hasMany
    Umkm "1" --> "*" TransaksiQris : hasMany
    Umkm "1" --> "*" CreditScore : hasMany`;

const data = Buffer.from(diagram, 'utf8');
zlib.deflate(data, (err, buffer) => {
    if (err) throw err;
    const payload = buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    const url = 'https://kroki.io/mermaid/png/' + payload;
    https.get(url, (res) => {
        const file = fs.createWriteStream('C:/Users/LENOVO LOQ/OneDrive/Documents/Desktop/websitefinsmart/Class_Diagram_FinSmart.png');
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Image saved to project directory.');
        });
    });
});
