import React, { useState } from 'react';

const App = () => {
    const [sisiPersegi, setSisiPersegi] = useState('');
    const [sisiKubus, setSisiKubus] = useState('');
    const [outputLuasPersegi, setOutputLuasPersegi] = useState('-');
    const [outputLuasPermukaanKubus, setOutputLuasPermukaanKubus] = useState('-');

    // Fungsi untuk memanggil service luas persegi
    const hitungLuasPersegi = async () => {
        const rusuk = parseFloat(sisiPersegi);
        if (isNaN(rusuk) || rusuk <= 0 || !Number.isInteger(rusuk)) {
            alert("Masukkan panjang rusuk yang valid untuk luas persegi.");
            return;
        }

        try {
            const response = await fetch(`http://54.145.2.100:8080/function/luas-persegi`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rusuk }),
            });
            const result = await response.json();
            setOutputLuasPersegi(result.luas || "Error");
        } catch (error) {
            console.error('Error:', error);
            alert("Gagal memanggil service luas persegi.");
        }
    };

    // Fungsi untuk memanggil service luas permukaan kubus
    const hitungLuasPermukaanKubus = async () => {
        const rusuk = parseFloat(sisiKubus);
        if (isNaN(rusuk) || rusuk <= 0 || !Number.isInteger(rusuk)) {
            alert("Masukkan panjang rusuk yang valid untuk luas permukaan kubus.");
            return;
        }

        try {
            const response = await fetch(`http://54.145.2.100:8080/function/luas-permukaan-kubus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rusuk }),
            });
            const result = await response.json();
            setOutputLuasPermukaanKubus(result.luasPermukaanKubus || "Error");
        } catch (error) {
            console.error('Error:', error);
            alert("Gagal memanggil service luas permukaan kubus.");
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '30%', margin: 'auto', padding: '20px', textAlign: 'center',}}>
            <h1>Perhitungan Luas Persegi dan Luas Permukaan Kubus</h1>

            {/* Card untuk Luas Persegi */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', margin: '20px 0', padding: '20px', textAlign: 'center' }}>
                <h2>Luas Persegi</h2>
                <label htmlFor="sisiPersegi">Masukkan panjang rusuk (cm):</label>
                <input
                    type="number"
                    id="sisiPersegi"
                    placeholder="Contoh: 5"
                    required
                    value={sisiPersegi}
                    onChange={(e) => setSisiPersegi(e.target.value)}
                    style={{ width: '80%', padding: '8px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <button onClick={hitungLuasPersegi} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}>
                    Hitung Luas Persegi
                </button>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                    Hasil: <span>{outputLuasPersegi}</span> cm²
                </div>
            </div>

            {/* Card untuk Luas Permukaan Kubus */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', margin: '20px 0', padding: '20px', textAlign: 'center' }}>
                <h2>Luas Permukaan Kubus</h2>
                <label htmlFor="sisiKubus">Masukkan panjang rusuk (cm):</label>
                <input
                    type="number"
                    id="sisiKubus"
                    placeholder="Contoh: 5"
                    required
                    value={sisiKubus}
                    onChange={(e) => setSisiKubus(e.target.value)}
                    style={{ width: '80%', padding: '8px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <button onClick={hitungLuasPermukaanKubus} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}>
                    Hitung Luas Permukaan Kubus
                </button>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                    Hasil: <span>{outputLuasPermukaanKubus}</span> cm²
                </div>
            </div>
        </div>
    );
};

export default App;
