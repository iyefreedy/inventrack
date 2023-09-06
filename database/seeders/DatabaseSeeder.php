<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\MaintenanceType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        MaintenanceType::create([
            'name' => 'Pemeliharaan Preventif',
            'description' => 'Ini adalah tindakan yang diambil untuk mencegah kerusakan atau kegagalan yang mungkin terjadi di masa depan. Contohnya adalah membersihkan debu dari komponen komputer, menjalankan pembaruan perangkat lunak secara berkala, dan melakukan tindakan pencegahan lainnya untuk mencegah masalah.'
        ]);

        MaintenanceType::create([
            'name' => 'Pemeliharaan Perbaikan',
            'description' => 'Ini melibatkan perbaikan atau perbaikan aset yang sudah rusak atau mengalami masalah. Ini bisa termasuk perbaikan perangkat keras, perbaikan perangkat lunak, atau penggantian komponen yang rusak.'
        ]);

        MaintenanceType::create([
            'name' => 'Pemeliharaan Rutin',
            'description' => ' Ini adalah tindakan yang dijadwalkan dan dilakukan secara teratur, seperti pembaruan perangkat lunak, backup data, atau pemantauan sistem. Tujuannya adalah menjaga sistem berjalan dengan baik.'
        ]);

        MaintenanceType::create([
            'name' => 'Pemeliharaan Penggantian',
            'description' => 'Ini melibatkan penggantian komponen atau perangkat yang sudah tua atau sudah habis masa pakainya dengan yang baru. Ini dilakukan untuk memastikan kinerja yang optimal.'
        ]);

        MaintenanceType::create([
            'name' => 'Pemeliharaan Darurat',
            'description' => 'Pemeliharaan ini melibatkan tindakan cepat untuk mengatasi masalah yang darurat, seperti serangan malware atau kegagalan perangkat keras kritis.'
        ]);

        MaintenanceType::create([
            'name' => 'Pemeliharaan Prakiraan',
            'description' => 'Ini melibatkan perencanaan jangka panjang untuk pemeliharaan aset, termasuk penggantian sistem yang sudah tua dengan yang lebih baru atau perencanaan kapasitas untuk pertumbuhan di masa depan.'
        ]);

        MaintenanceType::create([
            'name' => 'Pemeliharaan Adaptif',
            'description' => 'Ini melibatkan penyesuaian sistem atau perangkat untuk mengikuti perubahan dalam kebutuhan atau lingkungan. Ini bisa termasuk upgrade perangkat keras, pengoptimalan perangkat lunak, atau penyesuaian konfigurasi.'
        ]);

        MaintenanceType::create([
            'name' => 'Pemeliharaan Prediktif',
            'description' => 'Ini melibatkan penggunaan teknologi seperti pemantauan sensor atau analisis data untuk memprediksi kapan suatu perangkat atau sistem akan mengalami kegagalan, sehingga pemeliharaan dapat dijadwalkan sebelum kegagalan terjadi.'
        ]);
    }
}
