// ---------- Sürüm 13: ilk çizimde (p8 başlat) gereken metinler ve simgeler ----------
// Öğün kartındaki "Fotoğrafla ekle" / "Barkod okut" düğmeleri p6.js şablonunda; açılıştaki ilk çizim p9* parçalarından önce
// yapıldığı için metinler ve simgeler burada (p6'dan önce) tanımlanır.
Object.assign(S, {
  ftEkle:["Fotoğrafla ekle","Add from photo","Добавить по фото","Per Foto hinzufügen","إضافة من صورة"],
  bkEkle:["Barkod okut","Scan barcode","Сканировать штрихкод","Barcode scannen","مسح الباركود"],
  u_porsiyon:["porsiyon","serving","порц.","Portion","حصة"],
  ftOgunFoto:["Öğün fotoğrafı","Meal photo","Фото блюда","Essensfoto","صورة الوجبة"]
});
const IKON_KAMERA = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.6-2.2A1.5 1.5 0 0 1 9.8 5h4.4a1.5 1.5 0 0 1 1.2.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.6"/></svg>';
const IKON_BARKOD = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 7V5a1 1 0 0 1 1-1h2M18 4h2a1 1 0 0 1 1 1v2M21 17v2a1 1 0 0 1-1 1h-2M6 20H4a1 1 0 0 1-1-1v-2"/><path d="M7 8v8M10 8v8M12.5 8v8M15 8v8M17 8v8" stroke-width="1.6"/></svg>';
