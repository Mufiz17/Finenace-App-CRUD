const mongoose = require('mongoose');

const financeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: [true, 'Judul diperlukan'],
        },
        amount: {
            type: Number,
            required: [true, 'Jumlah diperlukan'],
        },
        type: {
            type: String,
            required: [true, 'Tipe diperlukan'],
            enum: ['income', 'expense'],
        },
        category: {
            type: String,
            required: true,
            enum: ['salary', 'food', 'transportation', 'entertainment', 'utilities', 'others'], // Daftar kategori
          },
    },
    {
        timestamps: true
    }
);

const Finance = mongoose.model('Finance', financeSchema);

module.exports = Finance;